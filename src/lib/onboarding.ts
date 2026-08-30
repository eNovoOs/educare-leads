export const ACCESS_INVITE_EMAIL = "media@revupcmo.com";

export const onboardingServiceCategories = [
  { id: "website", name: "Website and funnels" },
  { id: "paid-ads", name: "Paid ads" },
  { id: "crm", name: "CRM, automations, and follow-up" },
  { id: "cro", name: "Conversion and admissions" },
  { id: "local", name: "Google Business, reviews, and local SEO" },
  { id: "creative", name: "Creative, branding, and proof" },
  { id: "ai", name: "AI, reception, and advanced systems" },
  { id: "locations", name: "Multi-location support" },
  { id: "leadership", name: "Marketing leadership" },
] as const;

export type OnboardingServiceCategoryId =
  (typeof onboardingServiceCategories)[number]["id"];

export const onboardingServices = [
  {
    id: "full-website",
    category: "website",
    name: "Full childcare website build",
    description: "Complete website strategy, copy, design, build, and launch.",
  },
  {
    id: "website-management-build",
    category: "website",
    name: "Website build with management package",
    description: "Promotional website build delivered with an ongoing management engagement.",
  },
  {
    id: "landing-page",
    category: "website",
    name: "Landing page or enrollment funnel",
    description: "Focused lead-capture or tour-booking page for a campaign.",
  },
  {
    id: "website-hosting",
    category: "website",
    name: "Website hosting",
    description: "Hosting, domain connection, publishing, and uptime support.",
  },
  {
    id: "website-maintenance",
    category: "website",
    name: "Website updates and maintenance",
    description: "Ongoing program, content, page, and technical updates.",
  },
  {
    id: "meta-ads",
    category: "paid-ads",
    name: "Meta ads management",
    description: "Facebook and Instagram campaigns, audiences, creative testing, and tracking.",
  },
  {
    id: "seasonal-campaign",
    category: "paid-ads",
    name: "Seasonal campaign",
    description: "Time-sensitive campaigns for summer, back-to-school, openings, or events.",
  },
  {
    id: "google-ads-review",
    category: "paid-ads",
    name: "Google Ads account review",
    description: "Account structure, search terms, keywords, landing pages, and conversions.",
  },
  {
    id: "google-ads-management",
    category: "paid-ads",
    name: "Google Ads management",
    description: "Search campaign strategy, management, optimization, and reporting.",
  },
  {
    id: "google-conversion-tracking",
    category: "paid-ads",
    name: "Google conversion tracking setup",
    description: "Google Tag Manager, conversion events, and call or form tracking.",
  },
  {
    id: "crm-platform",
    category: "crm",
    name: "CRM platform",
    description: "CRM account access, lead tracking, visibility, and ongoing platform use.",
  },
  {
    id: "crm-setup",
    category: "crm",
    name: "CRM setup and pipeline",
    description: "Lead stages, age-group tags, source tracking, ownership, and routing.",
  },
  {
    id: "sms-email-automation",
    category: "crm",
    name: "SMS and email automation setup",
    description: "Inquiry follow-up, tour reminders, and post-tour sequences.",
  },
  {
    id: "full-cycle-email",
    category: "crm",
    name: "Full-cycle email marketing",
    description: "Strategy, writing, segmentation, campaign calendar, sending, and optimization.",
  },
  {
    id: "standalone-crm",
    category: "crm",
    name: "Standalone CRM setup",
    description: "CRM implementation without paid-ad management.",
  },
  {
    id: "advanced-automation",
    category: "crm",
    name: "Advanced automation buildout",
    description: "Complex workflows, nurture campaigns, reactivation, and internal notifications.",
  },
  {
    id: "cro-review",
    category: "cro",
    name: "Full CRO review",
    description: "Review the website, forms, calls-to-action, mobile flow, and follow-up path.",
  },
  {
    id: "cro-audit",
    category: "cro",
    name: "Standalone CRO audit",
    description: "Independent conversion audit with prioritized recommendations.",
  },
  {
    id: "landing-page-optimization",
    category: "cro",
    name: "Landing page optimization",
    description: "Improve page copy, form flow, calls-to-action, and conversion clarity.",
  },
  {
    id: "admissions-review",
    category: "cro",
    name: "Admissions follow-up review",
    description: "Review call scripts, SMS, email follow-up, and inquiry handling.",
  },
  {
    id: "google-business-optimization",
    category: "local",
    name: "Google Business Profile optimization",
    description: "Improve photos, services, description, categories, and local signals.",
  },
  {
    id: "review-generation",
    category: "local",
    name: "Review generation system",
    description: "Request, monitor, and respond to reviews from happy families.",
  },
  {
    id: "local-seo",
    category: "local",
    name: "Local SEO basics",
    description: "Local content, location pages, profile updates, and citations.",
  },
  {
    id: "reputation-system",
    category: "local",
    name: "Reputation and testimonial system",
    description: "Collect and organize written testimonials, video proof, and reviews.",
  },
  {
    id: "monthly-creative",
    category: "creative",
    name: "Monthly creative package",
    description: "Ad graphics, copy variations, and short-form creative direction.",
  },
  {
    id: "brand-refresh",
    category: "creative",
    name: "Brand refresh",
    description: "Colors, fonts, logo usage, and a simple visual system.",
  },
  {
    id: "testimonial-collection",
    category: "creative",
    name: "Testimonial collection system",
    description: "Written prompts, review links, and video testimonial requests.",
  },
  {
    id: "proof-assets",
    category: "creative",
    name: "Case study and proof asset package",
    description: "Outcomes, success stories, parent proof, and website trust sections.",
  },
  {
    id: "shoot-coordination",
    category: "creative",
    name: "Photo and video shoot coordination",
    description: "Plan the shot list, vendor, schedule, consent, and deliverables.",
  },
  {
    id: "ai-chatbot",
    category: "ai",
    name: "AI chatbot",
    description: "Website chat for common parent questions and lead capture.",
  },
  {
    id: "ai-reception",
    category: "ai",
    name: "AI receptionist",
    description: "Instant response, lead qualification, and appointment handling.",
  },
  {
    id: "advanced-routing",
    category: "ai",
    name: "Advanced call and text routing",
    description: "Route conversations by location, program, schedule, or lead status.",
  },
  {
    id: "reactivation-campaign",
    category: "ai",
    name: "Reactivation campaign",
    description: "Re-engage past leads, old inquiries, waitlists, and inactive families.",
  },
  {
    id: "multi-location",
    category: "locations",
    name: "Multi-location support",
    description: "Location-specific campaigns, capacity, routing, CRM, and reporting.",
  },
  {
    id: "fractional-cmo",
    category: "leadership",
    name: "Fractional CMO service",
    description: "Marketing leadership, planning, prioritization, meetings, and vendor coordination.",
  },
] as const;

export type OnboardingServiceId = (typeof onboardingServices)[number]["id"];

export const onboardingPresets = [
  {
    id: "starter",
    name: "Starter Enrollment System",
    description: "Meta ads, CRM, basic automations, and reporting inputs.",
    services: ["meta-ads", "crm-platform", "crm-setup", "sms-email-automation"],
  },
  {
    id: "growth",
    name: "Growth Partnership",
    description: "The standard enrollment growth system with landing-page and conversion support.",
    services: [
      "meta-ads",
      "landing-page",
      "crm-platform",
      "crm-setup",
      "sms-email-automation",
      "cro-review",
    ],
  },
  {
    id: "scale",
    name: "Scale Partnership",
    description: "Multi-channel growth, deeper automation, email marketing, and proof assets.",
    services: [
      "meta-ads",
      "google-ads-management",
      "google-conversion-tracking",
      "landing-page",
      "crm-platform",
      "crm-setup",
      "sms-email-automation",
      "full-cycle-email",
      "advanced-automation",
      "cro-review",
      "proof-assets",
    ],
  },
  {
    id: "fractional-cmo",
    name: "Fractional CMO",
    description: "Full marketing leadership with the main growth systems activated.",
    services: [
      "fractional-cmo",
      "meta-ads",
      "google-ads-management",
      "google-conversion-tracking",
      "full-website",
      "crm-platform",
      "crm-setup",
      "sms-email-automation",
      "full-cycle-email",
      "advanced-automation",
      "cro-review",
      "google-business-optimization",
      "review-generation",
      "monthly-creative",
      "brand-refresh",
      "proof-assets",
      "ai-reception",
      "multi-location",
    ],
  },
] as const satisfies ReadonlyArray<{
  id: string;
  name: string;
  description: string;
  services: readonly OnboardingServiceId[];
}>;

export type OnboardingPresetId = (typeof onboardingPresets)[number]["id"] | "custom";

export const defaultOnboardingServices: OnboardingServiceId[] = [
  ...onboardingPresets.find((preset) => preset.id === "growth")!.services,
];

const serviceIds = new Set<string>(onboardingServices.map((service) => service.id));

const legacyAliases: Record<string, OnboardingServiceId[]> = {
  website: ["full-website"],
  "google-ads": ["google-ads-management"],
  crm: ["crm-platform", "crm-setup", "sms-email-automation"],
  creative: ["monthly-creative"],
};

export function normalizeOnboardingServices(value?: string | string[]) {
  const raw = Array.isArray(value) ? value.join(",") : value || "";
  const selected = raw
    .split(",")
    .map((item) => item.trim())
    .flatMap((item) => legacyAliases[item] || (serviceIds.has(item) ? [item as OnboardingServiceId] : []));

  return selected.length ? [...new Set(selected)] : defaultOnboardingServices;
}

export function serviceName(id: string) {
  return onboardingServices.find((service) => service.id === id)?.name || id;
}

export function categoryName(id: string) {
  return onboardingServiceCategories.find((category) => category.id === id)?.name || id;
}

export function selectedCategoryIds(serviceIdsToGroup: readonly OnboardingServiceId[]) {
  const selected = new Set(serviceIdsToGroup);
  return onboardingServiceCategories
    .filter((category) =>
      onboardingServices.some(
        (service) => service.category === category.id && selected.has(service.id)
      )
    )
    .map((category) => category.id);
}
