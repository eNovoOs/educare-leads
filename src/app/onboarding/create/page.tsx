import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";
import { OnboardingLinkBuilder } from "@/components/OnboardingLinkBuilder";

export const metadata: Metadata = {
  title: "Create Client Onboarding Link - EduCare Leads",
  description: "Internal link builder for EduCare Leads client onboarding.",
  robots: { index: false, follow: false },
};

export default function CreateOnboardingPage() {
  return (
    <main className="min-h-screen bg-surface">
      <div className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 sm:px-8">
          <Logo />
          <span className="text-xs font-bold uppercase text-muted">Internal tool</span>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
        <Link href="/onboarding" className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:text-brand-dark">
          <ArrowLeft className="h-4 w-4" /> Open generic onboarding
        </Link>
        <h1 className="mt-6 text-3xl font-extrabold text-ink sm:text-4xl">Create a client onboarding link</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Select the services already included in the client project. Their link will open a tailored onboarding flow with no pricing decisions.
        </p>
        <div className="mt-7">
          <OnboardingLinkBuilder />
        </div>
      </div>
    </main>
  );
}
