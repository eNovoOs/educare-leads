"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Same fields + submit flow as components/LeadForm.tsx, restyled to match the
// "ugly" direct-response funnel (/go). Posts to /api/lead (Resend automation),
// then sends them to /thank-you to pick a Calendly time.
const revenueOptions = [
  "Under $25k/month",
  "$25k – $50k/month",
  "$50k – $100k/month",
  "$100k+/month",
];

const locationOptions = ["1 center", "2–3 centers", "4+ centers"];

const fieldStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid #999999",
  borderRadius: "4px",
  backgroundColor: "#ffffff",
  color: "#111111",
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "16px",
  padding: "11px 12px",
  marginTop: "4px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontWeight: 700,
  fontSize: "15px",
  marginTop: "14px",
  textAlign: "left",
};

export function UglyLeadForm() {
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
          source: "apply2-page",
          eventId,
          sourceUrl: window.location.href,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      // Meta Pixel — Lead (shared event_id dedupes with the server-side CAPI event)
      (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.(
        "track",
        "Lead",
        {},
        { eventID: eventId }
      );
      const prefill = new URLSearchParams({
        name: [data.firstName, data.lastName].filter(Boolean).join(" "),
        email: String(data.email ?? ""),
      });
      router.push(`/thank-you?${prefill.toString()}`);
    } catch {
      setStatus("error");
      setError(
        "Something went wrong submitting your application. Please try again or call us directly."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label style={labelStyle} htmlFor="firstName">
        First Name *
        <input id="firstName" name="firstName" required style={fieldStyle} placeholder="Jane" />
      </label>
      <label style={labelStyle} htmlFor="lastName">
        Last Name *
        <input id="lastName" name="lastName" required style={fieldStyle} placeholder="Doe" />
      </label>
      <label style={labelStyle} htmlFor="email">
        Email *
        <input id="email" name="email" type="email" required style={fieldStyle} placeholder="you@center.com" />
      </label>
      <label style={labelStyle} htmlFor="phone">
        Mobile Phone *
        <input id="phone" name="phone" type="tel" required style={fieldStyle} placeholder="(555) 123-4567" />
      </label>
      <label style={labelStyle} htmlFor="business">
        Program / Business Name *
        <input id="business" name="business" required style={fieldStyle} placeholder="Little Stars Academy" />
      </label>
      <label style={labelStyle} htmlFor="city">
        City / Market *
        <input id="city" name="city" required style={fieldStyle} placeholder="Austin, TX" />
      </label>
      <label style={labelStyle} htmlFor="locations">
        Number Of Locations *
        <select id="locations" name="locations" required defaultValue="" style={fieldStyle}>
          <option value="" disabled>
            Select…
          </option>
          {locationOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
      <label style={labelStyle} htmlFor="revenue">
        Current Monthly Revenue *
        <select id="revenue" name="revenue" required defaultValue="" style={fieldStyle}>
          <option value="" disabled>
            Select…
          </option>
          {revenueOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
      <label style={labelStyle} htmlFor="goal">
        What&apos;s Your #1 Enrollment Goal Right Now?
        <textarea
          id="goal"
          name="goal"
          rows={3}
          style={fieldStyle}
          placeholder="e.g. Fill 15 open infant/toddler spots before fall."
        />
      </label>

      {error && (
        <p style={{ color: "#d80000", fontWeight: 700, fontSize: "15px", marginTop: "14px" }}>
          ⚠️ {error}
        </p>
      )}

      <div style={{ textAlign: "center", marginTop: "22px" }}>
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            display: "inline-block",
            width: "100%",
            backgroundColor: "#1da10b",
            color: "#ffffff",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 800,
            fontSize: "20px",
            lineHeight: 1.25,
            padding: "18px 20px",
            borderRadius: "10px",
            border: "1px solid #157a08",
            borderBottom: "5px solid #116806",
            boxShadow: "0 4px 0 #0e5a05",
            cursor: status === "loading" ? "not-allowed" : "pointer",
            opacity: status === "loading" ? 0.7 : 1,
          }}
        >
          {status === "loading"
            ? "SUBMITTING…"
            : "👉 SUBMIT & PICK MY CALL TIME 👈"}
        </button>
        <p style={{ color: "#888888", fontSize: "12px", marginTop: "10px" }}>
          By submitting you agree to be contacted about your enrollment goals. We
          never share your info.
        </p>
      </div>
    </form>
  );
}
