const REQUIRED_NOTIFICATION_EMAIL = "info@educareleads.com";
const EXCLUDED_NOTIFICATION_EMAILS = new Set(["andre@revupcmo.com"]);

/**
 * Keeps the primary EduCare inbox on every notification while allowing
 * environment variables to add one or more operational recipients.
 */
export function notificationRecipients(
  configured: string | undefined,
): string[] {
  const candidates = [
    REQUIRED_NOTIFICATION_EMAIL,
    ...(configured ? configured.split(",") : []),
  ];
  const seen = new Set<string>();

  return candidates
    .map((address) => address.trim())
    .filter((address) => {
      if (!address) return false;

      const key = address.toLowerCase();
      if (EXCLUDED_NOTIFICATION_EMAILS.has(key)) return false;
      if (seen.has(key)) return false;

      seen.add(key);
      return true;
    });
}
