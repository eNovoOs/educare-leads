import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThankYouPixel } from "@/components/ThankYouPixel";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "You're booked — here's how to get ready",
  description: "Your call with Educare Leads is confirmed. Here's what to expect and how to prepare.",
  robots: { index: false, follow: false },
};

const checklist = [
  {
    title: "Have your numbers handy",
    body: "Roughly how many children are enrolled, how many spots are open, and what you're doing for marketing today. Estimates are fine.",
  },
  {
    title: "Pick a quiet spot",
    body: "A place where you can talk for the full 60 minutes with a stable connection.",
  },
  {
    title: "Find your join link",
    body: "It's in the confirmation email we're sending you now, and in your Calendly invite. Check spam or promotions if you don't see it.",
  },
  {
    title: "Add the call to your calendar",
    body: "Use the “Add to calendar” option in your Calendly confirmation so you get a native reminder.",
  },
  {
    title: "Bring the decision-makers",
    body: "If a partner, director or co-owner helps decide on marketing, invite them to join so nothing has to be repeated later.",
  },
  {
    title: "Need to move it? Reschedule early",
    body: "Use the reschedule link in your Calendly email or in our confirmation email. It takes a few seconds and frees the slot for another program.",
  },
];

const cover = [
  "Where your enrollment stands today and where the open spots are",
  "How families currently find and contact you, and where inquiries get lost",
  "How our done-for-you enrollment system would work for your program",
  "Whether it's a good fit. If it isn't, we'll tell you.",
];

export default async function BookedPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; event_id?: string }>;
}) {
  const { name, event_id } = await searchParams;
  const firstName = (name || "").trim().split(/\s+/)[0];

  return (
    <main className="min-h-screen bg-surface">
      {/* Meta Pixel — same behaviour as /thank-you: a completed booking counts as Lead. */}
      <ThankYouPixel eventId={event_id} />

      <div className="mx-auto max-w-3xl px-5 py-10">
        <Logo />
      </div>

      <div className="mx-auto max-w-3xl space-y-6 px-5 pb-20">
        <section className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-line sm:p-10">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cta/10 text-cta">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            You&apos;re booked{firstName ? `, ${firstName}` : ""}.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-lg text-muted">
            Your call is confirmed. A confirmation with your join link is on its way to your
            inbox (check spam or promotions just in case).
          </p>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-line sm:p-10">
          <h2 className="text-xl font-extrabold text-ink">What to expect</h2>
          <p className="mt-3 text-muted">
            The call is <strong className="text-ink">60 minutes</strong> with a member of our team.
            It&apos;s a working conversation about your program, not a slideshow. We&apos;ll
            send reminders 24 hours, 3 hours and 1 hour before.
          </p>
          <h3 className="mt-6 text-base font-bold text-ink">What we&apos;ll cover</h3>
          <ul className="mt-3 space-y-2 text-muted">
            {cover.map((c) => (
              <li key={c} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cta" aria-hidden />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-line sm:p-10">
          <h2 className="text-xl font-extrabold text-ink">How to get ready</h2>
          <ul className="mt-4 space-y-4">
            {checklist.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-cta/10 text-cta" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="block font-bold text-ink">{item.title}</span>
                  <span className="block text-muted">{item.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-ink px-6 py-6 text-center text-white">
          <p className="text-sm text-white/75">Questions before the call?</p>
          <div className="mt-3 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
            <a href={site.phoneHref} className="font-bold text-white hover:text-cta">📞 {site.phone}</a>
            <a href={`mailto:${site.email}`} className="font-bold text-white hover:text-cta">✉️ {site.email}</a>
          </div>
        </section>

        <div className="text-center">
          <Link href="/" className="text-sm font-semibold text-muted hover:text-brand">← Back to home</Link>
        </div>
      </div>
    </main>
  );
}
