# 03 · Tech Architecture

The website, the funnel, and the plumbing behind the lead form.

## Stack

| Layer | Choice |
|-------|--------|
| Framework | **Next.js 16.2.6** (App Router) |
| UI | **React 19.2.4** + **Tailwind CSS v4** (via `@tailwindcss/postcss`) |
| Language | **TypeScript 5** |
| Email | **Resend** (`resend` npm package) |
| Video | **Remotion 4** (`@remotion/*`) |
| Hosting | **Vercel** (framework preset `nextjs`) |
| Analytics/Tracking | Microsoft Clarity, Meta Pixel + Conversions API |
| CRM | eNovo (via inbound webhook) |
| Scheduling | Calendly |

> ⚠️ **Read `AGENTS.md` before editing app code.** It flags that this Next.js version may differ
> from training-data defaults and points to the bundled docs in `node_modules/next/dist/docs/`.

## The acquisition funnel

```
Ad / organic
   │
   ▼
 /  (or /go)  ── landing page, all CTAs ──▶  /apply  (or /apply2)
                                              │  VSL + application form
                                              ▼
                                         POST /api/lead
                                              │  ┌─ email lead (Resend) ─▶ info@educareleads.com
                                              │  ├─ Meta Conversions API "Lead" event
                                              │  └─ forward to eNovo CRM webhook
                                              ▼
                                         /thank-you  ── Calendly embed ──▶ booked strategy call
```

There are **two parallel funnels** sharing the same backend automation:

- **Design-system funnel:** `/` → `/apply` → `/thank-you` (polished brand styling).
- **"Ugly" direct-response funnel:** `/go` → `/apply2` (intentionally plain, system-font,
  inline-styled — a classic DR style test against the branded version).

## The lead pipeline — `POST /api/lead`

Source: [`src/app/api/lead/route.ts`](../src/app/api/lead/route.ts). On each submission it does
three things and **never drops a lead** (falls back to a server-side log):

1. **Email** the lead to `LEAD_TO_EMAIL` (default `info@educareleads.com`) via Resend, with the
   submitter's email as reply-to.
2. **Meta Conversions API** — sends a server-side `Lead` event, deduplicated with the browser
   pixel via a shared `event_id`. Hashes email/phone/name (SHA-256) and forwards `fbp`/`fbc`
   cookies, IP, and user-agent. Only fires if `META_PIXEL_ID` + `META_CAPI_TOKEN` are set.
3. **eNovo CRM** — POSTs the lead JSON to `ENOVO_WEBHOOK_URL` (with optional bearer token). Only
   fires if the webhook is configured.

**Required fields:** `email`, `firstName`, `phone` (returns 422 otherwise).
**Lead JSON shape:** `firstName, lastName, fullName, email, phone, business, type, city,
locations, revenue, goal, source, submittedAt` (+ `eventId`, `sourceUrl` for pixel dedup).

## The onboarding pipeline — `POST /api/onboarding`

Source: [`src/app/api/onboarding/route.ts`](../src/app/api/onboarding/route.ts). When a signed
client fills the `/onboarding` form, this endpoint:

1. Emails the full submission to `ONBOARDING_TO_EMAIL` (falls back to `LEAD_TO_EMAIL`), grouped
   into the same 8 sections as the form (Business, Program, Brand, Offer, Marketing/Ad accounts,
   Phone/comms, Domain/website, Notes).
2. Generates and attaches a **Markdown brand brief** (`<client>-brand-brief.md`) — a ready-to-use
   doc to build the website + ad creatives from.
3. Builds a **setup checklist** that surfaces the decisions driving work: provision a Twilio
   number?, register/access domain?, design a logo?, source photos?, get Meta partner access?

This is the bridge from "closed deal" to "build" — see
[05-operations-playbook.md](./05-operations-playbook.md).

## Environment variables

Copy `.env.example` → `.env.local` for local dev; set the same in the Vercel project for
production.

| Variable | Required? | Purpose |
|----------|-----------|---------|
| `RESEND_API_KEY` | For emails | Enables lead + onboarding email notifications. |
| `LEAD_TO_EMAIL` | Optional | Where leads are emailed (default `info@educareleads.com`). |
| `LEAD_FROM_EMAIL` | Optional | Verified sender. Use `onboarding@resend.dev` for testing; a verified `@educareleads.com` address in prod. |
| `ONBOARDING_TO_EMAIL` | Optional | Where onboarding goes (defaults to `LEAD_TO_EMAIL`). |
| `META_PIXEL_ID` | For CAPI | Meta pixel / dataset id. |
| `META_CAPI_TOKEN` | For CAPI | Meta Conversions API access token. |
| `META_TEST_EVENT_CODE` | Optional | See events in Events Manager → Test Events. |
| `ENOVO_WEBHOOK_URL` | For CRM | eNovo inbound webhook; leads are forwarded here. |
| `ENOVO_API_KEY` | Optional | Bearer token if the eNovo endpoint requires auth. |

> If none of the integrations are configured, forms still succeed and every submission is logged
> server-side (`[lead] ...` / `[onboarding] ...`) so nothing is lost during setup.

## Tracking IDs (hard-coded in markup)

- **Meta Pixel** `1029290093151029` — in `src/app/layout.tsx` and the standalone HTML decks.
- **Microsoft Clarity** `x4cj1ovak4` — in the standalone HTML pages (e.g. `public/deck.html`).

These are live production IDs. Server-side Meta events (CAPI) are deduped against this pixel.

## Rewrites (`next.config.ts`)

Clean URLs map to the standalone HTML files in `public/`:
`/vsl → /vsl.html`, `/deck → /deck.html`, `/squeeze → /squeeze.html`. The new pitch deck is at
`/pitch-deck.html` (no rewrite yet — add one here if you want a `/pitch-deck` clean URL).

## Brand

Palette is defined once in [`src/app/globals.css`](../src/app/globals.css) (`:root` custom
properties) and mirrored in the standalone HTML/deck files:

| Token | Hex | Use |
|-------|-----|-----|
| `--ink` | `#0b2447` | Deep navy — hero, headings, dark sections |
| `--brand` | `#1d5fd8` | Primary blue |
| `--cta` | `#11a0d8` | Signature bright cyan — buttons |
| `--teal` | `#1c8b9c` | Logo teal — secondary accent |
| `--accent` | `#f5c518` | Gold — money / highlight |

Fonts: **Inter** (body) + **Archivo Black** (display headlines), loaded via `next/font` in
`layout.tsx`. Logos: `public/educare-leads-logo.png` and `-white.png`.
