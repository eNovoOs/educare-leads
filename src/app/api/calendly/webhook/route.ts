import { NextResponse, after } from "next/server";
import { Resend } from "resend";
import { verifyCalendlySignature } from "@/lib/calendly";
import { sendCallBooked } from "@/lib/emails/nurture";
import { sendBookingSmsWebhook, sendBookingCancelWebhook, getFirstName, type BookingInvitee } from "@/lib/bookingSms";
import { cancelReminders, sendBookingEmails } from "@/lib/emails/schedule";

/**
 * Calendly webhook receiver (subscribe to invitee.created + invitee.canceled).
 *
 *  - invitee.created  -> send confirmation email now; schedule 24h/3h/1h Resend reminders ONLY if ENABLE_RESEND_REMINDERS=true (default off: Calendly Workflows sends them)
 *  - invitee.canceled -> cancel that event's pending reminders.
 *    A Calendly reschedule fires invitee.canceled (rescheduled: true) for the old
 *    time and invitee.created for the new one, so both cases are handled by the
 *    two branches above (old reminders cancelled, new ones scheduled).
 *
 * Env: CALENDLY_WEBHOOK_SIGNING_KEY, RESEND_API_KEY, EMAIL_FROM, ENABLE_RESEND_REMINDERS, ENABLE_RESEND_NURTURE, CRM_BOOKING_SMS_WEBHOOK_URL (optional), CRM_BOOKING_CANCEL_WEBHOOK_URL (optional).
 */

export const runtime = "nodejs";

type Invitee = {
  uri?: string;
  email?: string;
  name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  text_reminder_number?: string | null;
  questions_and_answers?: { question?: string; answer?: string }[] | null;
  timezone?: string;
  cancel_url?: string;
  reschedule_url?: string;
  rescheduled?: boolean;
  scheduled_event?: {
    name?: string;
    start_time?: string;
    location?: { type?: string; join_url?: string; location?: string } | null;
  };
};

export async function POST(req: Request) {
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
  if (!signingKey) {
    console.error("[calendly] CALENDLY_WEBHOOK_SIGNING_KEY is not set");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const raw = await req.text();
  if (!verifyCalendlySignature(raw, req.headers.get("calendly-webhook-signature"), signingKey)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: { event?: string; payload?: Invitee };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const p = event.payload;

  // CRM cancel hook (optional env). Runs after the response is sent so it can never
  // delay/block the 200 to Calendly, and independently of the email config below.
  // For a reschedule Calendly sends canceled (rescheduled: true) then created, so the
  // old booking is cancelled here and the new one is posted by the created branch.
  if (event.event === "invitee.canceled" && p && process.env.CRM_BOOKING_CANCEL_WEBHOOK_URL) {
    after(async () => {
      try {
        await sendBookingCancelWebhook(p as BookingInvitee);
      } catch {
        console.error("[calendly] CRM cancel webhook error");
      }
    });
  }
  const startTime = p?.scheduled_event?.start_time;
  if (!p?.email || !startTime) {
    return NextResponse.json({ ok: true, ignored: "missing email or start_time" });
  }
  if (!process.env.RESEND_API_KEY) {
    console.error("[calendly] RESEND_API_KEY is not set; no emails sent");
    return NextResponse.json({ ok: true, ignored: "email not configured" });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (event.event === "invitee.created") {
    const joinUrl = p.scheduled_event?.location?.join_url;
    const result = await sendBookingEmails(
      resend,
      p.email,
      {
        name: getFirstName(p) || undefined,
        startTime,
        timezone: p.timezone,
        joinUrl,
        rescheduleUrl: p.reschedule_url,
        cancelUrl: p.cancel_url,
      },
      p.uri || p.email,
    );
    // Exit the nurture automation (no-op unless ENABLE_RESEND_NURTURE=true).
    await sendCallBooked(resend, p.email, new Date(startTime).toISOString());
    // Forward to the CRM SMS webhook (skipped if unset; never breaks the above).
    try {
      await sendBookingSmsWebhook(p as BookingInvitee, startTime);
    } catch (err) {
      console.error("[calendly] CRM SMS webhook error:", err);
    }
    return NextResponse.json({ ok: true, ...result });
  }

  if (event.event === "invitee.canceled") {
    const result = await cancelReminders(resend, p.email, startTime);
    return NextResponse.json({ ok: true, ...result });
  }

  return NextResponse.json({ ok: true, ignored: event.event });
}
