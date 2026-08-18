# 04 · Content & Assets

Everything we produce to sell and deliver: the pitch deck, the VSL video, proposals, contracts,
ad creatives, social banners, and client websites.

## The client pitch deck ⭐

The deck you present live on a strategy call (screen-share or projector).

| File | What it is |
|------|-----------|
| `public/pitch-deck.html` | **Interactive presenter deck.** 15 slides, 16:9. Keyboard nav (← / → / Space), `F` for fullscreen, click-to-advance, swipe on touch, progress bar + slide counter. |
| `public/pitch-deck-print.html` | Print-optimized copy (all slides laid out as landscape pages). Source for the PDF. |
| `Educare-Leads-Pitch-Deck.pdf` | The exported PDF (email/leave-behind). 15 pages. |

**Slide order:** Cover → Problem → Cost of empty spots ($72k/yr) → Reframe ("system not
marketing") → The Enrollment System (3 steps) → What we install → Proof (stats) → Testimonials →
Differentiation → What's included → The 2× Guarantee → How it works → 90-day roadmap →
Scarcity → Close.

**Pricing:** the deck currently shows **no explicit prices** (per the latest direction — "no
price for the moment"). The "What's included" slide lists deliverables without dollar figures;
pricing is handled live on the call. To add pricing back later, restore the value column on that
slide in both `pitch-deck.html` and `pitch-deck-print.html`.

**Regenerate the PDF** after editing the deck — see
[06-dev-setup-and-deploy.md](./06-dev-setup-and-deploy.md#regenerate-the-pitch-deck-pdf).

> There are **two different "decks"**: `public/deck.html` (a public, scroll-through marketing
> page served at `/deck`, with a Calendly CTA) and `public/pitch-deck.html` (the slide-by-slide
> deck you present). Don't confuse them.

## The VSL (video sales letter)

Built with **Remotion** — video authored as React components.

| Piece | Where |
|-------|-------|
| Script (VO + on-screen direction, beat by beat) | [vsl-script.md](./vsl-script.md) |
| Per-scene narration copy | [vsl-voiceover.md](./vsl-voiceover.md) |
| Video components | `remotion/` (`EducareVSL.tsx` = 1920×1080 full VSL; `EducareIntro.tsx` = 1080×1920 vertical intro) |
| Compositions registered | `remotion/Root.tsx` |
| Voiceover audio | `public/vo/s01…s11 *.mp3` (per scene) + `voiceover.mp3` |
| Rendered output | `out/` (and `public/educare-vsl-1.25x.mp4` for the site) |

**Work on it:** `npm run video` (Remotion Studio) · `npm run vsl:render` (render the VSL). VO
generation via `npm run vo:generate` (see `scripts/generate-vo.sh`). Details in
[06-dev-setup-and-deploy.md](./06-dev-setup-and-deploy.md#video--voiceover).

## Proposals (`proposals/`)

Partnership proposals sent to prospects, in Markdown (source) + HTML + PDF:

- **United Friends School** — Quakertown, PA Quaker school. `united-friends-school-proposal.*`
  and `UFS x EduCare Proposal.pdf`.
- **Mutnick Montessori** — `mutnick-montessori-proposal.*`.

These frame EduCare as an **embedded internal enrollment/growth team** (enrollment management,
website, paid ads, AI front desk, positioning, CRM/automations). Use them as templates for new
proposals — copy a folder, swap the client specifics.

## Contracts (`contracts/`)

Service agreements, provided in **English and Spanish**, as Markdown + HTML + PDF:

- **Fabiola's Home Daycare** — `fabiolas-home-daycare-service-agreement*.{md,html,pdf}` (+ `-es`).
- **Nen's Sans Daycare** — `nens-sans-daycare-service-agreement*.{md,html,pdf}` (+ `-es`).

The `.md` is the editable source; the `.html`/`.pdf` are generated for signing.

## Ad creatives & social

| Folder | Contents |
|--------|----------|
| `Creatives Ads/` | Exported paid-ad images (`1.png`–`10.png`). |
| `ad-scripts/` | Short-form video/ad scripts (e.g. `higgsfield-founder-30s.md`). |
| `social/` | Social banners: `educare-fb-cover.png` (+ `fb-cover.html` source), `og-image.html`. |
| `public/og-image.png` | Open Graph share image for the site. |

## Client websites (`client-sites/`)

Full static websites we build for clients as part of the done-for-you package.

- **`united-friends-school/`** — a complete multi-page site (home, about, admissions, programs,
  summer-camp, community, alumni, support, contact) with its own `assets/`, a `build.js`, and its
  own `.vercel/` project link (deploys independently of the main marketing site).

When onboarding a new client who needs a site, this is the reference build to clone.

## Legacy / prototypes (`html/`)

Standalone HTML prototypes of the pages (`landing.html`, `enrollment.html`, `business-model.html`,
`deck.html`, etc.) that predate the Next.js app. Kept for reference; **not** deployed
(`.vercelignore`). The live site is `src/` — edit there, not here.
