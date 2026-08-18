import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-white/70">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo light />
            <p className="mt-4 text-sm leading-relaxed">
              The done-for-you enrollment system for childcare and education
              programs — daycares, private schools, and camps. We book the
              families — you fill the rooms.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm">
            <div>
              <p className="font-bold text-white">Company</p>
              <ul className="mt-3 space-y-2">
                <li><Link href="/#how" className="hover:text-white">How it works</Link></li>
                <li><Link href="/#system" className="hover:text-white">The System</Link></li>
                <li><Link href="/case-studies" className="hover:text-white">Case studies</Link></li>
                <li><Link href="/#faq" className="hover:text-white">FAQ</Link></li>
                <li><a href={site.calendlyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">Book a call</a></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-white">Contact</p>
              <ul className="mt-3 space-y-2">
                <li><a href={site.phoneHref} className="hover:text-white">{site.phone}</a></li>
                <li><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>
            This site is not part of, or endorsed by, Meta or Google. Results
            vary by market and effort.
          </p>
        </div>
      </div>
    </footer>
  );
}
