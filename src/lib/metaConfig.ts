/**
 * Meta pixel / CAPI constants shared by client and server code (no secrets).
 * public/vsl.html is static and hardcodes the same values; keep them in sync.
 */
export const META_PIXEL_ID_PUBLIC = "1029290093151029";

/** Conversion values sent with Lead and Schedule (browser + CAPI). */
export const META_CURRENCY = "CAD";
export const LEAD_VALUE = 25;
export const SCHEDULE_VALUE = 500;

/** Deterministic Schedule event_id shared by the Calendly webhook (CAPI) and /booked (pixel). */
export function scheduleEventId(inviteeUuid: string): string {
  return `schedule_${inviteeUuid}`;
}
