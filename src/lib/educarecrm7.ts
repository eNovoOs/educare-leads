// Content config for /educarecrm-special-7 — the 7-day free trial offer page.
//
// Same product and same mechanic as /educarecrm (short form → Calendly), but
// the entire value proposition is reframed around starting a trial rather than
// booking a demo. A card IS required to start, so the copy says so plainly
// wherever the trial is mentioned — see `billing` below.

export const trial = {
  days: 7,
  eyebrow: "7-day free trial · Full platform access",
  h1a: "Run Your Whole Enrollment Pipeline",
  h1b: "Free for 7 Days.",
  subhead:
    "Every module unlocked from day one — enrollment pipeline, AI front desk, tour booking, parent email and SMS, automations, and the full Academy. Set it up your way, on your own families, before you pay a cent.",
  audienceLine:
    "For daycares, childcare centers, preschools, private schools, and summer camps",
  primaryCta: "Start My 7-Day Free Trial",
  secondaryCta:
    "Prefer a walkthrough first? Book the same slot and we'll show you the system live before you set anything up.",
  // Shown directly under every trial CTA. Honest by design.
  cardNote:
    "Card required to start · Cancel any time before day 7 and you're never charged",
  trustLine: "1,200+ businesses run on the platform · ROI Guaranteed",
};

export const trialStats = [
  { value: "7 days", label: "Full access, no restrictions" },
  { value: "Everything", label: "Every module unlocked on day one" },
  { value: "1 afternoon", label: "Typical time to go live" },
  { value: "Cancel", label: "Any time before day 7" },
];

// What a program can realistically get done inside the trial window.
// This is the core of a trial page: make the 7 days feel achievable.
export const week = {
  kicker: "Your first week",
  title: "What 7 days actually looks like",
  intro:
    "You don't need a technical team or a month of onboarding. Here's the pace most programs move at once their account is open.",
  days: [
    {
      label: "Day 1",
      title: "Get set up",
      body: "Connect your calendar, import your current families and waitlist, and pick the enrollment pipeline template that matches your program type. Most directors finish this in an afternoon.",
    },
    {
      label: "Days 2–3",
      title: "Turn on the AI front desk",
      body: "Load in your hours, tuition, age groups, and policies. Test it on your own questions until it sounds like your program — then let it start answering parents day and night.",
    },
    {
      label: "Days 4–5",
      title: "Put follow-up on autopilot",
      body: "Switch on tour reminders and your first parent follow-up sequence. This is usually the moment the no-shows drop and the quiet inquiries start replying.",
    },
    {
      label: "Days 6–7",
      title: "Judge it on real results",
      body: "Look at your pipeline: who got answered, who booked a tour, who moved forward. Decide with your own numbers in front of you — not a sales deck.",
    },
  ],
};

// Everything unlocked during the trial. No feature gating.
export const unlocked = {
  kicker: "No locked features",
  title: "The trial isn't a stripped-down version",
  intro:
    "Some trials hide the good parts until you pay. This one opens everything on day one — including the Academy.",
  items: [
    "Complete CRM and enrollment pipeline",
    "AI front desk, answering parents 24/7",
    "Tour and open-house booking, with reminders",
    "Unlimited parent email and SMS",
    "Enrollment automations and workflows",
    "Registration and landing page builder",
    "Analytics and reporting dashboard",
    "1,000+ integrations (Stripe, Zoom, QuickBooks…)",
    "Full Academy: 100+ videos and the template vault",
    "2x weekly live training webinars",
    "Private community access",
    "Migration help from our team if you get stuck",
  ],
};

// Why a trial beats a demo, framed as the visitor's own objection.
export const whyTrial = {
  kicker: "Why a trial",
  title: "You shouldn't have to take our word for it",
  points: [
    {
      title: "Your families, not a sandbox",
      body: "Demos always look good on someone else's data. Run it on your actual waitlist and your actual inquiries — that's the only test that means anything.",
    },
    {
      title: "Prove the follow-up gap is real",
      body: "Turn the AI front desk on for a week and count how many parents get answered outside office hours. Most programs are surprised by the number.",
    },
    {
      title: "Know your real cost before you commit",
      body: "Seven days is long enough to see which of your current tools you'd actually cancel — so the savings number is yours, not an average off a website.",
    },
  ],
};

// Transparent billing. Card is required, so this section exists to remove
// the anxiety rather than hide the term in small print.
export const billing = {
  kicker: "How billing works",
  title: "No surprises on day 8",
  items: [
    {
      label: "Today",
      body: "You add a card to open the account. Nothing is charged, and you get full access immediately.",
    },
    {
      label: "Days 1–7",
      body: "The whole platform is yours to use. Cancel from inside your account at any point during these seven days and you are never charged a cent.",
    },
    {
      label: "Day 8",
      body: "If you haven't cancelled, your plan begins and your first month is billed. We'll email you before that happens — no silent charges.",
    },
  ],
  closer:
    "We ask for a card because it keeps trials serious and lets your account carry straight over without rebuilding anything. It is not a contract — you can cancel in a couple of clicks.",
};

export const trialFaqs = [
  {
    q: "Do I really need to put in a card?",
    a: "Yes — a card is required to open the trial account. Nothing is charged during the seven days, and if you cancel before day 7 you won't be billed at all. We ask for it so your setup carries over into a paid plan without you having to rebuild anything.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "Everything you imported stays yours. Export your families, waitlist, and contact history at any time during or after the trial — nothing is held hostage.",
  },
  {
    q: "Is anything locked or limited during the trial?",
    a: "No. Every module is open from day one, including the Academy, the template vault, and the live training calls. You're evaluating the real product, not a demo tier.",
  },
  {
    q: "Can I actually get set up in seven days?",
    a: "Most programs are live in an afternoon and running follow-up automations within two or three days. If you get stuck, our team will help you migrate during the trial — you're not left alone with a help doc.",
  },
  {
    q: "Does this replace my childcare management software?",
    a: "No. Tools like Brightwheel and Procare handle what happens after a family enrolls — billing, attendance, ratios, daily reports. This handles everything before that: the inquiry, the reply, the tour, the follow-up, and the enrollment. They run side by side.",
  },
  {
    q: "What does it cost after the trial?",
    a: "There are three tiers, and the right one depends on how many locations you run and how much hands-on setup you want. We'll go through the numbers on your onboarding call so you know exactly what day 8 looks like before you get there.",
  },
];
