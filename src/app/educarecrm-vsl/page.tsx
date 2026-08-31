import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";
import { CrmDemoForm } from "@/components/CrmDemoForm";
import { VslPlayer } from "@/components/VslPlayer";
import { site } from "@/lib/site";
import { programFit } from "@/lib/educarecrm";
import { trial, trialStats, unlocked, billing, trialFaqs } from "@/lib/educarecrm7";

export const metadata: Metadata = {
  title: "Watch: How Programs Fill Their Rooms Without Chasing Parents",
  description:
    "A short walkthrough of the enrollment system built for daycares, schools, and camps — then start your 7-day free trial.",
  // Ad-traffic VSL page — kept out of the index so it doesn't compete with
  // /educarecrm in search. Flip to true to index it.
  robots: { index: false, follow: true },
};

/** Every CTA drops to the form at the bottom. */
function VslCta({
  children,
  variant = "solid",
}: {
  children: React.ReactNode;
  variant?: "solid" | "light";
}) {
  const variants =
    variant === "solid"
      ? "bg-cta text-white hover:bg-cta-dark shadow-xl shadow-cta/30"
      : "bg-white text-ink hover:bg-white/90 shadow-lg shadow-black/10";
  return (
    <a
      href="#start"
      className={`inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full px-8 py-5 text-lg font-bold transition-colors sm:text-xl ${variants}`}
    >
      {children}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
      {children}
    </p>
  );
}

export default function EducareCrmVslPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: trialFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const formFootnote = (
    <>
      Card required to start. Cancel any time before day 7 and you&apos;re never
      charged.
    </>
  );

  return (
    <main className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── VSL hero ────────────────────────────────────────────────
          No nav links by design — on a VSL page every link is an exit. */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-brand/20 blur-[140px]"
        />

        <div className="relative mx-auto max-w-3xl px-5 py-10 text-center sm:py-14">
          <div className="flex justify-center">
            <Logo light />
          </div>

          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-accent ring-1 ring-accent/30">
            <span className="h-2 w-2 rounded-full bg-accent" />
            For daycares, private schools &amp; camps
          </span>

          <h1 className="font-display mt-6 text-3xl leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
            How Programs Fill Their Rooms
            <br />
            <span className="text-cta">Without Chasing a Single Parent</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base text-white/70 sm:text-lg">
            Watch the short walkthrough below, then start your {trial.days}-day
            free trial and run it on your own families.
          </p>

          {/* Video */}
          <div className="mt-8 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15">
            <div className="aspect-video w-full">
              <VslPlayer
                src="/vsl/educare-crm-vsl.mp4"
                poster="/vsl/crm-vsl-poster.jpg"
              />
            </div>
          </div>

          <p className="mt-3 text-sm text-white/50">
            👆 Turn your sound on — it&apos;s under 4 minutes.
          </p>

          {/* Primary CTA */}
          <div className="mt-8 flex flex-col items-center">
            <VslCta>{trial.primaryCta}</VslCta>
            <p className="mt-3 text-xs text-white/55">{trial.cardNote}</p>
          </div>

          {/* Proof strip */}
          <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {trialStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-xl font-extrabold text-accent sm:text-2xl">
                    {s.value}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-white/55">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* WHO WE FILL — program-type photos */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Who we fill</p>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              Programs like yours, full again
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { label: "Daycares & childcare", img: "https://images.pexels.com/photos/8363102/pexels-photo-8363102.jpeg?auto=compress&cs=tinysrgb&w=800&h=640&fit=crop", alt: "Children playing with their teacher in a childcare classroom" },
              { label: "Private & independent schools", img: "https://images.pexels.com/photos/8613100/pexels-photo-8613100.jpeg?auto=compress&cs=tinysrgb&w=800&h=640&fit=crop", alt: "Teacher giving a lesson as students raise their hands" },
              { label: "Summer & enrichment camps", img: "https://images.pexels.com/photos/9302795/pexels-photo-9302795.jpeg?auto=compress&cs=tinysrgb&w=800&h=640&fit=crop", alt: "Group of children at an outdoor summer camp" },
            ].map((c) => (
              <div key={c.label} className="group overflow-hidden rounded-3xl bg-surface ring-1 ring-line">
                <div className="aspect-[5/4] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg uppercase text-ink">{c.label}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── What's unlocked ─────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <Kicker>{unlocked.kicker}</Kicker>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              {unlocked.title}
            </h2>
            <p className="mt-4 text-lg text-muted">{unlocked.intro}</p>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {unlocked.items.map((i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl bg-surface px-5 py-4 ring-1 ring-line"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mt-0.5 shrink-0 text-cta"
                  aria-hidden
                >
                  <path
                    d="m5 13 4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-medium text-ink-soft">{i}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center">
            <VslCta>{trial.primaryCta}</VslCta>
          </div>
        </div>
      </section>

      {/* ── Program fit ─────────────────────────────────────────────── */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cta">
              Built for your program
            </p>
            <h2 className="font-display mt-3 text-3xl tracking-tight sm:text-4xl">
              Not generic business software
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {programFit.map((p) => (
              <div
                key={p.label}
                className="rounded-2xl bg-white/5 p-7 ring-1 ring-white/10"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-cta">
                  {p.label}
                </p>
                <h3 className="mt-3 text-xl font-extrabold leading-snug">
                  {p.headline}
                </h3>
                <ul className="mt-5 space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm text-white/75">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Billing transparency ────────────────────────────────────── */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="text-center">
            <Kicker>{billing.kicker}</Kicker>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              {billing.title}
            </h2>
          </div>
          <div className="mt-10 space-y-4">
            {billing.items.map((b) => (
              <div
                key={b.label}
                className="flex flex-col gap-3 rounded-2xl bg-white p-6 ring-1 ring-line sm:flex-row sm:gap-6"
              >
                <span className="shrink-0 self-start rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand">
                  {b.label}
                </span>
                <p className="text-sm leading-relaxed text-ink-soft">{b.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 rounded-2xl border-2 border-accent/40 bg-accent/5 px-6 py-5 text-center text-sm leading-relaxed text-ink">
            {billing.closer}
          </p>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="text-center">
            <Kicker>Questions</Kicker>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              Before you start
            </h2>
          </div>
          <div className="mt-10 divide-y divide-line overflow-hidden rounded-2xl ring-1 ring-line">
            {trialFaqs.map((f) => (
              <details key={f.q} className="group bg-white">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-base font-bold text-ink hover:bg-surface">
                  {f.q}
                  <span className="shrink-0 text-brand transition-transform group-open:rotate-45">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA + form ────────────────────────────────────────── */}
      <section id="start" className="scroll-mt-8 bg-ink py-20 text-white">
        <div className="mx-auto max-w-xl px-5">
          <div className="text-center">
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              Seven days. Your own families.
              <br />
              <span className="text-cta">No guessing.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/70">
              Open your account, import your waitlist, and let the system answer
              every parent for a week. Then decide.
            </p>
          </div>

          <div className="mt-10 rounded-3xl bg-white p-6 text-ink shadow-2xl sm:p-8">
            <div className="mb-6 text-center">
              <span className="inline-flex rounded-full bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
                Free for {trial.days} days
              </span>
              <h3 className="mt-3 text-2xl font-extrabold text-ink">
                Start your trial
              </h3>
              <p className="mt-2 text-sm text-muted">
                Tell us about your program and pick an onboarding slot —
                we&apos;ll open your account and get you set up the same week.
              </p>
            </div>
            <CrmDemoForm
              source="educarecrm-vsl"
              submitLabel={`Start My ${trial.days}-Day Free Trial →`}
              footnote={formFootnote}
              successNote="last step: pick your onboarding slot below and your trial starts. 👇"
            />
          </div>

          <p className="mt-8 text-center text-sm text-white/70">
            Questions first?{" "}
            <a href={site.phoneHref} className="font-bold text-cta hover:underline">
              {site.phone}
            </a>{" "}
            ·{" "}
            <Link href="/educarecrm" className="font-bold text-cta hover:underline">
              See the full platform
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
