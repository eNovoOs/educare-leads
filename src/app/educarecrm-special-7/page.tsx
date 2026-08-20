import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";
import { CrmDemoForm } from "@/components/CrmDemoForm";
import { site } from "@/lib/site";
import { modules, programFit, replaces } from "@/lib/educarecrm";
import {
  trial,
  trialStats,
  week,
  unlocked,
  whyTrial,
  billing,
  trialFaqs,
} from "@/lib/educarecrm7";

export const metadata: Metadata = {
  title: "Start Your 7-Day Free Trial — Educare CRM",
  description:
    "Run your entire enrollment pipeline free for 7 days. Every module unlocked — AI front desk, tour booking, parent SMS, automations, and the full Academy. Cancel any time before day 7.",
  // Offer variant for paid traffic — kept out of the index so it doesn't
  // compete with /educarecrm in search. Flip to true to index it.
  robots: { index: false, follow: true },
};

/** Every trial CTA scrolls to the form. */
function TrialCta({
  children,
  variant = "solid",
}: {
  children: React.ReactNode;
  variant?: "solid" | "light";
}) {
  const variants =
    variant === "solid"
      ? "bg-cta text-white hover:bg-cta-dark shadow-lg shadow-cta/25"
      : "bg-white text-ink hover:bg-white/90 shadow-lg shadow-black/10";
  return (
    <a
      href="#start"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-colors sm:text-lg ${variants}`}
    >
      {children}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2.2"
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

/** Card-required disclosure. Repeated under every CTA, never buried. */
function CardNote({ light = false }: { light?: boolean }) {
  return (
    <p
      className={`mt-3 text-xs ${light ? "text-white/55" : "text-muted"}`}
    >
      {trial.cardNote}
    </p>
  );
}

export default function EducareCrmTrialPage() {
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

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-semibold text-ink-soft lg:flex">
            <a href="#week" className="hover:text-brand">Your first week</a>
            <a href="#unlocked" className="hover:text-brand">What&apos;s unlocked</a>
            <a href="#billing" className="hover:text-brand">How billing works</a>
            <a href="#faq" className="hover:text-brand">FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <a
              href={site.phoneHref}
              className="hidden text-sm font-bold text-ink hover:text-brand sm:block"
            >
              {site.phone}
            </a>
            <a
              href="#start"
              className="inline-flex items-center rounded-full bg-cta px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cta/25 transition-colors hover:bg-cta-dark"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[540px] w-[900px] -translate-x-1/2 rounded-full bg-brand/25 blur-[130px]"
        />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-accent ring-1 ring-accent/30">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {trial.eyebrow}
            </span>

            <h1 className="font-display mt-6 text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              {trial.h1a}
              <br />
              <span className="text-cta">{trial.h1b}</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              {trial.subhead}
            </p>
            <p className="mt-4 text-sm italic text-white/55">
              {trial.audienceLine}
            </p>

            <div className="mt-8">
              <TrialCta>{trial.primaryCta}</TrialCta>
              <CardNote light />
            </div>

            <p className="mt-6 flex items-center gap-2 text-sm text-white/60">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 2 4 6v6c0 5 3.4 9 8 10 4.6-1 8-5 8-10V6l-8-4Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
              {trial.trustLine}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              {trialStats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block text-2xl font-extrabold text-accent">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-white/60">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Signup card */}
          <div id="start" className="scroll-mt-24 lg:pt-4">
            <div className="rounded-3xl bg-white p-6 text-ink shadow-2xl ring-1 ring-black/5 sm:p-8">
              <div className="mb-6">
                <span className="inline-flex rounded-full bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
                  Free for {trial.days} days
                </span>
                <h2 className="mt-3 text-xl font-extrabold text-ink">
                  Start your trial
                </h2>
                <p className="mt-1.5 text-sm text-muted">
                  Tell us about your program and pick an onboarding slot —
                  we&apos;ll open your account and walk you through setup so you
                  don&apos;t lose a day of the trial.
                </p>
              </div>
              <CrmDemoForm
                source="educarecrm-trial-7"
                submitLabel={`Start My ${trial.days}-Day Free Trial →`}
                footnote={formFootnote}
                successNote={`last step: pick your onboarding slot below and your trial starts. 👇`}
              />
            </div>
          </div>
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


      {/* ── Why a trial ─────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <Kicker>{whyTrial.kicker}</Kicker>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              {whyTrial.title}
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {whyTrial.points.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl bg-surface p-7 ring-1 ring-line"
              >
                <h3 className="text-lg font-extrabold text-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Your first week ─────────────────────────────────────────── */}
      <section id="week" className="scroll-mt-20 bg-surface py-20">
        <div className="mx-auto max-w-4xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <Kicker>{week.kicker}</Kicker>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              {week.title}
            </h2>
            <p className="mt-4 text-lg text-muted">{week.intro}</p>
          </div>

          <ol className="mt-12 space-y-4">
            {week.days.map((d) => (
              <li
                key={d.label}
                className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line sm:flex-row sm:gap-7 sm:p-7"
              >
                <span className="shrink-0 self-start rounded-full bg-ink px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                  {d.label}
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-ink">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {d.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 text-center">
            <TrialCta>{trial.primaryCta}</TrialCta>
            <CardNote />
          </div>
        </div>
      </section>

      {/* ── What's unlocked ─────────────────────────────────────────── */}
      <section id="unlocked" className="scroll-mt-20 bg-white py-20">
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

          {/* Replaces */}
          <div className="mt-12 rounded-3xl bg-ink p-8 text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-white/60">
              Cancel these during your trial week
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {replaces.map((r) => (
                <span
                  key={r}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 line-through decoration-red-400 decoration-2"
                >
                  {r}
                </span>
              ))}
            </div>
            <p className="mt-6 text-base font-semibold text-white">
              Average saving: <span className="text-accent">$700/month</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Modules ─────────────────────────────────────────────────── */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <Kicker>What you&apos;re getting</Kicker>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              One platform. Every part of enrollment.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border border-line bg-white p-7 transition-shadow hover:shadow-lg"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="m5 13 4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-ink">
                  {m.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {m.body}
                </p>
              </div>
            ))}
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
      <section id="billing" className="scroll-mt-20 bg-white py-20">
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
                className="flex flex-col gap-3 rounded-2xl bg-surface p-6 ring-1 ring-line sm:flex-row sm:gap-6"
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
      <section id="faq" className="scroll-mt-20 bg-surface py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="text-center">
            <Kicker>Questions</Kicker>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              Before you start
            </h2>
          </div>
          <div className="mt-10 divide-y divide-line overflow-hidden rounded-2xl bg-white ring-1 ring-line">
            {trialFaqs.map((f) => (
              <details key={f.q} className="group">
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

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section className="bg-ink py-20 text-white">
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
              <h3 className="text-2xl font-extrabold text-ink">
                Start your {trial.days}-day free trial
              </h3>
              <p className="mt-2 text-sm text-muted">
                {trial.secondaryCta}
              </p>
            </div>
            <CrmDemoForm
              compact
              source="educarecrm-trial-7"
              submitLabel={`Start My ${trial.days}-Day Free Trial →`}
              footnote={formFootnote}
              successNote={`last step: pick your onboarding slot below and your trial starts. 👇`}
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
