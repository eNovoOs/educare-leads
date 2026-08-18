// Stand-in for the Educare CRM VSL until the Remotion video is rendered.
//
// Holds the exact 16:9 footprint the real player will occupy, so dropping the
// video in later is a one-line swap and nothing on the page shifts:
//
//   <VslPlaceholder />  →  <VslPlayer src="/educare-crm-vsl.mp4" />
//
// The composition lives in remotion/ — render with `npm run vsl:render`.

export function VslPlaceholder({ label }: { label?: string }) {
  return (
    <div className="relative grid h-full w-full place-items-center bg-gradient-to-br from-ink-deep via-ink to-ink-soft">
      {/* Soft glow so the empty frame doesn't read as a broken image */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[80px]"
      />

      <div className="relative flex flex-col items-center px-6 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ml-1 text-white"
            aria-hidden
          >
            <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
          </svg>
        </span>

        <p className="mt-5 text-base font-bold text-white sm:text-lg">
          {label ?? "Your walkthrough video goes here"}
        </p>
        <p className="mt-2 max-w-xs text-sm text-white/55">
          Video in production — drop the rendered file in and this frame becomes
          the player.
        </p>
      </div>

      {/* Corner tag so nobody mistakes this for the finished page */}
      <span className="absolute right-4 top-4 rounded-full bg-accent/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent ring-1 ring-accent/30">
        Placeholder
      </span>
    </div>
  );
}
