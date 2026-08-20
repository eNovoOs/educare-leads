import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your strategy call is confirmed.",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; email?: string }>;
}) {
  const { name } = await searchParams;

  return (
    <main className="min-h-screen bg-surface">
      <div className="mx-auto max-w-3xl px-5 py-10">
        <Logo />
      </div>

      <div className="mx-auto max-w-3xl px-5 pb-20">
        <div className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-line sm:p-10">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cta/10 text-cta">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Thank you{name ? `, ${name}` : ""}! 🎉
          </h1>
          <p className="mx-auto mt-3 max-w-md text-lg text-muted">
            Your free strategy call is confirmed. A confirmation email with all
            the details is on its way to your inbox (peek in spam, just in case).
          </p>

          {/* Contact */}
          <div className="mt-8 rounded-2xl bg-ink px-6 py-6 text-white">
            <p className="text-sm text-white/75">
              Need to reach us before the call?
            </p>
            <div className="mt-3 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
              <a href={site.phoneHref} className="font-bold text-white hover:text-cta">
                📞 {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="font-bold text-white hover:text-cta">
                ✉️ {site.email}
              </a>
            </div>
          </div>

          <Link
            href="/"
            className="mt-8 inline-block text-sm font-semibold text-muted hover:text-brand"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
