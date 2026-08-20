"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const revenueOptions = [
  "Under $25k/month",
  "$25k – $50k/month",
  "$50k – $100k/month",
  "$100k+/month",
];

const locationOptions = ["1 center", "2–3 centers", "4+ centers"];

export function LeadForm() {
  const router = useRouter();
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
          source: "apply-page",
          eventId,
          sourceUrl: window.location.href,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      // The Meta "Lead" pixel now fires on /thank-you (the completion step),
      // not here. The shared event_id lets that browser event dedupe with the
      // server-side CAPI "Lead" already sent by /api/lead above.
      const prefill = new URLSearchParams({
        name: [data.firstName, data.lastName].filter(Boolean).join(" "),
        email: String(data.email ?? ""),
        event_id: eventId,
      });
      router.push(`/thank-you?${prefill.toString()}`);
    } catch {
      setStatus("error");
      setError(
        "Something went wrong submitting your application. Please try again or call us directly."
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
          <label className={label} htmlFor="firstName">First name</label>
          <input id="firstName" name="firstName" required className={field} placeholder="Jane" />
        </div>
        <div>
          <label className={label} htmlFor="lastName">Last name</label>
          <input id="lastName" name="lastName" required className={field} placeholder="Doe" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className={field} placeholder="you@center.com" />
        </div>
        <div>
          <label className={label} htmlFor="phone">Mobile phone</label>
          <input id="phone" name="phone" type="tel" required className={field} placeholder="(555) 123-4567" />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="business">Program / business name</label>
        <input id="business" name="business" required className={field} placeholder="Little Stars Academy" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="city">City / market</label>
          <input id="city" name="city" required className={field} placeholder="Austin, TX" />
        </div>
        <div>
          <label className={label} htmlFor="locations">Number of locations</label>
          <select id="locations" name="locations" required defaultValue="" className={field}>
            <option value="" disabled>Select…</option>
            {locationOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={label} htmlFor="revenue">Current monthly revenue</label>
        <select id="revenue" name="revenue" required defaultValue="" className={field}>
          <option value="" disabled>Select…</option>
          {revenueOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div>
        <label className={label} htmlFor="goal">What&apos;s your #1 enrollment goal right now?</label>
        <textarea id="goal" name="goal" rows={3} className={field} placeholder="e.g. Fill 15 open infant/toddler spots before fall." />
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-cta px-6 py-4 text-base font-bold text-white shadow-lg shadow-cta/25 transition-colors hover:bg-cta-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Submitting…" : "Submit & Book My Strategy Call →"}
      </button>
      <p className="text-center text-xs text-muted">
        By submitting you agree to be contacted about your enrollment goals. We
        never share your info.
      </p>
    </form>
  );
}
