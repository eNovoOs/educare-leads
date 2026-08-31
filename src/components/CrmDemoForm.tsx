"use client";

import { useState } from "react";
import { site } from "@/lib/site";

// Short qualifying form for the /educarecrm* pages.
//
// On submit it captures the lead (email + CRM) and then redirects the user to
// Calendly to book. The Meta "Lead" event does NOT fire here — it fires on
// /crm-thank-you, which the Calendly event type is configured to redirect to
// after a booking completes. So Lead == booked demo.

const programTypes = [
  "Daycare / childcare center",
  "Preschool",
  "Private / independent school",
  "Summer or enrichment camp",
  "Multi-site group",
];

type Props = {
  /** Distinguishes the two form instances on a page (unique input ids). */
  compact?: boolean;
  /** Lead source tag — shows up in the notification email. */
  source?: string;
  /** Submit button label. */
  submitLabel?: string;
  /** Small print under the button. */
  footnote?: React.ReactNode;
  /** @deprecated No longer shown — the form now redirects to Calendly on submit. */
  successNote?: string;
};

export function CrmDemoForm({
  compact = false,
  source = "educarecrm-page",
  submitLabel = "Show Me My Times →",
  footnote,
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const eventId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source,
          eventId,
          sourceUrl: window.location.href,
          // The Meta "Lead" (pixel + CAPI) fires on /crm-thank-you, not here.
          skipMetaLead: true,
        }),
      });
      if (!res.ok) throw new Error("Request failed");

      // Send them to Calendly to book (prefilled). Calendly is configured to
      // redirect to /crm-thank-you once the booking is confirmed, where the
      // Meta "Lead" fires.
      const name = [data.firstName, data.lastName].filter(Boolean).join(" ");
      const params = new URLSearchParams();
      if (name) params.set("name", name);
      if (data.email) params.set("email", String(data.email));
      const sep = site.crmCalendlyUrl.includes("?") ? "&" : "?";
      const qs = params.toString();
      window.location.href = qs ? `${site.crmCalendlyUrl}${sep}${qs}` : site.crmCalendlyUrl;
    } catch {
      setStatus("error");
      setError(
        "Something went wrong sending that. Please try again, or call us directly."
      );
    }
  }

  const field =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-muted/70 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";
  const label = "block text-sm font-semibold text-ink mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor={`crm-first${compact ? "-b" : ""}`}>
            First name
          </label>
          <input
            id={`crm-first${compact ? "-b" : ""}`}
            name="firstName"
            required
            autoComplete="given-name"
            className={field}
            placeholder="Jane"
          />
        </div>
        <div>
          <label className={label} htmlFor={`crm-last${compact ? "-b" : ""}`}>
            Last name
          </label>
          <input
            id={`crm-last${compact ? "-b" : ""}`}
            name="lastName"
            required
            autoComplete="family-name"
            className={field}
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor={`crm-email${compact ? "-b" : ""}`}>
            Work email
          </label>
          <input
            id={`crm-email${compact ? "-b" : ""}`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
            placeholder="you@yourprogram.com"
          />
        </div>
        <div>
          <label className={label} htmlFor={`crm-phone${compact ? "-b" : ""}`}>
            Mobile phone
          </label>
          <input
            id={`crm-phone${compact ? "-b" : ""}`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={field}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label className={label} htmlFor={`crm-business${compact ? "-b" : ""}`}>
          Program name
        </label>
        <input
          id={`crm-business${compact ? "-b" : ""}`}
          name="business"
          required
          className={field}
          placeholder="Little Stars Academy"
        />
      </div>

      <div>
        <label className={label} htmlFor={`crm-type${compact ? "-b" : ""}`}>
          Program type
        </label>
        <select
          id={`crm-type${compact ? "-b" : ""}`}
          name="type"
          required
          defaultValue=""
          className={field}
        >
          <option value="" disabled>
            Select…
          </option>
          {programTypes.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-cta px-6 py-4 text-base font-bold text-white shadow-lg shadow-cta/25 transition-colors hover:bg-cta-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "One moment…" : submitLabel}
      </button>
      <p className="text-center text-xs text-muted">
        {footnote ?? (
          <>
            20-minute demo. No pressure, no contract, and we&apos;ll show you
            the cost comparison against what you pay today.
          </>
        )}
      </p>
    </form>
  );
}
