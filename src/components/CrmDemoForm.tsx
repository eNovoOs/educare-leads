"use client";

import { useState } from "react";
import { CalendlyEmbed } from "./CalendlyEmbed";

// Short qualifying form for the /educarecrm page.
//
// Deliberately different from LeadForm (used on /apply): that form gates a
// high-ticket done-for-you engagement and asks 9 questions, including a
// revenue qualifier. This is a software demo — the ask is lighter, so the
// form is 5 fields and the scheduler appears inline on submit instead of
// routing to /thank-you. The lead is POSTed before the calendar renders, so
// an abandoned booking is still a captured lead.

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
  /** Line shown above the scheduler once the lead is captured. */
  successNote?: string;
};

export function CrmDemoForm({
  compact = false,
  source = "educarecrm-page",
  submitLabel = "Show Me My Times →",
  footnote,
  successNote = "last step: pick a time below and your demo is locked in. 👇",
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "booked" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [lead, setLead] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });

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
        }),
      });
      if (!res.ok) throw new Error("Request failed");

      // Meta Pixel — Lead (shared event_id dedupes with the server CAPI event)
      (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.(
        "track",
        "Lead",
        {},
        { eventID: eventId }
      );

      setLead({
        name: [data.firstName, data.lastName].filter(Boolean).join(" "),
        email: String(data.email ?? ""),
      });
      setStatus("booked");
    } catch {
      setStatus("error");
      setError(
        "Something went wrong sending that. Please try again, or call us directly."
      );
    }
  }

  // Step 2 — scheduler, revealed in place. No navigation, no lost context.
  if (status === "booked") {
    return (
      <div>
        <div className="flex items-start gap-3 rounded-2xl bg-cta/10 px-4 py-3 text-left">
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cta text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M20 6 9 17l-5-5"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className="text-sm font-semibold text-ink">
            Got it{lead.name ? `, ${lead.name.split(" ")[0]}` : ""} —{" "}
            {successNote}
          </p>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-line">
          <CalendlyEmbed name={lead.name} email={lead.email} />
        </div>
      </div>
    );
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
