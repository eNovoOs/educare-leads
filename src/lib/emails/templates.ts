import { site } from "@/lib/site";
import { CALL_MINUTES, esc, formatWhen, layout, plain, type RenderedEmail } from "./base";

export type ReminderOffset = "24h" | "3h" | "1h";

export type BookingDetails = {
  name?: string;
  startTime: string; // ISO
  timezone?: string;
  joinUrl?: string;
  rescheduleUrl?: string;
  cancelUrl?: string;
};

const first = (name?: string) => (name || "").trim().split(/\s+/)[0] || "";
const hi = (name?: string) => (first(name) ? `Hi ${first(name)},` : "Hi,");

/** (a) Sent immediately after the lead form: nudge to pick a time. */
export function nextStepEmail(lead: { name?: string; calendlyUrl: string }): RenderedEmail {
  const subject = "Next step: pick a time for your Educare Leads call";
  const paragraphs = [
    hi(lead.name),
    `It's Jessica from ${site.name}. Thanks for reaching out. The next step is to choose a time for a free ${CALL_MINUTES}-minute call with our team. I'd love to get you on the calendar.`,
    "If you've already picked a time, you're all set and can ignore this email. I'll send a confirmation shortly.",
  ];
  const bullets = {
    title: "On the call, we'll go through:",
    items: [
      "Your current enrollment and where the open spots are",
      "How your families find you today",
      "Whether our done-for-you system is a fit for your program (and if it isn't, we'll tell you)",
    ],
  };
  const links = [{ label: "Choose a time", url: lead.calendlyUrl }];
  return {
    subject,
    html: layout({
      preheader: `Choose a time for your free ${CALL_MINUTES}-minute call.`,
      heading: "Your next step: choose a time",
      paragraphs: paragraphs.map(esc),
      bullets: { ...bullets, items: bullets.items.map(esc) },
      cta: { label: "Choose a time", url: lead.calendlyUrl },
    }),
    text: plain({ heading: "Your next step: choose a time", paragraphs, bullets, links }),
  };
}

const prepItems = [
  "Have your recent enrollment numbers and open spots handy (a rough count is fine).",
  "Know what you're doing for marketing today and roughly what it costs.",
  "Find a quiet spot with a stable internet connection.",
  "If someone else helps decide on marketing (a partner, director or owner), invite them to join.",
];

function links(b: BookingDetails) {
  const l: { label: string; url: string }[] = [];
  if (b.joinUrl) l.push({ label: "Join link", url: b.joinUrl });
  if (b.rescheduleUrl) l.push({ label: "Reschedule", url: b.rescheduleUrl });
  if (b.cancelUrl) l.push({ label: "Cancel", url: b.cancelUrl });
  return l;
}

function changeLine(b: BookingDetails): string {
  return b.rescheduleUrl
    ? `Need a different time? <a href="${esc(b.rescheduleUrl)}" style="color:#0b2447">Reschedule here</a> — it takes a few seconds.`
    : "Need a different time? Use the reschedule link in your Calendly confirmation, or just reply to this email.";
}

/** (b) Booking confirmation + prep. */
export function confirmationEmail(b: BookingDetails): RenderedEmail {
  const when = formatWhen(b.startTime, b.timezone);
  const confirmLine =
    "One important step: you'll get a text message from me (Jessica) shortly. Please reply to it to confirm your booking. Our team member only joins calls that are confirmed, so if I don't hear back, they won't be on the call. I'd hate for you to miss out over that!";
  const paragraphs = [
    hi(b.name),
    `You're booked: ${when}. The call is ${CALL_MINUTES} minutes.`,
    confirmLine,
    b.joinUrl ? "Use the button below to join at the scheduled time. Your calendar invite has the same link." : "Your calendar invite from Calendly has the joining details.",
  ];
  const bullets = { title: "To get the most out of our call:", items: prepItems };
  return {
    subject: `You're booked: ${when}`,
    html: layout({
      preheader: `Your ${CALL_MINUTES}-minute call is confirmed for ${when}.`,
      heading: "You're booked. One quick step left",
      paragraphs: paragraphs.map(esc),
      bullets: { ...bullets, items: bullets.items.map(esc) },
      cta: b.joinUrl ? { label: "Join the call", url: b.joinUrl } : undefined,
      secondary: changeLine(b),
    }),
    text: plain({
      heading: "You're booked. One quick step left",
      paragraphs: [...paragraphs, "Need a different time? Use the reschedule link below."],
      bullets,
      links: links(b),
    }),
  };
}

/** (c) Reminders at 24h / 3h / 1h before the call. */
export function reminderEmail(offset: ReminderOffset, b: BookingDetails): RenderedEmail {
  const when = formatWhen(b.startTime, b.timezone);
  const copy: Record<ReminderOffset, { subject: string; heading: string; lead: string; tips: string[] }> = {
    "24h": {
      subject: `Reminder: your call is tomorrow (${when})`,
      heading: "Your call is tomorrow",
      lead: `A quick reminder that we're talking tomorrow: ${when} (${CALL_MINUTES} minutes).`,
      tips: prepItems.slice(0, 2).concat(["If your plans changed, please reschedule so I can offer the slot to someone else."]),
    },
    "3h": {
      subject: `Your call is in 3 hours (${when})`,
      heading: "Your call is in about 3 hours",
      lead: `We're talking at ${when}. It runs ${CALL_MINUTES} minutes, so it helps to block the time.`,
      tips: [prepItems[0], prepItems[3]],
    },
    "1h": {
      subject: `Starting in 1 hour: your Educare Leads call`,
      heading: "Your call starts in about an hour",
      lead: `I'm looking forward to speaking with you at ${when}. Here's your join link.`,
      tips: [prepItems[2], "Have your enrollment numbers and current marketing details nearby."],
    },
  };
  const c = copy[offset];
  const paragraphs = [hi(b.name), c.lead];
  const bullets = { title: "Quick prep:", items: c.tips };
  return {
    subject: c.subject,
    html: layout({
      preheader: c.lead,
      heading: c.heading,
      paragraphs: paragraphs.map(esc),
      bullets: { ...bullets, items: bullets.items.map(esc) },
      cta: b.joinUrl ? { label: "Join the call", url: b.joinUrl } : undefined,
      secondary: changeLine(b),
    }),
    text: plain({
      heading: c.heading,
      paragraphs: [...paragraphs, "Need a different time? Use the reschedule link below."],
      bullets,
      links: links(b),
    }),
  };
}
