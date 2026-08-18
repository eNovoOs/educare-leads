import timings from "./narration-timings.json";

export const FPS = 30;

// Single continuous voiceover track (public/vo/voiceover.mp3).
// Scene visual boundaries are aligned to it in scripts/align-vo.mjs and stored
// in narration-timings.json. To re-align after swapping the track:
//   1) put the new file at public/vo/voiceover.mp3
//   2) DUR=$(ffprobe -v error -show_entries format=duration -of default=nk=1:nw=1 public/vo/voiceover.mp3)
//   3) ffmpeg -i public/vo/voiceover.mp3 -af silencedetect=noise=-32dB:d=0.45 -f null - 2>&1 \
//        | grep -E 'silence_(start|end)' | sed -E 's/.*: ([0-9.]+).*/& /' > /tmp/silences.txt
//   4) node scripts/align-vo.mjs $DUR

export const VOICEOVER = "vo/voiceover.mp3";

export type SceneId = keyof typeof timings.scenes;

export type Scene = {
  id: SceneId;
  startFrame: number;
  durationInFrames: number;
};

const order: SceneId[] = [
  "s01_hook",
  "s02_agitate",
  "s03_reframe",
  "s04_intro",
  "s05_step1",
  "s06_step2",
  "s07_step3",
  "s08_proof_numbers",
  "s09_testimonials",
  "s10_offer",
  "s11_cta",
];

export const scenes: Scene[] = order.map((id) => {
  const t = timings.scenes[id];
  return {
    id,
    startFrame: Math.round(t.start * FPS),
    durationInFrames: Math.round(t.duration * FPS),
  };
});

export const sceneStarts = Object.fromEntries(
  scenes.map((s) => [s.id, s.startFrame])
) as Record<SceneId, number>;

export const totalDurationInFrames = Math.round(timings.total * FPS);
