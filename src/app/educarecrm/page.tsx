import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";
import { CrmDemoForm } from "@/components/CrmDemoForm";
import { site } from "@/lib/site";
import {
  crm,
  crmStats,
  painPoints,
  costOfStuck,
  modules,
  programFit,
  replaces,
  valueStack,
  academy,
  crmSteps,
  guarantee,
  crmFaqs,
  twoOptions,
} from "@/lib/educarecrm";

export const metadata: Metadata = {
  title: "Educare CRM — The Enrollment CRM for Daycares, Schools & Camps",
  description:
    "One system that answers every parent inquiry in seconds, books the tour, and tracks families to enrolled. Built for daycares, private schools, and camps. Replaces your scheduler, email tool, and spreadsheets.",
  alternates: { canonical: "/educarecrm" },
  openGraph: {
    title: "Educare CRM — Every Family Answered in Seconds",
    description:
      "The enrollment CRM built for childcare and education programs. Answer every inquiry instantly, book tours automatically, and fill your open spots.",
    url: "https://www.educareleads.com/educarecrm",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: crm.name }],
  },
  robots: { index: true, follow: true },
};

/** Anchor link to the booking form — every CTA on the page points here. */
function Cta({
  children,
  variant = "solid",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "light";
  className?: string;
}) {
  const variants = {
    solid: "bg-cta text-white hover:bg-cta-dark shadow-lg shadow-cta/25",
    outline: "border-2 border-white/70 text-white hover:bg-white hover:text-ink",
    light: "bg-white text-ink hover:bg-white/90 shadow-lg shadow-black/10",
  }[variant];
  return (
    <a
      href="#demo"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-colors sm:text-lg ${variants} ${className}`}
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

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
      {children}
    </p>
  );
}

export default function EducareCrmPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: crmFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

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
            <a href="#problem" className="hover:text-brand">The problem</a>
            <a href="#platform" className="hover:text-brand">Platform</a>
            <a href="#programs" className="hover:text-brand">Your program</a>
            <a href="#pricing" className="hover:text-brand">What&apos;s included</a>
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
              href="#demo"
              className="inline-flex items-center rounded-full bg-cta px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cta/25 transition-colors hover:bg-cta-dark"
            >
              Book a Demo
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
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ring-1 ring-white/15">
              <span className="h-2 w-2 rounded-full bg-cta" />
              {crm.eyebrow}
            </span>

            <h1 className="font-display mt-6 text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              {crm.h1a}
              <br />
              <span className="text-cta">{crm.h1b}</span>
              <br />
              {crm.h1c}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              {crm.subhead}
            </p>
            <p className="mt-4 text-sm italic text-white/55">
              {crm.audienceLine}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Cta>{crm.primaryCta}</Cta>
              <a
                href="#platform"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-7 py-4 text-base font-bold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                {crm.secondaryCta}
              </a>
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
              {crm.trustLine}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              {crmStats.map((s) => (
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

          {/* Booking card — above the fold, on every viewport */}
          <div id="demo" className="scroll-mt-24 lg:pt-4">
            <div className="rounded-3xl bg-white p-6 text-ink shadow-2xl ring-1 ring-black/5 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-extrabold text-ink">
                  See it running on your program
                </h2>
                <p className="mt-1.5 text-sm text-muted">
                  Book a 20-minute demo. We&apos;ll show you the system live and
                  add up what you&apos;re paying today across every tool.
                </p>
              </div>
              <CrmDemoForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem ─────────────────────────────────────────────────── */}
      <section id="problem" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <SectionKicker>Sound familiar?</SectionKicker>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
            You don&apos;t have a marketing problem.
            <br />
            You have a follow-up problem.
          </h2>
        </div>
        <ul className="mx-auto mt-12 grid max-w-4xl gap-4 px-5">
          {painPoints.map((p) => (
            <li
              key={p}
              className="flex gap-4 rounded-2xl bg-surface px-6 py-5 ring-1 ring-line"
            >
              <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-100 text-red-500">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M18 6 6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <p className="text-base leading-relaxed text-ink-soft">{p}</p>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-2xl px-5 text-center text-lg font-semibold text-ink">
          If that sounds like your week, you&apos;re exactly who this was built
          for.
        </p>
      </section>

      {/* ── Cost of staying stuck ───────────────────────────────────── */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <SectionKicker>{costOfStuck.kicker}</SectionKicker>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              {costOfStuck.title}
            </h2>
            <p className="mt-4 text-lg text-muted">{costOfStuck.intro}</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {costOfStuck.items.map((it) => (
              <div
                key={it.figure}
                className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-line"
              >
                <p className="text-3xl font-extrabold text-ink">{it.figure}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-accent">
                  {it.unit}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {it.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-ink px-7 py-8 text-center">
            <p className="mx-auto max-w-2xl text-lg font-semibold leading-relaxed text-white">
              {costOfStuck.closer}
            </p>
            <div className="mt-6">
              <Cta variant="light">Show me what I&apos;m losing</Cta>
            </div>
          </div>
        </div>
      </section>

      {/* ── Platform / modules ──────────────────────────────────────── */}
      <section id="platform" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <SectionKicker>The fix</SectionKicker>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              One platform. Every part of enrollment.
            </h2>
            <p className="mt-4 text-lg text-muted">
              Educare CRM replaces the stack you&apos;ve stitched together — and
              we set the whole thing up for you.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <div
                key={m.name}
                className="group rounded-2xl border border-line bg-white p-7 transition-shadow hover:shadow-lg"
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
                <h3 className="mt-5 text-lg font-extrabold text-ink">{m.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.body}</p>
              </div>
            ))}
          </div>

          {/* Replaces */}
          <div className="mt-14 rounded-3xl bg-surface p-8 text-center ring-1 ring-line">
            <p className="text-sm font-bold uppercase tracking-wide text-muted">
              Everything below, replaced by one login
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {replaces.map((r) => (
                <span
                  key={r}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-soft line-through decoration-red-400 decoration-2 ring-1 ring-line"
                >
                  {r}
                </span>
              ))}
            </div>
            <p className="mt-6 text-base font-semibold text-ink">
              Average saving: <span className="text-brand">$700/month</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Program fit ─────────────────────────────────────────────── */}
      <section id="programs" className="scroll-mt-20 bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cta">
              Built for your program
            </p>
            <h2 className="font-display mt-3 text-3xl tracking-tight sm:text-4xl">
              Not generic business software
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Most CRMs are built for &ldquo;service businesses&rdquo; and left
              for you to translate. This one already speaks enrollment.
            </p>
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

      {/* ── Academy ─────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionKicker>{academy.kicker}</SectionKicker>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              {academy.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {academy.intro}
            </p>
            <div className="mt-8">
              <Cta>Get My Free Enrollment Demo</Cta>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {academy.items.map((a) => (
              <div
                key={a.label}
                className="rounded-2xl bg-surface p-7 text-center ring-1 ring-line"
              >
                <p className="text-3xl font-extrabold text-brand">{a.value}</p>
                <p className="mt-1 text-sm font-semibold text-ink-soft">
                  {a.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value stack ─────────────────────────────────────────────── */}
      <section id="pricing" className="scroll-mt-20 bg-surface py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="text-center">
            <SectionKicker>{valueStack.kicker}</SectionKicker>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              {valueStack.title}
            </h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-line">
            <ul>
              {valueStack.items.map(([name, value]) => (
                <li
                  key={name}
                  className="flex items-center justify-between gap-4 border-b border-line px-6 py-4 last:border-0"
                >
                  <span className="flex items-center gap-3 text-sm font-medium text-ink sm:text-base">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="shrink-0 text-cta"
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
                    {name}
                  </span>
                  <span className="shrink-0 text-xs font-bold text-muted sm:text-sm">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
            <div className="bg-ink px-6 py-6 text-center text-white">
              <p className="text-xs font-bold uppercase tracking-wide text-white/60">
                {valueStack.totalLabel}
              </p>
              <p className="mt-1 text-3xl font-extrabold text-accent">
                {valueStack.total}
              </p>
              <p className="mt-3 text-sm text-white/70">{valueStack.saving}</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Cta>See my exact pricing</Cta>
            <p className="mt-3 text-sm text-muted">
              Pricing depends on locations and family volume — we&apos;ll show
              you the comparison in writing on the call.
            </p>
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <SectionKicker>Simple process</SectionKicker>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              Live in a week. Done for you.
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {crmSteps.map((s) => (
              <div key={s.n} className="relative">
                <span className="font-display text-5xl text-line">{s.n}</span>
                <h3 className="mt-2 text-xl font-extrabold text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guarantee ───────────────────────────────────────────────── */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="rounded-3xl border-2 border-accent/40 bg-white p-8 text-center shadow-sm sm:p-10">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 2 4 6v6c0 5 3.4 9 8 10 4.6-1 8-5 8-10V6l-8-4Z"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinejoin="round"
                />
                <path
                  d="m9 12 2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h2 className="font-display mt-5 text-2xl tracking-tight text-ink sm:text-3xl">
              {guarantee.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
              {guarantee.body}
            </p>
            <p className="mt-5 text-base font-bold text-ink">
              {guarantee.proof}
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section id="faq" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="text-center">
            <SectionKicker>Questions</SectionKicker>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
              Got questions? We&apos;ve got answers.
            </h2>
          </div>
          <div className="mt-10 divide-y divide-line overflow-hidden rounded-2xl ring-1 ring-line">
            {crmFaqs.map((f) => (
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

      {/* ── Two options + final CTA ─────────────────────────────────── */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-center text-3xl tracking-tight sm:text-4xl">
            You have two options
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">
                {twoOptions.a.label}
              </p>
              <p className="mt-3 leading-relaxed text-white/65">
                {twoOptions.a.body}
              </p>
            </div>
            <div className="rounded-2xl border-2 border-cta bg-cta/10 p-7">
              <p className="text-xs font-bold uppercase tracking-wide text-cta">
                {twoOptions.b.label}
              </p>
              <p className="mt-3 leading-relaxed text-white/90">
                {twoOptions.b.body}
              </p>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-xl rounded-3xl bg-white p-6 text-ink shadow-2xl sm:p-8">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-extrabold text-ink">
                Book your 20-minute demo
              </h3>
              <p className="mt-2 text-sm text-muted">
                See the system live, on your program&apos;s numbers.
              </p>
            </div>
            <CrmDemoForm compact />
          </div>

          <p className="mt-8 text-center text-sm text-white/55">
            No contracts · No risk · ROI Guaranteed
          </p>
          <p className="mt-6 text-center text-sm text-white/70">
            Prefer to talk now?{" "}
            <a href={site.phoneHref} className="font-bold text-cta hover:underline">
              {site.phone}
            </a>{" "}
            ·{" "}
            <Link href="/case-studies" className="font-bold text-cta hover:underline">
              See client results
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
