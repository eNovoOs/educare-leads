import Link from "next/link";
import Image from "next/image";

// The brand mark. Uses the color logo on light backgrounds and the
// white silhouette on dark (navy) backgrounds so it's always legible.
export function Logo({ light = false }: { light?: boolean }) {
  const src = light
    ? "/educare-leads-logo-white.png"
    : "/educare-leads-logo.png";
  return (
    <Link href="/" className="inline-flex items-center" aria-label="Educare Leads — home">
      <Image
        src={src}
        alt="Educare Leads Marketing"
        width={1283}
        height={1091}
        priority
        className="h-11 w-auto"
      />
    </Link>
  );
}
