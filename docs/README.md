# EduCare Leads — Project Handoff Hub

Welcome. This folder is the **single source of truth** for everything about EduCare Leads —
the company, the product, the codebase, the marketing assets, and how we run the business
day to day. If you're new, read the docs in order.

> **TL;DR** — EduCare Leads is a done-for-you enrollment-marketing agency for childcare &
> education programs (daycares, private schools, camps). This repo is our **marketing website
> + funnel + video/creative production + client deliverables**, built on Next.js 16 and
> deployed on Vercel.

---

## Read these in order

| # | Doc | What it covers |
|---|-----|----------------|
| 1 | **[01-company.md](./01-company.md)** | Who we are, what we sell, the offer & guarantee, ideal customer, pricing, differentiation. Start here to understand the *business*. |
| 2 | **[02-project-map.md](./02-project-map.md)** | A guided tour of every folder and file in the repo — what lives where and why. |
| 3 | **[03-tech-architecture.md](./03-tech-architecture.md)** | The website & funnel: routes, the lead pipeline, API endpoints, integrations, environment variables. |
| 4 | **[04-content-and-assets.md](./04-content-and-assets.md)** | The pitch deck, VSL video (Remotion), proposals, contracts, ad creatives, social assets, and client sites. |
| 5 | **[05-operations-playbook.md](./05-operations-playbook.md)** | How the business runs end-to-end: lead → strategy call → onboarding → build → launch → optimize. |
| 6 | **[06-dev-setup-and-deploy.md](./06-dev-setup-and-deploy.md)** | Get the app running locally, edit copy, deploy, and regenerate the deck PDF / VSL video. |

### Deep-reference material (kept alongside)

| Doc | What it is |
|-----|------------|
| **[business-model.md](./business-model.md)** | The full "Grand Slam Offer" business model (the canonical strategy doc). `01-company.md` summarizes it. |
| **[vsl-script.md](./vsl-script.md)** | The video sales letter script — voiceover + on-screen direction, beat by beat. |
| **[vsl-voiceover.md](./vsl-voiceover.md)** | The per-scene voiceover copy used to generate the narration audio. |

---

## The 60-second orientation

- **What the company does:** turns ad spend into enrolled families for childcare/education
  programs — fully done-for-you (ads + AI lead follow-up + CRM), guaranteeing results.
- **What this repo is:** the Next.js marketing site (`educareleads.com`) with the acquisition
  funnel (`/` → `/apply` → `/thank-you`), a client-onboarding intake (`/onboarding`), a lead
  API that emails + tracks + forwards leads, plus all the sales/marketing production assets
  (pitch deck, VSL video, proposals, contracts, ad creatives, client websites).
- **Where the words live:** almost all site copy is centralized in
  [`src/lib/site.ts`](../src/lib/site.ts). Edit there, every page updates.
- **How leads flow:** the form POSTs to `/api/lead`, which (1) emails the lead via Resend,
  (2) fires a Meta Conversions API event, and (3) forwards to the eNovo CRM. Nothing is ever dropped.
- **How it ships:** `git push` → Vercel builds & deploys. Environment variables (Resend, Meta,
  eNovo) are set in the Vercel project.

## Key facts at a glance

| | |
|---|---|
| **Brand** | EduCare Leads |
| **Legal entity** | 9503-3692 Quebec Inc. (Canada) |
| **Website** | https://www.educareleads.com |
| **Contact** | info@educareleads.com · +1 (438) 799-4574 |
| **Market served** | United States — local childcare & education programs |
| **Stack** | Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript · Remotion · Resend · Vercel |
| **CRM** | eNovo |
| **Ad platforms** | Meta (Facebook/Instagram) · Google |

> Anything in this hub that reads like a claim (client counts, cost-per-lead, ROAS, named
> testimonials) is **marketing copy** drawn from our own materials — verify against real
> account data before repeating it to a client or regulator.
