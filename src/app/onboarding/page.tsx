import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { OnboardingForm } from "@/components/OnboardingForm";
import { normalizeOnboardingServices, onboardingPresets } from "@/lib/onboarding";

export const metadata: Metadata = {
  title: "Client Onboarding — EduCare Leads",
  description:
    "Tell us everything we need to build your website, launch your ad campaigns, and fill your program.",
  robots: { index: false, follow: false },
};

type OnboardingSearchParams = Promise<{
  client?: string | string[];
  services?: string | string[];
  preset?: string | string[];
  key?: string | string[];
}>;

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: OnboardingSearchParams;
}) {
  const params = await searchParams;
  const clientName = first(params.client)?.slice(0, 120) || "";
  const draftKey = first(params.key)?.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80) || "general";
  const serviceIds = normalizeOnboardingServices(params.services);
  const preset = onboardingPresets.find((item) => item.id === first(params.preset));

  return (
    <main className="min-h-screen bg-surface">
      <div className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Logo />
          <div className="text-right">
            <p className="text-xs font-semibold text-ink">Secure client onboarding</p>
            <p className="mt-0.5 text-xs text-muted">Your progress saves automatically</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <OnboardingForm
          clientName={clientName}
          draftKey={draftKey}
          serviceIds={serviceIds}
          presetId={preset?.id || "custom"}
          presetName={preset?.name || "Custom setup"}
        />
      </div>

      <footer className="border-t border-line bg-white px-5 py-5 text-center text-xs text-muted">
        Never send passwords through this form. EduCare Leads will only ask you to grant account access.
      </footer>
    </main>
  );
}
