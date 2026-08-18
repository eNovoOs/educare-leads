# Educare CRM — VSL Script

**Runs on:** `/educarecrm-vsl` (replaces `<VslPlaceholder />`)
**Offer:** 7-day free trial, card required
**Audience:** owners and directors of daycares, private schools, and summer camps
**Target length:** ~5:30–6:00 at a natural conversational pace
**Voice:** female, warm, conversational — ElevenLabs
**Format:** 1920×1080, 30fps

---

## Production notes

**Screenshots are animated in Remotion, not AI video.** Dense UI text warps under
image-to-video models. Motion for these frames = push-in, pan, highlight ring,
cursor move, counter tick. All crisp, all deterministic.

**Assets available** (drop into `public/vsl/`):

| Key | Screenshot | Used in |
|---|---|---|
| `dashboard` | My Dashboard — greeting, stat row, recent activities | S04, S12 |
| `inbox` | Conversations → Inbox, Jesse Fernandez from Facebook | S05 |
| `ai-hub` | Conversational AI Hub — agent management | S06 |
| `deals` | Deals pipeline — Qualified 41 / Demo Scheduled 28 / Proposal Made 3 | S07 |
| `email` | Email Campaign — campaign manager + analytics | S08 |

**Numbers read aloud** are written phonetically in the narration so ElevenLabs
doesn't mangle them ("twenty-four seven", not "24/7").

---

## S01 — Hook (0:00–0:22)

> **VO:** It's nine o'clock on a Sunday night. A mom just found your center on
> Google. She's got a three-year-old, she's been putting this off for weeks, and
> she finally fills out your form. And then… nothing. Nobody's at the desk. The
> message sits there until Tuesday morning. By the time you call her back, she's
> already toured the place down the road. And here's the part that stings — you
> never even knew she was interested.

**Visual:** Dark. A phone-screen mockup, timestamp `9:04 PM`, a form submission
landing. Cursor blinks. Clock ticks forward — Sunday → Monday → Tuesday. The
message sits unread. Type on screen: **"She was ready. Nobody answered."**

*(Optional Higgsfield B-roll: parent on a couch at night, phone glow on her face.)*

---

## S02 — Agitate (0:22–0:52)

> **VO:** If you run a daycare, a school, or a camp, you already know this
> feeling. Your waitlist lives in a spreadsheet. Your tours live in a notebook.
> Your follow-ups live in somebody's head. You've got a scheduler over here, an
> email tool over there, a form builder you set up once and forgot about, and a
> management app that handles billing but does absolutely nothing to fill your
> open spots. Five tools. None of them talking to each other. And your front desk
> is playing phone tag instead of being present with the families who are
> actually in the building.

**Visual:** Five disconnected app tiles float apart — spreadsheet, calendar,
inbox, form, CRM — with broken dotted lines between them. They drift, never
connect. Tiles greyed and cluttered.

---

## S03 — Cost of the leak (0:52–1:18)

> **VO:** Let's put a number on it. One open spot costs you somewhere between a
> thousand and two thousand dollars a month in recurring revenue. Four open
> spots? That's six thousand a month. Seventy-two thousand a year — sitting in
> rooms you've already paid rent on. And roughly a quarter of the families who
> reach out never get a reply at all. Not because you don't care. Because the
> message came in after hours, or during pickup, or while you were in a tour.

**Visual:** Receipt-style tally builds line by line —
`Open spot #1 … $1,500`, `#2 … $1,500`, `#3 … $1,500`, `#4 … $1,500` — then
`TOTAL / MONTH  $6,000` stamps in, then `TOTAL / YEAR  $72,000` in accent gold.
Below: a bar filling to **20–30% of inquiries never answered**.

---

## S04 — Reframe + reveal (1:18–1:42)

> **VO:** So here's the thing. You don't have a marketing problem. You have a
> follow-up problem. And that's actually good news, because follow-up is a system
> — and a system can be installed. That's what this is.

**Visual:** Text resolves: **"You don't have a marketing problem."** → strikes
through → **"You have a follow-up problem."** Then the scattered tiles from S02
fly inward and snap into one window: the **`dashboard`** screenshot, pushing in
slowly from 105% to 100%.

---

## S05 — Never miss a parent (1:42–2:14)

> **VO:** Every inquiry lands in one place. Facebook, your website form, a text,
> an email, a phone call — all of it flows into a single inbox that your whole
> team can see. Look at this one. Jesse came in from a Facebook form. Full
> contact details, the source, a timestamp, and a ticket that stays open until
> somebody actually handles it. Nothing gets buried. Nothing sits in a personal
> inbox while a family waits.

**Visual:** **`inbox`** screenshot. Pan from the folder rail to the conversation
list, then a highlight ring snaps onto the Jesse Fernandez card. Callout labels
fade in beside the detail panel: *Source: Facebook* → *Created 3:30 PM* →
*Ticket #INBO-1*. Small badge animates: **Unassigned → Assigned**.

---

## S06 — AI answers around the clock (2:14–2:52)

> **VO:** But catching the lead isn't enough. Somebody has to answer. So you build
> an AI agent that knows your program — your hours, your tuition, your age
> groups, your policies. And it replies in about seven seconds, at nine at night,
> on a Saturday, over the holidays. It answers the routine questions, it checks
> what you've got open, and it books the tour straight onto your calendar. And
> the moment a conversation needs a human, it hands it to your team. You're not
> replacing your front desk. You're giving it a night shift.

**Visual:** **`ai-hub`** screenshot, push in on "Create Your First AI Agent."
Then cut to an animated SMS thread overlaying the dashboard:

- *Parent:* "Hi, do you have spots for a 3yr old?"
- *AI (0:07):* "We do! We have a few openings. Would Sat 10am or Mon 4pm work for a quick tour?"
- *Parent:* "Saturday works!"
- *AI:* "Booked ✅ Sat 10am. We'll send a reminder."

A timer chip in the corner shows **0:07**. Clock face spins through night hours.

---

## S07 — Every family tracked to enrolled (2:52–3:26)

> **VO:** And every one of those families lands on a board like this. Qualified.
> Demo scheduled. Proposal made. Enrolled. You can see, at a glance, exactly
> where every family sits and who's gone quiet. No more "did anyone ever call her
> back?" No more finding out in October that a family you toured in August went
> somewhere else. It's all right here, and it updates itself.

**Visual:** **`deals`** screenshot. Slow pan left→right across the pipeline
columns. Column headers pop in sequence with their counts —
**Qualified 41** → **Follow-Up 0** → **Demo Scheduled 28** → **Proposal Made 3**.
A single deal card animates dragging from *Qualified* into *Demo Scheduled*.
The `$64.5K` figure counts up from `$0`.

---

## S08 — Marketing that runs itself (3:26–4:02)

> **VO:** Then there's everything you'd normally pay an agency for. Email and text
> campaigns to your whole parent list — segmented by program, by age group, by
> campus. Re-enrollment sequences that go out to last summer's camp families
> automatically. Registration pages you can build in an afternoon, one per
> session or per program. Your website and landing pages, hosted right here.
> Reviews, social posts, even your Facebook ads. And when a family says yes, they
> sign and pay without you printing a single form.

**Visual:** **`email`** screenshot, push in. Stat tiles tick up from zero:
*Total Campaigns*, *Active*, *Click Rate*, *Open Rate*. Then a fast montage of
sidebar items highlighting one by one — **SMS Campaign · WhatsApp · Social Media
Planner · Lead Scoring · Reputation · Facebook Ads · CMS · Payments ·
E-Signature**. Each snaps in with a check.

---

## S09 — Consolidation / cost (4:02–4:32)

> **VO:** Now go look at what you're paying for right now. The scheduler. The
> email platform. The funnel builder. The form tool. The CRM you stopped updating
> in March. Add those up. Most programs that move onto one platform save around
> seven hundred dollars a month — and that's before you count the enrollments
> you stop losing.

**Visual:** Tool logos/name chips appear in a grid — *Calendly, Mailchimp,
ClickFunnels, Pipedrive, ActiveCampaign, spreadsheets* — then each gets struck
through in red one at a time and collapses into a single Educare CRM tile.
Counter: **`− $700 / month`** in accent gold.

---

## S10 — The differentiator (4:32–5:06)

> **VO:** But here's what actually makes this different, and it's the part I want
> you to hear. Software on its own doesn't fix anything. Everybody's got a
> trial-and-a-help-doc. You get a one-on-one call with a specialist — a real
> person who sits down with you, learns how your program actually runs, and sets
> the thing up around it. Your pipeline. Your AI agent. Your follow-up sequences.
> You are not handed a login and wished good luck. And you're not doing this
> alone at eleven at night with a knowledge base open in another tab.

**Visual:** Split screen. **Left:** a lonely empty dashboard, a "Get Started"
doc, a spinner — desaturated, labeled *"Everyone else"*. **Right:** a warm
two-person call frame with the dashboard being configured live, checkmarks
landing on *Pipeline built · AI agent trained · Sequences live* — labeled
*"You, on day one"*. This is the emotional peak — hold it.

*(Optional Higgsfield B-roll: a friendly specialist on a video call.)*

---

## S11 — The offer (5:06–5:34)

> **VO:** So here's what I want you to do. Take it for seven days, free. Every
> module is unlocked from day one — the pipeline, the AI agent, the campaigns,
> the pages, the full training academy. Not a stripped-down demo version. The
> real thing, running on your own families. You'll need a card to open the
> account, and if you cancel any time before day seven, you're never charged. And
> your setup call happens inside that first week, so you don't lose a day of it.

**Visual:** Trial card assembles — **7 DAYS FREE**, then the unlocked checklist
scrolls: *CRM & pipeline · AI front desk · Tour booking · Email & SMS ·
Automations · Registration pages · Analytics · Academy · 1-on-1 setup call*.
Then a clean three-step billing strip: **Today — nothing charged** →
**Days 1–7 — full access** → **Day 8 — cancel any time before this**.

---

## S12 — CTA (5:34–5:58)

> **VO:** If you've got open spots right now, and families are slipping through
> the cracks — you already know it. Click the button below this video, tell us
> about your program, and grab your onboarding slot. Seven days from now you
> could have every inquiry answered in seconds, every tour on the calendar, and
> every family tracked all the way to enrolled. Let's get your rooms full.

**Visual:** Return to the **`dashboard`** screenshot, pulling back and tilting
slightly. Overlay: a large pulsing CTA button — **Start My 7-Day Free Trial** —
with a down-arrow pointing off the bottom of the frame toward the real page
button. Logo, then `educareleads.com`. Fade.

---

## Scene ID map (for `remotion/crm-narration.ts`)

```
s01_hook            s05_inbox           s09_savings
s02_agitate         s06_ai              s10_specialist
s03_cost            s07_pipeline        s11_offer
s04_reframe         s08_marketing       s12_cta
```

---

## ⚠️ Claims to verify before render

- **"about seven seconds"** — AI reply time. Carried from existing site copy.
- **"$700/month average saving"** — eNovo's published figure, not measured on
  education clients.
- **"$1,000–$2,000 per open spot"** and **"20–30% of inquiries never answered"** —
  industry framing already used on the landing pages.
- **No testimonials in this cut.** Deliberate — there are no real Educare CRM
  customer quotes yet. When you have one from a daycare, a school, and a camp,
  they slot between S09 and S10.

---

## Background music

Plumbing lives in `remotion/crm/MusicBed.tsx`. It is **off by default** —
`hasMusic: false` — so the render never breaks when no track is present.

To add music:

1. Drop a licensed track at `public/vsl/music-bed.mp3` (needs to run ~4 min)
2. Render with `npm run crm:render:music`

The bed sits at **7% volume** (~-23dB under the narration), fades up over 2s,
and ducks away over the final 4s so the CTA lands clean. Adjust `BED_VOLUME`
in `MusicBed.tsx` if it needs to sit higher or lower.

**Licensing:** this video runs on a commercial ad page, so the track needs a
commercial licence. Higgsfield cannot generate music — its audio tool is
speech-only and explicitly refuses standalone music/SFX.
