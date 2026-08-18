# EduCare Leads — Business Model

> **One-liner:** We book qualified families onto your calendar and fill your programs to capacity in 90 days — and we work for free until you get results.

A done-for-you enrollment marketing agency for childcare and education programs. We turn ad spend into qualified, ready-to-enroll families using hyper-local paid campaigns + AI-driven lead follow-up, plugged into the client's CRM. Built and priced on Alex Hormozi's *$100M Offers* "Grand Slam Offer" framework.

---

## 1. What We Sell

We do not sell "leads" or "ads." We sell **full programs** — capacity filled, a waitlist building, and the owner's front desk freed from chasing parents.

**Delivery model:** fully done-for-you.
1. **We build the enrollment machine** — hyper-local Meta & Google campaigns written, designed, and targeted to families within driving distance.
2. **AI converts every lead** — instant text/email, qualifies, and books each interested family onto a call, tour, visit, or registration.
3. **The client enrolls & we scale** — families show up ready to enroll; we track everything in a CRM, double down on what converts, and scale spend as the waitlist grows.

---

## 2. The Offer (Grand Slam Offer)

### Value proposition (headline)
> **We book qualified families onto your calendar and fill your programs to capacity in 90 days — and we work for free until you get results.**

**Subhead:** *Fully done-for-you enrollment marketing for childcare & education programs. We've filled 37+ programs across the U.S.*

### The guarantee (primary risk reversal)
> **We'll get you 2× more converted leads in your first 30 days than your best month ever — or we work for free until we do.**

- **"Converted lead" defined:** a *qualified inquiry* — an interested family who has contacted the program and meets its enrollment criteria. (Defined precisely so the guarantee is measurable and honest.)
- **Why this wins:** it's auto-tailored to each client's own track record (their "best month ever"), it's concrete, and the "work free until we do" reversal removes the client's risk entirely.

> ⚠️ **Operational note:** 2× on the *qualified-inquiry* unit (the widest, highest-count unit) is an aggressive bar for high-volume clients. Two de-risking levers to decide per deal: (a) base 2× on the client's *average* month instead of best, or (b) reserve 2× for programs under a volume threshold and use "more than your best month" for larger ones.

### How the offer maximizes the Hormozi Value Equation
```
            Dream Outcome  ×  Perceived Likelihood of Success
Value  =  ─────────────────────────────────────────────────
              Time Delay   ×   Effort & Sacrifice
```
| Lever | How we push it |
|---|---|
| **Dream outcome ↑** | "Fill your programs to capacity" / "2× your best month ever" |
| **Likelihood of success ↑** | Work-free-until-results guarantee + 37+ programs filled + childcare-only specialization |
| **Time delay ↓** | First qualified families in 7 days; 2× in 30 days; full in 90 days |
| **Effort & sacrifice ↓** | Fully done-for-you — no ad writing, no tech setup, no lead chasing, no new hire |

### Value stack (anchoring)
| Deliverable | Anchored value |
|---|---|
| Hyper-local Meta + Google "Enrollment Machine" campaigns (built, written, designed) | $4,000 |
| AI lead-conversion system (instant text, qualify, book) | $2,000/mo |
| CRM setup + lead tracking + weekly optimization | $1,500 |
| 90-day enrollment playbook + done-for-you creative | $2,500 |
| **The 2× Enrollment Guarantee** (work free until hit) | Priceless |

Anchor the price against **the cost of an empty spot** (~$1,000–$2,000/month each, $12k–$24k/year), which makes any fee look small.

### Enhancers (scarcity / urgency / bonuses)
- **Scarcity:** one program per local zip-code radius — "we won't run ads for your competitor down the street."
- **Urgency:** limited onboarding spots each month (cohort-based starts).
- **Bonuses:** Empty-Room Recovery Audit (free), front-desk visit-to-enrollment script, Waitlist Builder once at capacity.

---

## 3. Ideal Customer Profile (ICP)

### The buyer
The **owner or primary decision-maker** of a childcare or education program — owner/operator, director, or admissions lead with budget authority.

### The three audiences
1. **Daycares & childcare centers** (incl. preschools) — tours → enrollment
2. **Private & independent schools** — visits/open houses/applications → admission
3. **Summer & enrichment camps** — registrations/sign-ups → enrolled campers

### Qualification criteria (must-haves)
| Criterion | Threshold |
|---|---|
| Monthly revenue | **≥ $25k/month** (the gate) |
| Open capacity | Has real open spots to fill (not already at a long waitlist) |
| Locations | 1–5 sites (single-site to small multi-site groups) |
| Market | U.S., local market with enough family density to support paid ads |
| Sales capacity | Someone on staff who can take calls/tours/visits and close |
| Ad budget | Willing to fund ad spend *on top of* the management fee |

### Psychographics & pain points (what they feel)
- Relying on referrals and "Google luck" to stay full; enrollment is unpredictable.
- Leads slip through the cracks because no one follows up fast enough.
- Past ad spend brought tire-kickers, not enrolled families.
- Owner/director is too busy running the program to run marketing.
- Empty spots = quiet, ongoing revenue loss they can feel but can't fix.

### Trigger events (when they buy)
- A new location opening with rooms to fill.
- A season turning (fall enrollment, summer camp registration window).
- A competitor opening nearby.
- A recent dip in enrollment or a key referral source drying up.

### Disqualifiers (NOT our ICP)
- Under $25k/month revenue (can't sustain ad spend + fee profitably).
- Already at full capacity with a long waitlist (no problem to solve).
- No ad budget, or unwilling to spend on ads.
- No one available to follow up and close inbound families.
- Markets too rural/sparse to run effective local paid campaigns.
- Tiny in-home / micro operations below the revenue gate.

---

## 4. Funnel & Delivery System

**Acquisition funnel (our own marketing):**
1. **Landing page** (proof-heavy, offer-forward) → CTA "Book Your Free Strategy Call."
2. **/apply** — qualifying application (name, contact, program, market, locations, monthly revenue, #1 enrollment goal) + VSL.
3. **/thank-you** — booking calendar embed (call locks in).
4. **Strategy call** — qualify against ICP, present custom 90-day plan + exact numbers, close.

**Lead routing:** form posts to `/api/lead`, which forwards to the **eNovo CRM** webhook (`ENOVO_WEBHOOK_URL`); leads are logged server-side if the CRM isn't wired, so nothing is lost.

**Client delivery:** campaign build → AI follow-up + CRM → weekly optimization → scale to waitlist.

---

## 5. Pricing Model

- **Qualification gate:** programs doing ≥ $25k/month.
- **Structure:** management fee + client-funded ad spend (exact pricing set on the strategy call, by market and number of locations).
- **Profitability promise:** most owners are profitable on ad spend within the first month.
- **Risk reversal:** 2× Enrollment Guarantee — work free until the 30-day target is hit.

---

## 6. Differentiation

| | Competitors (e.g. ScaleDaycares) | EduCare Leads |
|---|---|---|
| Positioning | Proof-heavy, "book a call" | Proof **+ a stated, measurable guarantee** |
| Guarantee | Not stated up front | **2× your best month or we work free** (our edge) |
| Audience | Daycare-focused | **Childcare *and* education programs** (daycare, school, camp) |
| Follow-up | Lead gen | AI conversion + full CRM, lead → enrolled |
| Specialization | Childcare | Childcare & education only (raises believability) |

**Core wedge:** competitors lead with proof and leave the guarantee on the table. We lead with proof *and* put the strongest risk reversal in the industry front and center.

---

## 7. Partners & Stack

- **CRM:** eNovo (lead intake + nurture + pipeline).
- **Ad platforms:** Meta & Google (hyper-local).
- **Tech:** Next.js marketing site (this repo) → `/api/lead` → eNovo webhook → booking calendar.

---

*Brand tone: credible, private-school caliber — not techy or hypey. The offer is aggressive; the voice is trustworthy.*
