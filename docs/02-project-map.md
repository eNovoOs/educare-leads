# 02 · Project Map

A guided tour of the repository. Everything is grouped into three buckets: **the app** (the
Next.js website), **production assets** (video, deck, creatives), and **client/business
deliverables** (proposals, contracts, client sites).

## Top-level layout

```
Educare Leads/
├── src/                     ← THE APP: Next.js site, funnel, API, components
│   ├── app/                 ← routes (App Router) + API endpoints
│   ├── components/          ← shared React components
│   └── lib/site.ts          ← ⭐ all site copy/config in one file
├── public/                  ← static assets served as-is + standalone HTML pages
│   ├── pitch-deck.html      ← ⭐ client pitch deck (interactive presenter)
│   ├── pitch-deck-print.html← print-optimized source for the deck PDF
│   ├── deck.html            ← public scroll-through marketing pitch (/deck)
│   ├── vsl.html, squeeze.html
│   └── vo/                  ← VSL voiceover audio (per scene .mp3)
│
├── remotion/                ← VIDEO: the VSL & intro built with Remotion (React video)
├── scripts/                 ← voiceover generation/alignment scripts
├── out/                     ← rendered video output (not committed / not deployed)
│
├── docs/                    ← 📖 YOU ARE HERE — the handoff hub
├── business-model.md*       ← (in docs/) canonical offer strategy
├── vsl-script.md*           ← (in docs/) VSL script
├── vsl-voiceover.md*        ← (in docs/) VSL narration copy
│
├── proposals/               ← client PARTNERSHIP PROPOSALS (md + html + pdf)
├── contracts/               ← client SERVICE AGREEMENTS (EN + ES, md/html/pdf)
├── client-sites/            ← full websites BUILT FOR CLIENTS (static)
├── ad-scripts/              ← short-form ad/video scripts
├── Creatives Ads/           ← exported ad creative images (PNG)
├── social/                  ← social banners (FB cover, OG image)
├── html/                    ← legacy standalone HTML prototypes of the pages
│
├── package.json             ← scripts & dependencies
├── next.config.ts           ← rewrites (/vsl /deck /squeeze → public HTML)
├── vercel.json              ← Vercel build config
├── .env.example             ← the environment variables you need
├── .vercelignore            ← keeps source material out of the deploy
├── AGENTS.md / CLAUDE.md     ← AI-assistant instructions for this repo
└── README.md                ← points here
```
`*` = moved into `docs/` during this handoff to declutter the root.

## The app in detail (`src/`)

### Routes (`src/app/`)

| Path | File | Purpose |
|------|------|---------|
| `/` | `page.tsx` | Main cold-traffic landing page (design-system styled). All CTAs → `/apply`. |
| `/apply` | `apply/page.tsx` | VSL + application form. Qualifies by revenue/locations, captures the lead. |
| `/thank-you` | `thank-you/page.tsx` | Confirmation + Calendly booking embed. Form redirects here. |
| `/go` | `go/page.tsx` | **"Ugly" direct-response** ad-traffic landing page (system fonts, inline styles) — an intentional style A/B against `/`. |
| `/apply2` | `apply2/page.tsx` | The "ugly" apply/form step that matches `/go`. Same lead automation as `/apply`. |
| `/onboarding` | `onboarding/page.tsx` | New-client intake form → generates a **brand brief** for the team. |
| `/vsl`, `/deck`, `/squeeze` | (rewrites) | Serve the standalone HTML files in `public/` (see `next.config.ts`). |

### API (`src/app/api/`)

| Endpoint | File | Purpose |
|----------|------|---------|
| `POST /api/lead` | `api/lead/route.ts` | Emails the lead (Resend) + fires Meta Conversions API + forwards to eNovo CRM. Never drops a lead. |
| `POST /api/onboarding` | `api/onboarding/route.ts` | Emails the onboarding submission + attaches an auto-generated Markdown **brand brief** + a setup checklist. |

Full detail in **[03-tech-architecture.md](./03-tech-architecture.md)**.

### Components (`src/components/`)

`Header`, `Footer`, `Logo`, `CTAButton`, `LeadForm`, `OnboardingForm`, `VslPlayer`,
`CalendlyEmbed`. Shared UI used across the design-system pages.

### Copy & config (`src/lib/site.ts`) ⭐

The most-edited file in the repo. Contains: brand name/contacts, tagline, the revenue gate,
audiences, headline stats, the 3-step system, testimonials/results, FAQs, the "system we
install" block, and several creative data blocks (two-kinds contrast, cost receipt, SMS thread,
comparison table). Change copy here and every page updates.

## Production assets

- **`public/pitch-deck.html`** + **`pitch-deck-print.html`** + root **`Educare-Leads-Pitch-Deck.pdf`**
  — the client pitch deck (see [04-content-and-assets.md](./04-content-and-assets.md)).
- **`remotion/`** — the video sales letter (VSL) and a vertical intro, built as React
  components and rendered with Remotion. Voiceover audio lives in `public/vo/`.
- **`scripts/`** — `generate-vo.sh` (text-to-speech voiceover) and `align-vo.mjs` (timing).
- **`Creatives Ads/`**, **`social/`**, **`ad-scripts/`** — paid & organic creative.

## Client & business deliverables

- **`proposals/`** — partnership proposals (United Friends School, Mutnick Montessori) as
  Markdown + HTML + PDF.
- **`contracts/`** — service agreements (Fabiola's Home Daycare, Nen's Sans Daycare), English
  and Spanish, as Markdown + HTML + PDF.
- **`client-sites/`** — full static websites built for clients (United Friends School has a
  complete multi-page site with its own build script and Vercel project).

## What is NOT committed / NOT deployed

`.vercelignore` keeps source material out of production builds: `out/`, `html/`,
`Creatives Ads/`, `ad-scripts/`, the business-model doc, PNGs, and all `*.pdf`. The `docs/`
folder is added there too — it's internal, not part of the shipped site.
