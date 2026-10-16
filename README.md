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

## No-show reduction: booking emails + reminders

Flow: ad → VSL/squeeze page → lead form → `POST /api/lead` → redirect to Calendly (prefilled) → Calendly confirmation redirect to `/booked`.

| Piece | Where |
|-------|-------|
| `/booked` page (what to expect, prep checklist, noindex, Meta pixel) | `src/app/booked/page.tsx` |
| "Next step: book your call" email, sent from `/api/lead` to the lead | `src/lib/emails/templates.ts` → `nextStepEmail` |
| Booking confirmation/prep email + 24h / 3h / 1h reminders | `src/lib/emails/templates.ts`, scheduling in `src/lib/emails/schedule.ts` |
| Calendly webhook (`invitee.created`, `invitee.canceled`) | `src/app/api/calendly/webhook/route.ts` |
| Calendly prefill (name, email, phone `a1`, UTMs) + signature check | `src/lib/calendly.ts` |
| Preview all emails as HTML (sends nothing) | `npx tsx scripts/render-emails.ts out/emails` |

Reminders use Resend `scheduledAt`. No database is needed: on cancel/reschedule the webhook lists recent Resend emails and cancels those still `scheduled` for that recipient at exactly start-24h/3h/1h of the cancelled slot (see `cancelReminders`). A Calendly reschedule sends `invitee.canceled` (old time) + `invitee.created` (new time), so old reminders are cancelled and new ones scheduled.

### Environment variables

| Var | Purpose |
|-----|---------|
| `RESEND_API_KEY` | Already used. Also sends lead-facing emails. |
| `EMAIL_FROM` | Sender for lead-facing emails. Default `Educare Leads <hello@send.educareleads.com>` (domain must stay verified in Resend). `LEAD_FROM_EMAIL` still controls only the internal alert. |
| `CALENDLY_WEBHOOK_SIGNING_KEY` | **Required** for `/api/calendly/webhook`. You choose it when creating the subscription (below). Without it the route returns 500. |
| `CALENDLY_API_TOKEN` | Not used by the app; only needed to run the one-off subscription `curl` below. |
| `CALENDLY_PHONE_PARAM` | Optional. Calendly custom-answer param for phone (default `a1`; set empty to disable). |

### Manual setup (once)

1. **Vercel**: add `CALENDLY_WEBHOOK_SIGNING_KEY` (e.g. `openssl rand -hex 32`) and optionally `EMAIL_FROM` to the Production (and Preview) environment, then redeploy.
2. **Calendly event → Confirmation page**: Event type settings → "When booking is made" → *Redirect to an external site* → `https://educareleads.com/booked` (tick "Pass event details to your redirect URL" if you want `?name=` for personalisation).
3. **Calendly custom question**: make sure the event has a "phone number" question as the **first** custom question so `a1` fills it (or set `CALENDLY_PHONE_PARAM`). Webhooks need a paid plan (you have one).
4. **Create the webhook subscription** (after the deployment is live; use a token from the Calendly account that owns the `educareleads-info/60min` event):
   ```bash
   # find your org + user URIs
   curl -s https://api.calendly.com/users/me -H "Authorization: Bearer $CALENDLY_API_TOKEN"

   curl -s -X POST https://api.calendly.com/webhook_subscriptions \
     -H "Authorization: Bearer $CALENDLY_API_TOKEN" -H "Content-Type: application/json" \
     -d '{
       "url": "https://educareleads.com/api/calendly/webhook",
       "events": ["invitee.created", "invitee.canceled"],
       "organization": "https://api.calendly.com/organizations/<ORG_UUID>",
       "user": "https://api.calendly.com/users/<USER_UUID>",
       "scope": "user",
       "signing_key": "<same value as CALENDLY_WEBHOOK_SIGNING_KEY>"
     }'
   ```
5. **Test** with a booking using your own address and check the Resend dashboard (confirmation sent, three reminders `scheduled`); then cancel it and confirm they show `canceled`.

> The eNovo CRM also sends its own nurture emails. Review overlap with these reminders so leads don't get duplicates.
