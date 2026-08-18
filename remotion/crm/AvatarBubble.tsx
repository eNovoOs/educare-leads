import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { COLORS } from "../theme";

/**
 * Presenter bubble — a circular portrait pinned to the right of frame with a
 * ring that reacts to the actual narration waveform.
 *
 * Deliberately NOT a generated talking-head video: lip-synced avatar footage
 * would cost ~240 credits for this runtime. A still portrait with real
 * audio-driven motion reads as a presenter for ~2 credits.
 */
export const AvatarBubble: React.FC<{
  /** Path (relative to public/) of this scene's voiceover. */
  audioSrc: string;
  size?: number;
}> = ({ audioSrc, size = 190 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const audioData = useAudioData(staticFile(audioSrc));

  // Entrance
  const enter = spring({ frame: frame - 8, fps, config: { damping: 200 } });

  // Amplitude from the low/mid bands, where speech energy lives.
  let amplitude = 0;
  if (audioData) {
    const bands = visualizeAudio({
      fps,
      frame,
      audioData,
      numberOfSamples: 16,
    });
    amplitude = bands.slice(0, 6).reduce((a, b) => a + b, 0) / 6;
  }
  const level = Math.min(1, amplitude * 9);

  // Gentle idle drift so the portrait never looks frozen between words.
  const drift = Math.sin(frame / 48) * 4;
  const ring = 1 + level * 0.16;

  return (
    <div
      style={{
        position: "absolute",
        right: 66,
        bottom: 232,
        width: size,
        height: size,
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [40, drift])}px) scale(${interpolate(
          enter,
          [0, 1],
          [0.8, 1]
        )})`,
      }}
    >
      {/* Reactive outer ring */}
      <div
        style={{
          position: "absolute",
          inset: -14,
          borderRadius: "50%",
          border: `3px solid ${COLORS.cta}`,
          opacity: 0.35 + level * 0.55,
          transform: `scale(${ring})`,
        }}
      />
      {/* Soft glow that swells with the voice */}
      <div
        style={{
          position: "absolute",
          inset: -26,
          borderRadius: "50%",
          background: COLORS.cta,
          filter: "blur(26px)",
          opacity: 0.12 + level * 0.22,
        }}
      />

      {/* Portrait */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          overflow: "hidden",
          border: `4px solid rgba(255,255,255,0.92)`,
          boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
        }}
      >
        <Img
          src={staticFile("vsl/avatar.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            // Slow push so the portrait feels alive, not pasted on.
            transform: `scale(${1.04 + level * 0.02})`,
          }}
        />
      </div>

      {/* Live chip */}
      <div
        style={{
          position: "absolute",
          bottom: -12,
          left: "50%",
          transform: "translateX(-50%)",
          background: COLORS.ink,
          border: `1px solid ${COLORS.cta}66`,
          color: COLORS.white,
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: "0.06em",
          padding: "5px 14px",
          borderRadius: 999,
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          gap: 7,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: 999,
            background: COLORS.cta,
            opacity: 0.5 + level * 0.5,
          }}
        />
        EDUCARE CRM
      </div>
    </div>
  );
};
