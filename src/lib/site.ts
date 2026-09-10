// Central content + brand config for EduCare Leads.
// Edit copy, stats, and proof here — pages read from this file.

export const site = {
  name: "EduCare Leads",
  // The value proposition — done-for-you system installation + 90-day outcome.
  tagline:
    "We install a done-for-you enrollment system that fills your calendar with qualified families — within 90 days of working with us.",
  subhead:
    "Fully done-for-you enrollment marketing for childcare & education programs. We've filled 37+ programs across the U.S. — see the proof below.",
  domain: "educareleads.com",
  phone: "+1 (438) 799-4574",
  phoneHref: "tel:+14387994574",
  email: "info@educareleads.com",
  bookingPath: "/apply",
  // Calendly scheduling link — every "Book a Call" CTA opens this.
  calendlyUrl: "https://calendly.com/d/dv8r-s8f-3vt/connect-w-andre-j",
  // Separate Calendly link for the CRM funnel (educarecrm* pages) only.
  crmCalendlyUrl: "https://calendly.com/d/d2j9-jyr-wxd/connect-w-andre-j-crm",
  // Minimum monthly revenue we work with (qualification gate).
  minMonthlyRevenue: "$25k/month",
};

// Who we serve — the three program types.
export const audiences = [
  "Daycares & childcare centers",
  "Private & independent schools",
  "Summer & enrichment camps",
];

// Headline proof metrics (shown in the hero stat bar).
export const stats = [
  { value: "$14.10", label: "Avg. cost per booked family" },
  { value: "90 days", label: "To a full calendar — done-for-you" },
  { value: "37+", label: "Programs filled across the U.S." },
  { value: "4.2x", label: "Average return on ad spend" },
];

// The 3-step system.
export const steps = [
  {
    n: "01",
    title: "We Install the Educare Enrollment System",
    body: "We launch hyper-local Meta & Google ad campaigns built specifically for childcare and education programs — written, designed, and targeted to families within driving distance of your location.",
  },
  {
    n: "02",
    title: "AI Converts Every Lead For You",
    body: "Our AI instantly texts, qualifies, and books every interested family — onto a call, a tour, a visit, or a registration — no chasing leads, no missed messages, no busywork for your staff.",
  },
  {
    n: "03",
    title: "You Enroll & We Scale",
    body: "Families show up ready to enroll. We track every lead in your CRM, double down on what converts, and scale spend as your waitlist grows.",
  },
];

// Case-study style results — spanning daycare, private school, and camp.
export const results = [
  {
    metric: "42 enrollments in 50 days",
    quote:
      "We went from praying for a phone call to turning families away. EduCare Leads filled our infant room and built a waitlist in under two months.",
    name: "Maria T.",
    role: "Owner, 2-center daycare group · Texas",
  },
  {
    metric: "61 applications in 45 days",
    quote:
      "Our open-house calendar was packed for the first time in years. The AI follow-up booked families before our admissions team could even pick up the phone.",
    name: "James P.",
    role: "Admissions Director, private school · Florida",
  },
  {
    metric: "Summer sessions sold out in 3 weeks",
    quote:
      "We filled every session and started a waitlist a full month earlier than last year. Registrations came in while we slept.",
    name: "Aisha R.",
    role: "Director, day camp · Georgia",
  },
  {
    metric: "55 booked visits in the first 30 days",
    quote:
      "Hit capacity at my newest location faster than any of my other three. I'm now using them to open location number five.",
    name: "Dwayne K.",
    role: "Multi-site owner · Ohio",
  },
];

export const caseStudy = {
  slug: "bilingual-camp",
  kicker: "Case study · Summer & enrichment camp",
  client: "Laurus Summer Camp — bilingual day camp · Canada",
  headline: "Same budget. Double the clicks. Half the cost.",
  sub:
    "We rebuilt this camp's ads, website, and registration flow — then re-architected the whole ad account. On a near-identical budget year over year, click-through more than doubled and cost per click was cut in half.",
  window: "Jan 1 – Jul 3, 2025 vs Jan 1 – Jul 3, 2026 · identical window, near-identical budget",

  // The four headline numbers (snapshot bar).
  snapshot: [
    { value: "2×", label: "Click-through rate (1.26% → 2.62%)" },
    { value: "−50%", label: "Cost per click (CA$1.00 → CA$0.50)" },
    { value: "×4.4", label: "Higher-intent leads year over year" },
    { value: "+103%", label: "Ad clicks on the same spend" },
  ],

  // Hero proof card — the cleanest, most defensible comparison.
  hero: {
    big: "2×",
    bigLabel: "click-through rate — on flat budget & flat CPM",
    rows: [
      ["Ad spend (CAD)", "+2.3%"],
      ["Cost per 1,000 views (CPM)", "+4.5% — flat"],
      ["Click-through rate", "+108%"],
      ["Cost per click", "−50%"],
    ] as [string, string][],
    note:
      "When impression costs hold steady but click-through doubles, the lever is the creative and the website — not cheaper ad space.",
  },

  // The situation.
  situation: {
    kicker: "The situation",
    title: "A camp relying on two generic campaigns",
    body:
      "This bilingual day-camp brand ran the same summer playbook every year: two broad ad campaigns, no split by location or program, and a dated website that leaked interested families before they ever registered. Demand was there — the follow-through wasn't.",
  },

  // What we installed (maps to the Educare enrollment system).
  installed: {
    kicker: "What we installed",
    title: "A refreshed engine, end to end",
    items: [
      {
        name: "Rebuilt creative",
        body: "Fresh ad creative and offers, replacing the tired static ads that families had scrolled past for two summers.",
      },
      {
        name: "Full website rebuild + CRO",
        body: "A rebuilt, conversion-optimized website and dedicated landing pages per program, so ad clicks turned into registrations instead of bounces.",
      },
      {
        name: "Registration-flow QA",
        body: "We audited and fixed the online registration flow end to end, closing the gaps where families were dropping off before they enrolled.",
      },
      {
        name: "Re-architected ad account",
        body: "Two generic campaigns became a segmented engine: per-location and per-program lead campaigns, dedicated website-lead campaigns, and remarketing.",
      },
    ],
  },

  // Year-over-year results table.
  table: {
    kicker: "The results",
    title: "Year over year, same window, same budget",
    columns: ["Metric", "2025", "2026", "Change"],
    rows: [
      ["Ad spend (CAD)", "CA$29,666", "CA$30,338", "+2.3%"],
      ["Impressions", "2,361,557", "2,312,388", "−2.1%"],
      ["Cost per 1,000 views", "CA$12.56", "CA$13.12", "+4.5%"],
      ["Clicks", "29,743", "60,494", "+103%"],
      ["Click-through rate", "1.26%", "2.62%", "+108%"],
      ["Cost per click", "CA$1.00", "CA$0.50", "−50%"],
      ["Higher-intent leads", "745", "3,283", "+341%"],
      ["Cost per lead (like-for-like)", "CA$7.15", "CA$5.42", "−24%"],
    ] as [string, string, string, string][],
    // rows to visually emphasize (green highlight)
    highlight: [3, 4, 5, 6, 7],
  },

  // The three stories.
  stories: [
    {
      title: "The efficiency story",
      body:
        "Clicks doubled (+103%) on just +2.3% more spend. Click-through rate jumped +108% while the cost of ad space held flat — so the gains came from better creative and a better website, not cheaper inventory.",
    },
    {
      title: "The leads story",
      body:
        "Higher-intent leads grew ×4.4 year over year (+341%) — and at a 24% lower cost per lead. More qualified families, each one cheaper to reach.",
    },
    {
      title: "The architecture story",
      body:
        "Two broad campaigns became a segmented lead engine — per location, per program, plus dedicated website-lead and remarketing campaigns. The paid-media version of the new website.",
    },
  ],

  takeaway:
    "Same market, same budget — but a rebuilt engine turned twice the traffic into 4× the qualified families, each one cheaper to reach.",

  // Honesty / methodology footnote — keeps the proof credible.
  methodology:
    "All figures in CAD, Meta-attributed, from the live ad account over identical Jan 1 – Jul 3 windows in 2025 vs 2026 on a near-identical budget. “Higher-intent leads” exclude one low-friction instant-form campaign; gross leads were far higher (8,048) but we report the qualified figure. Many registrations close in the camp's registration software, outside the ad platform's tracking, so these numbers understate true enrollment. Results vary by market and effort.",
};

// Case-study index — cards shown on /case-studies. Each links to a
// dedicated detail page. Add new entries here as more studies ship.
export const caseStudies = [
  {
    slug: "bilingual-camp",
    href: "/case-studies/bilingual-camp",
    tag: "Summer & enrichment camp",
    client: "Laurus Summer Camp · Canada",
    logo: "/case-studies/laurus/laurus-logo.png",
    title: "Same budget. Double the clicks. Half the cost.",
    teaser:
      "A rebuilt ad, website, and registration engine doubled click-through and cut cost per click in half — on a flat budget, year over year.",
    stats: [
      { value: "2×", label: "Click-through rate" },
      { value: "−50%", label: "Cost per click" },
      { value: "×4.4", label: "Higher-intent leads" },
    ],
  },
  {
    slug: "nens-sans",
    href: "/case-studies/nens-sans",
    tag: "Daycare & childcare center",
    client: "Nen's Sans Daycare · Springfield, VA",
    logo: "/case-studies/nens-sans/nens-sans-logo.png",
    title: "A bilingual daycare's new home online",
    teaser:
      "We designed and built Nen's Sans a fast, bilingual website that turns visitors into booked tours — brand, copy, and every program page.",
    stats: [
      { value: "Custom", label: "Full website build" },
      { value: "EN · ES", label: "Bilingual by design" },
      { value: "Mobile", label: "Fast, mobile-first" },
    ],
  },
  {
    slug: "nemesis",
    href: "/case-studies/nemesis",
    tag: "Youth sports · Basketball program",
    client: "Nemesis Basketball · Québec",
    logo: "/case-studies/nemesis/nemesis-logo.png",
    title: "The whole marketing department for a growing basketball program",
    teaser:
      "For 18+ months we ran Nemesis Basketball's entire marketing — brand, bilingual social, multi-season registration ads, merch, events, and the website — filling recreational-to-elite programs season after season.",
    stats: [
      { value: "18+ mo", label: "Always-on, renewed" },
      { value: "FR · EN", label: "Bilingual, Québec" },
      { value: "Full stack", label: "Brand → web, one team" },
    ],
  },
];

export const faqs = [
  {
    q: "How fast will I see results?",
    a: "Most programs see qualified families booked within the first 7 days of launch, with your calendar filling up over your first 90 days as the system ramps.",
  },
  {
    q: "What does it cost?",
    a: "We work with programs doing at least " +
      site.minMonthlyRevenue +
      " in revenue. Pricing depends on your market and number of locations — we'll walk through exact numbers on your strategy call. Most owners are profitable on ad spend within the first month.",
  },
  {
    q: "Do I need to run the ads or tech myself?",
    a: "No. This is fully done-for-you. We build the campaigns, write the copy, set up the AI follow-up system, and plug it into your CRM. You just enroll the families we send you.",
  },
  {
    q: "What exactly do you install?",
    a: "A complete done-for-you enrollment system: hyper-local ad campaigns, an AI assistant that replies to families in seconds and books them onto your calendar, and a CRM that tracks every lead to enrollment. We install it, run it, and optimize it — most programs have a full calendar within 90 days.",
  },
  {
    q: "Will this work for my type of program?",
    a: "We specialize in daycares, childcare centers, preschools, private schools, and camps — single locations and multi-site groups. If you have open spots and a market of families nearby, the system works.",
  },
];

// The done-for-you system we install (replaces the old guarantee block).
export const systemInstall = {
  kicker: "What you get",
  title: "The done-for-you system we install",
  intro:
    "We don't hand you raw leads and walk away. We install the entire Educare Enrollment System — then run it and optimize it for you.",
  items: [
    {
      name: "The Traffic Engine",
      body: "Hyper-local Meta & Google ad campaigns — written, designed, and targeted to families within driving distance of your program.",
    },
    {
      name: "The AI Front Desk",
      body: "Replies to every inquiry in 7 seconds, answers questions, qualifies, and books the visit straight onto your calendar.",
    },
    {
      name: "The Enrollment CRM",
      body: "Every lead tracked from first click to enrolled family, with automated reminders that slash no-shows.",
    },
    {
      name: "The Growth Loop",
      body: "We track what converts, double down on it, and scale your spend as your waitlist grows.",
    },
  ],
  closer: "We install it, run it, and optimize it. You just enroll the families.",
};

// "There are 2 kinds of owners" — the before/after contrast (creative).
export const twoKinds = {
  bad: {
    label: "Chasing parents all day",
    points: [
      "Praying the phone rings",
      "Leads go cold before anyone calls back",
      "Empty rooms quietly bleeding revenue",
    ],
  },
  good: {
    label: "Building a waitlist",
    points: [
      "Calendar full of qualified families",
      "Every inquiry answered in seconds",
      "Rooms full — and a list of families waiting",
    ],
  },
};

// "Your empty spots, itemized" — cost-of-inaction receipt (creative).
export const costReceipt = {
  perSpot: "$1,000–$2,000",
  lines: [
    ["Open spot #1", "$1,500"],
    ["Open spot #2", "$1,500"],
    ["Open spot #3", "$1,500"],
    ["Open spot #4", "$1,500"],
    ["'Google luck'", "$0"],
    ["Word of mouth", "$0"],
  ] as [string, string][],
  totalMonth: "$6,000",
  totalYear: "$72,000",
};

// AI "replying in 7 seconds" SMS thread (creative).
export const smsThread = [
  { from: "parent", text: "Hi, do you have spots for a 3yr old?" },
  { from: "ai", text: "We do! 🎉 We have a few openings. Would Sat 10am or Mon 4pm work for a quick tour?" },
  { from: "parent", text: "Saturday works!" },
  { from: "ai", text: "Booked ✅ Sat 10am. We'll send a reminder. See you then!" },
];

// "Not all enrollment ads are the same" — comparison table (creative).
export const comparison = {
  them: {
    label: "Typical agency",
    points: [
      "Just sends you raw leads",
      "You chase the follow-up",
      "Nothing is installed for you",
      "Works with anyone",
    ],
  },
  us: {
    label: "Educare Leads",
    points: [
      "Books families on your calendar",
      "AI does the follow-up in seconds",
      "A full system, installed & run for you",
      "Childcare & education only",
    ],
  },
};
