"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock3,
  Copy,
  ExternalLink,
  HelpCircle,
  LockKeyhole,
  Mail,
  Save,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  ACCESS_INVITE_EMAIL,
  onboardingServiceCategories,
  onboardingServices,
  type OnboardingServiceId,
} from "@/lib/onboarding";
import { site } from "@/lib/site";

type FormValue = string | string[];
type FormState = Record<string, FormValue>;
type SubmissionStatus = "idle" | "loading" | "success" | "error";
type SaveStatus = "loading" | "saved" | "saving";

type OnboardingFormProps = {
  clientName: string;
  draftKey: string;
  serviceIds: OnboardingServiceId[];
  presetId: string;
  presetName: string;
};

type FieldProps = {
  name: string;
  label: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  hint?: string;
  error?: string;
};

const inputClass =
  "w-full rounded-lg border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15";
const labelClass = "mb-1.5 block text-sm font-semibold text-ink";

const programOptions = [
  "Infant care",
  "Toddler program",
  "Preschool or Pre-K",
  "Before and after school",
  "Private school",
  "Summer camp",
  "Enrichment program",
  "Other",
];

const metaServiceIds: OnboardingServiceId[] = ["meta-ads", "seasonal-campaign"];
const googleAdsServiceIds: OnboardingServiceId[] = [
  "google-ads-review",
  "google-ads-management",
  "google-conversion-tracking",
];
const websiteServiceIds: OnboardingServiceId[] = [
  "full-website",
  "website-management-build",
  "landing-page",
  "website-hosting",
  "website-maintenance",
];
const crmServiceIds: OnboardingServiceId[] = [
  "crm-platform",
  "crm-setup",
  "sms-email-automation",
  "full-cycle-email",
  "standalone-crm",
  "advanced-automation",
];
const croServiceIds: OnboardingServiceId[] = [
  "cro-review",
  "cro-audit",
  "landing-page-optimization",
  "admissions-review",
];
const localServiceIds: OnboardingServiceId[] = [
  "google-business-optimization",
  "review-generation",
  "local-seo",
  "reputation-system",
];
const creativeServiceIds: OnboardingServiceId[] = [
  "monthly-creative",
  "brand-refresh",
  "testimonial-collection",
  "proof-assets",
  "shoot-coordination",
];
const aiServiceIds: OnboardingServiceId[] = [
  "ai-chatbot",
  "ai-reception",
  "advanced-routing",
  "reactivation-campaign",
];

function includesAny(selected: Set<OnboardingServiceId>, ids: readonly OnboardingServiceId[]) {
  return ids.some((id) => selected.has(id));
}

const steps = [
  { id: "business", label: "Your business", short: "Business" },
  { id: "program", label: "Programs and goals", short: "Programs" },
  { id: "assets", label: "Brand and assets", short: "Assets" },
  { id: "access", label: "Account access", short: "Access" },
  { id: "setup", label: "Service setup", short: "Setup" },
  { id: "review", label: "Review and submit", short: "Review" },
] as const;

function stringValue(value: FormValue | undefined) {
  return typeof value === "string" ? value : "";
}

function arrayValue(value: FormValue | undefined) {
  return Array.isArray(value) ? value : [];
}

function Field({
  name,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  hint,
  error,
}: FieldProps) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label} {required && <span className="text-cta">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
        className={`${inputClass} ${error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""}`}
      />
      {hint && !error && (
        <p id={`${name}-hint`} className="mt-1.5 text-xs leading-5 text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function Area({
  name,
  label,
  value,
  onChange,
  placeholder,
  hint,
  rows = 4,
}: Omit<FieldProps, "type" | "required" | "error"> & { rows?: number }) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`${inputClass} resize-y`}
      />
      {hint && <p className="mt-1.5 text-xs leading-5 text-muted">{hint}</p>}
    </div>
  );
}

function SelectField({
  name,
  label,
  value,
  onChange,
  options,
  hint,
}: Omit<FieldProps, "placeholder" | "type" | "required" | "error"> & { options: string[] }) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          className={`${inputClass} appearance-none pr-10`}
        >
          <option value="">Select an answer</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      </div>
      {hint && <p className="mt-1.5 text-xs leading-5 text-muted">{hint}</p>}
    </div>
  );
}

function ChoiceGroup({
  name,
  label,
  options,
  selected,
  onChange,
  hint,
}: {
  name: string;
  label: string;
  options: string[];
  selected: string[];
  onChange: (name: string, value: string[]) => void;
  hint?: string;
}) {
  function toggle(option: string) {
    onChange(
      name,
      selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option]
    );
  }

  return (
    <fieldset>
      <legend className={labelClass}>{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const checked = selected.includes(option);
          return (
            <label
              key={option}
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2.5 text-sm transition ${
                checked
                  ? "border-brand bg-brand/5 font-semibold text-ink"
                  : "border-line bg-white text-ink hover:border-brand/40"
              }`}
            >
              <input
                type="checkbox"
                name={name}
                value={option}
                checked={checked}
                onChange={() => toggle(option)}
                className="sr-only"
              />
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                  checked ? "border-brand bg-brand text-white" : "border-line bg-white"
                }`}
              >
                {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </span>
              {option}
            </label>
          );
        })}
      </div>
      {hint && <p className="mt-1.5 text-xs leading-5 text-muted">{hint}</p>}
    </fieldset>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="mb-7 border-b border-line pb-6">
      <p className="text-xs font-bold uppercase text-brand">{eyebrow}</p>
      <h1 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">{description}</p>
    </header>
  );
}

function AccessGuide({
  platform,
  description,
  status,
  onStatusChange,
  settingsUrl,
  settingsLabel,
  helpUrl,
  accessLevel,
  steps: guideSteps,
}: {
  platform: string;
  description: string;
  status: string;
  onStatusChange: (value: string) => void;
  settingsUrl: string;
  settingsLabel: string;
  helpUrl?: string;
  accessLevel: string;
  steps: string[];
}) {
  const [showGuide, setShowGuide] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(ACCESS_INVITE_EMAIL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function bookHelp() {
    onStatusChange("Help requested");
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: site.calendlyUrl });
    } else {
      window.open(site.calendlyUrl, "_blank", "noopener,noreferrer");
    }
  }

  const complete = status === "Invitation sent";
  const helpRequested = status === "Help requested";

  return (
    <article className="rounded-lg border border-line bg-white">
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-ink">{platform}</h3>
              {complete && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Sent
                </span>
              )}
              {helpRequested && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700">
                  <Clock3 className="h-3.5 w-3.5" /> Help requested
                </span>
              )}
            </div>
            <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
          </div>
          <ShieldCheck className="h-5 w-5 shrink-0 text-teal" />
        </div>

        <div className="mt-4 flex flex-col gap-2 rounded-lg border border-line bg-surface p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-muted">Invite this email with {accessLevel}</p>
            <p className="truncate text-sm font-bold text-ink">{ACCESS_INVITE_EMAIL}</p>
          </div>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-line bg-white px-3 text-sm font-bold text-ink hover:border-brand/40"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={settingsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-brand px-3.5 text-sm font-bold text-white hover:bg-brand-dark"
          >
            <ExternalLink className="h-4 w-4" /> {settingsLabel}
          </a>
          <button
            type="button"
            onClick={() => setShowGuide((visible) => !visible)}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-line bg-white px-3.5 text-sm font-bold text-ink hover:border-brand/40"
            aria-expanded={showGuide}
          >
            <HelpCircle className="h-4 w-4" /> {showGuide ? "Hide instructions" : "Show me how"}
          </button>
        </div>
      </div>

      {showGuide && (
        <div className="border-t border-line bg-surface px-4 py-5 sm:px-5">
          <ol className="space-y-3">
            {guideSteps.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-6 text-ink">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-brand ring-1 ring-line">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          {helpUrl && (
            <a
              href={helpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:text-brand-dark"
            >
              Open the official help article <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      )}

      <div className="border-t border-line p-4 sm:p-5">
        <p className="mb-2 text-xs font-bold uppercase text-muted">Where are you with this?</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {["Invitation sent", "I do not have this account", "I need help"].map((option) => {
            const selected =
              status === option || (option === "I need help" && status === "Help requested");
            return (
              <button
                key={option}
                type="button"
                onClick={() => onStatusChange(option)}
                className={`flex min-h-11 items-center gap-2 rounded-lg border px-3 text-left text-xs font-bold transition ${
                  selected
                    ? "border-brand bg-brand/5 text-brand"
                    : "border-line bg-white text-ink hover:border-brand/40"
                }`}
              >
                {selected ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <Circle className="h-4 w-4 shrink-0 text-muted" />}
                {option}
              </button>
            );
          })}
        </div>
        {(status === "I need help" || helpRequested) && (
          <div className="mt-4 flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-5 text-amber-900">
              You can keep going. Book a short access session and we will help with this step.
            </p>
            <button
              type="button"
              onClick={bookHelp}
              className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-ink px-3.5 text-sm font-bold text-white hover:bg-ink-soft"
            >
              <Clock3 className="h-4 w-4" /> Book access help
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function ReviewSection({
  title,
  rows,
  onEdit,
}: {
  title: string;
  rows: [string, FormValue | undefined][];
  onEdit: () => void;
}) {
  const visibleRows = rows.filter(([, value]) =>
    Array.isArray(value) ? value.length > 0 : Boolean(value)
  );

  return (
    <section className="border-b border-line py-5 last:border-0">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h3 className="font-extrabold text-ink">{title}</h3>
        <button type="button" onClick={onEdit} className="text-sm font-bold text-brand hover:text-brand-dark">
          Edit
        </button>
      </div>
      {visibleRows.length ? (
        <dl className="grid gap-3 sm:grid-cols-2">
          {visibleRows.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-semibold text-muted">{label}</dt>
              <dd className="mt-0.5 whitespace-pre-wrap text-sm font-medium text-ink">
                {Array.isArray(value) ? value.join(", ") : value}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="text-sm text-muted">Nothing added yet. You can submit and provide optional items later.</p>
      )}
    </section>
  );
}

export function OnboardingForm({
  clientName,
  draftKey,
  serviceIds,
  presetId,
  presetName,
}: OnboardingFormProps) {
  const selectedServices = useMemo(() => new Set(serviceIds), [serviceIds]);
  const storageKey = useMemo(
    () => `educare-onboarding:${draftKey}:${serviceIds.join("-")}`,
    [draftKey, serviceIds]
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<FormState>({ businessName: clientName });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("loading");
  const [submitError, setSubmitError] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved) as { data?: FormState; step?: number };
          if (parsed.data) setData((current) => ({ ...current, ...parsed.data }));
          if (typeof parsed.step === "number") {
            setCurrentStep(Math.min(Math.max(parsed.step, 0), steps.length - 1));
          }
        }
      } catch {
        // A corrupt browser draft should never prevent the client from continuing.
      } finally {
        setHydrated(true);
        setSaveStatus("saved");
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated || status === "success") return;
    const timer = window.setTimeout(() => {
      window.localStorage.setItem(storageKey, JSON.stringify({ data, step: currentStep }));
      setSaveStatus("saved");
    }, 350);
    return () => window.clearTimeout(timer);
  }, [currentStep, data, hydrated, status, storageKey]);

  function setValue(name: string, value: FormValue) {
    setSaveStatus("saving");
    setData((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function validateCurrentStep() {
    const requiredByStep: Record<number, string[]> = {
      0: ["businessName", "contactName", "email", "phone"],
      5: ["consent"],
    };
    const labels: Record<string, string> = {
      businessName: "Business or program name",
      contactName: "Your full name",
      email: "Email address",
      phone: "Mobile phone",
      consent: "Authorization",
    };
    const nextErrors: Record<string, string> = {};

    for (const name of requiredByStep[currentStep] || []) {
      const value = data[name];
      if (!value || (Array.isArray(value) && !value.length)) {
        nextErrors[name] = `${labels[name]} is required.`;
      }
    }

    if (currentStep === 0 && stringValue(data.email) && !/^\S+@\S+\.\S+$/.test(stringValue(data.email))) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    }
    return true;
  }

  function goNext() {
    if (!validateCurrentStep()) return;
    setSaveStatus("saving");
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setSaveStatus("saving");
    setCurrentStep((step) => Math.max(step - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (currentStep < steps.length - 1) {
      goNext();
      return;
    }
    if (!validateCurrentStep()) return;

    setStatus("loading");
    setSubmitError("");

    const payload = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, Array.isArray(value) ? value.join(", ") : value])
    );

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          setupModules: serviceIds.join(", "),
          setupPreset: presetId,
          setupPresetName: presetName,
          sourceUrl: window.location.href,
        }),
      });
      if (!response.ok) throw new Error("Submission failed");
      window.localStorage.removeItem(storageKey);
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
      setSubmitError(
        "We could not submit your onboarding. Your answers are still saved. Please try again or email info@educareleads.com."
      );
    }
  }

  function bookCall() {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: site.calendlyUrl });
    } else {
      window.open(site.calendlyUrl, "_blank", "noopener,noreferrer");
    }
  }

  const fieldProps = (name: string) => ({
    name,
    value: stringValue(data[name]),
    onChange: setValue,
    error: errors[name],
  });

  const includedCategories = onboardingServiceCategories.filter((category) =>
    onboardingServices.some(
      (service) => service.category === category.id && selectedServices.has(service.id)
    )
  );
  const hasMeta = includesAny(selectedServices, metaServiceIds);
  const hasGoogleAds = includesAny(selectedServices, googleAdsServiceIds);
  const hasWebsite = includesAny(selectedServices, websiteServiceIds);
  const hasCrm = includesAny(selectedServices, crmServiceIds);
  const hasCro = includesAny(selectedServices, croServiceIds);
  const hasLocal = includesAny(selectedServices, localServiceIds);
  const hasCreative = includesAny(selectedServices, creativeServiceIds);
  const hasAi = includesAny(selectedServices, aiServiceIds);
  const progress = Math.round(((currentStep + 1) / steps.length) * 100);
  const recommendation = !selectedServices.has("ai-reception") && /often|after hours/i.test(stringValue(data.missedCalls))
    ? "Automated call handling could help with the calls you miss after hours."
    : !hasLocal && /no|not sure/i.test(stringValue(data.googleBusinessStatus))
      ? "Google Business Profile support could help families find and trust your program locally."
      : !hasWebsite && !stringValue(data.currentWebsite)
        ? "A focused enrollment page could give your campaigns a clearer path to booked tours."
        : "We can review additional growth opportunities after your initial setup is underway.";

  if (status === "success") {
    return (
      <div className="mx-auto max-w-3xl py-6 sm:py-12">
        <div className="rounded-lg border border-line bg-white p-6 shadow-sm sm:p-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <p className="mt-6 text-xs font-bold uppercase text-emerald-700">Onboarding submitted</p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink">We have what we need to begin.</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            We sent your information to the EduCare Leads team. Any access item marked for help can be completed separately and will not hold up our review.
          </p>

          <div className="mt-7 grid gap-3 border-y border-line py-6 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold text-muted">Your answers</p>
              <p className="mt-1 text-sm font-bold text-ink">Received</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted">Access invitations</p>
              <p className="mt-1 text-sm font-bold text-ink">We will accept them</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted">Next step</p>
              <p className="mt-1 text-sm font-bold text-ink">Internal setup review</p>
            </div>
          </div>

          <section className="mt-7 rounded-lg border border-brand/20 bg-brand/5 p-5">
            <p className="text-xs font-bold uppercase text-brand">Optional recommendation</p>
            <h2 className="mt-2 text-lg font-extrabold text-ink">One thing worth discussing</h2>
            <p className="mt-1 text-sm leading-6 text-muted">{recommendation}</p>
            <button
              type="button"
              onClick={bookCall}
              className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-brand bg-white px-4 text-sm font-bold text-brand hover:bg-brand hover:text-white"
            >
              <Clock3 className="h-4 w-4" /> Tell me more
            </button>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
      <aside className="hidden lg:sticky lg:top-6 lg:block">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase text-brand">Client onboarding</p>
          <h2 className="mt-2 text-xl font-extrabold text-ink">
            {stringValue(data.businessName) || clientName || "Your enrollment system"}
          </h2>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted" aria-live="polite">
            {saveStatus === "saving" ? <Save className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
            {saveStatus === "loading" ? "Loading draft..." : saveStatus === "saving" ? "Saving..." : "Progress saved"}
          </div>
        </div>

        <nav aria-label="Onboarding progress" className="space-y-1">
          {steps.map((step, index) => (
            <button
              key={step.id}
              type="button"
              onClick={() => {
                if (index <= currentStep) {
                  setCurrentStep(index);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              disabled={index > currentStep}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                index === currentStep
                  ? "bg-white font-bold text-brand shadow-sm ring-1 ring-line"
                  : index < currentStep
                    ? "font-semibold text-ink hover:bg-white"
                    : "cursor-default text-muted/60"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  index < currentStep
                    ? "bg-emerald-100 text-emerald-700"
                    : index === currentStep
                      ? "bg-brand text-white"
                      : "bg-line text-muted"
                }`}
              >
                {index < currentStep ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </span>
              {step.label}
            </button>
          ))}
        </nav>

        <div className="mt-7 border-t border-line pt-5">
          <p className="text-xs font-bold text-ink">Included in this setup</p>
          {presetId !== "custom" && <p className="mt-1 text-xs font-semibold text-brand">{presetName}</p>}
          <ul className="mt-2 space-y-2">
            {includedCategories.map((category) => (
              <li key={category.id} className="flex gap-2 text-xs leading-5 text-muted">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" /> {category.name}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="min-w-0">
        <div className="mb-5 lg:hidden">
          <div className="flex items-center justify-between gap-3 text-xs font-bold">
            <span className="text-brand">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-muted" aria-live="polite">
              {saveStatus === "saving" ? "Saving..." : "Progress saved"}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
            <div className="h-full bg-brand transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-3 text-sm font-bold text-ink">{steps[currentStep].label}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-8">
            {currentStep === 0 && (
              <div>
                <SectionHeading
                  eyebrow="Step 1"
                  title={clientName ? `Welcome, ${clientName}` : "Welcome to EduCare Leads"}
                  description="Start with the essentials. Your progress saves on this device, and you can return using the same link."
                />
                <div className="mb-7 rounded-lg border border-teal/20 bg-teal/5 p-4">
                  <div className="flex gap-3">
                    <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                    <div>
                      <p className="text-sm font-bold text-ink">No passwords needed</p>
                      <p className="mt-1 text-sm leading-6 text-muted">
                        We will guide you through inviting EduCare Leads to the accounts included in your setup.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field {...fieldProps("businessName")} label="Business or program name" placeholder="Little Stars Academy" required />
                  <Field {...fieldProps("legalName")} label="Legal entity name" placeholder="If different" />
                  <Field {...fieldProps("contactName")} label="Your full name" placeholder="Jane Doe" required />
                  <Field {...fieldProps("role")} label="Your role" placeholder="Owner, director, admissions" />
                  <Field {...fieldProps("email")} label="Email address" type="email" placeholder="jane@littlestars.com" required />
                  <Field {...fieldProps("phone")} label="Mobile phone" type="tel" placeholder="(555) 123-4567" required />
                  <div className="sm:col-span-2">
                    <Field {...fieldProps("address")} label="Primary business address" placeholder="Street, city, state, ZIP" />
                  </div>
                  <SelectField
                    {...fieldProps("locations")}
                    label="Number of locations"
                    options={["1", "2", "3", "4", "5 or more"]}
                  />
                  <Field {...fieldProps("yearsOperating")} label="Years in operation" placeholder="For example: 6" />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div>
                <SectionHeading
                  eyebrow="Step 2"
                  title="Programs and enrollment goals"
                  description="Tell us what you offer, where you have room, and which families you most want to reach."
                />
                <div className="space-y-6">
                  <ChoiceGroup
                    name="programs"
                    label="Programs you offer"
                    options={programOptions}
                    selected={arrayValue(data.programs)}
                    onChange={setValue}
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field {...fieldProps("hours")} label="Hours of operation" placeholder="Monday-Friday, 6:30am-6pm" />
                    <Field {...fieldProps("capacity")} label="Licensed or total capacity" placeholder="For example: 80 children" />
                    <Field {...fieldProps("openSpots")} label="Current openings" placeholder="5 toddler, 3 preschool" hint="An estimate is fine. Include age groups if you can." />
                    <Field {...fieldProps("enrollmentGoal")} label="90-day enrollment goal" placeholder="For example: 12 new enrollments" />
                    <Field {...fieldProps("serviceArea")} label="Service area" placeholder="Towns, ZIP codes, or driving radius" />
                    <Field {...fieldProps("languages")} label="Languages spoken" placeholder="English, Spanish" />
                  </div>
                  <Area {...fieldProps("usp")} label="Why do families choose you?" placeholder="Curriculum, low ratios, experienced staff, meals, hours, community, accreditation..." />
                  <Area {...fieldProps("idealFamily")} label="Describe the families you most want to enroll" placeholder="Working parents with toddlers who live within 15 minutes..." />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field {...fieldProps("currentPromo")} label="Current enrollment offer" placeholder="Waived registration, sibling offer, or none" />
                    <Field {...fieldProps("objections")} label="Most common parent concern" placeholder="Trust, availability, distance, schedule" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <SectionHeading
                  eyebrow="Step 3"
                  title="Brand and asset library"
                  description="Share one folder with anything we can use. It is okay if your library is incomplete."
                />
                <div className="mb-7 flex gap-3 rounded-lg border border-line bg-surface p-4">
                  <Save className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <p className="text-sm font-bold text-ink">The easiest way to send files</p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      Put your logo, photos, videos, flyers, brochures, and testimonials in one Google Drive or Dropbox folder, then paste the share link below.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <Field
                    {...fieldProps("assetsLink")}
                    label="Shared asset folder"
                    type="url"
                    placeholder="https://drive.google.com/..."
                    hint="Set the folder so anyone with the link can view it. Do not include passwords or private child records."
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField
                      {...fieldProps("hasLogo")}
                      label="Logo status"
                      options={["Ready and included", "I only have a low-quality copy", "I need a logo", "Not sure"]}
                    />
                    <SelectField
                      {...fieldProps("hasPhotos")}
                      label="Photo and video status"
                      options={["Ready and included", "I have a few", "I need new content", "Not sure"]}
                    />
                    <Field {...fieldProps("brandColors")} label="Brand colors" placeholder="Color names or hex codes" />
                    <Field {...fieldProps("tagline")} label="Tagline or slogan" placeholder="If you use one" />
                  </div>
                  <SelectField
                    {...fieldProps("mediaConsent")}
                    label="Can the shared photos and videos be used in advertising?"
                    options={[
                      "Yes, all shared media is approved",
                      "Some media is approved; I will label it",
                      "No child images; facility and staff only",
                      "Not sure; please confirm with me",
                    ]}
                  />
                  <Area {...fieldProps("testimonials")} label="Reviews and testimonials" placeholder="Paste favorites or share links to Google, Facebook, or other review pages." />
                  <Area {...fieldProps("brandNotes")} label="Brand rules or things to avoid" placeholder="Required wording, licensing statements, tone, colors, claims, or imagery to avoid." />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <SectionHeading
                  eyebrow="Step 4"
                  title="Grant account access"
                  description="Use the cards below to invite media@revupcmo.com. Choose 'I need help' or 'I do not have this account' whenever needed; neither option blocks the rest of onboarding."
                />
                <div className="mb-6 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                  <p className="text-sm leading-6 text-amber-950">
                    Invitations may remain pending until EduCare Leads accepts them. Once you send an invitation, mark that card as <strong>Invitation sent</strong> and continue.
                  </p>
                </div>
                <div className="space-y-4">
                  {hasMeta && (
                    <AccessGuide
                      platform="Meta Business Suite and Ads"
                      description="Invite EduCare Leads so we can manage the Facebook Page, Instagram account, ad account, and campaign tracking."
                      status={stringValue(data.metaAccessStatus)}
                      onStatusChange={(value) => setValue("metaAccessStatus", value)}
                      settingsUrl="https://business.facebook.com/settings/people"
                      settingsLabel="Open Meta settings"
                      helpUrl="https://www.facebook.com/business/help"
                      accessLevel="full control or admin access"
                      steps={[
                        "Open Meta Business Settings and choose People under Users.",
                        `Choose Invite people and enter ${ACCESS_INVITE_EMAIL}.`,
                        "Turn on full control or admin access, then continue.",
                        "Assign the Facebook Page, Instagram account, ad account, and pixel or dataset used for advertising.",
                        "Send the invitation, return here, and select Invitation sent.",
                      ]}
                    />
                  )}
                  {hasGoogleAds && (
                    <AccessGuide
                      platform="Google Ads"
                      description="Invite EduCare Leads directly to the advertising account we will review or manage."
                      status={stringValue(data.googleAdsAccessStatus)}
                      onStatusChange={(value) => setValue("googleAdsAccessStatus", value)}
                      settingsUrl="https://ads.google.com/"
                      settingsLabel="Open Google Ads"
                      helpUrl="https://support.google.com/google-ads/answer/6372672"
                      accessLevel="Admin access"
                      steps={[
                        "Open the correct Google Ads account.",
                        "Choose Admin, then Access and security.",
                        `Select the plus button and enter ${ACCESS_INVITE_EMAIL}.`,
                        "Choose Admin as the access level and send the invitation.",
                        "Return here and select Invitation sent.",
                      ]}
                    />
                  )}
                  {(hasWebsite || hasGoogleAds || hasCro) && (
                    <AccessGuide
                      platform="Google Analytics"
                      description="Invite EduCare Leads to the Analytics property connected to your website, if one already exists."
                      status={stringValue(data.analyticsAccessStatus)}
                      onStatusChange={(value) => setValue("analyticsAccessStatus", value)}
                      settingsUrl="https://analytics.google.com/"
                      settingsLabel="Open Google Analytics"
                      helpUrl="https://support.google.com/analytics/answer/9305788"
                      accessLevel="Administrator access"
                      steps={[
                        "Open Google Analytics and select the correct property.",
                        "Choose Admin, then Property access management.",
                        `Select the plus button, choose Add users, and enter ${ACCESS_INVITE_EMAIL}.`,
                        "Choose Administrator and send the invitation.",
                        "Return here and select Invitation sent.",
                      ]}
                    />
                  )}
                  {selectedServices.has("google-conversion-tracking") && (
                    <AccessGuide
                      platform="Google Tag Manager"
                      description="Invite EduCare Leads to the Tag Manager account and container used for website conversion tracking."
                      status={stringValue(data.tagManagerAccessStatus)}
                      onStatusChange={(value) => setValue("tagManagerAccessStatus", value)}
                      settingsUrl="https://tagmanager.google.com/"
                      settingsLabel="Open Tag Manager"
                      helpUrl="https://support.google.com/tagmanager/answer/6107011"
                      accessLevel="Administrator and Publish access"
                      steps={[
                        "Open Google Tag Manager and select the correct account and container.",
                        "Choose Admin, then User Management.",
                        `Choose the plus button, select Add users, and enter ${ACCESS_INVITE_EMAIL}.`,
                        "Grant Administrator account permission and Publish container permission.",
                        "Send the invitation, return here, and select Invitation sent.",
                      ]}
                    />
                  )}
                  {hasLocal && (
                    <AccessGuide
                      platform="Google Business Profile"
                      description="Invite EduCare Leads to the location profile families see in Google Search and Maps."
                      status={stringValue(data.googleBusinessAccessStatus)}
                      onStatusChange={(value) => setValue("googleBusinessAccessStatus", value)}
                      settingsUrl="https://business.google.com/"
                      settingsLabel="Open Business Profile"
                      helpUrl="https://support.google.com/business/answer/3403100"
                      accessLevel="Manager access"
                      steps={[
                        "Open your Business Profile and select the correct location.",
                        "Open Business Profile settings, then People and access.",
                        `Choose Add, enter ${ACCESS_INVITE_EMAIL}, and select Manager.`,
                        "Send the invitation, return here, and select Invitation sent.",
                      ]}
                    />
                  )}
                  {!hasMeta && !hasGoogleAds && !hasWebsite && !hasCro && !hasLocal && (
                      <div className="rounded-lg border border-line bg-surface p-5 text-sm leading-6 text-muted">
                        No advertising or Google account invitations are required for the services in this setup. You can continue to the next step.
                      </div>
                    )}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <SectionHeading
                  eyebrow="Step 5"
                  title="Details for your setup"
                  description="These questions are based on the services included in your project. Skip anything you do not know."
                />
                <div className="space-y-8">
                  {(hasMeta || hasGoogleAds) && (
                    <section>
                      <h2 className="text-lg font-extrabold text-ink">Advertising</h2>
                      <p className="mt-1 text-sm text-muted">Existing campaigns, destinations, and important boundaries.</p>
                      <div className="mt-4 grid gap-5 sm:grid-cols-2">
                        <SelectField {...fieldProps("runningAds")} label="Are ads running now?" options={["Yes", "No", "Not sure"]} />
                        <Field {...fieldProps("primaryCampaignGoal")} label="Most important campaign goal" placeholder="Tours, calls, applications, enrollments" />
                        {hasMeta && (
                          <>
                            <Field {...fieldProps("facebookPage")} label="Facebook Page URL" placeholder="https://facebook.com/..." />
                            <Field {...fieldProps("instagram")} label="Instagram handle" placeholder="@yourprogram" />
                          </>
                        )}
                        {hasGoogleAds && (
                          <Field {...fieldProps("googleAdsCustomerId")} label="Google Ads Customer ID" placeholder="123-456-7890" hint="Shown at the top of your Google Ads account." />
                        )}
                      </div>
                      <div className="mt-5">
                        <Area {...fieldProps("pastCampaignNotes")} label="What has or has not worked in past advertising?" placeholder="Campaigns, messages, offers, lead quality, or previous agency experience." />
                      </div>
                      {selectedServices.has("seasonal-campaign") && (
                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                          <Field {...fieldProps("seasonalCampaignName")} label="Seasonal campaign or event" placeholder="Summer camp, back-to-school, open house" />
                          <Field {...fieldProps("seasonalCampaignDeadline")} label="Important launch or registration date" placeholder="Month, day, and year" />
                          <Field {...fieldProps("seasonalAvailability")} label="Available spaces or sessions" placeholder="Programs, dates, and capacity" />
                          <Field {...fieldProps("seasonalOffer")} label="Seasonal offer or call-to-action" placeholder="Register, book a tour, join the waitlist" />
                        </div>
                      )}
                      {selectedServices.has("google-conversion-tracking") && (
                        <div className="mt-5">
                          <Area {...fieldProps("conversionActions")} label="Which actions should count as conversions?" placeholder="Form submissions, booked tours, phone calls, registrations, or other outcomes." />
                        </div>
                      )}
                    </section>
                  )}

                  {hasWebsite && (
                    <section className="border-t border-line pt-8">
                      <h2 className="text-lg font-extrabold text-ink">Website and domain</h2>
                      <p className="mt-1 text-sm text-muted">Enough information to plan, connect, and launch the site.</p>
                      <div className="mt-4 grid gap-5 sm:grid-cols-2">
                        <Field {...fieldProps("currentWebsite")} label="Current website" type="url" placeholder="https://..." />
                        <Field {...fieldProps("domainName")} label="Domain name" placeholder="yourprogram.com" />
                        <Field {...fieldProps("domainRegistrar")} label="Domain provider" placeholder="GoDaddy, Namecheap, Squarespace" />
                        <Field {...fieldProps("websitePlatform")} label="Current website platform" placeholder="WordPress, Wix, Squarespace, none" />
                        <Field {...fieldProps("hostingProvider")} label="Current hosting provider" placeholder="If different from the website platform" />
                        <SelectField
                          {...fieldProps("domainAccessStatus")}
                          label="Domain access"
                          options={["I can invite EduCare Leads", "I need help", "I do not have a domain", "Not sure"]}
                        />
                      </div>
                      <div className="mt-5 space-y-5">
                        <Area {...fieldProps("desiredPages")} label="Pages or information the website must include" placeholder="Programs, about, tuition request, staff, locations, contact, book a tour..." />
                        <Area {...fieldProps("websiteExamples")} label="Websites you like or dislike" placeholder="Paste links and briefly tell us what you like or want to avoid." />
                        {selectedServices.has("website-maintenance") && (
                          <Area {...fieldProps("requestedWebsiteUpdates")} label="Updates you need first" placeholder="List pages, program information, dates, staff, photos, forms, or technical issues to update." />
                        )}
                      </div>
                    </section>
                  )}

                  {hasCrm && (
                    <section className="border-t border-line pt-8">
                      <h2 className="text-lg font-extrabold text-ink">CRM, follow-up, and tour booking</h2>
                      <p className="mt-1 text-sm text-muted">How new inquiries are handled today and where appointments should go.</p>
                      <div className="mt-4 grid gap-5 sm:grid-cols-2">
                        <Field {...fieldProps("currentCrm")} label="Current CRM or childcare system" placeholder="Brightwheel, Procare, HubSpot, none" />
                        <Field {...fieldProps("calendarLink")} label="Current booking calendar" placeholder="Calendly link or none" />
                        <Field {...fieldProps("tourContact")} label="Who receives new tour bookings?" placeholder="Name, email, and mobile number" />
                        <Field {...fieldProps("leadSources")} label="Current lead sources" placeholder="Website, Facebook, Google, referrals" />
                      </div>
                      <div className="mt-5">
                        <Area {...fieldProps("followUpProcess")} label="What happens after a family inquires today?" placeholder="Who replies, how quickly, what they send, and how tours are booked." />
                      </div>
                      {selectedServices.has("full-cycle-email") && (
                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                          <Field {...fieldProps("emailPlatform")} label="Current email platform" placeholder="Mailchimp, Constant Contact, CRM, none" />
                          <Field {...fieldProps("emailListSize")} label="Approximate contact list size" placeholder="For example: 2,500 contacts" />
                          <Field {...fieldProps("emailGoals")} label="Main email marketing goal" placeholder="Enrollment, nurturing, retention, reactivation" />
                          <Field {...fieldProps("emailApprover")} label="Who approves email campaigns?" placeholder="Name and email" />
                        </div>
                      )}
                      {selectedServices.has("advanced-automation") && (
                        <div className="mt-5">
                          <Area {...fieldProps("automationGoals")} label="Advanced workflows you need" placeholder="Nurture paths, reactivation, staff alerts, segmentation, routing, or reporting requirements." />
                        </div>
                      )}
                    </section>
                  )}

                  {hasCro && (
                    <section className="border-t border-line pt-8">
                      <h2 className="text-lg font-extrabold text-ink">Conversion and admissions review</h2>
                      <p className="mt-1 text-sm text-muted">Where inquiries slow down between the first visit and enrollment.</p>
                      <div className="mt-4 grid gap-5 sm:grid-cols-2">
                        {!hasWebsite && <Field {...fieldProps("currentWebsite")} label="Website or landing page to review" type="url" placeholder="https://..." />}
                        <Field {...fieldProps("currentInquiryVolume")} label="Approximate inquiries per month" placeholder="An estimate is fine" />
                        <Field {...fieldProps("leadToTourRate")} label="Lead-to-tour rate" placeholder="Percentage or best estimate" />
                        <Field {...fieldProps("tourToEnrollmentRate")} label="Tour-to-enrollment rate" placeholder="Percentage or best estimate" />
                        <Field {...fieldProps("admissionsScriptsLink")} label="Current call, text, or email scripts" placeholder="Shared document link or none" />
                      </div>
                      <div className="mt-5">
                        <Area {...fieldProps("conversionBottleneck")} label="Where do you think families drop off?" placeholder="Website, form, response time, phone call, tour booking, no-shows, post-tour follow-up..." />
                      </div>
                    </section>
                  )}

                  {hasLocal && (
                    <section className="border-t border-line pt-8">
                      <h2 className="text-lg font-extrabold text-ink">Google Business, reviews, and local SEO</h2>
                      <div className="mt-4 grid gap-5 sm:grid-cols-2">
                        <Field {...fieldProps("googleBusiness")} label="Business Profile link or exact name" placeholder="Little Stars Academy, Austin TX" />
                        <SelectField {...fieldProps("googleBusinessStatus")} label="Profile status" options={["Live and verified", "Live but not verified", "No profile", "Not sure"]} />
                        <Field {...fieldProps("reviewLink")} label="Current review page" placeholder="Google review or listing link" />
                        <Field {...fieldProps("reviewContact")} label="Who should receive review alerts?" placeholder="Name and email" />
                      </div>
                      <div className="mt-5 space-y-5">
                        <Area {...fieldProps("reviewProcess")} label="How do you currently request and respond to reviews?" placeholder="Describe the timing, staff member, tool, and message used, or say none." />
                        {selectedServices.has("local-seo") && (
                          <Area {...fieldProps("localSearchPriorities")} label="Locations and searches you want to appear for" placeholder="Neighborhoods, cities, ZIP codes, and terms families might search." />
                        )}
                      </div>
                    </section>
                  )}

                  {hasCreative && (
                    <section className="border-t border-line pt-8">
                      <h2 className="text-lg font-extrabold text-ink">Creative, branding, and proof assets</h2>
                      <div className="mt-4 grid gap-5 sm:grid-cols-2">
                        <Field {...fieldProps("creativePriority")} label="Most important creative output" placeholder="Ads, short videos, brand refresh, testimonials" />
                        <Field {...fieldProps("creativeApprover")} label="Who approves creative?" placeholder="Name and email" />
                      </div>
                      <div className="mt-5 space-y-5">
                        {(selectedServices.has("proof-assets") || selectedServices.has("testimonial-collection")) && (
                          <Area {...fieldProps("proofOutcomes")} label="Outcomes or stories we should turn into proof" placeholder="Enrollment results, parent stories, staff wins, program milestones, or other measurable outcomes." />
                        )}
                        {selectedServices.has("brand-refresh") && (
                          <Area {...fieldProps("brandRefreshGoals")} label="What should change about the current brand?" placeholder="What feels outdated, inconsistent, unclear, or no longer representative?" />
                        )}
                        {selectedServices.has("shoot-coordination") && (
                          <Area {...fieldProps("shootAvailability")} label="Photo and video shoot details" placeholder="Preferred dates, locations, people available, consent limitations, and must-have shots." />
                        )}
                      </div>
                    </section>
                  )}

                  {hasAi && (
                    <section className="border-t border-line pt-8">
                      <h2 className="text-lg font-extrabold text-ink">AI, reception, and advanced systems</h2>
                      {(selectedServices.has("ai-reception") || selectedServices.has("advanced-routing")) && (
                        <div className="mt-4 grid gap-5 sm:grid-cols-2">
                          <Field {...fieldProps("businessPhone")} label="Main business phone" placeholder="(555) 123-4567" />
                          <Field {...fieldProps("forwardTo")} label="Where should live calls go?" placeholder="Name and phone number" />
                          <SelectField {...fieldProps("missedCalls")} label="How often are calls missed?" options={["Often or after hours", "Sometimes", "Rarely", "Not sure"]} />
                          <SelectField {...fieldProps("canText")} label="Can the current number send texts?" options={["Yes", "No", "Not sure"]} />
                        </div>
                      )}
                      {(selectedServices.has("ai-chatbot") || selectedServices.has("ai-reception")) && (
                        <div className="mt-5 space-y-5">
                          <Area {...fieldProps("commonQuestions")} label="Questions families ask most often" placeholder="Availability, age groups, hours, tours, meals, tuition questions, transportation..." />
                          <Area {...fieldProps("aiEscalationRules")} label="When should the AI hand the conversation to a person?" placeholder="Urgent issues, specific questions, complaints, enrollment readiness, or office hours." />
                        </div>
                      )}
                      {selectedServices.has("reactivation-campaign") && (
                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                          <Field {...fieldProps("pastLeadCount")} label="Approximate past lead count" placeholder="Old inquiries, waitlist, inactive families" />
                          <Field {...fieldProps("pastLeadSource")} label="Where is the list stored?" placeholder="CRM, spreadsheet, childcare system" />
                          <Field {...fieldProps("reactivationWindow")} label="Which contacts should be included?" placeholder="Date range, program, age group, or status" />
                          <Field {...fieldProps("reactivationOffer")} label="Reason to reconnect now" placeholder="New openings, event, waitlist update, new program" />
                        </div>
                      )}
                    </section>
                  )}

                  {selectedServices.has("multi-location") && (
                    <section className="border-t border-line pt-8">
                      <h2 className="text-lg font-extrabold text-ink">Multi-location routing</h2>
                      <div className="mt-4 space-y-5">
                        <Area {...fieldProps("locationDetails")} label="List each location and its current openings" placeholder="Location name, address, programs, capacity, and priority openings." />
                        <Area {...fieldProps("routingRules")} label="How should leads and appointments be routed?" placeholder="By ZIP code, selected location, program, staff member, or another rule." />
                      </div>
                    </section>
                  )}

                  {selectedServices.has("fractional-cmo") && (
                    <section className="border-t border-line pt-8">
                      <h2 className="text-lg font-extrabold text-ink">Fractional CMO leadership</h2>
                      <p className="mt-1 text-sm text-muted">The people, priorities, and operating rhythm for marketing leadership.</p>
                      <div className="mt-4 grid gap-5 sm:grid-cols-2">
                        <Field {...fieldProps("leadershipTeam")} label="Leadership and marketing contacts" placeholder="Names, roles, and emails" />
                        <Field {...fieldProps("decisionMaker")} label="Final marketing decision-maker" placeholder="Name and role" />
                        <Field {...fieldProps("meetingCadence")} label="Preferred meeting rhythm" placeholder="Days, times, and attendees" />
                        <Field {...fieldProps("currentVendors")} label="Current agencies or vendors" placeholder="Names and what they manage" />
                      </div>
                      <div className="mt-5 space-y-5">
                        <Area {...fieldProps("marketingPriorities")} label="Top marketing priorities for the next 90 days" placeholder="List the outcomes leadership wants in priority order." />
                        <Area {...fieldProps("approvalProcess")} label="How are marketing decisions and approvals made?" placeholder="Who reviews strategy, creative, budgets, offers, and launch decisions?" />
                      </div>
                    </section>
                  )}

                  <section className="border-t border-line pt-8">
                    <h2 className="text-lg font-extrabold text-ink">Final context</h2>
                    <div className="mt-4 space-y-5">
                      <Area {...fieldProps("notes")} label="Anything else we should know?" placeholder="Deadlines, must-haves, approvals, promises, technical issues, or concerns." />
                      {!selectedServices.has("ai-reception") && !selectedServices.has("advanced-routing") && (
                        <SelectField
                          {...fieldProps("missedCalls")}
                          label="How often are calls or inquiries missed after hours?"
                          options={["Often or after hours", "Sometimes", "Rarely", "Not sure"]}
                          hint="This helps us plan follow-up and may inform an optional recommendation after onboarding."
                        />
                      )}
                    </div>
                  </section>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div>
                <SectionHeading
                  eyebrow="Step 6"
                  title="Review and submit"
                  description="Check the essentials below. Optional information can be added later, and access-help requests will not block submission."
                />
                <div>
                  <ReviewSection
                    title="Business"
                    onEdit={() => setCurrentStep(0)}
                    rows={[
                      ["Business", data.businessName],
                      ["Contact", data.contactName],
                      ["Email", data.email],
                      ["Phone", data.phone],
                      ["Address", data.address],
                      ["Locations", data.locations],
                    ]}
                  />
                  <ReviewSection
                    title="Programs and goals"
                    onEdit={() => setCurrentStep(1)}
                    rows={[
                      ["Programs", data.programs],
                      ["Current openings", data.openSpots],
                      ["90-day goal", data.enrollmentGoal],
                      ["Why families choose you", data.usp],
                    ]}
                  />
                  <ReviewSection
                    title="Brand and assets"
                    onEdit={() => setCurrentStep(2)}
                    rows={[
                      ["Asset folder", data.assetsLink],
                      ["Logo", data.hasLogo],
                      ["Photos and videos", data.hasPhotos],
                      ["Media approval", data.mediaConsent],
                    ]}
                  />
                  <ReviewSection
                    title="Account access"
                    onEdit={() => setCurrentStep(3)}
                    rows={[
                      ["Meta", data.metaAccessStatus],
                      ["Google Ads", data.googleAdsAccessStatus],
                      ["Google Analytics", data.analyticsAccessStatus],
                      ["Google Tag Manager", data.tagManagerAccessStatus],
                      ["Google Business", data.googleBusinessAccessStatus],
                      ["Domain", data.domainAccessStatus],
                    ]}
                  />
                  <ReviewSection
                    title="Service setup"
                    onEdit={() => setCurrentStep(4)}
                    rows={[
                      ["Current website", data.currentWebsite],
                      ["Current CRM", data.currentCrm],
                      ["Campaign goal", data.primaryCampaignGoal],
                      ["Seasonal campaign", data.seasonalCampaignName],
                      ["Email goal", data.emailGoals],
                      ["Conversion bottleneck", data.conversionBottleneck],
                      ["Creative priority", data.creativePriority],
                      ["Reactivation audience", data.reactivationWindow],
                      ["Marketing priorities", data.marketingPriorities],
                      ["Notes", data.notes],
                    ]}
                  />
                </div>

                <label className={`mt-6 flex cursor-pointer items-start gap-3 rounded-lg border p-4 text-sm leading-6 ${
                  errors.consent ? "border-red-400 bg-red-50" : "border-line bg-surface"
                }`}>
                  <input
                    type="checkbox"
                    checked={stringValue(data.consent) === "Yes"}
                    onChange={(event) => setValue("consent", event.target.checked ? "Yes" : "")}
                    className="mt-1 h-4 w-4 shrink-0 accent-brand"
                  />
                  <span className="text-ink">
                    I confirm this information is accurate and authorize EduCare Leads to use it to set up and manage the services included in this project. <span className="text-cta">*</span>
                    {errors.consent && <span className="mt-1 block text-xs font-medium text-red-600">{errors.consent}</span>}
                  </span>
                </label>

                {submitError && (
                  <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700" role="alert">
                    {submitError}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={goBack}
              disabled={currentStep === 0}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-line bg-white px-5 text-sm font-bold text-ink hover:border-brand/40 disabled:invisible"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-cta px-6 text-sm font-bold text-white shadow-sm hover:bg-cta-dark"
              >
                Save and continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-cta px-6 text-sm font-bold text-white shadow-sm hover:bg-cta-dark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Submitting..." : "Submit onboarding"}
                {status !== "loading" && <CheckCircle2 className="h-4 w-4" />}
              </button>
            )}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-muted">
            <LockKeyhole className="h-3.5 w-3.5" /> Never share passwords through this form.
          </div>
        </form>
      </div>
    </div>
  );
}
