"use client";

import { useEffect, useRef } from "react";

/**
 * Fires the Meta "Lead" event on the thank-you page — the completion step of
 * the funnel (form → Calendly → /thank-you or /crm-thank-you). The pixel itself
 * is initialised globally in layout.tsx, so here we only track the conversion.
 *
 * The pixel script loads with strategy="afterInteractive", which can execute
 * AFTER this effect runs — so `window.fbq` may not exist yet on first tick.
 * We therefore poll briefly until it's available and only then fire, so the
 * Lead never gets silently dropped (this was previously the case on
 * /crm-thank-you, which has no CAPI fallback).
 *
 * `eventId` is passed through from the form's querystring so this browser event
 * dedupes with any server-side CAPI "Lead". If missing (e.g. arriving via
 * Calendly's redirect), a fresh id is generated so the event still fires.
 */
export function ThankYouPixel({ eventId }: { eventId?: string }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;

    const id =
      eventId ||
      (typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`);

    function fire(): boolean {
      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
      if (!fbq) return false;
      fbq("track", "Lead", {}, { eventID: id });
      fired.current = true;
      return true;
    }

    // Fire now if the pixel is already loaded…
    if (fire()) return;

    // …otherwise wait for it (up to ~10s).
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      if (fire() || tries >= 50) clearInterval(timer);
    }, 200);

    return () => clearInterval(timer);
  }, [eventId]);

  return null;
}
