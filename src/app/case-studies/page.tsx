import type { Metadata } from "next";
import {
  BadgeCheck,
  CalendarRange,
  Check,
  CircleDashed,
  Languages,
  MapPin,
  Search,
  Target,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CTAButton } from "@/components/CTAButton";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Summer Camp Advertising Case Study",
  description:
    "A source-labeled Meta and Google Ads campaign study for a multi-location summer camp, including spend, leads, impressions, CTR, and cost per lead.",
  alternates: { canonical: "/case-studies" },
};

const metaCampaigns = [
  {
    name: "General lead campaign",
    scope: "Multi-location",
    leads: 175,
    costPerLead: 4.04,
    spend: 707.85,
    impressions: 49_454,
  },
  {
    name: "Partner relaunch campaign",
    scope: "Multi-location",
    leads: 339,
    costPerLead: 2.63,
    spend: 892.02,
    impressions: 70_432,
  },
  {
    name: "French-language campaign",
    scope: "By location",
    leads: 557,
    costPerLead: 7.26,
    spend: 4_043.82,
    impressions: 282_684,
  },
  {
    name: "Remarketing campaign",
    scope: "Multi-location",
    leads: 77,
    costPerLead: 3.58,
    spend: 275.71,
    impressions: 15_905,
  },
  {
    name: "Location lead campaign",
    scope: "Ottawa",
    leads: 81,
    costPerLead: 6.13,
    spend: 496.47,
    impressions: 29_344,
  },
];

const metaTotals = metaCampaigns.reduce(
  (totals, campaign) => ({
    leads: totals.leads + campaign.leads,
    spend: totals.spend + campaign.spend,
    impressions: totals.impressions + campaign.impressions,
  }),
  { leads: 0, spend: 0, impressions: 0 },
);

const metaBlendedCostPerLead = metaTotals.spend / metaTotals.leads;
const googleTotals = {
  impressions: 423_980,
  spend: 25_112.46,
  ctr: 6.73,
  averageCpc: 0.88,
};

const formatNumber = new Intl.NumberFormat("en-CA");
const formatDollar = (value: number) =>
  `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
const formatCad = (value: number) =>
  `CA$${value.toLocaleString("en-CA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const metaSummary = [
  { value: formatNumber.format(metaTotals.leads), label: "Meta form leads" },
  {
    value: formatDollar(metaBlendedCostPerLead),
    label: "Blended cost per lead",
  },
  {
    value: formatNumber.format(metaTotals.impressions),
    label: "Meta impressions",
  },
  { value: formatDollar(metaTotals.spend), label: "Meta spend" },
];

const googleSummary = [
  {
    value: formatNumber.format(googleTotals.impressions),
    label: "Google impressions",
  },
  { value: `${googleTotals.ctr}%`, label: "Account CTR" },
  {
    value: formatCad(googleTotals.averageCpc),
    label: "Average CPC",
  },
  { value: formatCad(googleTotals.spend), label: "Google spend" },
];

function SourceLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border border-line bg-white px-3 py-2 text-xs font-bold uppercase text-ink">
      <BadgeCheck className="h-4 w-4 text-teal" aria-hidden />
      {children}
    </span>
  );
}

export default function CaseStudiesPage() {
  const combinedImpressions = metaTotals.impressions + googleTotals.impressions;

  return (
    <>
      <Header />

      <main>
        <section className="bg-ink text-white">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase text-accent">
                Verified campaign study
              </p>
              <h1 className="font-display mt-4 text-4xl uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
                1,229 Meta leads at a $5.22 blended cost per lead
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75 sm:text-xl">
                An anonymized, multi-location summer camp used English and French
                campaigns across Meta and Google to create demand throughout its
                2026 registration season.
              </p>
            </div>

            <div className="mt-10 grid border-y border-white/15 sm:grid-cols-3">
              <div className="py-5 sm:border-r sm:border-white/15 sm:pr-6">
                <p className="text-xs font-bold uppercase text-white/50">Program</p>
                <p className="mt-2 text-lg font-bold">Multi-location summer camp</p>
              </div>
              <div className="border-t border-white/15 py-5 sm:border-r sm:border-t-0 sm:border-white/15 sm:px-6">
                <p className="text-xs font-bold uppercase text-white/50">Markets</p>
                <p className="mt-2 text-lg font-bold">Canadian, English + French</p>
              </div>
              <div className="border-t border-white/15 py-5 sm:border-t-0 sm:pl-6">
                <p className="text-xs font-bold uppercase text-white/50">Sources</p>
                <p className="mt-2 text-lg font-bold">Meta Ads + Google Ads</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm font-bold uppercase text-brand">The campaign</p>
              <h2 className="font-display mt-2 text-3xl uppercase text-ink sm:text-4xl">
                Local intent, split by channel and language
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  icon: Languages,
                  title: "Bilingual structure",
                  body: "Separate English and French campaigns matched how families searched and responded.",
                },
                {
                  icon: MapPin,
                  title: "Location coverage",
                  body: "Campaigns covered all locations, with additional city-specific activity for Toronto and Ottawa.",
                },
                {
                  icon: Target,
                  title: "Meta lead capture",
                  body: "Instant forms and remarketing campaigns converted parent interest into trackable inquiries.",
                },
                {
                  icon: Search,
                  title: "Google demand capture",
                  body: "Search and Performance Max campaigns reached families actively researching camps.",
                },
              ].map((item) => (
                <div key={item.title} className="border-t border-line pt-5">
                  <item.icon className="h-6 w-6 text-cta" aria-hidden />
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="meta-results" className="scroll-mt-20 bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase text-brand">Meta Ads results</p>
                <h2 className="font-display mt-2 text-3xl uppercase text-ink sm:text-4xl">
                  Five campaigns generated 1,229 form leads
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">
                  Results below are form leads reported by Meta, not booked tours or
                  confirmed registrations.
                </p>
              </div>
              <div className="shrink-0">
                <SourceLabel>Jan 1 to Jul 30, 2026</SourceLabel>
              </div>
            </div>

            <div className="mt-10 grid border-y border-line bg-white sm:grid-cols-2 lg:grid-cols-4">
              {metaSummary.map((metric, index) => (
                <div
                  key={metric.label}
                  className={`p-5 lg:p-6 ${
                    index > 0 ? "border-t border-line sm:border-t-0 sm:border-l" : ""
                  } ${index === 2 ? "sm:border-l-0 lg:border-l" : ""}`}
                >
                  <p className="font-display text-3xl text-ink">{metric.value}</p>
                  <p className="mt-2 text-sm font-semibold text-muted">{metric.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-line bg-white">
              <div className="border-b border-line px-5 py-4">
                <h3 className="font-bold text-ink">Campaign detail</h3>
                <p className="mt-1 text-sm text-muted">
                  Campaign names are generalized to keep the client anonymous.
                </p>
              </div>
              <div className="divide-y divide-line md:hidden">
                {metaCampaigns.map((campaign) => (
                  <div key={campaign.name} className="px-5 py-5">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-bold text-ink">{campaign.name}</p>
                      <span className="shrink-0 text-xs font-semibold text-muted">
                        {campaign.scope}
                      </span>
                    </div>
                    <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
                      <div>
                        <dt className="text-xs font-bold uppercase text-muted">Leads</dt>
                        <dd className="mt-1 text-lg font-bold text-ink">
                          {formatNumber.format(campaign.leads)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-bold uppercase text-muted">Cost / lead</dt>
                        <dd className="mt-1 text-lg font-bold text-ink">
                          {formatDollar(campaign.costPerLead)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-bold uppercase text-muted">Spend</dt>
                        <dd className="mt-1 font-semibold text-ink">
                          {formatDollar(campaign.spend)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-bold uppercase text-muted">Impressions</dt>
                        <dd className="mt-1 font-semibold text-ink">
                          {formatNumber.format(campaign.impressions)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                ))}
                <div className="bg-surface px-5 py-5">
                  <p className="font-bold text-ink">Total / blended</p>
                  <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
                    <div>
                      <dt className="text-xs font-bold uppercase text-muted">Leads</dt>
                      <dd className="mt-1 text-lg font-bold text-ink">
                        {formatNumber.format(metaTotals.leads)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase text-muted">Cost / lead</dt>
                      <dd className="mt-1 text-lg font-bold text-ink">
                        {formatDollar(metaBlendedCostPerLead)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase text-muted">Spend</dt>
                      <dd className="mt-1 font-semibold text-ink">
                        {formatDollar(metaTotals.spend)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase text-muted">Impressions</dt>
                      <dd className="mt-1 font-semibold text-ink">
                        {formatNumber.format(metaTotals.impressions)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <thead className="bg-ink text-xs uppercase text-white/70">
                    <tr>
                      <th className="px-5 py-3 font-bold">Campaign</th>
                      <th className="px-5 py-3 font-bold">Scope</th>
                      <th className="px-5 py-3 text-right font-bold">Leads</th>
                      <th className="px-5 py-3 text-right font-bold">Cost / lead</th>
                      <th className="px-5 py-3 text-right font-bold">Spend</th>
                      <th className="px-5 py-3 text-right font-bold">Impressions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metaCampaigns.map((campaign) => (
                      <tr key={campaign.name} className="border-t border-line text-sm">
                        <td className="px-5 py-4 font-semibold text-ink">{campaign.name}</td>
                        <td className="px-5 py-4 text-muted">{campaign.scope}</td>
                        <td className="px-5 py-4 text-right font-semibold text-ink">
                          {formatNumber.format(campaign.leads)}
                        </td>
                        <td className="px-5 py-4 text-right text-ink">
                          {formatDollar(campaign.costPerLead)}
                        </td>
                        <td className="px-5 py-4 text-right text-ink">
                          {formatDollar(campaign.spend)}
                        </td>
                        <td className="px-5 py-4 text-right text-ink">
                          {formatNumber.format(campaign.impressions)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t-2 border-ink bg-surface text-sm font-bold text-ink">
                    <tr>
                      <td className="px-5 py-4" colSpan={2}>Total / blended</td>
                      <td className="px-5 py-4 text-right">{formatNumber.format(metaTotals.leads)}</td>
                      <td className="px-5 py-4 text-right">{formatDollar(metaBlendedCostPerLead)}</td>
                      <td className="px-5 py-4 text-right">{formatDollar(metaTotals.spend)}</td>
                      <td className="px-5 py-4 text-right">{formatNumber.format(metaTotals.impressions)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section id="google-results" className="scroll-mt-20 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase text-brand">Google Ads results</p>
                <h2 className="font-display mt-2 text-3xl uppercase text-ink sm:text-4xl">
                  423,980 impressions at a 6.73% click-through rate
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">
                  Search and Performance Max campaigns captured English and French
                  registration demand across the account.
                </p>
              </div>
              <div className="shrink-0">
                <SourceLabel>Jan 1 to Jul 31, 2026</SourceLabel>
              </div>
            </div>

            <div className="mt-10 grid border-y border-line sm:grid-cols-2 lg:grid-cols-4">
              {googleSummary.map((metric, index) => (
                <div
                  key={metric.label}
                  className={`py-5 lg:py-6 ${
                    index > 0 ? "border-t border-line sm:border-t-0 sm:border-l sm:pl-6" : ""
                  } ${index === 2 ? "sm:border-l-0 lg:border-l lg:pl-6" : ""}`}
                >
                  <p className="font-display text-3xl text-ink">{metric.value}</p>
                  <p className="mt-2 text-sm font-semibold text-muted">{metric.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-8 border-l-4 border-cta bg-surface px-6 py-6 md:grid-cols-[0.7fr_1.3fr] md:px-8">
              <div>
                <p className="text-sm font-bold uppercase text-brand">Strongest search signal</p>
                <p className="font-display mt-2 text-4xl text-ink">16.68% CTR</p>
                <p className="mt-1 font-semibold text-muted">English, all locations</p>
              </div>
              <div className="md:border-l md:border-line md:pl-8">
                <p className="leading-relaxed text-ink-soft">
                  The highest-volume English search campaign recorded 45,166
                  impressions, a 16.68% CTR, and a CA$0.71 average CPC. That is a
                  useful indicator of strong local search intent, but it is not an
                  enrollment or revenue claim.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-ink text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
            <div>
              <p className="text-sm font-bold uppercase text-accent">Combined visibility</p>
              <p className="font-display mt-3 text-5xl sm:text-6xl">
                {formatNumber.format(combinedImpressions)}
              </p>
              <p className="mt-2 text-lg font-bold">reported ad impressions</p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
                Meta through July 30 plus Google through July 31. Impressions are
                not unique people and may overlap across channels.
              </p>
            </div>
            <div>
              <h2 className="font-display text-3xl uppercase sm:text-4xl">
                What these numbers prove, and what they do not
              </h2>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {[
                  "Meta form submissions, spend, and campaign-level cost per lead are verified.",
                  "Google impressions, spend, CTR, and average CPC are verified.",
                ].map((item) => (
                  <div key={item} className="flex gap-3 border-t border-white/15 pt-4">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                    <p className="text-sm leading-relaxed text-white/80">{item}</p>
                  </div>
                ))}
                {[
                  "Booked tours and appointments still need a CRM or calendar export.",
                  "Registrations, enrollment revenue, and ROAS are not claimed in this study.",
                ].map((item) => (
                  <div key={item} className="flex gap-3 border-t border-white/15 pt-4">
                    <CircleDashed className="mt-0.5 h-5 w-5 shrink-0 text-white/45" aria-hidden />
                    <p className="text-sm leading-relaxed text-white/65">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface">
          <div className="mx-auto max-w-4xl px-5 py-16 text-center lg:py-20">
            <CalendarRange className="mx-auto h-8 w-8 text-cta" aria-hidden />
            <h2 className="font-display mt-5 text-3xl uppercase leading-tight text-ink sm:text-5xl">
              Build a measurable enrollment campaign in your market
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              We&apos;ll map the channels, languages, locations, and follow-up needed
              for your program, then show you exactly how performance will be tracked.
            </p>
            <div className="mt-8 flex justify-center">
              <CTAButton size="lg">Map My Enrollment Plan</CTAButton>
            </div>
            <p className="mt-4 text-sm text-muted">
              For childcare and education programs above {site.minMonthlyRevenue}
            </p>
            <p className="mt-8 text-xs text-muted">
              Data reviewed in Meta Ads Manager and Google Ads on September 8, 2026.
              Results vary by market, offer, budget, and follow-up.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
