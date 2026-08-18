import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { LeadForm } from "@/components/LeadForm";
import { VslPlayer } from "@/components/VslPlayer";
import { site, stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book Your Free Strategy Call",
  description:
    "Apply for a free enrollment strategy call with EduCare Leads. We'll map out how to fill your daycare, school, or camp to capacity in 90 days.",
  robots: { index: false, follow: true },
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-ink text-white">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <Logo light />
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 lg:grid-cols-[1fr_0.9fr]">
        {/* Left: pitch */}
        <div className="lg:pt-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ring-1 ring-white/15">
            <span className="h-2 w-2 rounded-full bg-cta" /> Free 20-minute call
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            You&apos;re one call away from a <span className="text-cta">full program</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/75">
            Tell us about your program below and book your free strategy call.
            We&apos;ll build a custom plan to fill your open spots in 90 days —
            including projected lead volume and cost per enrollment for your market.
          </p>

          {/* VSL placeholder */}
          <div className="mt-8 aspect-video w-full max-w-lg overflow-hidden rounded-2xl bg-black/40 ring-1 ring-white/10">
            <VslPlayer />
          </div>
          <p className="mt-2 text-sm text-white/60">
            Watch: How we fill programs in 90 days
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold text-accent">{s.value}</p>
                <p className="text-xs text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form card */}
        <div>
          <div className="rounded-3xl bg-white p-6 text-ink shadow-2xl ring-1 ring-black/5 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-ink">Apply for your strategy call</h2>
              <p className="mt-1 text-sm text-muted">
                For programs doing {site.minMonthlyRevenue}+. Takes 60 seconds.
              </p>
            </div>
            <LeadForm />
          </div>
        </div>
      </div>
    </main>
  );
}
