// Educare CRM VSL — narration text + scene timing.
//
// Source of truth for the script: docs/crm-vsl-script.md
//
// v2: trimmed from ~909 words to ~560 to bring the runtime under 4 minutes.
// Every scene keeps its beat; the padding and repeated clauses are gone.
//
// Durations below are ESTIMATES. Once the voiceover exists in public/vo/crm/,
// run `npm run crm:measure` to overwrite them with real measured lengths.

export const FPS = 30;

export type CrmSceneId =
  | "s01_hook"
  | "s02_agitate"
  | "s03_cost"
  | "s04_reframe"
  | "s05_inbox"
  | "s06_ai"
  | "s07_pipeline"
  | "s08_marketing"
  | "s09_savings"
  | "s10_specialist"
  | "s11_offer"
  | "s12_cta";

export type CrmScene = {
  id: CrmSceneId;
  /** Narration passed verbatim to the TTS engine. */
  vo: string;
  /** Estimated seconds — replaced by measured audio duration. */
  seconds: number;
};

export const script: CrmScene[] = [
  {
    id: "s01_hook",
    seconds: 22,
    vo: "It's nine o'clock on a Sunday night. A mom finds your center on Google, and she finally fills out your form. And then, nothing. Nobody's at the desk. By Tuesday, when you call her back, she's already toured the place down the road. And here's the part that stings. You never even knew she was interested.",
  },
  {
    id: "s02_agitate",
    seconds: 20,
    vo: "If you run a daycare, a school, or a camp, you know this feeling. Your waitlist lives in a spreadsheet. Your tours live in a notebook. Your follow-ups live in somebody's head. Five different tools, none of them talking to each other, and your front desk stuck playing phone tag.",
  },
  {
    id: "s03_cost",
    seconds: 20,
    vo: "Let's put a number on it. One open spot costs you between one and two thousand dollars a month. Four open spots is six thousand a month. Seventy-two thousand a year, sitting in rooms you've already paid rent on. And about a quarter of the families who reach out never get a reply at all.",
  },
  {
    id: "s04_reframe",
    seconds: 12,
    vo: "So here's the thing. You don't have a marketing problem. You have a follow-up problem. And that's good news, because follow-up is a system. And a system can be installed.",
  },
  {
    id: "s05_inbox",
    seconds: 18,
    vo: "Every inquiry lands in one place. Facebook, your website, a text, a call. Look at this one. Jesse came in from a Facebook form, with full contact details, the source, and a ticket that stays open until somebody handles it. Nothing gets buried.",
  },
  {
    id: "s06_ai",
    seconds: 24,
    vo: "But catching the lead isn't enough. Somebody has to answer. So you build an A I agent that knows your hours, your tuition, your age groups. It replies in about seven seconds, at nine at night, on a Saturday, over the holidays. It answers the questions and books the tour right onto your calendar. You're not replacing your front desk. You're giving it a night shift.",
  },
  {
    id: "s07_pipeline",
    seconds: 18,
    vo: "And every family lands on a board like this. Qualified. Demo scheduled. Proposal made. Enrolled. You can see at a glance exactly where everyone sits, and who's gone quiet. No more finding out in October that a family you toured in August went somewhere else.",
  },
  {
    id: "s08_marketing",
    seconds: 22,
    vo: "Then there's everything you'd normally pay an agency for. Email and text campaigns, segmented by program and age group. Re-enrollment sequences to last summer's camp families, automatically. Registration pages built in an afternoon. Your website, your landing pages, your reviews, even your Facebook ads. And when a family says yes, they sign and pay without you printing a thing.",
  },
  {
    id: "s09_savings",
    seconds: 16,
    vo: "Now add up what you're paying right now. The scheduler. The email platform. The funnel builder. The C R M you stopped updating in March. Most programs that move onto one platform save around seven hundred dollars a month.",
  },
  {
    id: "s10_specialist",
    seconds: 24,
    vo: "But here's what actually makes this different. Software on its own doesn't fix anything. Everybody's got a trial and a help doc. You get a one-on-one call with a specialist. A real person who learns how your program runs, and sets the whole thing up around it. Your pipeline, your A I agent, your follow-up. You are not handed a login and wished good luck.",
  },
  {
    id: "s11_offer",
    seconds: 20,
    vo: "So take it for seven days, free. Every module unlocked from day one. The pipeline, the A I agent, the campaigns, the pages, the full academy. The real thing, running on your own families. You'll need a card to open the account, and if you cancel before day seven, you're never charged.",
  },
  {
    id: "s12_cta",
    seconds: 18,
    vo: "If you've got open spots right now, and families are slipping through the cracks, you already know it. Click the button below this video and grab your onboarding slot. Seven days from now, every inquiry answered in seconds, every tour on the calendar. Let's get your rooms full.",
  },
];

// Real measured audio lengths, written by `npm run crm:measure` once the
// voiceover exists. Any id present here overrides the estimate above.
import measured from "./durations.json";

/** Frame ranges derived from measured durations, falling back to estimates. */
export const scenes = (() => {
  const lengths = measured as Partial<Record<CrmSceneId, number>>;
  let frame = 0;
  return script.map((s) => {
    const seconds = lengths[s.id] ?? s.seconds;
    // A beat of air after each scene so cuts don't clip the last word.
    const durationInFrames = Math.round((seconds + 0.4) * FPS);
    const entry = { ...s, seconds, startFrame: frame, durationInFrames };
    frame += durationInFrames;
    return entry;
  });
})();

export const totalDurationInFrames = scenes.reduce(
  (n, s) => n + s.durationInFrames,
  0
);
