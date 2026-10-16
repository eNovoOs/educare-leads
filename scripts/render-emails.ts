// Renders every lead-facing email to HTML/TXT files. NO emails are sent.
// Usage: npx tsx scripts/render-emails.ts [outDir]   (default: ./out/emails)
import { mkdirSync, writeFileSync } from "fs";
import { confirmationEmail, nextStepEmail, reminderEmail } from "../src/lib/emails/templates";

const out = process.argv[2] || "out/emails";
mkdirSync(out, { recursive: true });

const booking = {
  name: '<img src=x onerror=alert(1)>Jo',
  startTime: new Date(Date.now() + 3 * 86400_000).toISOString(),
  timezone: "America/New_York",
  joinUrl: "https://calendly.com/events/EXAMPLE/google_meet",
  rescheduleUrl: "https://calendly.com/reschedulings/EXAMPLE",
  cancelUrl: "https://calendly.com/cancellations/EXAMPLE",
};
const files: Record<string, ReturnType<typeof nextStepEmail>> = {
  "1-next-step": nextStepEmail({ name: booking.name, calendlyUrl: "https://calendly.com/educareleads-info/60min?name=Jordan&email=j%40example.com&a1=555" }),
  "2-confirmation": confirmationEmail(booking),
  "3-reminder-24h": reminderEmail("24h", booking),
  "4-reminder-3h": reminderEmail("3h", booking),
  "5-reminder-1h": reminderEmail("1h", booking),
};
for (const [k, v] of Object.entries(files)) {
  writeFileSync(`${out}/${k}.html`, v.html);
  writeFileSync(`${out}/${k}.txt`, `Subject: ${v.subject}\n\n${v.text}`);
  console.log(k, "-", v.subject, v.html.includes("<img src=x") ? "UNESCAPED!" : "(escaped ok)");
}
