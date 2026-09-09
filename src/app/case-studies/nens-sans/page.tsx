/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTAButton } from "@/components/CTAButton";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Study — Nen's Sans Daycare: A Bilingual Website Built to Enroll",
  description:
    "How we designed and built Nen's Sans Daycare a fast, bilingual (English–Spanish) website in Springfield, VA — turning visitors into booked tours.",
  alternates: { canonical: "/case-studies/nens-sans" },
};

const IMG = "/case-studies/nens-sans";
const SITE_URL = "https://www.nenssans.com/";

function Check({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const built = [
  {
    name: "Brand-aligned design",
    body: "A bright, trustworthy look built around their identity — warm, parent-friendly, and credible enough to justify premium tuition.",
  },
  {
    name: "Bilingual by design",
    body: "English–Spanish messaging throughout, so every family in their Springfield, VA market feels spoken to.",
  },
  {
    name: "Program pages by age",
    body: "Dedicated sections for Infants, Toddlers, Preschoolers, and After School — each with the details parents actually ask about.",
  },
  {
    name: "A clear path to enroll",
    body: "One obvious next step on every screen — Book a Tour — so interest turns into a scheduled visit instead of a bounce.",
  },
  {
    name: "Trust built in",
    body: "Safety, nutrition, and their neuroscience-based approach given real estate — the questions that decide where a parent enrolls.",
  },
  {
    name: "Content that ranks",
    body: "A Tips section for parenting and early-learning content, giving them a foundation to grow in local search over time.",
  },
];

const pages = [
  "Approach",
  "Programs",
  "Tuition",
  "Nutrition",
  "Safety",
  "Enrollment",
  "Tips",
  "Contact",
];

export default function NensSansCaseStudy() {
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

            <div className="mt-6 flex items-center gap-3">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white p-1.5 shadow-lg">
                <img src={`${IMG}/nens-sans-logo.png`} alt="Nen's Sans Daycare logo" className="h-full w-full object-contain" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">Nen&apos;s Sans Daycare</p>
                <p className="text-xs text-white/55">Bilingual early learning · Springfield, VA</p>
              </div>
            </div>

            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/90 ring-1 ring-white/15">
              <span className="h-2 w-2 rounded-full bg-cta" />
              Case study · Daycare &amp; childcare center
            </span>
            <h1 className="font-display mt-5 text-4xl uppercase leading-[1.02] sm:text-5xl lg:text-[3.6rem]">
              A bilingual daycare&apos;s{" "}
              <span className="text-cta">new home online</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              Nen&apos;s Sans had a neuroscience-based, English–Spanish program that
              families loved — but no website that showed it. We designed and built
              them one, built around a single job: turn visitors into booked tours.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-8 py-4 text-base font-bold text-white shadow-lg shadow-cta/25 transition-colors hover:bg-cta-dark"
              >
                Visit the live site
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <Link
                href="/#results"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/25 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
              >
                See more results
              </Link>
            </div>
          </div>

          {/* Hero visual card — mirrors the Laurus proof card layout */}
          <div className="relative">
            <span className="absolute -right-3 -top-3 z-10 rotate-6 rounded-full bg-accent px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-ink shadow-lg">
              Live site
            </span>
            <div className="rounded-3xl bg-white p-6 text-ink shadow-2xl ring-1 ring-black/5">
              <p className="text-sm font-semibold text-muted">The website we built</p>
              <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-line">
                <div className="flex items-center gap-1.5 bg-surface px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
                  <span className="ml-2 rounded bg-white px-2 py-0.5 text-[10px] text-muted ring-1 ring-line">nenssans.com</span>
                </div>
                <div className="bg-gradient-to-b from-white to-surface px-4 py-6 text-center">
                  <img src={`${IMG}/nens-sans-logo.png`} alt="" className="mx-auto h-16 w-auto object-contain" />
                  <p className="mt-2 font-bold text-ink">Nen&apos;s Sans Daycare</p>
                  <p className="text-xs text-muted">Bilingual early learning · Springfield, VA</p>
                  <span className="mt-3 inline-flex items-center rounded-full bg-cta px-4 py-1.5 text-xs font-bold text-white">
                    Book a Tour
                  </span>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                {[
                  ["EN · ES", "Bilingual"],
                  ["By age", "Programs"],
                  ["1 CTA", "Book a tour"],
                ].map(([v, l]) => (
                  <div key={l} className="rounded-lg bg-surface px-2 py-3">
                    <p className="font-display text-sm text-cta">{v}</p>
                    <p className="mt-0.5 text-[11px] text-muted">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SITUATION */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">The situation</p>
          <h2 className="font-display mt-3 text-3xl uppercase leading-tight text-ink sm:text-4xl">
            A great program with no shopfront
          </h2>
          <p className="mt-5 text-lg text-muted">
            Nen&apos;s Sans runs a bilingual (English–Spanish) early-learning
            program in Springfield, VA that blends neuroscience, early childhood
            development, and genuinely warm care. But when a parent went looking
            online, there was nothing that captured it — no clear way to
            understand the programs, weigh the safety and nutrition standards, or
            book a visit. In childcare, the website is the shopfront, and theirs
            was closed.
          </p>
        </div>
      </section>

      {/* WHAT WE BUILT */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-brand">What we built</p>
            <h2 className="font-display mt-2 text-3xl uppercase text-ink sm:text-4xl">
              A website built to enroll
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {built.map((it, i) => (
              <div key={it.name} className="rounded-2xl border border-line bg-white p-7">
                <span className="font-display grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cta text-lg text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-xl font-bold text-ink">{it.name}</h3>
                <p className="mt-3 text-muted">{it.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE SITE EMBED */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-cta">The site, live</p>
            <h2 className="font-display mt-2 text-3xl uppercase sm:text-4xl">
              See it for yourself
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              This is the real, live website — scroll around inside the frame, or
              open it in a new tab.
            </p>
          </div>

          {/* Browser mockup with a live iframe of the site */}
          <div className="mt-12 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-white/10">
            <div className="flex items-center gap-1.5 border-b border-line bg-surface px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-300" />
              <span className="h-3 w-3 rounded-full bg-amber-300" />
              <span className="h-3 w-3 rounded-full bg-green-300" />
              <a
                href={SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 truncate rounded-md bg-white px-3 py-1 text-xs text-muted ring-1 ring-line hover:text-brand"
              >
                nenssans.com
              </a>
            </div>
            <iframe
              src={SITE_URL}
              title="Nen's Sans Daycare — live website"
              loading="lazy"
              className="h-[640px] w-full bg-white"
            />
          </div>

          <div className="mt-8 text-center">
            <a
              href={SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-8 py-4 text-base font-bold text-white shadow-lg shadow-cta/25 transition-colors hover:bg-cta-dark"
            >
              Open the live site
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* INSIDE THE SITE */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-brand">Inside the build</p>
              <h2 className="font-display mt-3 text-3xl uppercase leading-tight text-ink sm:text-4xl">
                Every page a parent needs
              </h2>
              <p className="mt-5 text-lg text-muted">
                We built out the full journey — from first impression to booked
                tour — so parents can answer every question in one place and take
                the next step without friction.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Age-specific program pages",
                  "Transparent tuition & enrollment",
                  "Safety & nutrition, front and center",
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

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {pages.map((p) => (
                <div
                  key={p}
                  className="rounded-xl border border-line bg-surface px-4 py-4 text-center text-sm font-semibold text-ink-soft"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TAKEAWAY */}
      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">The takeaway</p>
          <p className="font-display mt-4 text-2xl uppercase leading-tight text-ink sm:text-3xl">
            &ldquo;A program parents already trusted, finally with a shopfront that
            earns the tour.&rdquo;
          </p>
          <p className="mx-auto mt-6 max-w-xl text-muted">
            The website is the first room every family walks into. We made sure
            Nen&apos;s Sans opens with a clear, bilingual, trustworthy space that
            leads straight to a booked visit.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-deep via-ink to-ink-soft text-white">
        <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-cta/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center">
          <h2 className="font-display text-3xl uppercase leading-tight sm:text-5xl">
            Need a site that fills your rooms?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
            A website is step one of the done-for-you enrollment system we install
            for daycares, schools, and camps — paired with ads, AI booking, and a
            CRM. Book a free call and we&apos;ll map it out for your program.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton size="lg">Book Your Free Call</CTAButton>
          </div>
          <p className="mt-4 text-sm text-white/50">
            Limited onboarding spots each month · {site.minMonthlyRevenue}+ programs only
          </p>
        </div>
      </section>

      {/* NOTE */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-10">
          <p className="text-xs leading-relaxed text-muted">
            <span className="font-semibold text-ink-soft">About this case study: </span>
            Nen&apos;s Sans Daycare is a real Educare Leads client. The website
            shown above is embedded live from nenssans.com and reflects the
            current build. Brand marks belong to Nen&apos;s Sans Daycare.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
