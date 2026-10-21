import { NextResponse, after } from "next/server";
import { Resend } from "resend";
import { verifyCalendlySignature } from "@/lib/calendly";
import { buildUserData, decodeTrackingToken, sendCapiEvent } from "@/lib/meta";
import { META_CURRENCY, SCHEDULE_VALUE, scheduleEventId } from "@/lib/metaConfig";
import { sendCallBooked, sendCallCanceled } from "@/lib/emails/nurture";
import { sendBookingSmsWebhook, sendBookingCancelWebhook, getFirstName, getInviteePhone, type BookingInvitee } from "@/lib/bookingSms";
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

/**
 * Server-side Meta "Schedule" for a new booking. event_id is derived from the
 * invitee uuid so it dedupes with the /booked pixel (invitee_uuid redirect param)
 * and with Calendly webhook retries. Reschedules (old_invitee set) are skipped
 * so one booked call is counted once.
 */
async function sendScheduleCapi(p: Invitee): Promise<string> {
  const uuid = (p.uri || "").split("/").filter(Boolean).pop();
  if (!uuid || !p.email) return "skipped (no invitee uuid/email)";
  if (!process.env.META_PIXEL_ID || !process.env.META_CAPI_TOKEN) return "skipped (META_* not set)";
  const ctx = decodeTrackingToken(p.tracking?.salesforce_uuid);
  const [first, ...rest] = (p.name || "").trim().split(/\s+/);
  const ok = await sendCapiEvent(
    {
      event_name: "Schedule",
      event_id: scheduleEventId(uuid),
      // "website" requires the browser UA; without it this is a server-originated event.
      action_source: ctx.ua ? "website" : "system_generated",
      event_source_url: "https://www.educareleads.com/booked",
      user_data: buildUserData({
        ...ctx,
        email: p.email,
        phone: getInviteePhone(p as BookingInvitee),
        firstName: p.first_name || first || undefined,
        lastName: p.last_name || rest.join(" ") || undefined,
      }),
      custom_data: { value: SCHEDULE_VALUE, currency: META_CURRENCY },
    },
    "calendly",
  );
  return ok ? `sent (${scheduleEventId(uuid)}, ua:${ctx.ua ? "y" : "n"}, fbc:${ctx.fbc ? "y" : "n"})` : "failed (see Meta CAPI error above)";
}

/** Run independent side effects; one failure never blocks the others. Logs every outcome. */
async function runAll(label: string, tasks: Record<string, () => Promise<unknown>>) {
  const names = Object.keys(tasks);
  const settled = await Promise.allSettled(names.map((n) => tasks[n]()));
  const out: Record<string, unknown> = {};
  settled.forEach((r, i) => {
    out[names[i]] = r.status === "fulfilled" ? r.value : `error: ${r.reason instanceof Error ? r.reason.message : String(r.reason)}`;
  });
  console.log(`[calendly] ${label} outcomes:`, JSON.stringify(out));
  return out;
}

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
  /** Set on invitee.created when this booking replaces a rescheduled one. */
  old_invitee?: string | null;
  tracking?: { salesforce_uuid?: string | null; [k: string]: unknown } | null;
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

  if (event.event !== "invitee.created" && event.event !== "invitee.canceled") {
    return NextResponse.json({ ok: true, ignored: event.event });
  }
  if (!p) return NextResponse.json({ ok: true, ignored: "missing payload" });

  const startTime = p.scheduled_event?.start_time;
  const email = p.email;
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  const needs = (cond: unknown, why: string) => (cond ? null : `skipped (${why})`);
  console.log(`[calendly] ${event.event} received`, {
    hasEmail: !!email, hasStart: !!startTime, resend: !!resend, rescheduled: !!p.rescheduled, oldInvitee: !!p.old_invitee,
  });

  if (event.event === "invitee.created") {
    // Meta + CRM SMS don't depend on Resend; run them after the response so Calendly gets a fast 200.
    after(() =>
      runAll("invitee.created (after)", {
        metaSchedule: async () =>
          p.old_invitee ? "skipped (reschedule; counted on original booking)" : sendScheduleCapi(p),
        crmSms: async () =>
          needs(startTime, "no start_time") ??
          needs(process.env.CRM_BOOKING_SMS_WEBHOOK_URL, "CRM_BOOKING_SMS_WEBHOOK_URL not set") ??
          ((await sendBookingSmsWebhook(p as BookingInvitee, startTime!)) ? "sent" : "failed"),
      }).then(() => undefined),
    );
    const out = await runAll("invitee.created", {
      confirmationEmail: async () =>
        needs(email && startTime, "missing email or start_time") ??
        needs(resend, "RESEND_API_KEY not set") ??
        sendBookingEmails(
          resend!,
          email!,
          {
            name: getFirstName(p) || undefined,
            startTime: startTime!,
            timezone: p.timezone,
            joinUrl: p.scheduled_event?.location?.join_url,
            rescheduleUrl: p.reschedule_url,
            cancelUrl: p.cancel_url,
          },
          p.uri || email!,
        ),
      // Nurture exit + post-booking automation (no-op unless ENABLE_RESEND_NURTURE=true; needs a full-access key).
      callBooked: async () =>
        needs(email && startTime, "missing email or start_time") ??
        needs(resend, "RESEND_API_KEY not set") ??
        sendCallBooked(resend!, email!, {
          scheduledAt: new Date(startTime!).toISOString(),
          firstName: getFirstName(p) || undefined,
          rescheduleUrl: p.reschedule_url,
          timezone: p.timezone,
        }).then(() => "done"),
    });
    const conf = out.confirmationEmail;
    return NextResponse.json({ ok: true, ...(conf && typeof conf === "object" ? conf : {}), outcomes: out });
  }

  // invitee.canceled. For a reschedule Calendly sends canceled (rescheduled: true) then created.
  if (process.env.CRM_BOOKING_CANCEL_WEBHOOK_URL) {
    after(() =>
      runAll("invitee.canceled (after)", {
        crmCancel: () => sendBookingCancelWebhook(p as BookingInvitee),
      }).then(() => undefined),
    );
  }
  const out = await runAll("invitee.canceled", {
    cancelReminders: async () =>
      needs(email && startTime, "missing email or start_time") ??
      needs(resend, "RESEND_API_KEY not set") ??
      cancelReminders(resend!, email!, startTime!),
    callCanceled: async () =>
      needs(email && startTime, "missing email or start_time") ??
      needs(resend, "RESEND_API_KEY not set") ??
      sendCallCanceled(resend!, email!, {
        scheduledAt: new Date(startTime!).toISOString(),
        rescheduled: !!p.rescheduled,
      }).then(() => "done"),
  });
  const cr = out.cancelReminders;
  return NextResponse.json({ ok: true, ...(cr && typeof cr === "object" ? cr : {}), outcomes: out });
}
