import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "./theme";

/** Soft drifting colored orbs — adds depth/motion to the whole video. */
const ORBS = [
  { x: 16, y: 24, r: 520, c: COLORS.brand, o: 0.22, sx: 60, sy: 40, ph: 0 },
  { x: 82, y: 30, r: 460, c: COLORS.cta, o: 0.2, sx: -70, sy: 50, ph: 1.7 },
  { x: 70, y: 78, r: 600, c: COLORS.teal, o: 0.16, sx: 55, sy: -45, ph: 3.1 },
  { x: 28, y: 82, r: 420, c: COLORS.brandDark, o: 0.18, sx: -50, sy: -35, ph: 4.4 },
];

const FloatingOrbs: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ filter: "blur(8px)" }}>
      {ORBS.map((o, i) => {
        const t = frame / 90;
        const dx = Math.sin(t + o.ph) * o.sx;
        const dy = Math.cos(t * 0.8 + o.ph) * o.sy;
        const pulse = 1 + Math.sin(t * 1.2 + o.ph) * 0.06;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${o.x}%`,
              top: `${o.y}%`,
              width: o.r,
              height: o.r,
              transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px) scale(${pulse})`,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${o.c}${Math.round(
                o.o * 255
              ).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** Faint moving dot-grid for a "system / tech" texture. */
const GridOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = (frame / 2) % 60;
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `radial-gradient(rgba(255,255,255,0.05) 1.4px, transparent 1.4px)`,
        backgroundSize: "60px 60px",
        backgroundPosition: `${shift}px ${shift}px`,
        maskImage:
          "radial-gradient(120% 90% at 50% 40%, black 30%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(120% 90% at 50% 40%, black 30%, transparent 80%)",
      }}
    />
  );
};

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(130% 100% at 50% 45%, transparent 55%, rgba(3,12,28,0.55) 100%)",
    }}
  />
);

/** Animated navy gradient + orbs + grid + vignette. */
export const Background: React.FC<{ tint?: string }> = ({
  tint = COLORS.brand,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateRight: "clamp",
  });
  const gx = 50 + Math.sin(t * Math.PI) * 8;
  const gy = 32 + t * 10;
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(110% 75% at ${gx}% ${gy}%, ${tint}2e 0%, transparent 55%), linear-gradient(160deg, ${COLORS.ink} 0%, ${COLORS.inkDeep} 100%)`,
        }}
      />
      <FloatingOrbs />
      <GridOverlay />
      <Vignette />
    </AbsoluteFill>
  );
};

/** Wraps a scene with a fade/scale in at its start and out at its end.
 * Uses the Sequence's own duration (via useVideoConfig inside a Sequence). */
export const SceneTransition: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const IN = 14;
  const OUT = 12;
  const opacity =
    interpolate(frame, [0, IN], [0, 1], {
      extrapolateRight: "clamp",
    }) *
    interpolate(frame, [durationInFrames - OUT, durationInFrames], [1, 0], {
      extrapolateLeft: "clamp",
    });
  const scale = interpolate(frame, [0, IN], [0.985, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity, transform: `scale(${scale})` }}>
      {children}
    </AbsoluteFill>
  );
};

/** Spring fade + rise. delay is in frames. */
export const FadeUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, distance = 42, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.7 },
  });
  return (
    <div
      style={{
        ...style,
        opacity: e,
        transform: `translateY(${interpolate(e, [0, 1], [distance, 0])}px)`,
      }}
    >
      {children}
    </div>
  );
};

/** Counts a number up from 0 to `to`, starting at `delay` frames. */
export const useCountUp = (
  to: number,
  delay = 0,
  durationFrames = 40
): number => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // ease-out cubic
  const eased = 1 - Math.pow(1 - p, 3);
  return to * eased;
};

/** Persistent small logo watermark, top-left. */
export const Watermark: React.FC = () => (
  <Img
    src={staticFile("educare-leads-logo-white.png")}
    style={{
      position: "absolute",
      top: 56,
      left: 72,
      width: 188,
      opacity: 0.9,
    }}
  />
);

/** Thin progress bar across the bottom tracking the whole video. */
export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: 8,
      background: "rgba(255,255,255,0.08)",
    }}
  >
    <div
      style={{
        height: "100%",
        width: `${progress * 100}%`,
        background: `linear-gradient(90deg, ${COLORS.cta}, ${COLORS.brand})`,
      }}
    />
  </div>
);

export const Eyebrow: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = COLORS.cta,
}) => (
  <div
    style={{
      color,
      fontSize: 26,
      letterSpacing: 6,
      textTransform: "uppercase",
      fontWeight: 800,
    }}
  >
    {children}
  </div>
);
