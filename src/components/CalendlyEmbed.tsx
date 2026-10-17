"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";
import { normalizePhone } from "@/lib/bookingSms";

type Props = {
  /** Prefill values forwarded from the lead form. */
  name?: string;
  email?: string;
  /** Phone number; prefilled into Calendly's "Mobile phone number" question (a2). */
  phone?: string;
};

// Inline Calendly scheduler. The widget.js script is loaded globally in the
// root layout, but its auto-init only scans the DOM on script load — after a
// client-side navigation (form → /thank-you) we must init manually, and on a
// hard load the script may not have executed yet, so we poll briefly.
export function CalendlyEmbed({ name, email, phone }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const params = new URLSearchParams({ hide_gdpr_banner: "1" });
    if (name) params.set("name", name);
    if (email) params.set("email", email);
    const e164 = normalizePhone(phone);
    if (e164) params.set("a2", e164);
    const url = `${site.calendlyUrl}?${params.toString()}`;

    let cancelled = false;
    let tries = 0;
    function init() {
      if (cancelled || !el) return;
      if (window.Calendly) {
        el.innerHTML = "";
        window.Calendly.initInlineWidget({ url, parentElement: el });
      } else if (tries++ < 50) {
        setTimeout(init, 200);
      }
    }
    init();

    return () => {
      cancelled = true;
    };
  }, [name, email, phone]);

  return (
    <div
      ref={containerRef}
      style={{ minWidth: "300px", height: "700px" }}
      aria-label="Schedule your call"
    >
      <p className="pt-10 text-center text-sm text-muted">Loading scheduler…</p>
    </div>
  );
}
