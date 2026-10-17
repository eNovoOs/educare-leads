/** Helpers for forwarding a Calendly booking to the CRM SMS webhook. */

export type QA = { question?: string; answer?: string };

export type BookingInvitee = {
  email?: string;
  name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  timezone?: string;
  cancel_url?: string;
  reschedule_url?: string;
  text_reminder_number?: string | null;
  questions_and_answers?: QA[] | null;
  updated_at?: string;
  cancellation?: { created_at?: string } | null;
  scheduled_event?: {
    name?: string;
    start_time?: string;
    location?: { join_url?: string } | null;
  };
};

/** Normalize North American numbers to E.164; other +country numbers are kept as digits. Returns "" if unusable. */
export function normalizePhone(raw?: string | null): string {
  if (!raw) return "";
  const s = String(raw).trim();
  const digits = s.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (s.startsWith("+") && digits.length >= 8 && digits.length <= 15) return `+${digits}`;
  return "";
}

/** Raw phone: text_reminder_number, else the "Mobile phone number" Q&A answer. */
export function getInviteePhone(p: BookingInvitee | undefined | null): string {
  if (!p) return "";
  if (p.text_reminder_number && p.text_reminder_number.trim()) return p.text_reminder_number.trim();
  const qa = (p.questions_and_answers || []).find((q) =>
    /mobile\s*phone\s*number/i.test(q?.question || ""),
  );
  return qa?.answer?.trim() || "";
}

/** First name for greetings: Calendly first_name, else first word of name. */
export function getFirstName(p: Pick<BookingInvitee, "first_name" | "name"> | undefined | null): string {
  const f = p?.first_name?.trim();
  if (f) return f;
  return p?.name?.trim().split(/\s+/)[0] || "";
}

function fmt(date: Date, tz: string | undefined, opts: Intl.DateTimeFormatOptions): string {
  try {
    return new Intl.DateTimeFormat("en-US", { ...opts, timeZone: tz }).format(date);
  } catch {
    return new Intl.DateTimeFormat("en-US", { ...opts, timeZone: "UTC" }).format(date);
  }
}

/** CRM date format 'MM/DD/YYYY hh:mm AM/PM' in America/Toronto (DST-aware). Returns "" for an invalid date. */
export function formatCrmDatetime(d: Date): string {
  if (Number.isNaN(d.getTime())) return "";
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h12",
  }).formatToParts(d);
  const g = (t: string) => parts.find((x) => x.type === t)?.value ?? "";
  return `${g("month")}/${g("day")}/${g("year")} ${g("hour")}:${g("minute")} ${g("dayPeriod").toUpperCase()}`;
}

export function buildBookingSmsPayload(p: BookingInvitee, startTime: string) {
  const d = new Date(startTime);
  const tz = p.timezone;
  const first = getFirstName(p);
  const last = p.last_name?.trim() || (p.first_name ? "" : (p.name?.trim().split(/\s+/).slice(1).join(" ") ?? ""));
  return {
    first_name: first,
    last_name: last,
    name: p.name?.trim() || [first, last].filter(Boolean).join(" "),
    email: p.email || "",
    phone: normalizePhone(getInviteePhone(p)),
    start_time_iso: d.toISOString(),
    start_date_text: fmt(d, tz, { weekday: "long", month: "short", day: "numeric" }),
    start_time_text: fmt(d, tz, { hour: "numeric", minute: "2-digit", timeZoneName: "short" }),
    start_datetime_crm: formatCrmDatetime(d),
    timezone: tz || "UTC",
    join_url: p.scheduled_event?.location?.join_url || "",
    reschedule_url: p.reschedule_url || "",
    cancel_url: p.cancel_url || "",
    event_name: p.scheduled_event?.name || "",
  };
}

/** POST to CRM_BOOKING_SMS_WEBHOOK_URL (no-op if unset). Never throws. */
export async function sendBookingSmsWebhook(p: BookingInvitee, startTime: string): Promise<boolean> {
  const url = process.env.CRM_BOOKING_SMS_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(buildBookingSmsPayload(p, startTime)),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("[calendly] CRM SMS webhook non-2xx:", res.status);
    return res.ok;
  } catch (err) {
    console.error("[calendly] CRM SMS webhook failed:", err);
    return false;
  }
}

export function buildBookingCancelPayload(p: BookingInvitee, now: Date = new Date()) {
  const first = getFirstName(p);
  const last = p.last_name?.trim() || "";
  const canceledRaw = p.cancellation?.created_at || p.updated_at;
  const c = canceledRaw ? new Date(canceledRaw) : now;
  return {
    event: "canceled" as const,
    email: p.email || "",
    phone: normalizePhone(getInviteePhone(p)),
    first_name: first,
    name: p.name?.trim() || [first, last].filter(Boolean).join(" "),
    event_name: p.scheduled_event?.name || "",
    canceled_at: (Number.isNaN(c.getTime()) ? now : c).toISOString(),
  };
}

/** POST to CRM_BOOKING_CANCEL_WEBHOOK_URL (no-op if unset). Never throws; logs no PII/URL. */
export async function sendBookingCancelWebhook(p: BookingInvitee): Promise<boolean> {
  const url = process.env.CRM_BOOKING_CANCEL_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(buildBookingCancelPayload(p)),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("[calendly] CRM cancel webhook non-2xx:", res.status);
    return res.ok;
  } catch (err) {
    console.error("[calendly] CRM cancel webhook failed:", err instanceof Error ? err.name : "error");
    return false;
  }
}
