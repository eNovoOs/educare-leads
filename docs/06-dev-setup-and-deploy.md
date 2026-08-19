# 06 · Dev Setup & Deploy

Everything a developer needs to run, edit, ship, and regenerate assets.

## Prerequisites

- **Node.js** (LTS; Node 18 is deprecated on Vercel — use 20+ locally to match).
- **npm** (repo uses `package-lock.json`).
- A local Chrome/Google Chrome install (only needed to regenerate the pitch-deck PDF).

## Run the app locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
```

Copy env vars for local dev:

```bash
cp .env.example .env.local
# fill in RESEND_API_KEY, ENOVO_WEBHOOK_URL, META_* as needed
```

Without them, forms still work and log submissions server-side (nothing breaks). See the full
env table in [03-tech-architecture.md](./03-tech-architecture.md#environment-variables).

## Edit site copy

Almost all text (headlines, stats, testimonials, FAQs, phone/email, the revenue gate, the 3-step
system, creative blocks) lives in **[`src/lib/site.ts`](../src/lib/site.ts)**. Edit there — every
page reads from it. Page-specific layout lives in the individual `src/app/*/page.tsx` files.

Brand palette/fonts: [`src/app/globals.css`](../src/app/globals.css) and `src/app/layout.tsx`.

## Deploy (Vercel)

The repo is linked to a Vercel project (`.vercel/`). Deploys happen on `git push`, or manually:

```bash
vercel               # preview deployment
vercel --prod        # production
```

Set the production environment variables (Resend, Meta, eNovo) in the Vercel project's
**Settings → Environment Variables**. Build config is in `vercel.json`
(`framework: nextjs`, `next build`).

> `.vercelignore` keeps source material (`out/`, `html/`, `Creatives Ads/`, `docs/`, PDFs, the
> business-model doc) out of the deployed bundle. If you add new internal-only folders, add them
> there too.

## Regenerate the pitch-deck PDF

The PDF is produced from `public/pitch-deck-print.html` with headless Chrome. After editing the
deck, run:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw --virtual-time-budget=10000 \
  --print-to-pdf="Educare-Leads-Pitch-Deck.pdf" \
  "file://$PWD/public/pitch-deck-print.html"
```

Notes:
- Edit **both** `pitch-deck.html` (interactive) and `pitch-deck-print.html` (PDF source) to keep
  them in sync. The print file adds a print stylesheet that (a) lays every slide out as its own
  landscape page, (b) re-asserts multi-column grids that Chrome's narrow print viewport would
  otherwise collapse, and (c) hides the decorative "glow" blobs (Chrome's PDF export turns
  blurred elements into hard rectangles).
- `--virtual-time-budget` gives fonts/images time to load before printing.
- The `@page { size: 1280px 720px }` rule in the print stylesheet sets the 16:9 page size.

## Video & voiceover (Remotion)

```bash
npm run video          # open Remotion Studio (preview/edit compositions)
npm run vsl:render     # render the full VSL → out/educare-vsl.mp4
npm run video:render   # render the vertical intro → out/educare-intro.mp4
npm run video:still    # a still frame → out/educare-intro.png
npm run vo:generate    # generate voiceover audio (scripts/generate-vo.sh)
npm run vo:measure     # measure VO durations for timing
```

Compositions are registered in `remotion/Root.tsx`; scene timings in
`remotion/narration-timings.json` / `narration-durations.json`. Scripts live in
[vsl-script.md](./vsl-script.md) and [vsl-voiceover.md](./vsl-voiceover.md).

## Client sites

`client-sites/*` are independent static sites with their own build + Vercel link. For the UFS
site: `cd client-sites/united-friends-school && node build.js` (see that folder's files), then
`vercel --prod` from inside it.

## Gotchas

- **Read `AGENTS.md`** before changing Next.js code — this version can differ from defaults; the
  bundled docs are in `node_modules/next/dist/docs/`.
- `/apply`, `/apply2`, `/go`, `/onboarding`, `/thank-you` are all `robots: noindex` on purpose
  (funnel pages) — only `/` should be indexed.
- Tracking pixels (Meta `1029290093151029`, Clarity `x4cj1ovak4`) are live production IDs baked
  into markup — don't fire test traffic through production, use `META_TEST_EVENT_CODE`.
- The standalone HTML decks in `public/` are hand-maintained (not built from `src/`) — edit the
  HTML directly.
