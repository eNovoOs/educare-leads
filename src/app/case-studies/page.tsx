import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTAButton } from "@/components/CTAButton";
import { caseStudies, site, stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See campaign snapshots from EduCare Leads enrollment systems for daycares, private schools, and camps.",
  alternates: { canonical: "/case-studies" },
};

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CaseStudiesPage() {
  return (
    <>
      <Header />

      <main>
        <section className="relative overflow-hidden bg-ink text-white">
          <div className="pointer-events-none absolute -right-36 top-0 h-96 w-96 rounded-full bg-cta/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-brand/25 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-18 lg:grid-cols-[1.02fr_0.98fr] lg:py-24">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-cta">Case studies</p>
              <h1 className="font-display mt-4 text-4xl uppercase leading-[1.02] sm:text-5xl lg:text-[3.55rem]">
                Real enrollment campaigns. Real booked families.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/78">
                These snapshots show how the EduCare Enrollment System turns local
                parent attention into booked tours, applications, registrations, and
                filled rooms for childcare and education programs.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton size="lg">Map My Enrollment Plan</CTAButton>
                <Link
                  href="#studies"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/25 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
                >
                  View snapshots
                  <ArrowIcon />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[24rem] overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-white/15">
              <Image
                src="/educare-vsl-poster.jpg"
                alt="EduCare Leads campaign creative preview"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-sm font-bold uppercase tracking-wide text-cta">Campaign snapshot</p>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {stats.slice(0, 3).map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-white/10 p-3 backdrop-blur ring-1 ring-white/15">
                      <p className="font-display text-2xl text-accent">{stat.value}</p>
                      <p className="mt-1 text-xs leading-snug text-white/75">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 py-14 md:grid-cols-3">
            {[
              ["1", "We launch hyper-local ads for families near your program."],
              ["2", "AI replies instantly, qualifies parents, and books the next step."],
              ["3", "Every inquiry is tracked through the CRM to enrollment."],
            ].map(([n, text]) => (
              <div key={n} className="flex items-start gap-4 border-t border-line pt-5">
                <span className="font-display grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cta text-lg text-white">
                  {n}
                </span>
                <p className="text-lg font-semibold leading-snug text-ink">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="studies" className="scroll-mt-20 bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-wide text-brand">Proof by program type</p>
              <h2 className="font-display mt-2 text-3xl uppercase text-ink sm:text-4xl">
                Campaign snapshots from childcare, school, and camp enrollment
              </h2>
              <p className="mt-4 text-lg text-muted">
                Client names are anonymized here. Platform screenshots and exported
                reports can be added as source evidence once you share them.
              </p>
            </div>

            <div className="mt-12 space-y-8">
              {caseStudies.map((study, index) => (
                <article key={study.slug} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-line">
                  <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
                    <div className={index % 2 === 0 ? "bg-ink p-7 text-white lg:p-9" : "bg-cta p-7 text-white lg:p-9"}>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-white/12 px-3 py-1.5 text-xs font-bold uppercase tracking-wide ring-1 ring-white/15">
                          {study.label}
                        </span>
                        <span className="rounded-full bg-white/12 px-3 py-1.5 text-xs font-bold uppercase tracking-wide ring-1 ring-white/15">
                          {study.location}
                        </span>
                        <span className="rounded-full bg-white/12 px-3 py-1.5 text-xs font-bold uppercase tracking-wide ring-1 ring-white/15">
                          {study.timeframe}
                        </span>
                      </div>
                      <h3 className="font-display mt-6 text-3xl uppercase leading-tight">
                        {study.headline}
                      </h3>
                      <p className="mt-5 text-white/78">{study.summary}</p>
                      <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                        {study.metrics.map((metric) => (
                          <div key={metric.label} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                            <p className="font-display text-3xl text-accent">{metric.value}</p>
                            <p className="mt-1 text-sm text-white/74">{metric.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-7 lg:p-9">
                      <div className="grid gap-8 md:grid-cols-2">
                        <div>
                          <p className="text-sm font-bold uppercase tracking-wide text-muted">Before</p>
                          <ul className="mt-4 space-y-3">
                            {study.before.map((item) => (
                              <li key={item} className="flex items-start gap-3 text-ink-soft">
                                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-muted" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-bold uppercase tracking-wide text-brand">Installed</p>
                          <ul className="mt-4 space-y-3">
                            {study.installed.map((item) => (
                              <li key={item} className="flex items-start gap-3 text-ink-soft">
                                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cta/10 text-cta">
                                  <CheckIcon />
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <blockquote className="mt-8 border-l-4 border-cta pl-5">
                        <p className="text-lg font-semibold leading-relaxed text-ink">
                          &ldquo;{study.quote}&rdquo;
                        </p>
                        <footer className="mt-3 text-sm font-bold text-muted">{study.attribution}</footer>
                      </blockquote>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-brand">Source evidence</p>
              <h2 className="font-display mt-2 text-3xl uppercase text-ink sm:text-4xl">
                We can tighten this page with platform-level proof
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Meta campaign screenshots by client, date range, spend, leads, and booked calls",
                "Google Ads screenshots for search terms, conversions, CPA, and spend",
                "CRM or calendar exports showing booked tours, visits, applications, and show rates",
                "Enrollment outcomes tied back to the same date ranges",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-line bg-surface p-5">
                  <CheckIcon className="text-cta" />
                  <p className="mt-3 font-semibold leading-snug text-ink">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink text-white">
          <div className="mx-auto max-w-4xl px-5 py-20 text-center">
            <h2 className="font-display text-3xl uppercase leading-tight sm:text-5xl">
              Want numbers like these in your market?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">
              Book a free call and we&apos;ll map your local enrollment opportunity,
              likely lead volume, and the system needed to turn parent attention
              into booked family conversations.
            </p>
            <div className="mt-8 flex justify-center">
              <CTAButton size="lg">Book Your Free Call</CTAButton>
            </div>
            <p className="mt-4 text-sm text-white/50">
              For childcare and education programs above {site.minMonthlyRevenue}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
