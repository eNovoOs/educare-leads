import { NextResponse } from "next/server";
import { Resend } from "resend";
import { verifyCalendlySignature } from "@/lib/calendly";
import { cancelReminders, sendBookingEmails } from "@/lib/emails/schedule";

/**
 * Calendly webhook receiver (subscribe to invitee.created + invitee.canceled).
 *
 *  - invitee.created  -> send prep/confirmation email now, schedule 24h/3h/1h reminders
 *  - invitee.canceled -> cancel that event's pending reminders.
 *    A Calendly reschedule fires invitee.canceled (rescheduled: true) for the old
 *    time and invitee.created for the new one, so both cases are handled by the
 *    two branches above (old reminders cancelled, new ones scheduled).
 *
 * Env: CALENDLY_WEBHOOK_SIGNING_KEY, RESEND_API_KEY, EMAIL_FROM (optional).
 */

export const runtime = "nodejs";

type Invitee = {
  uri?: string;
  email?: string;
  name?: string;
  first_name?: string;
  timezone?: string;
  cancel_url?: string;
  reschedule_url?: string;
  rescheduled?: boolean;
  scheduled_event?: {
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
        name: p.first_name || p.name,
        startTime,
        timezone: p.timezone,
        joinUrl,
        rescheduleUrl: p.reschedule_url,
        cancelUrl: p.cancel_url,
      },
      p.uri || p.email,
    );
    return NextResponse.json({ ok: true, ...result });
  }

  if (event.event === "invitee.canceled") {
    const result = await cancelReminders(resend, p.email, startTime);
    return NextResponse.json({ ok: true, ...result });
  }

  return NextResponse.json({ ok: true, ignored: event.event });
}
