/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTAButton } from "@/components/CTAButton";
import { caseStudies, stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies — Real Enrollment Results",
  description:
    "Real results from the done-for-you enrollment system we install for daycares, schools, and camps. Browse the case studies and see the numbers.",
  alternates: { canonical: "/case-studies" },
};

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CaseStudiesIndex() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-deep via-ink to-ink-soft text-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-brand/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -left-40 h-[28rem] w-[28rem] rounded-full bg-cta/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center lg:py-24">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/90 ring-1 ring-white/15">
            <span className="h-2 w-2 rounded-full bg-cta" />
            Case studies
          </span>
          <h1 className="font-display mt-6 text-4xl uppercase leading-[1.02] sm:text-5xl lg:text-[3.4rem]">
            Real programs. <span className="text-cta">Real results.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            The numbers behind the done-for-you enrollment system we install for
            daycares, schools, and camps. Pick a story below and see exactly what
            changed.
          </p>
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

      {/* CARDS GRID */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={cs.href}
                className="group flex flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-line transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-cta/40"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand ring-1 ring-line">
                    {cs.tag}
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-cta/10 text-cta transition-colors group-hover:bg-cta group-hover:text-white">
                    <Arrow />
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-2.5">
                  {"logo" in cs && cs.logo ? (
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface p-1 ring-1 ring-line">
                      <img src={cs.logo} alt="" className="h-full w-full object-contain" />
                    </span>
                  ) : null}
                  <p className="text-sm font-medium text-muted">{cs.client}</p>
                </div>
                <h2 className="font-display mt-2 text-2xl uppercase leading-tight text-ink">
                  {cs.title}
                </h2>
                <p className="mt-3 flex-1 text-ink-soft">{cs.teaser}</p>

                <div className="mt-7 grid grid-cols-3 gap-3 border-t border-line pt-6">
                  {cs.stats.map((st) => (
                    <div key={st.label}>
                      <p className="font-display text-2xl text-cta">{st.value}</p>
                      <p className="mt-1 text-xs leading-snug text-muted">{st.label}</p>
                    </div>
                  ))}
                </div>

                <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-cta">
                  View case study
                  <Arrow className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}

            {/* More coming — placeholder card */}
            <div className="flex flex-col items-start justify-center rounded-3xl border-2 border-dashed border-line p-8 text-left">
              <span className="font-display text-2xl uppercase text-muted">
                More on the way
              </span>
              <p className="mt-3 text-muted">
                We&apos;re adding new daycare, school, and camp results as programs
                hit capacity. Want to be the next one?
              </p>
              <div className="mt-6">
                <CTAButton size="md">Book Your Free Call</CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-deep via-ink to-ink-soft text-white">
        <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-cta/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center">
          <h2 className="font-display text-3xl uppercase leading-tight sm:text-5xl">
            Your program could be the next case study
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
            Book a free 20-minute call and we&apos;ll map out how many families
            your market can produce — and what it takes to fill every spot in 90
            days.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton size="lg">Book Your Free Call</CTAButton>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
