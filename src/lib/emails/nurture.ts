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

export async function sendCallBooked(resend: Resend, email: string, scheduledAt: string): Promise<void> {
  if (!nurtureEnabled()) return;
  try {
    const { error } = await resend.events.send({
      event: "call.booked",
      email,
      payload: { email, scheduled_at: scheduledAt },
    });
    if (error) console.error("[nurture] call.booked failed:", error);
  } catch (err) {
    console.error("[nurture] call.booked threw:", err);
  }
}
