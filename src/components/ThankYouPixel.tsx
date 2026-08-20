"use client";

import { useEffect, useRef } from "react";

/**
 * Fires the Meta "Lead" event on the thank-you page — the completion step of
 * the funnel (form → Calendly → /thank-you). The pixel itself is initialised
 * globally in layout.tsx, so here we only track the conversion.
 *
 * `eventId` is passed through from the form's querystring so this browser event
 * dedupes with the server-side CAPI "Lead" event already sent by /api/lead.
 * If it's missing (e.g. the user arrives via Calendly's redirect), a fresh id
 * is generated so the event still fires.
 */
export function ThankYouPixel({ eventId }: { eventId?: string }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (!fbq) return;

    const id =
      eventId ||
      (typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`);

    fbq("track", "Lead", {}, { eventID: id });
    fired.current = true;
  }, [eventId]);

  return null;
}
