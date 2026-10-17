// /booked explainer video — script + timing. Voiceover: Higgsfield text2speech_v2 (ElevenLabs), voice "Zoe".
// durations.json holds measured mp3 lengths (seconds); `npm run booked:measure` regenerates it.
import durations from "./durations.json";

export const FPS = 30;
const GAP = 12; // frames of breathing room after each line
const TAIL = 30; // extra hold on the final scene

export type BookedScene = { id: string; vo: string; image: string };

export const scenes: BookedScene[] = [
  { id: "s01", image: "img1.jpg", vo: "Hi, it's Jessica from Educare Leads. Congratulations, you're booked! I'm so glad you grabbed a time, and I want to make sure the call is worth your while." },
  { id: "s02", image: "img4.jpg", vo: "There are just three things to get ready, and they take about two minutes." },
  { id: "s03", image: "img10.jpg", vo: "One: have your numbers handy. Roughly how much revenue your program brings in each month, and how many open spots you have right now. Estimates are totally fine." },
  { id: "s04", image: "img7.jpg", vo: "Two: find a quiet spot, with your laptop and a steady connection, so we can talk for the full 20 minutes." },
  { id: "s05", image: "img9.jpg", vo: "Three: find your Google Meet link. It's in your Calendly invite and your confirmation email. If you can't see it, check spam or promotions." },
  { id: "s06", image: "img5.jpg", vo: "Now, the most important part. Right after you book, I'll send you a text message. Just reply YES. That's how we know you're coming, and our team member only joins confirmed calls. So please don't skip it!" },
  { id: "s07", image: "img2.jpg", vo: "On the call, which is 20 minutes, we'll look at where your enrollment stands and where your open spots are, how families find you today, and how our done-for-you enrollment system could work for you. And if it's not a fit, we'll tell you honestly." },
  { id: "s08", image: "img1.jpg", vo: "If something comes up and you can't make it, no problem. Use the reschedule link in your Calendly email. It takes a few seconds." },
  { id: "s09", image: "img3.jpg", vo: "Thanks so much. I'll talk to you soon!" },
];

let cursor = 0;
export const timed = scenes.map((s, i) => {
  const audioFrames = Math.ceil((durations as Record<string, number>)[s.id] * FPS);
  const durationInFrames = audioFrames + GAP + (i === scenes.length - 1 ? TAIL : 0);
  const t = { ...s, audioFrames, durationInFrames, startFrame: cursor };
  cursor += durationInFrames;
  return t;
});
export const totalDurationInFrames = cursor;
