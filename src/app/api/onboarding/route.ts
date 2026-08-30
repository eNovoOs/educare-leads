import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ACCESS_INVITE_EMAIL, onboardingServices, serviceName } from "@/lib/onboarding";

const TO_EMAIL = (
  process.env.ONBOARDING_TO_EMAIL ||
  process.env.LEAD_TO_EMAIL ||
  "info@educareleads.com, andre@revupcmo.com"
)
  .split(",")
  .map((address) => address.trim())
  .filter(Boolean);

const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "Educare Leads <onboarding@resend.dev>";

const SECTIONS: { title: string; fields: [string, string][] }[] = [
  {
    title: "Project setup",
    fields: [
      ["setupPresetName", "Package preset"],
      ["setupModules", "Services included"],
      ["sourceUrl", "Onboarding link"],
    ],
  },
  {
    title: "Business",
    fields: [
      ["businessName", "Business or program"],
      ["legalName", "Legal entity"],
      ["contactName", "Primary contact"],
      ["role", "Role"],
      ["email", "Email"],
      ["phone", "Mobile phone"],
      ["address", "Primary address"],
      ["locations", "Number of locations"],
      ["yearsOperating", "Years operating"],
    ],
  },
  {
    title: "Programs and goals",
    fields: [
      ["programs", "Programs"],
      ["hours", "Hours"],
      ["capacity", "Capacity"],
      ["openSpots", "Current openings"],
      ["enrollmentGoal", "90-day enrollment goal"],
      ["serviceArea", "Service area"],
      ["languages", "Languages"],
      ["usp", "Why families choose them"],
      ["idealFamily", "Ideal family"],
      ["currentPromo", "Current enrollment offer"],
      ["objections", "Most common concern"],
    ],
  },
  {
    title: "Brand and assets",
    fields: [
      ["assetsLink", "Asset folder"],
      ["hasLogo", "Logo status"],
      ["hasPhotos", "Photo and video status"],
      ["mediaConsent", "Media approval"],
      ["brandColors", "Brand colors"],
      ["tagline", "Tagline"],
      ["testimonials", "Reviews and testimonials"],
      ["brandNotes", "Brand rules"],
    ],
  },
  {
    title: "Account access",
    fields: [
      ["metaAccessStatus", "Meta access"],
      ["googleAdsAccessStatus", "Google Ads access"],
      ["analyticsAccessStatus", "Google Analytics access"],
      ["tagManagerAccessStatus", "Google Tag Manager access"],
      ["googleBusinessAccessStatus", "Google Business access"],
      ["domainAccessStatus", "Domain access"],
    ],
  },
  {
    title: "Advertising",
    fields: [
      ["runningAds", "Ads currently running"],
      ["primaryCampaignGoal", "Primary campaign goal"],
      ["facebookPage", "Facebook Page"],
      ["instagram", "Instagram"],
      ["googleAdsCustomerId", "Google Ads Customer ID"],
      ["pastCampaignNotes", "Past campaign notes"],
      ["seasonalCampaignName", "Seasonal campaign"],
      ["seasonalCampaignDeadline", "Launch or registration date"],
      ["seasonalAvailability", "Seasonal availability"],
      ["seasonalOffer", "Seasonal call-to-action"],
      ["conversionActions", "Conversion actions"],
    ],
  },
  {
    title: "Website and domain",
    fields: [
      ["currentWebsite", "Current website"],
      ["domainName", "Domain"],
      ["domainRegistrar", "Domain provider"],
      ["websitePlatform", "Website platform"],
      ["hostingProvider", "Hosting provider"],
      ["desiredPages", "Required pages and information"],
      ["websiteExamples", "Website examples"],
      ["requestedWebsiteUpdates", "Priority website updates"],
    ],
  },
  {
    title: "CRM and follow-up",
    fields: [
      ["currentCrm", "Current CRM"],
      ["calendarLink", "Booking calendar"],
      ["tourContact", "Tour booking contact"],
      ["leadSources", "Lead sources"],
      ["followUpProcess", "Current follow-up process"],
      ["emailPlatform", "Email platform"],
      ["emailListSize", "Email list size"],
      ["emailGoals", "Email goals"],
      ["emailApprover", "Email approver"],
      ["automationGoals", "Advanced automation goals"],
    ],
  },
  {
    title: "Conversion and admissions",
    fields: [
      ["currentInquiryVolume", "Monthly inquiry volume"],
      ["leadToTourRate", "Lead-to-tour rate"],
      ["tourToEnrollmentRate", "Tour-to-enrollment rate"],
      ["admissionsScriptsLink", "Admissions scripts"],
      ["conversionBottleneck", "Conversion bottleneck"],
    ],
  },
  {
    title: "Google Business and reviews",
    fields: [
      ["googleBusiness", "Business Profile"],
      ["googleBusinessStatus", "Profile status"],
      ["reviewLink", "Review page"],
      ["reviewContact", "Review alert contact"],
      ["reviewProcess", "Current review process"],
      ["localSearchPriorities", "Local search priorities"],
    ],
  },
  {
    title: "Creative, branding, and proof",
    fields: [
      ["creativePriority", "Creative priority"],
      ["creativeApprover", "Creative approver"],
      ["proofOutcomes", "Proof outcomes"],
      ["brandRefreshGoals", "Brand refresh goals"],
      ["shootAvailability", "Shoot details"],
    ],
  },
  {
    title: "AI reception and multi-location",
    fields: [
      ["businessPhone", "Main business phone"],
      ["forwardTo", "Live call destination"],
      ["missedCalls", "Missed call frequency"],
      ["canText", "Current number can text"],
      ["commonQuestions", "Common family questions"],
      ["aiEscalationRules", "AI escalation rules"],
      ["pastLeadCount", "Past lead count"],
      ["pastLeadSource", "Past lead source"],
      ["reactivationWindow", "Reactivation audience"],
      ["reactivationOffer", "Reactivation reason"],
      ["locationDetails", "Location details"],
      ["routingRules", "Lead routing rules"],
    ],
  },
  {
    title: "Fractional CMO leadership",
    fields: [
      ["leadershipTeam", "Leadership team"],
      ["decisionMaker", "Marketing decision-maker"],
      ["meetingCadence", "Meeting rhythm"],
      ["currentVendors", "Current vendors"],
      ["marketingPriorities", "90-day marketing priorities"],
      ["approvalProcess", "Approval process"],
    ],
  },
  {
    title: "Final notes",
    fields: [
      ["notes", "Notes"],
      ["consent", "Authorization"],
    ],
  },
];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function selectedServiceNames(data: Record<string, string>) {
  return (data.setupModules || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
    .map(serviceName);
}

function renderHtml(data: Record<string, string>) {
  const sections = SECTIONS.map((section) => {
    const rows = section.fields
      .filter(([key]) => data[key])
      .map(([key, label]) => {
        const value = key === "setupModules" ? selectedServiceNames(data).join(", ") : data[key];
        return `<tr>
          <td style="padding:7px 12px;color:#5b6b80;width:38%;vertical-align:top">${escapeHtml(label)}</td>
          <td style="padding:7px 12px;font-weight:600;color:#0b2447;white-space:pre-wrap">${escapeHtml(value)}</td>
        </tr>`;
      })
      .join("");

    if (!rows) return "";
    return `
      <h3 style="margin:22px 0 6px;color:#1547a8;font-size:14px">${escapeHtml(section.title)}</h3>
      <table style="border-collapse:collapse;width:100%;background:#f4f7fb;border-radius:8px">${rows}</table>`;
  }).join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto">
      <h2 style="color:#0b2447;margin:0 0 4px">Client onboarding submitted</h2>
      <p style="color:#5b6b80;margin:0 0 8px">${escapeHtml(
        data.businessName || "Unknown business"
      )} - submitted ${new Date().toLocaleString("en-US")}</p>
      ${sections}
    </div>`;
}

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "client"
  );
}

function accessTask(label: string, status: string) {
  if (/invitation sent/i.test(status)) {
    return `- [ ] **Accept ${label} invitation** sent to \`${ACCESS_INVITE_EMAIL}\``;
  }
  if (/help/i.test(status)) {
    return `- [ ] **Help client grant ${label} access** (help requested)`;
  }
  if (/do not have/i.test(status)) {
    return `- [ ] **Create or recover ${label} account** (client does not have one)`;
  }
  return `- [ ] **Request ${label} access** using \`${ACCESS_INVITE_EMAIL}\``;
}

function includesServiceCategory(services: Set<string>, category: string) {
  return onboardingServices.some(
    (service) => service.category === category && services.has(service.id)
  );
}

function setupChecklist(data: Record<string, string>) {
  const services = new Set((data.setupModules || "").split(",").map((item) => item.trim()));
  const items: string[] = [];

  items.push(
    data.assetsLink
      ? `- [ ] **Review asset folder:** ${data.assetsLink}`
      : "- [ ] **Request asset folder** with logo, photos, video, testimonials, and brand materials"
  );

  if (services.has("meta-ads") || services.has("seasonal-campaign")) {
    items.push(accessTask("Meta", data.metaAccessStatus || ""));
  }
  if (
    services.has("google-ads-review") ||
    services.has("google-ads-management") ||
    services.has("google-conversion-tracking")
  ) {
    items.push(accessTask("Google Ads", data.googleAdsAccessStatus || ""));
  }
  if (
    includesServiceCategory(services, "website") ||
    includesServiceCategory(services, "paid-ads") ||
    includesServiceCategory(services, "cro")
  ) {
    items.push(accessTask("Google Analytics", data.analyticsAccessStatus || ""));
  }
  if (services.has("google-conversion-tracking")) {
    items.push(accessTask("Google Tag Manager", data.tagManagerAccessStatus || ""));
  }
  if (includesServiceCategory(services, "local")) {
    items.push(accessTask("Google Business Profile", data.googleBusinessAccessStatus || ""));
  }

  if (includesServiceCategory(services, "website")) {
    if (/do not have a domain/i.test(data.domainAccessStatus || "")) {
      items.push("- [ ] **Select and register a domain**");
    } else if (/help|not sure/i.test(data.domainAccessStatus || "")) {
      items.push("- [ ] **Help client provide domain or DNS access**");
    } else {
      items.push(`- [ ] **Confirm domain access**${data.domainName ? ` for \`${data.domainName}\`` : ""}`);
    }
  }

  if (includesServiceCategory(services, "crm")) {
    items.push("- [ ] **Build lead pipeline, follow-up, and tour routing** from the CRM answers");
  }
  if (includesServiceCategory(services, "cro")) {
    items.push("- [ ] **Prepare conversion and admissions review** with prioritized recommendations");
  }
  if (includesServiceCategory(services, "local")) {
    items.push("- [ ] **Prepare local profile, review, and reputation workplan**");
  }
  if (includesServiceCategory(services, "creative")) {
    items.push("- [ ] **Prepare creative, brand, and proof deliverable list**");
  }
  if (includesServiceCategory(services, "ai")) {
    items.push("- [ ] **Prepare AI, routing, FAQ, or reactivation configuration**");
  }
  if (services.has("multi-location")) {
    items.push("- [ ] **Build location matrix and routing rules**");
  }
  if (services.has("fractional-cmo")) {
    items.push("- [ ] **Schedule leadership kickoff and create the 90-day marketing priority plan**");
  }
  if (/low-quality|need a logo/i.test(data.hasLogo || "")) {
    items.push("- [ ] **Prepare or recreate the logo**");
  }
  if (/few|need new/i.test(data.hasPhotos || "")) {
    items.push("- [ ] **Plan additional photo or creative sourcing**");
  }

  return items.join("\n");
}

function buildBrief(data: Record<string, string>) {
  const value = (key: string, fallback = "_Not provided_") => data[key] || fallback;
  const services = selectedServiceNames(data);

  return `# Client Build Brief - ${value("businessName")}

> Generated from EduCare Leads onboarding on ${new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}. This brief contains delivery inputs only; contract pricing remains outside onboarding.

## Services Included

**Package preset:** ${value("setupPresetName", "Custom setup")}

${services.length ? services.map((service) => `- ${service}`).join("\n") : "_Not provided_"}

## Business Snapshot

| | |
|---|---|
| **Business** | ${value("businessName")} |
| **Legal entity** | ${value("legalName")} |
| **Primary contact** | ${value("contactName")}${data.role ? ` (${data.role})` : ""} |
| **Email** | ${value("email")} |
| **Phone** | ${value("phone")} |
| **Address** | ${value("address")} |
| **Locations** | ${value("locations")} |
| **Years operating** | ${value("yearsOperating")} |

## Enrollment Priorities

- **Programs:** ${value("programs")}
- **Current openings:** ${value("openSpots")}
- **90-day goal:** ${value("enrollmentGoal")}
- **Service area:** ${value("serviceArea")}
- **Ideal family:** ${value("idealFamily")}
- **Why families choose them:** ${value("usp")}
- **Current offer:** ${value("currentPromo")}
- **Most common concern:** ${value("objections")}

## Brand and Assets

- **Asset folder:** ${value("assetsLink")}
- **Logo:** ${value("hasLogo")}
- **Photos and videos:** ${value("hasPhotos")}
- **Media approval:** ${value("mediaConsent")}
- **Brand colors:** ${value("brandColors")}
- **Tagline:** ${value("tagline")}
- **Brand rules:** ${value("brandNotes")}
- **Testimonials:** ${value("testimonials")}

## Account Access Status

| Account | Status |
|---|---|
| Meta | ${value("metaAccessStatus")} |
| Google Ads | ${value("googleAdsAccessStatus")} |
| Google Analytics | ${value("analyticsAccessStatus")} |
| Google Tag Manager | ${value("tagManagerAccessStatus")} |
| Google Business Profile | ${value("googleBusinessAccessStatus")} |
| Domain | ${value("domainAccessStatus")} |

All direct account invitations should be sent to \`${ACCESS_INVITE_EMAIL}\`.

## Advertising Setup

- **Currently running ads:** ${value("runningAds")}
- **Primary campaign goal:** ${value("primaryCampaignGoal")}
- **Facebook Page:** ${value("facebookPage")}
- **Instagram:** ${value("instagram")}
- **Google Ads Customer ID:** ${value("googleAdsCustomerId")}
- **Past campaign notes:** ${value("pastCampaignNotes")}
- **Seasonal campaign:** ${value("seasonalCampaignName")}
- **Seasonal deadline:** ${value("seasonalCampaignDeadline")}
- **Seasonal availability:** ${value("seasonalAvailability")}
- **Conversion actions:** ${value("conversionActions")}

## Website and Domain

- **Current website:** ${value("currentWebsite")}
- **Domain:** ${value("domainName")}
- **Domain provider:** ${value("domainRegistrar")}
- **Website platform:** ${value("websitePlatform")}
- **Hosting provider:** ${value("hostingProvider")}
- **Required pages:** ${value("desiredPages")}
- **Website examples:** ${value("websiteExamples")}
- **Priority updates:** ${value("requestedWebsiteUpdates")}

## CRM and Follow-Up

- **Current CRM:** ${value("currentCrm")}
- **Booking calendar:** ${value("calendarLink")}
- **Tour contact:** ${value("tourContact")}
- **Lead sources:** ${value("leadSources")}
- **Current process:** ${value("followUpProcess")}
- **Email platform and list:** ${value("emailPlatform")} / ${value("emailListSize")}
- **Email goals:** ${value("emailGoals")}
- **Advanced automation goals:** ${value("automationGoals")}

## Conversion and Admissions

- **Monthly inquiries:** ${value("currentInquiryVolume")}
- **Lead-to-tour rate:** ${value("leadToTourRate")}
- **Tour-to-enrollment rate:** ${value("tourToEnrollmentRate")}
- **Current scripts:** ${value("admissionsScriptsLink")}
- **Likely bottleneck:** ${value("conversionBottleneck")}

## Creative, Brand, and Proof

- **Creative priority:** ${value("creativePriority")}
- **Creative approver:** ${value("creativeApprover")}
- **Proof outcomes:** ${value("proofOutcomes")}
- **Brand refresh goals:** ${value("brandRefreshGoals")}
- **Shoot details:** ${value("shootAvailability")}

## Local, AI, and Routing

- **Google Business Profile:** ${value("googleBusiness")} (${value("googleBusinessStatus", "status not provided")})
- **Review page:** ${value("reviewLink")}
- **Review process:** ${value("reviewProcess")}
- **Local search priorities:** ${value("localSearchPriorities")}
- **Business phone:** ${value("businessPhone")}
- **Live call destination:** ${value("forwardTo")}
- **Missed calls:** ${value("missedCalls")}
- **Common family questions:** ${value("commonQuestions")}
- **AI escalation rules:** ${value("aiEscalationRules")}
- **Reactivation audience:** ${value("reactivationWindow")}
- **Reactivation reason:** ${value("reactivationOffer")}
- **Location details:** ${value("locationDetails")}
- **Routing rules:** ${value("routingRules")}

## Fractional CMO Leadership

- **Leadership team:** ${value("leadershipTeam")}
- **Decision-maker:** ${value("decisionMaker")}
- **Meeting rhythm:** ${value("meetingCadence")}
- **Current vendors:** ${value("currentVendors")}
- **90-day priorities:** ${value("marketingPriorities")}
- **Approval process:** ${value("approvalProcess")}

## Setup Checklist

${setupChecklist(data)}

## Final Notes

${value("notes")}
`;
}

function sanitizeBody(input: unknown) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  return Object.fromEntries(
    Object.entries(input as Record<string, unknown>)
      .filter(([, value]) => typeof value === "string")
      .map(([key, value]) => [key.slice(0, 100), String(value).slice(0, 20000)])
  );
}

export async function POST(request: Request) {
  let body: Record<string, string> | null;
  try {
    body = sanitizeBody(await request.json());
  } catch {
    body = null;
  }

  if (!body) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }
  if (!body.businessName || !body.contactName || !body.email || !body.phone || body.consent !== "Yes") {
    return NextResponse.json(
      { error: "Missing required business, contact, or authorization information." },
      { status: 422 }
    );
  }

  const brief = buildBrief(body);
  const briefFilename = `${slugify(body.businessName)}-build-brief.md`;
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
    } catch (error) {
      console.error("[onboarding] Email send failed:", error);
    }
  } else {
    console.log("[onboarding] RESEND_API_KEY not set. Submission:", body);
    console.log(`[onboarding] Build brief (${briefFilename}):\n${brief}`);
  }

  if (!emailed) {
    console.log("[onboarding] Recoverable submission payload:", body);
  }

  return NextResponse.json({ ok: true, emailed });
}
