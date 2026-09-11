"use client";

import { useEffect, useRef } from "react";

/**
 * Fires a Meta conversion event on a thank-you page. The default is "Lead";
 * CRM bookings use "Schedule" so a form submission and a booked demo remain
 * distinct conversions. The pixel itself is initialised globally in layout.tsx.
 *
 * The pixel script loads with strategy="afterInteractive", which can execute
 * AFTER this effect runs — so `window.fbq` may not exist yet on first tick.
 * We therefore poll briefly until it's available and only then fire, so the
 * The conversion never gets silently dropped if the component mounts before
 * the global pixel is ready.
 *
 * `eventId` can be passed through from the form's querystring so a browser Lead
 * dedupes with its server-side CAPI copy. If missing (for example after a
 * Calendly redirect), a fresh id is generated so the event still fires.
 */
export function ThankYouPixel({
  eventId,
  eventName = "Lead",
}: {
  eventId?: string;
  eventName?: "Lead" | "Schedule";
}) {
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
      fbq("track", eventName, {}, { eventID: id });
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
  }, [eventId, eventName]);

  return null;
}
