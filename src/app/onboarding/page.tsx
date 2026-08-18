import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { OnboardingForm } from "@/components/OnboardingForm";

export const metadata: Metadata = {
  title: "Client Onboarding — EduCare Leads",
  description:
    "Tell us everything we need to build your website, launch your ad campaigns, and fill your program.",
  robots: { index: false, follow: false },
};

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-surface">
      {/* Top bar */}
      <div className="border-b border-line bg-white">
        <div className="mx-auto max-w-3xl px-5 py-5">
          <Logo />
        </div>
      </div>

      {/* Intro */}
      <div className="mx-auto max-w-3xl px-5 pt-12 pb-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand">
          <span className="h-2 w-2 rounded-full bg-cta" /> New client onboarding
        </span>
        <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
          Let&apos;s build your enrollment system
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Fill this out once and we&apos;ll have everything we need to design your website, create your
          ad creatives, position your offer, and connect your accounts. Takes about 10 minutes — and you
          can paste links instead of uploading files.
        </p>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-3xl px-5 pb-24">
        <OnboardingForm />
      </div>
    </main>
  );
}
