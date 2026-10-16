import crypto from "crypto";
import { site } from "@/lib/site";

/** UTM keys Calendly understands and passes through to the booking record. */
export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/** Pull utm_* params out of a URL string (e.g. the form's sourceUrl). */
export function utmFromUrl(url: string | undefined): Utm {
  if (!url) return {};
  try {
    const p = new URL(url).searchParams;
    const out: Utm = {};
    for (const k of UTM_KEYS) {
      const v = p.get(k);
      if (v) out[k] = v.slice(0, 200);
    }
    return out;
  } catch {
    return {};
  }
}

/**
 * Calendly link prefilled with the lead's details.
 * name + email are standard prefill params; a1 is the first custom question
 * (phone) on the event type. UTMs are passed through to the booking.
 */
export function buildCalendlyUrl(opts: {
  name?: string;
  email?: string;
  phone?: string;
  utm?: Utm;
}): string {
  const url = new URL(site.calendlyUrl);
  if (opts.name) url.searchParams.set("name", opts.name);
  if (opts.email) url.searchParams.set("email", opts.email);
  // a1 = first custom question on the event type. CALENDLY_PHONE_PARAM can
  // change it (e.g. "a2"), or be set to an empty string to disable phone prefill.
  const phoneParam = process.env.CALENDLY_PHONE_PARAM ?? "a1";
  if (opts.phone && phoneParam) url.searchParams.set(phoneParam, opts.phone);
  for (const [k, v] of Object.entries(opts.utm ?? {})) {
    if (v) url.searchParams.set(k, v);
  }
  return url.toString();
}

/**
 * Verify the `Calendly-Webhook-Signature` header: "t=<unix ts>,v1=<hex hmac>"
 * where hmac = HMAC-SHA256(signingKey, `${t}.${rawBody}`).
 */
export function verifyCalendlySignature(
  rawBody: string,
  header: string | null,
  signingKey: string,
  toleranceSeconds = 180,
): boolean {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((p) => {
      const i = p.indexOf("=");
      return [p.slice(0, i).trim(), p.slice(i + 1).trim()];
    }),
  );
  const t = parts["t"];
  const v1 = parts["v1"];
  if (!t || !v1) return false;
  const ts = Number(t);
  if (!Number.isFinite(ts)) return false;
  if (Math.abs(Date.now() / 1000 - ts) > toleranceSeconds) return false;
  const expected = crypto
    .createHmac("sha256", signingKey)
    .update(`${t}.${rawBody}`)
    .digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(v1, "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
