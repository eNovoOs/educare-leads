import React from "react";
import { Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Background music bed for the CRM VSL.
 *
 * Sits far under the narration — a VSL music bed should be felt, not heard.
 * `BED_VOLUME` of 0.07 is roughly -23dB against the voice, which is the range
 * where it adds warmth without competing with a spoken word.
 *
 * To enable:
 *   1. Drop a licensed track at public/vsl/music-bed.mp3
 *   2. Render with --props='{"hasAudio":true,"hasMusic":true}'
 *
 * The track only needs to be as long as the video (~4 min); if it is shorter
 * it will simply stop, so pick one long enough or loop it before importing.
 */
export const MUSIC_SRC = "vsl/music-bed.mp3";

// Deliberately low. At 0.05 the bed reads as room tone under the narration
// rather than as music you notice — raise it only if it disappears entirely
// on laptop speakers.
const BED_VOLUME = 0.05;
const FADE_IN_SECONDS = 2;
const FADE_OUT_SECONDS = 4;

export const MusicBed: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = FADE_IN_SECONDS * fps;
  const fadeOut = FADE_OUT_SECONDS * fps;

  // Fade up at the top, hold, then duck away under the final CTA.
  const volume = interpolate(
    frame,
    [0, fadeIn, durationInFrames - fadeOut, durationInFrames],
    [0, BED_VOLUME, BED_VOLUME, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return <Audio src={staticFile(MUSIC_SRC)} volume={volume} />;
};
