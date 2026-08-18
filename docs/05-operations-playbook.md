# 05 · Operations Playbook

How the business runs end to end — from a stranger seeing an ad to a client's program filling up.
This ties the marketing assets and the code together into one workflow.

## The full journey

```
1. ACQUIRE   ─ paid ads (Meta/Google) + organic drive traffic to the landing page
2. CAPTURE   ─ /apply application form → POST /api/lead → emailed + tracked + into eNovo
3. BOOK      ─ /thank-you Calendly embed → prospect books a free strategy call
4. PITCH     ─ present the pitch deck; qualify against ICP; map their 90-day numbers; close
5. CONTRACT  ─ send the service agreement (contracts/ template)
6. ONBOARD   ─ client fills /onboarding → brand brief + setup checklist emailed to the team
7. BUILD     ─ website (client-sites/), ad campaigns, AI follow-up, CRM wired
8. LAUNCH    ─ campaigns live; first qualified families booked (target: within 7 days)
9. OPTIMIZE  ─ weekly optimization; hit the 2× guarantee; scale to a waitlist over 90 days
```

## 1–3 · Acquire → Capture → Book (automated)

- Traffic lands on `/` (branded) or `/go` (direct-response). Every CTA points to the application.
- The prospect completes `/apply` (or `/apply2`). The form POSTs to **`/api/lead`**, which emails
  the lead to `info@educareleads.com`, fires the Meta Conversions API event, and forwards to the
  **eNovo CRM**. See [03-tech-architecture.md](./03-tech-architecture.md).
- They're redirected to `/thank-you` and book a call via the **Calendly** embed
  (`https://calendly.com/educareleads/30min`).

**What a team member watches:** the lead inbox (`info@educareleads.com`), eNovo pipeline, and
Calendly bookings. If leads aren't arriving, check `RESEND_API_KEY` / `ENOVO_WEBHOOK_URL` in
Vercel and the server logs.

## 4 · Pitch (the strategy call)

- Present **`public/pitch-deck.html`** (fullscreen) or send the **PDF**.
- Qualify against the ICP gate (≥ $25k/month, open spots, sales capacity, ad budget) — see
  [01-company.md](./01-company.md).
- Walk through their **90-day plan and exact numbers** (projected leads, cost per enrollment).
- Present the **2× guarantee** to remove risk, then close. **Pricing is discussed live** — the
  deck intentionally shows no prices.

## 5 · Contract

- Start from a template in **`contracts/`** (edit the `.md`, regenerate `.html`/`.pdf`).
- Spanish-speaking clients get the `-es` version.

## 6 · Onboard (deal → build)

- Send the client to **`/onboarding`**. Their submission hits **`/api/onboarding`**, which emails
  the team the full intake **plus an auto-generated brand brief** (`<client>-brand-brief.md`) and
  a **setup checklist** (Twilio number? domain access? logo? photos? Meta access?).
- The brand brief is the single doc the build team works from.

## 7–8 · Build → Launch

The done-for-you system, assembled per client:

| Component | What gets built |
|-----------|-----------------|
| **Website** | A client site (clone `client-sites/united-friends-school/` as reference) or landing pages. |
| **Traffic Engine** | Hyper-local Meta & Google campaigns + creatives (`Creatives Ads/`, `ad-scripts/`). |
| **AI Front Desk** | Instant SMS/email follow-up + booking (Twilio number if the checklist flagged one). |
| **Enrollment CRM** | eNovo pipeline wired to capture and track every lead to enrolled. |

Target: **first qualified families booked within 7 days** of launch.

## 9 · Optimize → Scale

- Weekly optimization: double down on what converts, cut what doesn't, lower cost per enrollment.
- Hit the **2× guarantee** (2× the client's best month in the first 30 days) — or keep working
  free until it's hit.
- At capacity, turn on the **Waitlist Builder** and scale ad spend.

## Where each step's assets live

| Step | Asset / code |
|------|--------------|
| Acquire | `Creatives Ads/`, `ad-scripts/`, `social/`, the VSL (`remotion/`, `public/vo/`) |
| Capture | `src/app/apply*`, `src/components/LeadForm.tsx`, `src/app/api/lead/route.ts` |
| Book | `src/app/thank-you/page.tsx`, `src/components/CalendlyEmbed.tsx` |
| Pitch | `public/pitch-deck.html`, `Educare-Leads-Pitch-Deck.pdf` |
| Contract | `contracts/` |
| Onboard | `src/app/onboarding/`, `src/app/api/onboarding/route.ts` |
| Build | `client-sites/`, eNovo, Meta/Google ad accounts |

## Handy references

- Copy to edit: [`src/lib/site.ts`](../src/lib/site.ts)
- Env & integrations: [03-tech-architecture.md](./03-tech-architecture.md)
- Dev/deploy/regeneration: [06-dev-setup-and-deploy.md](./06-dev-setup-and-deploy.md)
