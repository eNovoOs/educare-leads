import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * New-client onboarding intake endpoint.
 *
 * Emails the full onboarding submission to the team (via Resend), grouped into
 * the same sections as the form so it's easy to action. Falls back to a
 * server-side log if Resend isn't configured, so a submission is never dropped.
 *
 * Environment variables:
 *   RESEND_API_KEY        - Resend API key (enables the email)
 *   ONBOARDING_TO_EMAIL   - where onboarding goes; comma-separated for several
 *                           recipients (default: LEAD_TO_EMAIL or info@educareleads.com)
 *   LEAD_FROM_EMAIL       - verified sender (default: onboarding@resend.dev)
 */

/** Accepts a single address or a comma-separated list. */
const TO_EMAIL = (
  process.env.ONBOARDING_TO_EMAIL ||
  process.env.LEAD_TO_EMAIL ||
  "info@educareleads.com, andre@revupcmo.com"
)
  .split(",")
  .map((a) => a.trim())
  .filter(Boolean);
const FROM_EMAIL =
  process.env.LEAD_FROM_EMAIL || "Educare Leads <onboarding@resend.dev>";

// Field key -> human label, grouped by section (mirrors the form).
const SECTIONS: { title: string; fields: [string, string][] }[] = [
  {
    title: "1 · Business",
    fields: [
      ["businessName", "Business / program name"],
      ["legalName", "Legal entity name"],
      ["contactName", "Contact name"],
      ["role", "Role"],
      ["email", "Email"],
      ["phone", "Mobile phone"],
      ["address", "Business address"],
      ["locations", "Locations"],
      ["yearsOperating", "Years operating"],
      ["licenseNumber", "License #"],
    ],
  },
  {
    title: "2 · Program",
    fields: [
      ["services", "Programs / services"],
      ["hours", "Hours"],
      ["capacity", "Capacity"],
      ["openSpots", "Open spots"],
      ["tuition", "Tuition / pricing"],
      ["serviceArea", "Service area"],
      ["usp", "What makes them different"],
      ["languages", "Languages spoken"],
    ],
  },
  {
    title: "3 · Brand & content",
    fields: [
      ["currentWebsite", "Current website"],
      ["tagline", "Tagline"],
      ["hasLogo", "Has logo?"],
      ["brandColors", "Brand colors"],
      ["hasPhotos", "Has photos/videos?"],
      ["assetsLink", "Assets link"],
      ["testimonials", "Testimonials"],
    ],
  },
  {
    title: "4 · Offer & goals",
    fields: [
      ["enrollmentGoal", "90-day enrollment goal"],
      ["currentPromo", "Current promotion"],
      ["idealFamily", "Ideal family"],
      ["objections", "#1 objection"],
      ["competitors", "Competitors"],
    ],
  },
  {
    title: "5 · Marketing & ad accounts",
    fields: [
      ["facebookPage", "Facebook Page"],
      ["instagram", "Instagram"],
      ["hasBusinessManager", "Has Business Manager?"],
      ["adAccountId", "Ad Account ID"],
      ["runningAds", "Currently running ads?"],
      ["adBudget", "Monthly ad budget"],
      ["canGrantMeta", "Can grant Meta access?"],
    ],
  },
  {
    title: "6 · Phone & comms (Twilio?)",
    fields: [
      ["businessPhone", "Business phone"],
      ["phoneType", "Phone type"],
      ["canText", "Can text on it?"],
      ["wantsTrackingNumber", "Wants tracking/AI number?"],
      ["forwardTo", "Forward calls to"],
      ["currentCrm", "Current CRM / booking tool"],
    ],
  },
  {
    title: "7 · Domain & website",
    fields: [
      ["hasDomain", "Owns a domain?"],
      ["domainName", "Domain name"],
      ["domainRegistrar", "Registrar"],
      ["desiredDomain", "Desired new domain"],
      ["canGrantDomain", "Can grant domain access?"],
      ["googleBusiness", "Google Business Profile"],
    ],
  },
  {
    title: "8 · Notes",
    fields: [
      ["notes", "Notes"],
      ["consent", "Authorization"],
    ],
  },
];

function renderHtml(data: Record<string, string>): string {
  const sections = SECTIONS.map((section) => {
    const rows = section.fields
      .filter(([k]) => data[k])
      .map(
        ([k, lbl]) =>
          `<tr><td style="padding:6px 12px;color:#5b6b80;width:42%;vertical-align:top">${lbl}</td><td style="padding:6px 12px;font-weight:600;color:#0b2447;white-space:pre-wrap">${escapeHtml(
            data[k]
          )}</td></tr>`
      )
      .join("");
    if (!rows) return "";
    return `
      <h3 style="margin:22px 0 6px;color:#1547a8;font-size:14px">${section.title}</h3>
      <table style="border-collapse:collapse;width:100%;background:#f4f7fb;border-radius:8px">${rows}</table>`;
  }).join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto">
      <h2 style="color:#0b2447;margin:0 0 2px">New client onboarding</h2>
      <p style="color:#5b6b80;margin:0 0 8px">${escapeHtml(
        data.businessName || "Unknown business"
      )} — submitted ${new Date().toLocaleString("en-US")}</p>
      ${sections}
    </div>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "client"
  );
}

/**
 * Builds the team-facing setup checklist from the answers — surfaces the
 * decisions that drive work: Twilio number, domain, logo design, Meta access.
 */
function setupChecklist(d: Record<string, string>): string {
  const items: string[] = [];

  const needsNumber =
    /^yes/i.test(d.wantsTrackingNumber || "") ||
    /landline|don't|dont|none/i.test(d.phoneType || "") ||
    /^no/i.test(d.canText || "");
  items.push(
    needsNumber
      ? "- [ ] **Provision a Twilio / tracking number** (they want one, or their line can't text)"
      : "- [x] No new phone number needed — using their existing textable number"
  );

  if (/register/i.test(d.hasDomain || "") || (!d.domainName && !/^yes/i.test(d.hasDomain || ""))) {
    items.push(`- [ ] **Register a new domain**${d.desiredDomain ? ` — preferred: \`${d.desiredDomain}\`` : ""}`);
  } else {
    items.push(
      `- [ ] **Get DNS access** to \`${d.domainName || "their domain"}\`${
        d.domainRegistrar ? ` at ${d.domainRegistrar}` : ""
      } (${d.canGrantDomain || "access TBD"})`
    );
  }

  if (/no|needs/i.test(d.hasLogo || "")) items.push("- [ ] **Design a logo** (they don't have a usable one)");
  else if (/low quality/i.test(d.hasLogo || "")) items.push("- [ ] **Recreate / clean up logo** (low quality only)");

  if (/none|few|low/i.test(d.hasPhotos || "")) items.push("- [ ] **Source / shoot photos** (limited assets)");
  if (!d.assetsLink) items.push("- [ ] **Request asset folder** (logo, photos, videos)");

  items.push(
    `- [ ] **Get Meta partner access** — Business Manager: ${d.hasBusinessManager || "unknown"}, can grant: ${
      d.canGrantMeta || "TBD"
    }`
  );
  if (!d.facebookPage) items.push("- [ ] **Create / locate Facebook Page**");

  return items.join("\n");
}

/** The deliverable: a Markdown brand brief to build the website & creatives from. */
function brandBrief(d: Record<string, string>): string {
  const v = (k: string, fallback = "_Not provided_") => (d[k] ? d[k] : fallback);
  const list = (k: string) =>
    d[k]
      ? d[k]
          .split(", ")
          .map((x) => `- ${x}`)
          .join("\n")
      : "_Not provided_";

  return `# Brand Brief — ${v("businessName")}

> Generated from the EduCare Leads onboarding intake on ${new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}. Use this to build the website, ad creatives, and offer.

## Snapshot

| | |
|---|---|
| **Business** | ${v("businessName")} |
| **Legal entity** | ${v("legalName")} |
| **Owner / contact** | ${v("contactName")}${d.role ? ` (${d.role})` : ""} |
| **Email** | ${v("email")} |
| **Phone** | ${v("phone")} |
| **Address** | ${v("address")} |
| **Locations** | ${v("locations")} |
| **Years operating** | ${v("yearsOperating")} |
| **License #** | ${v("licenseNumber")} |

## Positioning & Offer

- **Ideal family:** ${v("idealFamily")}
- **Why parents choose them (USP):** ${v("usp")}
- **#1 objection to overcome:** ${v("objections")}
- **Current promotion:** ${v("currentPromo")}
- **90-day enrollment goal:** ${v("enrollmentGoal")}
- **Competitors:** ${v("competitors")}

## Programs & Services

${list("services")}

| | |
|---|---|
| **Hours** | ${v("hours")} |
| **Capacity** | ${v("capacity")} |
| **Open spots** | ${v("openSpots")} |
| **Tuition / pricing** | ${v("tuition")} |
| **Service area** | ${v("serviceArea")} |
| **Languages spoken** | ${v("languages")} |

## Brand & Content (website + creatives)

- **Logo:** ${v("hasLogo")}
- **Brand colors:** ${v("brandColors")}
- **Tagline:** ${v("tagline")}
- **Photos / videos:** ${v("hasPhotos")}
- **Assets link:** ${v("assetsLink")}
- **Current website:** ${v("currentWebsite")}

### Testimonials / social proof

${v("testimonials")}

## Website & Domain

- **Owns a domain:** ${v("hasDomain")}
- **Domain:** ${v("domainName")}
- **Registrar:** ${v("domainRegistrar")}
- **Desired new domain:** ${v("desiredDomain")}
- **Can grant DNS access:** ${v("canGrantDomain")}
- **Google Business Profile:** ${v("googleBusiness")}

## Ads & Accounts

- **Facebook Page:** ${v("facebookPage")}
- **Instagram:** ${v("instagram")}
- **Meta Business Manager:** ${v("hasBusinessManager")}
- **Ad Account ID:** ${v("adAccountId")}
- **Currently running ads:** ${v("runningAds")}
- **Monthly ad budget:** ${v("adBudget")}
- **Can grant Meta access:** ${v("canGrantMeta")}

## Phone & Automation

- **Business phone:** ${v("businessPhone")} (${v("phoneType", "type unknown")})
- **Can text on it:** ${v("canText")}
- **Wants tracking / AI number:** ${v("wantsTrackingNumber")}
- **Forward calls to:** ${v("forwardTo")}
- **Current CRM / booking tool:** ${v("currentCrm")}

## Setup Checklist

${setupChecklist(d)}

## Notes

${v("notes")}
`;
}

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.businessName || !body.contactName || !body.email || !body.phone) {
    return NextResponse.json(
      { error: "Missing required fields (business name, contact, email, phone)." },
      { status: 422 }
    );
  }

  // The deliverable: a Markdown brand brief to build the website & creatives from.
  const brief = brandBrief(body);
  const briefFilename = `${slugify(body.businessName)}-brand-brief.md`;

  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        replyTo: body.email,
        subject: `Onboarding: ${body.businessName}`,
        html: renderHtml(body),
        attachments: [
          { filename: briefFilename, content: Buffer.from(brief).toString("base64") },
        ],
      });
      if (error) console.error("[onboarding] Resend error:", error);
      else emailed = true;
    } catch (err) {
      console.error("[onboarding] Email send failed:", err);
    }
  } else {
    console.log("[onboarding] (RESEND_API_KEY not set) Submission:", body);
    console.log(`[onboarding] Brand brief (${briefFilename}):\n${brief}`);
  }

  if (!emailed) {
    // Never drop an onboarding submission.
    console.log("[onboarding] Recoverable submission payload:", body);
  }

  // Brief is delivered to the team via email — not returned to the form filler.
  return NextResponse.json({ ok: true, emailed });
}
