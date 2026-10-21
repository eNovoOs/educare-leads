import { Resend } from "resend";
import { LEAD_EMAIL_FROM, LEAD_EMAIL_REPLY_TO } from "./base";
import { confirmationEmail, reminderEmail, type BookingDetails, type ReminderOffset } from "./templates";

export const REMINDER_OFFSETS: { key: ReminderOffset; ms: number }[] = [
  { key: "24h", ms: 24 * 3600_000 },
  { key: "3h", ms: 3 * 3600_000 },
  { key: "1h", ms: 1 * 3600_000 },
];

// Resend only accepts scheduledAt within 30 days; leave a little margin.
const MAX_SCHEDULE_AHEAD_MS = 29 * 24 * 3600_000;
// Don't schedule right on top of "now" — Resend needs a moment.
const MIN_LEAD_MS = 60_000;

// Resend's default rate limit is 2 requests/second; pace sequential calls.
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type ScheduleResult = { confirmation: boolean; scheduled: ReminderOffset[]; skipped: ReminderOffset[] };

/**
 * Send the confirmation immediately and schedule the 24h/3h/1h reminders.
 * Reminders whose send time has already passed are skipped. Idempotency keys
 * (derived from the Calendly invitee URI) make Calendly webhook retries safe.
 */
export async function sendBookingEmails(
  resend: Resend,
  to: string,
  booking: BookingDetails,
  inviteeUri: string,
  now = Date.now(),
): Promise<ScheduleResult> {
  const start = new Date(booking.startTime).getTime();
  const key = (suffix: string) => `calendly:${inviteeUri}:${booking.startTime}:${suffix}`.slice(0, 256);
  const base = { from: LEAD_EMAIL_FROM, to, replyTo: LEAD_EMAIL_REPLY_TO };
  const result: ScheduleResult = { confirmation: false, scheduled: [], skipped: [] };

  const c = confirmationEmail(booking);
  if (start <= now) console.log("[calendly] confirmation skipped: call start is in the past");
  if (start > now) {
    const { error } = await resend.emails.send(
      { ...base, subject: c.subject, html: c.html, text: c.text },
      { idempotencyKey: key("confirm") },
    );
    if (error) console.error("[calendly] confirmation send failed:", error);
    else {
      result.confirmation = true;
      console.log("[calendly] confirmation email sent");
    }
  }

  // Reminders are OFF by default: Calendly Workflows sends the 24h/3h/1h emails.
  // Set ENABLE_RESEND_REMINDERS=true to schedule them via Resend as well.
  const remindersOn = process.env.ENABLE_RESEND_REMINDERS === "true";
  for (const { key: offset, ms } of REMINDER_OFFSETS) {
    if (!remindersOn) break;
    await sleep(600);
    const sendAt = start - ms;
    if (sendAt < now + MIN_LEAD_MS || sendAt > now + MAX_SCHEDULE_AHEAD_MS) {
      result.skipped.push(offset);
      continue;
    }
    const r = reminderEmail(offset, booking);
    const { error } = await resend.emails.send(
      { ...base, subject: r.subject, html: r.html, text: r.text, scheduledAt: new Date(sendAt).toISOString() },
      { idempotencyKey: key(offset) },
    );
    if (error) {
      console.error(`[calendly] ${offset} reminder schedule failed:`, error);
      result.skipped.push(offset);
    } else {
      result.scheduled.push(offset);
    }
  }
  return result;
}

/**
 * Cancel still-scheduled reminders for an invitee (used on cancel / reschedule).
 *
 * No datastore is a dependency of this repo, so instead of persisting Resend
 * email ids we look them up: list recent emails and cancel those that are
 * (1) to the invitee, (2) from our lead sender, (3) still `scheduled`, and
 * (4) scheduled for exactly start-24h / start-3h / start-1h of the cancelled
 * event. Matching on the exact timestamps means a rescheduled booking's NEW
 * reminders (different times) are never touched.
 * Limitation: scans the latest ~500 emails; fine at current volume. If volume
 * grows, store ids in Vercel KV/Blob keyed by invitee URI instead.
 */
export async function cancelReminders(
  resend: Resend,
  to: string,
  startTime: string,
  maxPages = 5,
): Promise<{ canceled: number; scanned: number }> {
  const start = new Date(startTime).getTime();
  const targets = new Set(REMINDER_OFFSETS.map((o) => start - o.ms));
  const recipient = to.trim().toLowerCase();
  let canceled = 0;
  let scanned = 0;
  let after: string | undefined;

  for (let page = 0; page < maxPages; page++) {
    if (page > 0) await sleep(600);
    const { data, error } = await resend.emails.list({ limit: 100, ...(after ? { after } : {}) });
    if (error || !data) {
      console.error("[calendly] list emails failed:", error);
      break;
    }
    for (const e of data.data) {
      scanned++;
      if (e.last_event !== "scheduled" || !e.scheduled_at) continue;
      if (!e.to.some((a) => a.toLowerCase() === recipient)) continue;
      if (!targets.has(new Date(e.scheduled_at).getTime())) continue;
      await sleep(600);
      const { error: cErr } = await resend.emails.cancel(e.id);
      if (cErr) console.error("[calendly] cancel failed:", e.id, cErr);
      else canceled++;
    }
    if (!data.has_more || data.data.length === 0) break;
    after = data.data[data.data.length - 1].id;
  }
  return { canceled, scanned };
}
