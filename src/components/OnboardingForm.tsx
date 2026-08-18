"use client";

import { useState } from "react";

/**
 * EduCare Leads new-client onboarding intake.
 *
 * Captures everything needed to (1) build the website, (2) produce ad creatives,
 * (3) position the offer, and (4) wire up the accounts (Meta, domain, phone/Twilio).
 *
 * We deliberately DO NOT collect passwords here. For Meta and the domain we ask
 * whether the client can grant access — then we send a secure partner/agency
 * invite separately. Asset files are collected via a shared Drive/Dropbox link.
 */

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-muted/60 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";
const label = "block text-sm font-semibold text-ink mb-1.5";
const hint = "mt-1 text-xs text-muted";

function Section({
  n,
  title,
  desc,
  children,
}: {
  n: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
      <div className="mb-6 flex items-start gap-3">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
          {n}
        </span>
        <div>
          <h2 className="text-lg font-extrabold text-ink">{title}</h2>
          {desc && <p className="mt-0.5 text-sm text-muted">{desc}</p>}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  name,
  label: lbl,
  placeholder,
  type = "text",
  required = false,
  hint: h,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className={label} htmlFor={name}>
        {lbl} {required && <span className="text-cta">*</span>}
      </label>
      <input id={name} name={name} type={type} required={required} placeholder={placeholder} className={field} />
      {h && <p className={hint}>{h}</p>}
    </div>
  );
}

function Area({
  name,
  label: lbl,
  placeholder,
  rows = 3,
  hint: h,
}: {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  hint?: string;
}) {
  return (
    <div>
      <label className={label} htmlFor={name}>
        {lbl}
      </label>
      <textarea id={name} name={name} rows={rows} placeholder={placeholder} className={field} />
      {h && <p className={hint}>{h}</p>}
    </div>
  );
}

function Select({
  name,
  label: lbl,
  options,
  required = false,
  hint: h,
}: {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className={label} htmlFor={name}>
        {lbl} {required && <span className="text-cta">*</span>}
      </label>
      <select id={name} name={name} required={required} defaultValue="" className={field}>
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {h && <p className={hint}>{h}</p>}
    </div>
  );
}

function CheckGroup({
  name,
  label: lbl,
  options,
  hint: h,
}: {
  name: string;
  label: string;
  options: string[];
  hint?: string;
}) {
  return (
    <div>
      <span className={label}>{lbl}</span>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((o) => (
          <label
            key={o}
            className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink hover:border-brand/40"
          >
            <input type="checkbox" name={name} value={o} className="h-4 w-4 accent-brand" />
            {o}
          </label>
        ))}
      </div>
      {h && <p className={hint}>{h}</p>}
    </div>
  );
}

export function OnboardingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    // Serialize, preserving multi-value checkbox groups.
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    for (const key of new Set(fd.keys())) {
      const all = fd.getAll(key).map(String).filter(Boolean);
      if (all.length) data[key] = all.join(", ");
    }

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sourceUrl: window.location.href }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
      setError("Something went wrong submitting your form. Please try again, or email us at info@educareleads.com.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cta/10 text-3xl">
          ✅
        </div>
        <h2 className="text-2xl font-extrabold text-ink">You&apos;re all set!</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Thanks — we&apos;ve received everything we need to get started. Our team will review your
          information and reach out with next steps (including secure access invites for Meta and your
          domain) within 1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. Business basics */}
      <Section n="1" title="Your business" desc="The essentials so we know who we're building for.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="businessName" label="Business / program name" placeholder="Little Stars Daycare" required />
          <Field name="legalName" label="Legal entity name (if different)" placeholder="Little Stars LLC" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="contactName" label="Your full name" placeholder="Jane Doe" required />
          <Field name="role" label="Your role" placeholder="Owner / Director" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="email" label="Email" type="email" placeholder="you@yourdaycare.com" required />
          <Field name="phone" label="Mobile phone" type="tel" placeholder="(555) 123-4567" required />
        </div>
        <Field name="address" label="Business address" placeholder="123 Main St, Springfield, VA 22152" />
        <div className="grid gap-4 sm:grid-cols-3">
          <Select name="locations" label="Number of locations" options={["1", "2–3", "4+"]} />
          <Field name="yearsOperating" label="Years in operation" placeholder="e.g. 6" />
          <Field name="licenseNumber" label="License # (if applicable)" placeholder="Optional" />
        </div>
      </Section>

      {/* 2. About the program — website + offer */}
      <Section
        n="2"
        title="About your program"
        desc="This becomes the backbone of your website copy and your offer."
      >
        <CheckGroup
          name="services"
          label="Programs / services you offer"
          options={[
            "Infant care (0–1)",
            "Toddler (1–3)",
            "Preschool / Pre-K (3–5)",
            "Before / after school",
            "Summer camp",
            "Drop-in care",
            "Bilingual program",
            "Special needs support",
          ]}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="hours" label="Hours of operation" placeholder="Mon–Fri, 6:30am–6:00pm" />
          <Field name="capacity" label="Total licensed capacity" placeholder="e.g. 40 children" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="openSpots" label="Current open spots (by age if possible)" placeholder="e.g. 5 toddler, 3 preschool" />
          <Field name="tuition" label="Tuition / pricing" placeholder="e.g. $1,300/mo full-time toddler" />
        </div>
        <Field name="serviceArea" label="Service area" placeholder="Towns / ZIP codes families come from, or radius in miles" />
        <Area
          name="usp"
          label="What makes you different? Why do parents choose you?"
          placeholder="Curriculum, low ratios, meals included, security cameras, bilingual staff, accreditations…"
        />
        <Field name="languages" label="Languages spoken by staff" placeholder="English, Spanish…" />
      </Section>

      {/* 3. Brand & content — website + creatives */}
      <Section
        n="3"
        title="Brand & content"
        desc="The raw materials for your website and ad creatives."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="currentWebsite" label="Current website (if any)" placeholder="https://…" />
          <Field name="tagline" label="Tagline / slogan (if you have one)" placeholder="Where little ones shine" />
        </div>
        <Select
          name="hasLogo"
          label="Do you have a logo?"
          options={["Yes — high quality (PNG/SVG)", "Yes — low quality only", "No / needs designing"]}
        />
        <Field name="brandColors" label="Brand colors (if any)" placeholder="e.g. navy & gold, or hex codes" />
        <Select
          name="hasPhotos"
          label="Do you have photos/videos of your facility (with consent to use)?"
          options={[
            "Yes — facility & staff",
            "Yes — including children (with signed consent)",
            "A few / low quality",
            "None yet",
          ]}
        />
        <Field
          name="assetsLink"
          label="Link to your assets (logo, photos, videos)"
          placeholder="Google Drive / Dropbox link (set to anyone-with-link)"
          hint="Easiest way to send us files. We'll request anything missing."
        />
        <Area
          name="testimonials"
          label="Parent reviews / testimonials"
          placeholder="Paste a few favorites, or links to your Google / Facebook reviews."
        />
      </Section>

      {/* 4. Offer & goals — positioning */}
      <Section n="4" title="Your offer & goals" desc="So we can position an irresistible offer.">
        <Field name="enrollmentGoal" label="How many new enrollments do you want in the next 90 days?" placeholder="e.g. 12" />
        <Area
          name="currentPromo"
          label="Any current promotion or discount?"
          placeholder="e.g. waived registration fee, first week free, sibling discount… (or none)"
        />
        <Field name="idealFamily" label="Who is your ideal family?" placeholder="e.g. working parents of toddlers within 10 min" />
        <Area
          name="objections"
          label="What's the #1 reason a parent hesitates or says no?"
          placeholder="Price, waitlist, location, hours, trust…"
        />
        <Field name="competitors" label="Main competitors nearby" placeholder="Names or links — helps us differentiate you" />
      </Section>

      {/* 5. Meta / ads accounts — access */}
      <Section
        n="5"
        title="Marketing & ad accounts"
        desc="So we know what exists and what we need to set up. We'll send secure access invites — never asking for your password."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="facebookPage" label="Facebook Page URL" placeholder="https://facebook.com/yourdaycare" />
          <Field name="instagram" label="Instagram handle" placeholder="@yourdaycare" />
        </div>
        <Select
          name="hasBusinessManager"
          label="Do you have a Meta Business Suite / Business Manager account?"
          options={["Yes", "Not sure", "No"]}
        />
        <Field name="adAccountId" label="Meta Ad Account ID (if you know it)" placeholder="act_123456789 — optional" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Select name="runningAds" label="Currently running ads?" options={["Yes, on Meta", "Yes, on Google", "Yes, both", "No"]} />
          <Field name="adBudget" label="Monthly ad budget you're comfortable with" placeholder="e.g. $1,500/mo" />
        </div>
        <Select
          name="canGrantMeta"
          label="Can you grant us partner access to your Meta assets?"
          options={["Yes", "Need help doing this", "No / let's discuss"]}
          hint="We'll email step-by-step instructions to add EduCare Leads as a partner."
        />
      </Section>

      {/* 6. Phone & comms — Twilio decision */}
      <Section
        n="6"
        title="Phone & communication"
        desc="This tells us whether we need to provision a tracking / AI number for you."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="businessPhone" label="Your business phone number" placeholder="(555) 123-4567" />
          <Select name="phoneType" label="Is it a mobile or landline?" options={["Mobile", "Landline", "VoIP", "Don't have one"]} />
        </div>
        <Select
          name="canText"
          label="Can you currently send/receive text messages on it?"
          options={["Yes", "No", "Not sure"]}
        />
        <Select
          name="wantsTrackingNumber"
          label="Want us to set up a dedicated tracking / AI-follow-up number?"
          options={["Yes", "No — use my existing number", "Not sure, advise me"]}
          hint="A dedicated number lets the AI text & call leads instantly and keeps marketing calls trackable."
        />
        <Field name="forwardTo" label="Where should calls forward to?" placeholder="Phone number for live calls" />
        <Field name="currentCrm" label="Current CRM / booking tool (if any)" placeholder="e.g. Calendly, brightwheel, none" />
      </Section>

      {/* 7. Domain & website access */}
      <Section
        n="7"
        title="Domain & website"
        desc="So we can launch your site on the right address."
      >
        <Select
          name="hasDomain"
          label="Do you own a domain name?"
          options={["Yes", "No — please register one for me", "Not sure"]}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="domainName" label="Your domain (if you have one)" placeholder="yourdaycare.com" />
          <Field name="domainRegistrar" label="Where is it registered?" placeholder="GoDaddy, Namecheap, Google Domains…" />
        </div>
        <Field name="desiredDomain" label="Preferred domain (if registering new)" placeholder="e.g. littlestarsva.com" />
        <Select
          name="canGrantDomain"
          label="Can you grant us access to manage the domain / DNS?"
          options={["Yes", "Need help doing this", "No / let's discuss"]}
        />
        <Field name="googleBusiness" label="Google Business Profile (if any)" placeholder="Link or business name" />
      </Section>

      {/* 8. Anything else */}
      <Section n="8" title="Anything else?" desc="Anything we should know before we start building.">
        <Area
          name="notes"
          label="Notes, goals, must-haves, or things to avoid"
          rows={4}
          placeholder="Anything at all — the more we know, the better the result."
        />
        <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-surface px-4 py-3 text-sm text-ink">
          <input type="checkbox" name="consent" value="Yes" required className="mt-0.5 h-4 w-4 accent-brand" />
          <span>
            I authorize EduCare Leads to build and manage my website, ad campaigns, and connected
            accounts on my behalf, and confirm the information above is accurate. <span className="text-cta">*</span>
          </span>
        </label>
      </Section>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-cta px-6 py-4 text-base font-bold text-white shadow-lg shadow-cta/25 transition-colors hover:bg-cta-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Submitting…" : "Submit my onboarding →"}
      </button>
      <p className="text-center text-xs text-muted">
        We never share your information. Required fields are marked <span className="text-cta">*</span>.
      </p>
    </form>
  );
}
