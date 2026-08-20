import { NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";

/**
 * Lead intake endpoint.
 *
 * On every submission it:
 *   1. Emails the lead to info@educareleads.com (via Resend),
 *   2. Sends a server-side "Lead" event to the Meta Conversions API
 *      (deduplicated with the browser pixel via a shared event_id), and
 *   3. Forwards it to the eNovo CRM webhook (if configured).
 * Nothing is dropped — if nothing is configured, the lead is logged server-side.
 *
 * Environment variables (set in .env.local / Vercel project settings):
 *   RESEND_API_KEY       - Resend API key (enables the email notification)
 *   LEAD_TO_EMAIL        - where leads are sent; comma-separated for several
 *                          recipients (default: info@educareleads.com)
 *   LEAD_FROM_EMAIL      - verified sender (default: onboarding@resend.dev)
 *   META_PIXEL_ID        - Meta pixel / dataset id (enables Conversions API)
 *   META_CAPI_TOKEN      - Meta Conversions API access token
 *   META_TEST_EVENT_CODE - optional, to see events in Events Manager > Test Events
 *   ENOVO_WEBHOOK_URL    - optional eNovo inbound webhook
 *   ENOVO_API_KEY        - optional eNovo bearer token
 */

type LeadPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  business?: string;
  type?: string;
  city?: string;
  locations?: string;
  revenue?: string;
  goal?: string;
  source?: string;
  eventId?: string;
  sourceUrl?: string;
  /** When true, the Meta CAPI "Lead" event is skipped (capture still happens). */
  skipMetaLead?: boolean;
};

/** Accepts a single address or a comma-separated list. */
function recipients(value: string | undefined, fallback: string): string[] {
  return (value || fallback)
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
}

const TO_EMAIL = recipients(
  process.env.LEAD_TO_EMAIL,
  "info@educareleads.com, andre@revupcmo.com"
);
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "Educare Leads <onboarding@resend.dev>";

function leadRows(lead: Record<string, unknown>) {
  const labels: Record<string, string> = {
    fullName: "Name",
    email: "Email",
    phone: "Phone",
    business: "Program / business",
    type: "Program type",
    city: "City / market",
    locations: "Locations",
    revenue: "Monthly revenue",
    goal: "#1 enrollment goal",
    source: "Source",
    submittedAt: "Submitted",
  };
  return Object.entries(labels)
    .filter(([k]) => lead[k])
    .map(([k, label]) => `<tr><td style="padding:6px 12px;color:#5b6b80">${label}</td><td style="padding:6px 12px;font-weight:600;color:#0b2447">${String(lead[k])}</td></tr>`)
    .join("");
}

const sha256 = (v: string) => crypto.createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

function getCookie(cookieHeader: string | null, name: string): string | undefined {
  if (!cookieHeader) return undefined;
  const m = cookieHeader.match(new RegExp("(?:^|; )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[1]) : undefined;
}

async function sendMetaCapi(req: Request, lead: LeadPayload & { firstName?: string; lastName?: string }) {
  const PIXEL = process.env.META_PIXEL_ID;
  const TOKEN = process.env.META_CAPI_TOKEN;
  if (!PIXEL || !TOKEN) return false;

  const cookieHeader = req.headers.get("cookie");
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || undefined;
  const ua = req.headers.get("user-agent") || undefined;

  const userData: Record<string, unknown> = {
    client_ip_address: ip,
    client_user_agent: ua,
    fbp: getCookie(cookieHeader, "_fbp"),
    fbc: getCookie(cookieHeader, "_fbc"),
  };
  if (lead.email) userData.em = [sha256(lead.email)];
  if (lead.phone) userData.ph = [sha256(lead.phone.replace(/[^0-9]/g, ""))];
  if (lead.firstName) userData.fn = [sha256(lead.firstName)];
  if (lead.lastName) userData.ln = [sha256(lead.lastName)];

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: lead.eventId,
        action_source: "website",
        event_source_url: lead.sourceUrl,
        user_data: userData,
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL}/events?access_token=${TOKEN}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
    );
    if (!res.ok) {
      console.error("[lead] Meta CAPI error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[lead] Meta CAPI send failed:", err);
    return false;
  }
}

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Minimal validation.
  if (!body.email || !body.firstName || !body.phone) {
    return NextResponse.json(
      { error: "Missing required fields (name, email, phone)." },
      { status: 422 }
    );
  }

  const lead = {
    ...body,
    fullName: [body.firstName, body.lastName].filter(Boolean).join(" "),
    submittedAt: new Date().toISOString(),
    source: body.source ?? "website",
  };

  // 1) Email the lead to info@educareleads.com.
  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        replyTo: body.email,
        subject: `New lead: ${lead.fullName}${lead.business ? " — " + lead.business : ""}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px">
            <h2 style="color:#0b2447;margin:0 0 4px">New enrollment lead</h2>
            <p style="color:#5b6b80;margin:0 0 16px">Source: ${lead.source}</p>
            <table style="border-collapse:collapse;width:100%;background:#f4f7fb;border-radius:8px">
              ${leadRows(lead)}
            </table>
          </div>`,
      });
      if (error) console.error("[lead] Resend error:", error);
      else emailed = true;
    } catch (err) {
      console.error("[lead] Email send failed:", err);
    }
  } else {
    console.log("[lead] (RESEND_API_KEY not set) New lead:", lead);
  }

  // 2) Server-side Meta Conversions API "Lead" event (deduped with the browser pixel).
  //    Skipped when the form opts out (e.g. the CRM trial funnel) — capture still happens.
  const tracked = body.skipMetaLead ? false : await sendMetaCapi(req, body);

  // 3) Forward to eNovo CRM, if configured.
  let forwarded = false;
  const webhook = process.env.ENOVO_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.ENOVO_API_KEY
            ? { Authorization: `Bearer ${process.env.ENOVO_API_KEY}` }
            : {}),
        },
        body: JSON.stringify(lead),
      });
      forwarded = res.ok;
      if (!res.ok) console.error("[lead] eNovo rejected lead:", res.status);
    } catch (err) {
      console.error("[lead] Failed to reach eNovo:", err);
    }
  }

  // Never drop a lead — log if nothing handled it.
  if (!emailed && !forwarded) {
    console.log("[lead] Recoverable lead payload:", lead);
  }

  return NextResponse.json({ ok: true, emailed, tracked, forwarded });
}
