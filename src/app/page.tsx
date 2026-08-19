/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTAButton } from "@/components/CTAButton";
import {
  site,
  stats,
  steps,
  results,
  faqs,
  systemInstall,
  audiences,
  twoKinds,
  costReceipt,
  smsThread,
  comparison,
} from "@/lib/site";

// Program-type photo cards (free-commercial-license stock from Pexels).
const serveCards = [
  {
    label: "Daycares & childcare",
    body: "Fill your infant, toddler & preschool rooms with local families ready to enroll.",
    img: "https://images.pexels.com/photos/8363102/pexels-photo-8363102.jpeg?auto=compress&cs=tinysrgb&w=800&h=640&fit=crop",
    alt: "Children playing with their teacher in a childcare classroom",
  },
  {
    label: "Private & independent schools",
    body: "Pack your open houses and applications ahead of every admissions season.",
    img: "https://images.pexels.com/photos/8613100/pexels-photo-8613100.jpeg?auto=compress&cs=tinysrgb&w=800&h=640&fit=crop",
    alt: "Teacher giving a lesson as students raise their hands",
  },
  {
    label: "Summer & enrichment camps",
    body: "Sell out your sessions weeks earlier with hyper-local, done-for-you ads.",
    img: "https://images.pexels.com/photos/9302795/pexels-photo-9302795.jpeg?auto=compress&cs=tinysrgb&w=800&h=640&fit=crop",
    alt: "Group of children at an outdoor summer camp",
  },
];

function Check({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-accent" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 21.4l1.4-6.8L2.2 9.9l6.9-.8L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-deep via-ink to-ink-soft text-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-brand/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -left-40 h-[28rem] w-[28rem] rounded-full bg-cta/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/90 ring-1 ring-white/15">
              <span className="h-2 w-2 rounded-full bg-cta" />
              For childcare &amp; education owners above {site.minMonthlyRevenue}
            </span>
            <h1 className="font-display mt-6 text-4xl uppercase leading-[1.02] sm:text-5xl lg:text-[3.7rem]">
              We book qualified families onto your calendar —{" "}
              <span className="text-cta">until every spot is full</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              We install a complete{" "}
              <span className="font-semibold text-white">done-for-you enrollment system</span>{" "}
              — ads, AI booking &amp; CRM — that fills your calendar with
              qualified families within 90 days of working with us.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton size="lg">Book Your Free Call</CTAButton>
              <Link
                href="/#results"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/25 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
              >
                See real results
              </Link>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-white/60">
              <Check className="text-cta" />
              No long contracts · Done-for-you, installed &amp; managed for you
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {audiences.map((a) => (
                <span
                  key={a}
                  className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 ring-1 ring-white/10"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Hero proof card */}
          <div className="relative">
            <span className="absolute -right-3 -top-3 z-10 rotate-6 rounded-full bg-accent px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-ink shadow-lg">
              Done-for-you
            </span>
            <div className="rounded-3xl bg-white p-6 text-ink shadow-2xl ring-1 ring-black/5">
              <p className="text-sm font-semibold text-muted">Live campaign snapshot</p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="font-display text-5xl tracking-tight text-cta">$14.10</p>
                  <p className="mt-1 text-sm font-medium text-muted">cost per booked family</p>
                </div>
                <span className="rounded-full bg-cta/10 px-3 py-1 text-xs font-bold text-cta-dark">
                  ▲ on pace
                </span>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  ["Families booked this month", "61"],
                  ["Show-up rate", "82%"],
                  ["New enrollments", "23"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-t border-line pt-3">
                    <span className="text-sm text-muted">{k}</span>
                    <span className="text-lg font-bold text-ink">{v}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-xl bg-surface px-4 py-3 text-sm font-medium text-ink-soft">
                “It took minutes to start seeing results.”
              </p>
            </div>
          </div>
        </div>

        {/* STAT BAR */}
        <div className="relative border-t border-white/10 bg-black/20">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 py-2 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="px-3 py-5 text-center">
                <p className="font-display text-2xl text-accent sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs leading-snug text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE — program-type photos */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-brand">Who we fill</p>
            <h2 className="font-display mt-2 text-3xl uppercase text-ink sm:text-4xl">
              Programs like yours, full again
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {serveCards.map((c) => (
              <div key={c.label} className="group overflow-hidden rounded-3xl bg-surface ring-1 ring-line">
                <div className="aspect-[5/4] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl uppercase text-ink">{c.label}</h3>
                  <p className="mt-2 text-muted">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TWO KINDS OF OWNERS */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-display mx-auto max-w-2xl text-center text-3xl uppercase text-ink sm:text-4xl">
            There are 2 kinds of program owners
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Bad */}
            <div className="rounded-3xl bg-surface p-8 ring-1 ring-line">
              <span className="font-display text-2xl uppercase text-muted">{twoKinds.bad.label}</span>
              <ul className="mt-5 space-y-3">
                {twoKinds.bad.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-ink-soft">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-50 text-red-500">
                      <Cross />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            {/* Good */}
            <div className="rounded-3xl bg-gradient-to-br from-ink to-ink-soft p-8 text-white shadow-xl">
              <span className="font-display text-2xl uppercase text-cta">{twoKinds.good.label}</span>
              <ul className="mt-5 space-y-3">
                {twoKinds.good.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-white/90">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cta/20 text-cta">
                      <Check />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COST OF INACTION — RECEIPT */}
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-cta">The cost of half-full</p>
            <h2 className="font-display mt-3 text-3xl uppercase leading-tight sm:text-4xl">
              Every empty spot is costing you{" "}
              <span className="text-accent">{costReceipt.perSpot}</span> a month
            </h2>
            <p className="mt-5 text-lg text-white/75">
              That&apos;s{" "}
              <span className="font-semibold text-accent">{costReceipt.totalYear} a year</span>, quietly —
              every year you stay half-full. Word-of-mouth and &ldquo;Google luck&rdquo;
              can&apos;t fill it fast enough.
            </p>
            <div className="mt-8">
              <CTAButton size="lg">Stop Paying for Empty Rooms</CTAButton>
            </div>
          </div>

          {/* Receipt */}
          <div className="mx-auto w-full max-w-sm rounded-2xl bg-white p-7 font-mono text-ink shadow-2xl">
            <p className="text-center text-sm font-bold tracking-widest text-ink">
              ★ ENROLLMENT CENTER ★
            </p>
            <p className="mt-1 text-center text-xs tracking-widest text-muted">MONTHLY LOSS</p>
            <div className="my-4 border-t border-dashed border-line" />
            <div className="space-y-2 text-sm">
              {costReceipt.lines.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-ink-soft">{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>
            <div className="my-4 border-t border-dashed border-line" />
            <div className="flex items-center justify-between text-base font-bold text-red-600">
              <span>TOTAL / MO</span>
              <span>{costReceipt.totalMonth}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-base font-bold text-red-600">
              <span>TOTAL / YR</span>
              <span>{costReceipt.totalYear}</span>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM */}
      <section id="how" className="scroll-mt-20 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-brand">How it works</p>
            <h2 className="font-display mt-2 text-3xl uppercase text-ink sm:text-4xl">
              Up and running in 3 steps
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-line bg-surface p-7">
                <span className="font-display text-4xl text-cta/25">{s.n}</span>
                <h3 className="mt-3 text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-3 text-muted">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <CTAButton size="lg">Get My Custom Enrollment Plan</CTAButton>
          </div>
        </div>
      </section>

      {/* AI 7-SECOND REPLY */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-brand">Built-in AI follow-up</p>
            <h2 className="font-display mt-3 text-3xl uppercase leading-tight text-ink sm:text-4xl">
              Our AI replies in <span className="text-cta">7 seconds</span>
            </h2>
            <p className="mt-5 text-lg text-muted">
              The moment a family inquires, our AI texts them, answers questions,
              qualifies them, and books the visit — straight onto your calendar.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "No front desk tied up on the phone",
                "No leads going cold overnight",
                "Just booked tours, visits & registrations",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-ink-soft">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cta/10 text-cta">
                    <Check />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Phone / SMS mockup */}
          <div className="mx-auto w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-line">
            <p className="border-b border-line pb-3 text-center text-sm font-bold text-ink">Messages</p>
            <div className="mt-4 space-y-3">
              {smsThread.map((m, i) =>
                m.from === "parent" ? (
                  <div key={i} className="mr-auto max-w-[80%] rounded-2xl rounded-bl-md bg-surface px-4 py-2.5 text-sm text-ink-soft ring-1 ring-line">
                    {m.text}
                  </div>
                ) : (
                  <div key={i} className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-cta px-4 py-2.5 text-sm font-medium text-white">
                    {m.text}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <h2 className="font-display mx-auto max-w-2xl text-center text-3xl uppercase text-ink sm:text-4xl">
            Not all &ldquo;enrollment ads&rdquo; are the same
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Them */}
            <div className="rounded-3xl bg-surface p-8 ring-1 ring-line">
              <p className="text-sm font-bold uppercase tracking-wide text-muted">{comparison.them.label}</p>
              <ul className="mt-5 space-y-4">
                {comparison.them.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-ink-soft">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-50 text-red-500">
                      <Cross />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            {/* Us */}
            <div className="relative rounded-3xl bg-gradient-to-br from-ink to-ink-soft p-8 text-white shadow-xl ring-2 ring-cta">
              <p className="text-sm font-bold uppercase tracking-wide text-cta">{comparison.us.label}</p>
              <ul className="mt-5 space-y-4">
                {comparison.us.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-white/90">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cta/20 text-cta">
                      <Check />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM WE INSTALL */}
      <section id="system" className="scroll-mt-20 bg-ink text-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-cta">{systemInstall.kicker}</p>
            <h2 className="font-display mt-2 text-3xl uppercase sm:text-4xl">{systemInstall.title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/75">{systemInstall.intro}</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {systemInstall.items.map((it, i) => (
              <div key={it.name} className="rounded-2xl bg-white/5 p-7 ring-1 ring-white/10">
                <div className="flex items-center gap-4">
                  <span className="font-display grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cta text-lg text-white">
                    {i + 1}
                  </span>
                  <h3 className="text-xl font-bold text-white">{it.name}</h3>
                </div>
                <p className="mt-4 text-white/75">{it.body}</p>
              </div>
            ))}
          </div>
          <p className="font-display mx-auto mt-10 max-w-xl text-center text-xl uppercase text-cta">
            {systemInstall.closer}
          </p>
          <div className="mt-8 text-center">
            <CTAButton size="lg">Book Your Free Call</CTAButton>
          </div>
        </div>
      </section>

      {/* RESULTS — Google-style reviews */}
      <section id="results" className="scroll-mt-20 bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-brand">Real Results</p>
            <h2 className="font-display mt-2 text-3xl uppercase text-ink sm:text-4xl">
              What owners say after 90 days
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {results.map((r) => (
              <div key={r.name} className="flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-line">
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-surface ring-1 ring-line">
                    {/* Google "G" */}
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                      <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7C21.8 18.9 23 15.9 23 12.3z" />
                      <path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.4 1.1-3.9 1.1-3 0-5.6-2-6.5-4.8H1.7v3C3.6 21.3 7.5 24 12 24z" />
                      <path fill="#FBBC05" d="M5.5 14.6a7.2 7.2 0 0 1 0-4.6v-3H1.7a12 12 0 0 0 0 10.6l3.8-3z" />
                      <path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.2 15.1 0 12 0 7.5 0 3.6 2.7 1.7 6.6l3.8 3C6.4 6.8 9 4.8 12 4.8z" />
                    </svg>
                  </span>
                  <Stars />
                </div>
                <p className="mt-4 font-display text-xl uppercase text-cta">{r.metric}</p>
                <p className="mt-3 flex-1 text-ink-soft">“{r.quote}”</p>
                <div className="mt-5 border-t border-line pt-4">
                  <p className="font-bold text-ink">{r.name}</p>
                  <p className="text-sm text-muted">{r.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 bg-white">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <h2 className="font-display text-center text-3xl uppercase text-ink sm:text-4xl">
            Questions, answered
          </h2>
          <div className="mt-10 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-line bg-surface p-5 [&_summary]:cursor-pointer">
                <summary className="flex items-center justify-between gap-4 font-bold text-ink list-none">
                  {f.q}
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-cta ring-1 ring-line transition-transform group-open:rotate-45">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-deep via-ink to-ink-soft text-white">
        <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-cta/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center">
          <h2 className="font-display text-3xl uppercase leading-tight sm:text-5xl">
            This is what demand looks like
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
            If your rooms aren&apos;t full this enrollment season, you&apos;ll
            feel it all year. Book a free 20-minute call and we&apos;ll map out
            exactly how many families your market can produce — and what it takes
            to fill every spot in 90 days.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton size="lg">Book Your Free Call</CTAButton>
          </div>
          <p className="mt-4 text-sm text-white/50">
            Limited onboarding spots each month · {site.minMonthlyRevenue}+ programs only
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
