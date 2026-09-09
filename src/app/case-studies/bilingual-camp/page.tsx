/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTAButton } from "@/components/CTAButton";
import { caseStudy, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Study — Laurus Summer Camp: Double the Clicks, Half the Cost",
  description:
    "How we rebuilt Laurus Summer Camp's ads, website, and registration flow — doubling click-through and cutting cost per click in half on a flat budget, year over year.",
  alternates: { canonical: "/case-studies/bilingual-camp" },
};

const IMG = "/case-studies/laurus";

function Check({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Delta({ value }: { value: string }) {
  const down = value.trim().startsWith("−") || value.trim().startsWith("-");
  const flat = value.toLowerCase().includes("flat");
  const tone = flat ? "text-muted" : down ? "text-accent" : "text-cta";
  return <span className={`font-bold ${tone}`}>{value}</span>;
}

export default function CaseStudyPage() {
  const cs = caseStudy;
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-deep via-ink to-ink-soft text-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-brand/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -left-40 h-[28rem] w-[28rem] rounded-full bg-cta/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All case studies
            </Link>

            {/* Brand lockup */}
            <div className="mt-6 flex items-center gap-3">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white p-1.5 shadow-lg">
                <img src={`${IMG}/laurus-logo.png`} alt="Laurus Summer Camp logo" className="h-full w-full object-contain" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">Laurus Summer Camp</p>
                <p className="text-xs text-white/55">Bilingual day camp · Canada</p>
              </div>
            </div>

            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/90 ring-1 ring-white/15">
              <span className="h-2 w-2 rounded-full bg-cta" />
              {cs.kicker}
            </span>
            <h1 className="font-display mt-5 text-4xl uppercase leading-[1.02] sm:text-5xl lg:text-[3.6rem]">
              Same budget.{" "}
              <span className="text-cta">Double the clicks.</span>{" "}
              Half the cost.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">{cs.sub}</p>
            <div className="mt-8">
              <CTAButton size="lg">Get Results Like These</CTAButton>
            </div>
            <p className="mt-4 text-xs text-white/40">{cs.window}</p>
          </div>

          {/* Hero proof card */}
          <div className="relative">
            <span className="absolute -right-3 -top-3 z-10 rotate-6 rounded-full bg-accent px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-ink shadow-lg">
              Flat budget
            </span>
            <div className="rounded-3xl bg-white p-6 text-ink shadow-2xl ring-1 ring-black/5">
              <p className="text-sm font-semibold text-muted">The clean comparison</p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="font-display text-6xl tracking-tight text-cta">{cs.hero.big}</p>
                  <p className="mt-1 max-w-[12rem] text-sm font-medium text-muted">{cs.hero.bigLabel}</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {cs.hero.rows.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-t border-line pt-3">
                    <span className="text-sm text-muted">{k}</span>
                    <Delta value={v} />
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-xl bg-surface px-4 py-3 text-sm font-medium text-ink-soft">
                {cs.hero.note}
              </p>
            </div>
          </div>
        </div>

        {/* SNAPSHOT BAR */}
        <div className="relative border-t border-white/10 bg-black/20">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 py-2 sm:grid-cols-4">
            {cs.snapshot.map((s) => (
              <div key={s.label} className="px-3 py-5 text-center">
                <p className="font-display text-3xl text-accent sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs leading-snug text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SITUATION */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">{cs.situation.kicker}</p>
          <h2 className="font-display mt-3 text-3xl uppercase leading-tight text-ink sm:text-4xl">
            {cs.situation.title}
          </h2>
          <p className="mt-5 text-lg text-muted">{cs.situation.body}</p>
        </div>
      </section>

      {/* WHAT WE INSTALLED */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-brand">{cs.installed.kicker}</p>
            <h2 className="font-display mt-2 text-3xl uppercase text-ink sm:text-4xl">
              {cs.installed.title}
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {cs.installed.items.map((it, i) => (
              <div key={it.name} className="rounded-2xl border border-line bg-white p-7">
                <div className="flex items-center gap-4">
                  <span className="font-display grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cta text-lg text-white">
                    {i + 1}
                  </span>
                  <h3 className="text-xl font-bold text-ink">{it.name}</h3>
                </div>
                <p className="mt-4 text-muted">{it.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REBUILT WEBSITE */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-brand">The destination</p>
              <h2 className="font-display mt-3 text-3xl uppercase leading-tight text-ink sm:text-4xl">
                A rebuilt website, built to convert
              </h2>
              <p className="mt-5 text-lg text-muted">
                We replaced the dated site with a conversion-optimized rebuild and
                dedicated landing pages per program — so the ad clicks we earned
                turned into registrations instead of bounces.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Clear, program-specific landing pages",
                  "Faster load, mobile-first layout",
                  "One obvious next step: register",
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

            {/* Browser mockup with the rebuilt-site screenshot */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-line">
              <div className="flex items-center gap-1.5 border-b border-line bg-surface px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-300" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-green-300" />
                <span className="ml-3 truncate rounded-md bg-white px-3 py-1 text-xs text-muted ring-1 ring-line">
                  laurussummercamp.com
                </span>
              </div>
              <div className="h-[460px] overflow-hidden">
                <img
                  src={`${IMG}/website-rebuild.jpg`}
                  alt="The rebuilt Laurus Summer Camp website"
                  width={900}
                  height={3589}
                  className="w-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CREATIVE — BEFORE / AFTER */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-brand">The creative</p>
            <h2 className="font-display mt-2 text-3xl uppercase text-ink sm:text-4xl">
              Ad creative that earns the click
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Same spend, same audience — but fresh creative and offers families
              hadn&apos;t scrolled past for two summers.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            <figure>
              <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
                <img src={`${IMG}/creative-before.jpg`} alt="Laurus ad creative before the refresh" width={1000} height={1005} className="w-full" />
              </div>
              <figcaption className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-muted">
                <span className="rounded-full bg-muted/10 px-2.5 py-0.5 text-xs uppercase tracking-wide">Before · 2025</span>
                Generic, low engagement
              </figcaption>
            </figure>
            <figure>
              <div className="overflow-hidden rounded-2xl bg-white ring-2 ring-cta">
                <img src={`${IMG}/creative-after.jpg`} alt="Laurus ad creative after the rebuild" width={1000} height={1000} className="w-full" />
              </div>
              <figcaption className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-ink">
                <span className="rounded-full bg-cta/10 px-2.5 py-0.5 text-xs uppercase tracking-wide text-cta-dark">After · 2026</span>
                2× click-through rate
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* RESULTS TABLE */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-cta">{cs.table.kicker}</p>
            <h2 className="font-display mt-2 text-3xl uppercase sm:text-4xl">{cs.table.title}</h2>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl ring-1 ring-white/10">
            <table className="w-full border-collapse text-left text-sm sm:text-base">
              <thead>
                <tr className="bg-white/5 text-white/60">
                  {cs.table.columns.map((c, i) => (
                    <th
                      key={c}
                      className={`px-4 py-4 font-semibold uppercase tracking-wide ${i === 0 ? "" : "text-right"}`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cs.table.rows.map((row, ri) => {
                  const emphasized = cs.table.highlight.includes(ri);
                  return (
                    <tr
                      key={row[0]}
                      className={`border-t border-white/10 ${emphasized ? "bg-cta/10" : ""}`}
                    >
                      <td className="px-4 py-3.5 font-medium text-white/90">{row[0]}</td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-white/60">{row[1]}</td>
                      <td className="px-4 py-3.5 text-right font-bold tabular-nums text-white">{row[2]}</td>
                      <td className="px-4 py-3.5 text-right">
                        <Delta value={row[3]} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Ads Manager evidence */}
          <figure className="mt-8">
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              <img src={`${IMG}/ads-results-2026.jpg`} alt="Meta Ads Manager — 2026 campaign results" width={1600} height={653} className="w-full" />
            </div>
            <figcaption className="mt-3 text-center text-xs text-white/50">
              Meta Ads Manager · Jan 1 – Jul 3, 2026 · segmented per-location lead campaigns
            </figcaption>
          </figure>

          {/* The three stories */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {cs.stories.map((s) => (
              <div key={s.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <h3 className="font-display text-lg uppercase text-cta">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCOUNT REBUILD — before / after structure */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-brand">The rebuild</p>
            <h2 className="font-display mt-2 text-3xl uppercase text-ink sm:text-4xl">
              From two generic campaigns to a lead engine
            </h2>
          </div>

          <div className="mt-12 space-y-8">
            <figure>
              <div className="overflow-hidden rounded-2xl ring-1 ring-line">
                <img src={`${IMG}/ads-baseline-2025.jpg`} alt="2025 account baseline in Meta Ads Manager" width={1600} height={263} className="w-full" />
              </div>
              <figcaption className="mt-3 text-center text-sm text-muted">
                <span className="font-semibold text-ink-soft">2025 —</span> two broad campaigns, no location or program segmentation.
              </figcaption>
            </figure>
            <figure>
              <div className="overflow-hidden rounded-2xl ring-2 ring-cta/40">
                <img src={`${IMG}/ads-structure-2026.jpg`} alt="2026 re-architected account structure in Meta Ads Manager" width={1600} height={615} className="w-full" />
              </div>
              <figcaption className="mt-3 text-center text-sm text-muted">
                <span className="font-semibold text-ink">2026 —</span> segmented per location &amp; program, plus dedicated website-lead and remarketing campaigns.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* TAKEAWAY */}
      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">The takeaway</p>
          <p className="font-display mt-4 text-2xl uppercase leading-tight text-ink sm:text-3xl">
            &ldquo;{cs.takeaway}&rdquo;
          </p>
          <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-3 text-left">
            {[
              "Twice the traffic — on the same ad budget",
              "4× the higher-intent families, at a lower cost each",
              "A website and registration flow that actually convert",
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
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-deep via-ink to-ink-soft text-white">
        <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-cta/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center">
          <h2 className="font-display text-3xl uppercase leading-tight sm:text-5xl">
            Want a full calendar like this?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
            We install the same done-for-you enrollment system for daycares,
            schools, and camps — ads, AI booking, and CRM. Book a free
            20-minute call and we&apos;ll map out how many families your market
            can produce.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton size="lg">Book Your Free Call</CTAButton>
          </div>
          <p className="mt-4 text-sm text-white/50">
            Limited onboarding spots each month · {site.minMonthlyRevenue}+ programs only
          </p>
        </div>
      </section>

      {/* METHODOLOGY / HONESTY NOTE */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-10">
          <p className="text-xs leading-relaxed text-muted">
            <span className="font-semibold text-ink-soft">How we measured: </span>
            {cs.methodology}
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
