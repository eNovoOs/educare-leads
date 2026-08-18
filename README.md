# EduCare Leads

Done-for-you enrollment marketing funnel for daycare / childcare / preschool owners.
Built with Next.js 16 (App Router) + Tailwind v4. Lead capture pushes into the **eNovo CRM**.

> 📖 **New here? Start with [`docs/`](./docs/README.md)** — the full project handoff hub covering
> the company, the codebase, the marketing assets, and how the business runs end to end. The
> sections below are the quick dev reference.

## The funnel

| Route | Purpose |
|-------|---------|
| `/` | Cold-traffic landing page (hero, stat bar, problem, 3-step system, built-in CRM, results, guarantee, FAQ, CTAs). All CTAs → `/apply`. |
| `/apply` | VSL + application form. Qualifies by revenue/locations and captures the lead. |
| `/thank-you` | Confirmation + booking-calendar embed slot. Form redirects here on success. |
| `/api/lead` | POST endpoint. Validates the lead and forwards it to eNovo. |

## Edit your copy in one place

All headlines, stats, testimonials, FAQs, phone/email, and the revenue gate live in
**`src/lib/site.ts`**. Change them there — every page reads from it.

## Wire up eNovo (lead capture)

1. In eNovo, create an inbound **webhook / lead-capture URL** for this account.
2. Copy `.env.example` → `.env.local` and fill in:
   ```
   ENOVO_WEBHOOK_URL=https://...   # the URL eNovo gives you
   ENOVO_API_KEY=                  # optional bearer token, if required
   ```
3. Leads POST as JSON: `firstName, lastName, fullName, email, phone, business, city, locations, revenue, goal, source, submittedAt`.

Until `ENOVO_WEBHOOK_URL` is set, leads are logged server-side (`[lead] ...`) so nothing is lost during setup, and the form still succeeds.

## Add your booking calendar

Drop your scheduler embed (eNovo scheduler / Calendly / Cal.com) into the placeholder
on `src/app/thank-you/page.tsx`. Optionally embed it on `/apply` too.

## Add your VSL

Replace the video placeholder block in `src/app/apply/page.tsx` with your Loom / YouTube / Wistia embed.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
```

## Deploy (Vercel)

```bash
vercel               # preview
vercel --prod        # production
```
Set `ENOVO_WEBHOOK_URL` (and `ENOVO_API_KEY`) in the Vercel project's Environment Variables.

## Still placeholder (swap before launch)
- Phone / email in `src/lib/site.ts`
- Testimonials & stats (use real client numbers + names with permission)
- VSL video, booking calendar embed
- The "not endorsed by Meta/Google" footer disclaimer is generic — have it reviewed.
