import { Resend } from "resend";

/**
 * Resend automation "Educare Lead Nurture (6 emails)":
 *   trigger event `lead.submitted` {email, first_name, source}
 *   exit event    `call.booked`    {email, scheduled_at}
 * Everything here is best-effort: it never throws and never blocks the lead.
 * Gated by ENABLE_RESEND_NURTURE=true.
 */
export const nurtureEnabled = () => process.env.ENABLE_RESEND_NURTURE === "true";

export async function sendLeadSubmitted(
  resend: Resend,
  lead: { email: string; firstName?: string; lastName?: string; source?: string },
): Promise<void> {
  if (!nurtureEnabled()) return;
  try {
    const { error: cErr } = await resend.contacts.create({
      email: lead.email,
      firstName: lead.firstName,
      lastName: lead.lastName,
    });
    // An existing contact is expected for repeat leads; ignore it.
    if (cErr && !/already exist/i.test(cErr.message || "")) {
      console.error("[nurture] contact upsert failed:", cErr);
    }
    const { error } = await resend.events.send({
      event: "lead.submitted",
      email: lead.email,
      payload: { email: lead.email, first_name: lead.firstName ?? "", source: lead.source ?? "website" },
    });
    if (error) console.error("[nurture] lead.submitted failed:", error);
  } catch (err) {
    console.error("[nurture] lead.submitted threw:", err);
  }
}

export type CallBookedInfo = {
  scheduledAt: string; // ISO start time of the call
  firstName?: string;
  rescheduleUrl?: string;
  timezone?: string; // invitee IANA timezone, used for call_day
};

/** Weekday name of the call in the invitee's timezone (e.g. "Thursday"). */
export function callDay(scheduledAt: string, timezone?: string): string {
  const d = new Date(scheduledAt);
  try {
    return d.toLocaleDateString("en-US", { weekday: "long", timeZone: timezone || "America/Toronto" });
  } catch {
    return d.toLocaleDateString("en-US", { weekday: "long", timeZone: "America/Toronto" });
  }
}

/**
 * Fires `call.booked`. Used as the exit event of the nurture automation and as the
 * trigger of "Educare Post-Booking Value (5 emails)".
 * Payload: {email, scheduled_at, first_name, reschedule_url, call_day, hours_until_call}
 * hours_until_call (hours from booking to call start, at send time) lets the automation
 * apply the skip rules with simple numeric conditions.
 */
export async function sendCallBooked(resend: Resend, email: string, info: CallBookedInfo): Promise<void> {
  if (!nurtureEnabled()) return;
  try {
    const hoursUntilCall = Math.round(((new Date(info.scheduledAt).getTime() - Date.now()) / 36e5) * 10) / 10;
    const { error } = await resend.events.send({
      event: "call.booked",
      email,
      payload: {
        email,
        scheduled_at: info.scheduledAt,
        first_name: info.firstName ?? "",
        reschedule_url: info.rescheduleUrl ?? "",
        call_day: callDay(info.scheduledAt, info.timezone),
        hours_until_call: hoursUntilCall,
      },
    });
    if (error) console.error("[nurture] call.booked failed:", error);
  } catch (err) {
    console.error("[nurture] call.booked threw:", err);
  }
}

/**
 * Fires `call.canceled` on Calendly invitee.canceled (including the cancel half of a
 * reschedule). Exit event of the post-booking automation.
 */
export async function sendCallCanceled(
  resend: Resend,
  email: string,
  info: { scheduledAt: string; rescheduled?: boolean },
): Promise<void> {
  if (!nurtureEnabled()) return;
  try {
    const { error } = await resend.events.send({
      event: "call.canceled",
      email,
      payload: { email, scheduled_at: info.scheduledAt, rescheduled: !!info.rescheduled },
    });
    if (error) console.error("[nurture] call.canceled failed:", error);
  } catch (err) {
    console.error("[nurture] call.canceled threw:", err);
  }
}
