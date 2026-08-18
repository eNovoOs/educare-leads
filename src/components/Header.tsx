import Link from "next/link";
import { Logo } from "./Logo";
import { CTAButton } from "./CTAButton";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-semibold text-ink-soft md:flex">
          <Link href="/#how" className="hover:text-brand">How it works</Link>
          <Link href="/#system" className="hover:text-brand">The System</Link>
          <Link href="/case-studies" className="hover:text-brand">Case Studies</Link>
          <Link href="/#faq" className="hover:text-brand">FAQ</Link>
        </nav>
        <div className="flex items-center gap-4">
          <a
            href={site.phoneHref}
            className="hidden text-sm font-bold text-ink hover:text-brand sm:block"
          >
            {site.phone}
          </a>
          <CTAButton size="md">Book a Call</CTAButton>
        </div>
      </div>
    </header>
  );
}
