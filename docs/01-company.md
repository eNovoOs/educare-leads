# 01 · The Company

> The business behind the code. For the full strategy doc see **[business-model.md](./business-model.md)** —
> this is the working summary a new team member needs.

## What EduCare Leads is

A **done-for-you enrollment-marketing agency** for childcare and education programs. We turn
ad spend into qualified, ready-to-enroll families using hyper-local paid campaigns + AI-driven
lead follow-up, plugged into the client's CRM.

We don't sell "leads" or "ads." We sell **filled programs** — capacity filled, a waitlist
building, and the owner's front desk freed from chasing parents.

| | |
|---|---|
| **Legal entity** | 9503-3692 Quebec Inc. |
| **Website / domain** | educareleads.com |
| **Email** | info@educareleads.com |
| **Phone** | +1 (438) 799-4574 |
| **Booking link** | https://calendly.com/educareleads/30min |
| **Market** | U.S. local markets with enough family density for paid ads |

## What we deliver (the done-for-you model)

1. **We build the enrollment machine** — hyper-local Meta & Google campaigns, written, designed,
   and targeted to families within driving distance.
2. **AI converts every lead** — instant text/email, qualifies, and books each interested family
   onto a call, tour, visit, or registration.
3. **The client enrolls & we scale** — families show up ready to enroll; everything is tracked
   in a CRM, we double down on what converts and scale spend as the waitlist grows.

The internal name for this system is the **Educare Enrollment System**, packaged for clients as
four parts: **Traffic Engine** (ads) · **AI Front Desk** (instant follow-up + booking) ·
**Enrollment CRM** (tracking) · **Growth Loop** (optimize + scale).

## The offer & guarantee (Hormozi "Grand Slam Offer")

- **Value proposition:** *"We book qualified families onto your calendar and fill your programs
  to capacity in 90 days — and we work for free until you get results."*
- **Primary guarantee (risk reversal):** *"2× more converted leads in your first 30 days than
  your best month ever — or we work for free until we do."*
  - A **converted lead** = a qualified family who has contacted the program and meets its
    enrollment criteria (defined precisely so the guarantee is measurable).
- **Enhancers:** one program per zip-code radius (exclusivity), limited monthly onboarding
  cohorts (scarcity), and bonuses (free Empty-Room Recovery Audit, front-desk script,
  Waitlist Builder).

## Ideal Customer Profile (ICP)

**The buyer:** the owner / director / admissions lead of a childcare or education program with
budget authority.

**Three audiences:** (1) daycares & childcare centers/preschools, (2) private & independent
schools, (3) summer & enrichment camps.

**Must-haves:**

| Criterion | Threshold |
|---|---|
| Monthly revenue | **≥ $25k/month** (the gate) |
| Open capacity | Real open spots to fill |
| Locations | 1–5 sites |
| Market | U.S., enough local family density |
| Sales capacity | Someone on staff to take calls/tours and close |
| Ad budget | Willing to fund ad spend on top of the management fee |

**Disqualifiers:** under $25k/month, already at capacity with a long waitlist, no ad budget,
no one to follow up/close, markets too rural/sparse, tiny in-home micro-operations.

## Pricing model

- **Gate:** programs doing ≥ $25k/month.
- **Structure:** a management fee **+** client-funded ad spend. Exact pricing is set per deal on
  the strategy call (by market and number of locations).
- **Promise:** most owners are profitable on ad spend within the first month.
- **Risk reversal:** the 2× guarantee above.

> **Note for the deck:** as of this handoff we present **no explicit prices** in the client pitch
> deck ("for the moment"). Pricing is discussed live on the call. See
> [04-content-and-assets.md](./04-content-and-assets.md).

## How we're different

| | Typical agency | EduCare Leads |
|---|---|---|
| Deliverable | Sends raw leads | Books families onto the calendar |
| Follow-up | Client chases it | AI does it in seconds |
| System | Nothing installed | A full system, installed & run for us |
| Focus | Any industry | Childcare & education only |
| Guarantee | Not stated up front | 2× your best month or we work free |

**Core wedge:** competitors lead with proof and leave the guarantee on the table. We lead with
proof *and* put the strongest risk reversal in the industry front and center.

## Proof points we use (verify before quoting)

- **$14.10** average cost per booked family · **4.2×** average return on ad spend ·
  **37+** programs filled across the U.S. · **90 days** to a full calendar.
- Named testimonials (Maria T. / James P. / Aisha R. / Dwayne K.) live in
  [`src/lib/site.ts`](../src/lib/site.ts). Treat these as marketing copy — swap in real,
  permissioned client numbers as they're confirmed.

## Real client work in this repo

| Client | Type | What's here |
|---|---|---|
| United Friends School (Quakertown, PA) | Private Quaker school | Full proposal + a built static website (`client-sites/`) |
| Mutnick Montessori | Montessori school | Proposal (`proposals/`) |
| Fabiola's Home Daycare | Home daycare | Signed-format service agreement, EN + ES (`contracts/`) |
| Nen's Sans Daycare | Daycare | Service agreement, EN + ES (`contracts/`) |

## Brand voice

Credible, private-school caliber — **not** techy or hypey. The offer is aggressive; the voice is
trustworthy. Brand palette and logos are documented in
[03-tech-architecture.md](./03-tech-architecture.md#brand) and defined in
[`src/app/globals.css`](../src/app/globals.css).
