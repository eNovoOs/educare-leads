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

export const caseStudies = [
  {
    slug: "multi-site-daycare",
    label: "Daycare group",
    location: "Texas",
    headline: "Filled the infant room and built a waitlist in under two months",
    summary:
      "A two-location childcare group needed a steadier way to create demand for high-value rooms without adding more front-desk follow-up.",
    timeframe: "50 days",
    spend: "Meta + Google",
    metrics: [
      { value: "42", label: "new enrollments" },
      { value: "$14.10", label: "avg. cost per booked family" },
      { value: "82%", label: "show-up rate" },
    ],
    before: [
      "Tours depended on word of mouth and inconsistent inbound calls.",
      "Lead response time varied by staff availability.",
      "The infant room had open seats with high monthly revenue at stake.",
    ],
    installed: [
      "Hyper-local parent ads around each center",
      "Instant SMS follow-up and tour booking",
      "CRM tracking from first inquiry to enrolled family",
    ],
    quote:
      "We went from praying for a phone call to turning families away. EduCare Leads filled our infant room and built a waitlist in under two months.",
    attribution: "Maria T., Owner",
  },
  {
    slug: "private-school-applications",
    label: "Private school",
    location: "Florida",
    headline: "Packed the open-house calendar with qualified local families",
    summary:
      "A private school needed more mission-aligned applicants and a faster path from inquiry to admissions conversation.",
    timeframe: "45 days",
    spend: "Meta + Google",
    metrics: [
      { value: "61", label: "applications" },
      { value: "7 sec", label: "AI first reply" },
      { value: "4.2x", label: "average ROAS snapshot" },
    ],
    before: [
      "Families were researching silently but not always booking a visit.",
      "Admissions follow-up competed with daily school operations.",
      "Open houses were filling too slowly for the enrollment window.",
    ],
    installed: [
      "Program-specific ad angles for local parents",
      "Automated qualification and calendar booking",
      "Weekly reporting on lead quality and booked visits",
    ],
    quote:
      "Our open-house calendar was packed for the first time in years. The AI follow-up booked families before our admissions team could even pick up the phone.",
    attribution: "James P., Admissions Director",
  },
  {
    slug: "summer-camp-sellout",
    label: "Summer camp",
    location: "Georgia",
    headline: "Sold out summer sessions and opened a waitlist three weeks after launch",
    summary:
      "A camp operator wanted predictable registrations before the seasonal rush, with follow-up happening after hours and on weekends.",
    timeframe: "3 weeks",
    spend: "Meta",
    metrics: [
      { value: "100%", label: "sessions filled" },
      { value: "3 wk", label: "to waitlist" },
      { value: "24/7", label: "reply coverage" },
    ],
    before: [
      "Registration depended on last year's list and occasional referrals.",
      "Parent questions came in outside office hours.",
      "The team needed momentum before the busiest enrollment period.",
    ],
    installed: [
      "Seasonal creative built around urgency and fit",
      "Parent SMS answers for common registration questions",
      "Campaign tracking tied to session capacity",
    ],
    quote:
      "We filled every session and started a waitlist a full month earlier than last year. Registrations came in while we slept.",
    attribution: "Aisha R., Director",
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
