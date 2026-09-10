/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTAButton } from "@/components/CTAButton";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Study — Nemesis Basketball: The Whole Enrollment Engine",
  description:
    "How we became the whole marketing and enrollment engine for Nemesis Basketball — brand, always-on bilingual social, multi-season registration ads, merch, events, and the website — for 18+ months across Québec.",
  alternates: { canonical: "/case-studies/nemesis" },
};

const IMG = "/case-studies/nemesis";

const snapshot = [
  { value: "18+ mo", label: "Always-on marketing — renewed season after season" },
  { value: "Full stack", label: "Brand → website, one team" },
  { value: "FR · EN", label: "Bilingual, built for Québec" },
  { value: "Leads + Reg.", label: "Two ad objectives, every season" },
];

const serviceTags = [
  "Brand & Identity",
  "Paid Social Ads",
  "Social Media",
  "Web · Merch · Events",
];

const installed = [
  {
    name: "Built and ran the brand",
    body: "The winged Nemesis identity, French-first — plus program thumbnails and a full merch line families could wear.",
  },
  {
    name: "Ran always-on bilingual social",
    body: "18+ months of continuous content across every season on the calendar — never dark, never a gap between campaigns.",
  },
  {
    name: "Ran multi-season registration ads",
    body: "Separate lead-gen and direct program-registration campaigns, segmented by program and age (4–11, 12–17, tryouts).",
  },
  {
    name: "Handled the rest of the funnel",
    body: "The website, the merchandise, and the marketing for the annual end-of-season gala — one team, end to end.",
  },
];

function Check({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function NemesisCaseStudyPage() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-deep via-ink to-ink-soft text-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-brand/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -left-40 h-[28rem] w-[28rem] rounded-full bg-cta/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
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
                <img src={`${IMG}/nemesis-logo-dark.png`} alt="Nemesis Basketball logo" className="h-full w-full object-contain" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">Nemesis Basketball</p>
                <p className="text-xs text-white/55">Youth sports · Basketball program · Québec</p>
              </div>
            </div>

            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/90 ring-1 ring-white/15">
              <span className="h-2 w-2 rounded-full bg-cta" />
              Case study · Youth sports program
            </span>
            <h1 className="font-display mt-5 text-4xl uppercase leading-[1.03] sm:text-5xl lg:text-[3.4rem]">
              The whole marketing department for a{" "}
              <span className="text-cta">growing basketball program.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              Nemesis Basketball runs youth programs across Québec — recreational
              to elite, ages 4 to 17. We didn&apos;t run one campaign. We became
              their marketing team: the brand, the always-on bilingual social,
              the registration ads every season, the merch, the events, and the
              site — season after season.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {serviceTags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 ring-1 ring-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <CTAButton size="lg">Get Results Like These</CTAButton>
            </div>
            <p className="mt-4 text-xs text-white/40">2024 – 2025 · always-on, renewed</p>
          </div>

          {/* Hero image */}
          <figure className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/15">
              <img
                src={`${IMG}/nemesis-hero.jpg`}
                alt="One season's campaign — recreational programs, ages 4–17, Terrebonne / Mascouche"
                width={1200}
                height={1200}
                className="w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center text-xs text-white/45">
              One season&apos;s campaign — recreational programs, ages 4–17, Terrebonne / Mascouche
            </figcaption>
          </figure>
        </div>

        {/* SNAPSHOT BAR */}
        <div className="relative border-t border-white/10 bg-black/20">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 py-2 sm:grid-cols-4">
            {snapshot.map((s) => (
              <div key={s.value} className="px-3 py-5 text-center">
                <p className="font-display text-2xl text-accent sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs leading-snug text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE CHALLENGE */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">The challenge</p>
          <h2 className="font-display mt-3 text-3xl uppercase leading-tight text-ink sm:text-4xl">
            Where Nemesis Basketball started
          </h2>
          <p className="mt-5 text-lg text-muted">
            A youth basketball program lives and dies by enrollment — and
            enrollment resets every season. Nemesis had to fill recreational,
            competitive and elite programs across the calendar, in a bilingual
            Québec market, competing for families&apos; attention against every
            other activity. That doesn&apos;t need a one-off campaign. It needs
            an enrollment engine that never stops.
          </p>
        </div>
      </section>

      {/* WHAT WE DID */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-brand">What we did</p>
            <h2 className="font-display mt-2 text-3xl uppercase text-ink sm:text-4xl">
              Done-for-you, end to end
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              We ran Nemesis through the same done-for-you approach we use with
              every program — grounded in data, not guesswork. One team owned it
              all, season after season.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {installed.map((it, i) => (
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

      {/* THE CREATIVE */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-brand">The creative</p>
            <h2 className="font-display mt-2 text-3xl uppercase text-ink sm:text-4xl">
              Creative that fills programs
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              A slice of the creative we ran — season ads, the girls&apos; tryout
              campaign, and the merch line families actually wore.
            </p>
          </div>
          <figure className="mx-auto mt-12 max-w-5xl">
            <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
              <img
                src={`${IMG}/nemesis-creative.jpg`}
                alt="A slice of the Nemesis creative — season ads, the girls' tryout campaign, and the merch line"
                width={1600}
                height={900}
                className="w-full"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* THE SITE WE BUILT */}
      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">What we built</p>
          <h2 className="font-display mt-3 text-3xl uppercase leading-tight text-ink sm:text-4xl">
            A bilingual site built to convert
          </h2>
          <p className="mt-5 text-lg text-muted">
            We built and ran the Nemesis home — French-first, bilingual, and
            structured to turn attention into registrations. Every program, from
            the spring league to elite and tournaments, had a clear path to
            &ldquo;rejoignez une équipe.&rdquo;
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "French-first, fully bilingual for the Québec market",
              "A page for every program — recreational to elite",
              "One obvious next step on every page: register",
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

      {/* THE RESULTS */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <p className="text-sm font-bold uppercase tracking-wide text-cta">The results</p>
          <h2 className="font-display mt-2 text-3xl uppercase sm:text-4xl">What changed</h2>
          <p className="mt-6 text-lg leading-relaxed text-white/80">
            We became that engine. Nemesis runs on one team handling the brand,
            the content, and the acquisition end to end — and they&apos;ve
            renewed us season after season for 18+ months. We&apos;re not putting
            fabricated numbers on this page: the honest proof is the breadth and
            the continuity. A brand families recognize, ads running every season
            for both leads and direct registration, and a bilingual site built
            to convert — all pulling in the same direction, all year.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["A brand families recognize", "Identity, thumbnails, and merch"],
              ["Ads every season", "Leads + direct registration"],
              ["A site that converts", "Bilingual, built for Québec"],
            ].map(([t, s]) => (
              <div key={t} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <p className="font-display text-lg uppercase text-cta">{t}</p>
                <p className="mt-2 text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-deep via-ink to-ink-soft text-white">
        <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-cta/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center">
          <h2 className="font-display text-3xl uppercase leading-tight sm:text-5xl">
            Want results like Nemesis Basketball?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
            We install the same done-for-you enrollment system for daycares,
            schools, camps, and youth programs — ads, AI booking, and CRM. Book a
            free 20-minute call and we&apos;ll map the growth plan for your
            program.
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
