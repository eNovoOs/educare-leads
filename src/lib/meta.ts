import crypto from "crypto";
import { normalizePhone } from "@/lib/bookingSms";

/**
 * Server-side Meta Conversions API helpers.
 * Env: META_PIXEL_ID, META_CAPI_TOKEN, META_TEST_EVENT_CODE (optional).
 */

export const sha256 = (v: string) =>
  crypto.createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

/** external_id = sha256(lowercased email). The browser pixel sends the same hex value. */
export const externalIdFor = (email: string) => sha256(email);

/** E.164 digits without "+", as Meta expects before hashing (default country 1). */
export function phoneForMeta(raw?: string | null): string {
  return normalizePhone(raw).replace(/^\+/, "");
}

/** Build an fbc value from a raw fbclid (format fb.1.<ms>.<fbclid>). */
export function fbcFromFbclid(fbclid?: string | null, ms = Date.now()): string | undefined {
  return fbclid ? `fb.1.${ms}.${fbclid}` : undefined;
}

export function fbclidFromUrl(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).searchParams.get("fbclid") || undefined;
  } catch {
    return undefined;
  }
}

export type MetaIdentity = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  fbc?: string;
  fbp?: string;
  ip?: string;
  ua?: string;
};

export function buildUserData(i: MetaIdentity): Record<string, unknown> {
  const u: Record<string, unknown> = {};
  if (i.ip) u.client_ip_address = i.ip;
  if (i.ua) u.client_user_agent = i.ua;
  if (i.fbc) u.fbc = i.fbc;
  if (i.fbp) u.fbp = i.fbp;
  if (i.email) {
    u.em = [sha256(i.email)];
    u.external_id = [externalIdFor(i.email)];
  }
  const ph = phoneForMeta(i.phone);
  if (ph) u.ph = [sha256(ph)];
  if (i.firstName) u.fn = [sha256(i.firstName)];
  if (i.lastName) u.ln = [sha256(i.lastName)];
  return u;
}

export type CapiEvent = {
  event_name: string;
  event_id?: string;
  event_time?: number;
  action_source: "website" | "system_generated";
  event_source_url?: string;
  user_data: Record<string, unknown>;
  custom_data?: Record<string, unknown>;
};

/** POST one event to the Conversions API. Returns false if unconfigured or rejected. */
export async function sendCapiEvent(ev: CapiEvent, tag = "meta"): Promise<boolean> {
  const PIXEL = process.env.META_PIXEL_ID;
  const TOKEN = process.env.META_CAPI_TOKEN;
  if (!PIXEL || !TOKEN) return false;
  const payload: Record<string, unknown> = {
    data: [{ event_time: Math.floor(Date.now() / 1000), ...ev }],
  };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${PIXEL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, access_token: TOKEN }),
    });
    if (!res.ok) {
      console.error(`[${tag}] Meta CAPI error:`, res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[${tag}] Meta CAPI send failed:`, err);
    return false;
  }
}

/**
 * Click/browser context carried from /api/lead to the Calendly webhook without
 * new storage: base64url JSON in Calendly's `salesforce_uuid` tracking param,
 * which Calendly echoes back in payload.tracking.salesforce_uuid.
 */
export type TrackingContext = { fbc?: string; fbp?: string; ip?: string; ua?: string };
const TOKEN_PREFIX = "m1.";
const TOKEN_MAX = 900;

export function encodeTrackingToken(ctx: TrackingContext): string | undefined {
  const tries: TrackingContext[] = [
    ctx,
    { ...ctx, ua: ctx.ua?.slice(0, 300) },
    { fbc: ctx.fbc, fbp: ctx.fbp, ip: ctx.ip },
    { fbc: ctx.fbc, fbp: ctx.fbp },
  ];
  for (const t of tries) {
    const clean = Object.fromEntries(Object.entries(t).filter(([, v]) => v));
    if (!Object.keys(clean).length) return undefined;
    const s = TOKEN_PREFIX + Buffer.from(JSON.stringify(clean)).toString("base64url");
    if (s.length <= TOKEN_MAX) return s;
  }
  return undefined;
}

export function decodeTrackingToken(token?: string | null): TrackingContext {
  if (!token || !token.startsWith(TOKEN_PREFIX)) return {};
  try {
    const o = JSON.parse(Buffer.from(token.slice(TOKEN_PREFIX.length), "base64url").toString("utf8"));
    const pick = (k: string) => (typeof o?.[k] === "string" ? (o[k] as string).slice(0, 500) : undefined);
    return { fbc: pick("fbc"), fbp: pick("fbp"), ip: pick("ip"), ua: pick("ua") };
  } catch {
    return {};
  }
}

export function getCookie(cookieHeader: string | null, name: string): string | undefined {
  if (!cookieHeader) return undefined;
  const m = cookieHeader.match(new RegExp("(?:^|; )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[1]) : undefined;
}
