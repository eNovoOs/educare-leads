"use client";

import { site } from "@/lib/site";

type Props = {
  children?: React.ReactNode;
  href?: string;
  size?: "md" | "lg";
  variant?: "solid" | "outline";
  className?: string;
};

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

export function CTAButton({
  children = "Book Your Free Call",
  href = site.calendlyUrl,
  size = "md",
  variant = "solid",
  className = "",
}: Props) {
  const sizes =
    size === "lg"
      ? "px-8 py-4 text-base sm:text-lg"
      : "px-6 py-3 text-sm sm:text-base";
  const variants =
    variant === "solid"
      ? "bg-cta text-white hover:bg-cta-dark shadow-lg shadow-cta/25"
      : "border-2 border-white/80 text-white hover:bg-white hover:text-ink";

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // Open the Calendly popup if the widget loaded; otherwise let the link
    // navigate to Calendly as a fallback.
    if (typeof window !== "undefined" && window.Calendly) {
      e.preventDefault();
      window.Calendly.initPopupWidget({ url: site.calendlyUrl });
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors ${sizes} ${variants} ${className}`}
    >
      {children}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
