// Content + copy config for the /educarecrm landing page.
// This page sells eNovo OS (osenovo.com) repositioned for the three program
// types we serve: daycares, private schools, and camps. Edit copy here —
// the page reads from this file, same pattern as src/lib/site.ts.

export const crm = {
  name: "Educare CRM",
  platform: "eNovo OS",
  platformUrl: "https://osenovo.com",
  // The vertical wedge: eNovo markets to "service businesses" generically.
  // Here it is positioned exclusively for childcare & education.
  eyebrow: "Powered by eNovo OS · Built for childcare & education",
  h1a: "Every Family Who Inquires,",
  h1b: "Answered in Seconds.",
  h1c: "Enrolled in Days.",
  subhead:
    "Educare CRM replaces your spreadsheets, sticky notes, shared inbox, and missed voicemails with one system that answers every parent instantly, books the tour, and tracks them all the way to enrolled.",
  audienceLine:
    "For daycares, childcare centers, preschools, private schools, and summer camps",
  primaryCta: "Get My Free Enrollment Demo",
  secondaryCta: "See the platform",
  trustLine: "Trusted by 1,200+ businesses on eNovo OS · ROI Guaranteed",
};

// Hero proof strip.
export const crmStats = [
  { value: "7 sec", label: "Average reply to a parent inquiry" },
  { value: "24/7", label: "Coverage — nights, weekends, holidays" },
  { value: "$700/mo", label: "Average saved by consolidating tools" },
  { value: "1,200+", label: "Businesses running on the platform" },
];

// "Sound familiar?" — pain, written for program operators specifically.
export const painPoints = [
  "A parent inquires at 9pm on a Sunday. Nobody replies until Tuesday. By then they've already toured the center down the road.",
  "Your waitlist lives in a spreadsheet, your tours live in a notebook, and your follow-ups live in somebody's head.",
  "Your front-desk staff burn hours on callbacks and voicemail tag instead of being present with the families already in the building.",
  "Registration opens for summer and you're manually emailing last year's list one parent at a time.",
  "You pay for a childcare management app that handles billing and attendance — but nothing that actually fills your open spots.",
];

// The quantified cost of staying stuck, in education economics.
export const costOfStuck = {
  kicker: "The hidden cost",
  title: "What an unanswered inquiry actually costs you",
  intro:
    "Every month you run enrollment on memory and spreadsheets, you're losing seats that were already interested.",
  items: [
    {
      figure: "$1,000–$2,000",
      unit: "per empty spot, per month",
      body: "One unfilled toddler room seat is recurring revenue you never get back. Four open spots is a mortgage payment walking out the door every month.",
    },
    {
      figure: "20–30%",
      unit: "of inquiries never get a reply",
      body: "Not because you don't care — because the message came in after hours, or during pickup, or while the director was in a tour. No reply means no tour, and no tour means no enrollment.",
    },
    {
      figure: "10–15 hrs",
      unit: "per week lost to busywork",
      body: "Copying names between apps, chasing callbacks, re-sending the same directions and tuition sheet. Time your team will never get back.",
    },
    {
      figure: "$400–$800",
      unit: "per month in disconnected tools",
      body: "A scheduler, an email platform, a form builder, a spreadsheet, and a CRM you stopped updating in March — each with its own bill, none of them talking to each other.",
    },
  ],
  closer:
    "Four open spots at $1,500 is $6,000 a month — $72,000 a year — sitting in rooms you've already paid rent on.",
};

// The platform modules, each mapped to an enrollment job-to-be-done.
export const modules = [
  {
    name: "Enrollment Pipeline",
    body: "Every family on one board: Inquiry → Tour Booked → Toured → Application → Enrolled. You always know who's where and who's gone quiet.",
  },
  {
    name: "AI Front Desk",
    body: "Answers parent questions in about 7 seconds, day or night. Tuition, hours, age groups, availability — then books the tour straight onto your calendar.",
  },
  {
    name: "Tour & Open-House Booking",
    body: "Families self-book tours and open-house slots. Two-way sync with Google and Outlook, plus automated reminders that cut no-shows.",
  },
  {
    name: "Parent Email & SMS",
    body: "Unlimited messaging, segmented by program, age group, or campus. Reach every infant-room waitlist parent without touching a spreadsheet.",
  },
  {
    name: "Enrollment Automations",
    body: "Set it once, runs forever. Re-engage last summer's camp families, nurture your waitlist, and trigger re-enrollment sequences before the season turns.",
  },
  {
    name: "Registration Pages",
    body: "Build a landing page per program, per session, or per campus in minutes. Drag-and-drop, mobile-ready, and wired straight into your pipeline.",
  },
];

// Program-specific proof of fit — the vertical angle eNovo's own site lacks.
export const programFit = [
  {
    label: "Daycares & childcare centers",
    headline: "Fill rooms by age group, not by luck",
    points: [
      "Waitlists segmented by infant, toddler, and preschool rooms",
      "Instant answers on tuition, hours, and current openings",
      "Automatic nudges when a spot opens in the room a family wanted",
    ],
  },
  {
    label: "Private & independent schools",
    headline: "Turn quiet researchers into booked visits",
    points: [
      "Inquiry-to-application pipeline your admissions team can actually see",
      "Open-house scheduling with reminders that keep families showing up",
      "Follow-up that continues through the whole admissions season",
    ],
  },
  {
    label: "Summer & enrichment camps",
    headline: "Sell out sessions before the season starts",
    points: [
      "One registration page per session, live in minutes",
      "Re-enrollment campaigns to last year's families on autopilot",
      "After-hours and weekend replies, when camp parents actually research",
    ],
  },
];

// What it replaces — the consolidation argument.
export const replaces = [
  "Calendly",
  "Mailchimp",
  "ClickFunnels",
  "Pipedrive",
  "ActiveCampaign",
  "Kajabi",
  "Google Sheets waitlists",
  "The shared inbox",
];

// Value stack, carried over from the eNovo OS offer.
export const valueStack = {
  kicker: "What's included",
  title: "Everything you get",
  items: [
    ["Complete CRM + enrollment pipeline", "$99/mo value"],
    ["Unlimited parent email & SMS", "$150/mo value"],
    ["Registration & landing page builder", "$197/mo value"],
    ["Tour calendar & automated booking", "$30/mo value"],
    ["Enrollment automations & workflows", "$99/mo value"],
    ["AI front desk", "$97/mo value"],
    ["Analytics & reporting dashboard", "$49/mo value"],
    ["1,000+ integrations (Stripe, Zoom, QuickBooks…)", "Included"],
    ["2x weekly live training webinars", "$297/mo value"],
    ["Templates & campaign vault", "$197/mo value"],
    ["Private community access", "$97/mo value"],
    ["Done-for-you setup & migration", "$500+ value"],
  ] as [string, string][],
  totalLabel: "Total value if purchased separately",
  total: "$1,312+/mo",
  saving: "Programs consolidating into one platform save an average of $700/month.",
};

// The academy — the "not just software" differentiator.
export const academy = {
  kicker: "Not just software",
  title: "Your team gets trained, not just licensed",
  intro:
    "Most platforms hand you a login and wish you luck. Educare CRM comes with a full training academy so your director or front-desk lead can actually run it — no agency required.",
  items: [
    { value: "100+", label: "Training videos" },
    { value: "2x", label: "Weekly live calls" },
    { value: "50+", label: "Ready-made templates" },
    { value: "24/7", label: "Private community" },
  ],
};

// Three-step path to live.
export const crmSteps = [
  {
    n: "01",
    title: "Book a 20-minute demo",
    body: "We map what you're using now — your scheduler, your spreadsheets, your management app — and show you exactly what Educare CRM replaces and what it costs you today.",
  },
  {
    n: "02",
    title: "We set it up for you",
    body: "Our team migrates your families, builds your enrollment pipeline, writes your parent follow-up sequences, and connects your calendar. Done for you, not handed to you.",
  },
  {
    n: "03",
    title: "Watch your pipeline fill",
    body: "Every inquiry gets answered in seconds, tours book themselves, and your team stops chasing. You show up to families who are ready to enroll.",
  },
];

export const guarantee = {
  title: "The ROI guarantee: you'll pay less. Period.",
  body: "Educare CRM will cost you less than everything you're currently paying for — your scheduler, email platform, form builder, and CRM combined. If it doesn't, we'll make it right. Consolidate into one platform and keep the difference every single month.",
  proof: "Clients save an average of $700/month after switching.",
};

export const crmFaqs = [
  {
    q: "Does this replace my childcare management software?",
    a: "No — and it isn't meant to. Tools like Brightwheel and Procare handle what happens after a family enrolls: billing, attendance, ratios, daily reports. Educare CRM handles everything before that: the inquiry, the reply, the tour, the follow-up, and the enrollment. They work side by side, and we connect them during setup.",
  },
  {
    q: "Do I need to be technical to use it?",
    a: "No. We migrate your data, build your pipeline, and launch your automations for you during onboarding. Your team learns the day-to-day in a single training session, and the academy covers everything else at your own pace.",
  },
  {
    q: "How long until it's actually running?",
    a: "Most programs are live within a week of the demo. Setup and migration are done for you — you're not handed an empty account and a help doc.",
  },
  {
    q: "Will the AI sound like a robot to my parents?",
    a: "It's trained on your program: your hours, tuition, age groups, policies, and tone. It answers the routine questions instantly and hands off to your team the moment a conversation needs a human. You review and adjust everything before it goes live.",
  },
  {
    q: "What if I have more than one location?",
    a: "Multi-site is supported out of the box. Each campus gets its own pipeline, calendar, and registration pages, while you keep a single dashboard across all of them.",
  },
  {
    q: "What does it cost?",
    a: "Pricing depends on how many locations you run and how many families you're managing. On the demo we'll add up what you're paying now across every tool and show you the difference in writing — most programs come out ahead in month one.",
  },
];

// The final either/or close.
export const twoOptions = {
  a: {
    label: "Option A",
    body: "Keep running enrollment on a spreadsheet and a shared inbox. Keep losing the parents who message after hours. Keep paying for five tools that don't talk to each other, and keep wondering why the rooms aren't full.",
  },
  b: {
    label: "Option B",
    body: "Book a 20-minute demo. See the system running on your own numbers. Let us set it up, train your team, and guarantee you pay less than you do today — with every family answered in seconds.",
  },
};
