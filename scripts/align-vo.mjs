// Aligns the single continuous voiceover track to the 11 scenes.
// Strategy: estimate each scene boundary by proportional character count,
// then snap it to the nearest detected silence midpoint so visual cuts land
// inside a natural pause. Writes remotion/narration-timings.json.
//
// Usage: node scripts/align-vo.mjs <audio-duration-seconds>

import { readFileSync, writeFileSync } from "node:fs";

const D = parseFloat(process.argv[2]);
if (!D) throw new Error("pass audio duration in seconds");

// Scene narration (natural text) — order matters. Char count drives timing.
const scenes = [
  ["s01_hook", "If you run a daycare, school, or camp and you've got open spots right now, those empty spots are costing you between one and two thousand dollars a month. Each. And the worst part? It's quiet. There's no bill. No alarm. Just revenue you never see."],
  ["s02_agitate", "And you already know the old playbook doesn't fix it. You rely on referrals and a little Google luck. You boost a post, you get a handful of tire-kickers, and the few good leads that do come in slip through the cracks, because nobody followed up fast enough. Meanwhile, you're the one running the program, and trying to run the marketing."],
  ["s03_reframe", "Here's the truth: you don't have a marketing problem. You have a system problem. Enrolling families isn't luck, it's a system. Most programs just never built one."],
  ["s04_intro", "So we built it for you. It's called the Educare Enrollment System, and it runs in three steps."],
  ["s05_step1", "Step one, we build your system. Hyper-local Meta and Google campaigns, written, designed, and targeted to families within driving distance of your front door. You don't write a single ad."],
  ["s06_step2", "Step two, AI converts every lead. The second a family raises their hand, our AI texts them, qualifies them, and books them, onto a call, a tour, a visit, a registration. No chasing. No missed messages. No new hire."],
  ["s07_step3", "Step three, you enroll, and we scale. Families show up ready to enroll. We track every lead in your CRM, double down on what's working, and pour more fuel in as your waitlist grows."],
  ["s08_proof_numbers", "This isn't theory. We've done it for thirty-seven-plus programs across the country, daycares, private schools, and camps. We book families for an average of fourteen dollars and ten cents. An average four-point-two times return on every dollar of ad spend. And a full calendar in ninety days."],
  ["s09_testimonials", "Maria, a two-center daycare owner in Texas, went from praying for a phone call to turning families away, forty-two enrollments in fifty days. James, an admissions director at a private school in Florida, packed his open-house calendar for the first time in years. And Aisha sold out her summer camp three weeks early, and started a waitlist."],
  ["s10_offer", "Here's the offer. We build the campaigns. We install the AI follow-up. We set up the CRM, and we hand you a ninety-day enrollment playbook. And we back the whole thing with the strongest guarantee in this industry: we'll get your first qualified families booked within seven days, or we work for free until they show up."],
  ["s11_cta", "One catch, we only work with one program per area. We will not run ads for your competitor down the street. And we take a limited number of new programs each month. So if your program does at least twenty-five thousand a month, and you've got spots to fill, book your free strategy call right now. Just fill out the short application on this page, and pick a time. No cost. No obligation."],
];

// Parse silence midpoints from /tmp/silences.txt (lines: "start X" / "end Y")
const lines = readFileSync("/tmp/silences.txt", "utf8").trim().split("\n");
const mids = [];
for (let i = 0; i < lines.length - 1; i += 2) {
  const s = parseFloat(lines[i].split(" ")[1]);
  const e = parseFloat(lines[i + 1].split(" ")[1]);
  if (!isNaN(s) && !isNaN(e)) mids.push((s + e) / 2);
}

const lens = scenes.map(([, t]) => t.length);
const total = lens.reduce((a, b) => a + b, 0);

// cumulative expected boundary times
let cum = 0;
const boundaries = [];
for (let i = 0; i < scenes.length - 1; i++) {
  cum += lens[i];
  const expected = (cum / total) * D;
  // snap to nearest silence midpoint within ±4.5s
  let best = expected,
    bestDist = 4.5;
  for (const m of mids) {
    const d = Math.abs(m - expected);
    if (d < bestDist) {
      bestDist = d;
      best = m;
    }
  }
  boundaries.push(best);
}

// build scene timings
const starts = [0, ...boundaries];
const out = {};
scenes.forEach(([id], i) => {
  const start = starts[i];
  const end = i < scenes.length - 1 ? starts[i + 1] : D;
  out[id] = { start: +start.toFixed(3), duration: +(end - start).toFixed(3) };
});

writeFileSync(
  "remotion/narration-timings.json",
  JSON.stringify({ total: +D.toFixed(3), scenes: out }, null, 2)
);

console.log("scene timings (snap to pauses):");
for (const [id, v] of Object.entries(out)) {
  console.log(`  ${id.padEnd(20)} start ${v.start.toFixed(1).padStart(6)}s  dur ${v.duration.toFixed(1).padStart(5)}s`);
}
