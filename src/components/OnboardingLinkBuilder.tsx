"use client";

import { Check, Copy, ExternalLink, Layers3, Link2, Plus } from "lucide-react";
import { useState } from "react";
import {
  defaultOnboardingServices,
  onboardingPresets,
  onboardingServiceCategories,
  onboardingServices,
  type OnboardingPresetId,
  type OnboardingServiceId,
} from "@/lib/onboarding";

export function OnboardingLinkBuilder() {
  const [clientName, setClientName] = useState("");
  const [services, setServices] = useState<OnboardingServiceId[]>(defaultOnboardingServices);
  const [presetId, setPresetId] = useState<OnboardingPresetId>("growth");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  function toggleService(id: OnboardingServiceId) {
    setServices((current) =>
      current.includes(id) ? current.filter((service) => service !== id) : [...current, id]
    );
    setPresetId("custom");
    setGeneratedLink("");
  }

  function applyPreset(id: OnboardingPresetId) {
    setPresetId(id);
    if (id !== "custom") {
      const preset = onboardingPresets.find((item) => item.id === id);
      if (preset) setServices([...preset.services]);
    }
    setGeneratedLink("");
    setError("");
  }

  function generateLink() {
    if (!clientName.trim()) {
      setError("Enter the client or business name.");
      return;
    }
    if (!services.length) {
      setError("Select at least one service.");
      return;
    }

    const clientPath = window.location.hostname === "onboarding.educareleads.com" ? "/" : "/onboarding";
    const url = new URL(clientPath, window.location.origin);
    url.searchParams.set("client", clientName.trim());
    url.searchParams.set("services", services.join(","));
    if (presetId !== "custom") url.searchParams.set("preset", presetId);
    url.searchParams.set("key", crypto.randomUUID().replaceAll("-", ""));
    setGeneratedLink(url.toString());
    setError("");
    setCopied(false);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-8">
      <div>
        <label htmlFor="clientName" className="mb-1.5 block text-sm font-semibold text-ink">
          Client or business name
        </label>
        <input
          id="clientName"
          value={clientName}
          onChange={(event) => {
            setClientName(event.target.value);
            setGeneratedLink("");
            setError("");
          }}
          placeholder="Little Stars Academy"
          className="w-full rounded-lg border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
        />
      </div>

      <div className="mt-6 rounded-lg border border-brand/20 bg-brand/5 p-4">
        <div className="flex gap-3">
          <Layers3 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <div className="min-w-0 flex-1">
            <label htmlFor="packagePreset" className="block text-sm font-bold text-ink">
              Start with a package preset
            </label>
            <p className="mt-1 text-xs leading-5 text-muted">
              A preset checks the usual services. You can customize the list afterward.
            </p>
            <select
              id="packagePreset"
              value={presetId}
              onChange={(event) => applyPreset(event.target.value as OnboardingPresetId)}
              className="mt-3 w-full rounded-lg border border-line bg-white px-3.5 py-3 text-sm font-semibold text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
            >
              <option value="custom">Custom service selection</option>
              {onboardingPresets.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              ))}
            </select>
            {presetId !== "custom" && (
              <p className="mt-2 text-xs leading-5 text-muted">
                {onboardingPresets.find((preset) => preset.id === presetId)?.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-7">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-ink">Services included in this project</h2>
            <p className="mt-1 text-xs leading-5 text-muted">
              The client only sees questions and access guides related to the services checked here.
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-ink px-2.5 py-1 text-xs font-bold text-white">
            {services.length} selected
          </span>
        </div>

        <div className="mt-4 space-y-5">
          {onboardingServiceCategories.map((category) => {
            const categoryServices = onboardingServices.filter(
              (service) => service.category === category.id
            );
            const selectedCount = categoryServices.filter((service) =>
              services.includes(service.id)
            ).length;

            return (
              <fieldset key={category.id}>
                <legend className="mb-2 flex w-full items-center justify-between gap-3 text-sm font-extrabold text-ink">
                  <span>{category.name}</span>
                  <span className="text-xs font-semibold text-muted">
                    {selectedCount}/{categoryServices.length}
                  </span>
                </legend>
                <div className="divide-y divide-line rounded-lg border border-line">
                  {categoryServices.map((service) => {
                    const selected = services.includes(service.id);
                    return (
                      <label key={service.id} className="flex cursor-pointer items-start gap-3 p-3.5 hover:bg-surface">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleService(service.id)}
                          className="sr-only"
                        />
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                            selected ? "border-brand bg-brand text-white" : "border-line bg-white"
                          }`}
                        >
                          {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                        </span>
                        <span>
                          <span className="block text-sm font-bold text-ink">{service.name}</span>
                          <span className="mt-0.5 block text-xs leading-5 text-muted">{service.description}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
        </div>
      </div>

      {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}

      <button
        type="button"
        onClick={generateLink}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-cta px-5 text-sm font-bold text-white hover:bg-cta-dark"
      >
        <Plus className="h-4 w-4" /> Create onboarding link
      </button>

      {generatedLink && (
        <div className="mt-6 border-t border-line pt-6" aria-live="polite">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-700">
            <Check className="h-4 w-4" /> Link ready to send
          </div>
          <div className="mt-3 rounded-lg border border-line bg-surface p-3">
            <p className="break-all text-xs leading-5 text-muted">{generatedLink}</p>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-bold text-white hover:bg-brand-dark"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy client link"}
            </button>
            <a
              href={generatedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line bg-white px-4 text-sm font-bold text-ink hover:border-brand/40"
            >
              Preview onboarding <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}

      <div className="mt-6 flex gap-2 border-t border-line pt-5 text-xs leading-5 text-muted">
        <Link2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Each generated link has its own browser draft key. This tool does not store package pricing or client passwords.
      </div>
    </div>
  );
}
