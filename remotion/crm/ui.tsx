import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_BODY } from "../theme";

/**
 * Converts a fraction of the scene (0-1) into a frame number.
 *
 * Scene lengths are dictated by the voiceover, which changes whenever a line
 * is re-recorded. Expressing beats as fractions means the animation re-times
 * itself instead of leaving dead air at the end of a longer read.
 */
export const useBeat = () => {
  const { durationInFrames } = useVideoConfig();
  return (fraction: number) => Math.round(durationInFrames * fraction);
};

/** Shared slide background. */
export const Stage: React.FC<{
  children: React.ReactNode;
  dark?: boolean;
}> = ({ children, dark = true }) => (
  <AbsoluteFill
    style={{
      background: dark
        ? `linear-gradient(160deg, ${COLORS.inkDeep} 0%, ${COLORS.ink} 55%, ${COLORS.inkSoft} 100%)`
        : COLORS.white,
      fontFamily: FONT_BODY,
      color: dark ? COLORS.white : COLORS.ink,
    }}
  >
    {children}
  </AbsoluteFill>
);

/** Fade + rise, driven by a spring so it never feels mechanical. */
export const Rise: React.FC<{
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, distance = 40, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [distance, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * A dashboard screenshot in a browser-style frame, with a slow Ken Burns
 * move. `focus` lets a scene push into a region (0-1 coords) so a specific
 * panel fills the frame instead of showing the whole app shrunk down.
 */
export const Screenshot: React.FC<{
  src: string;
  /** Start and end zoom (1 = fit). */
  from?: number;
  to?: number;
  /** Normalised focal point to zoom toward. */
  focus?: { x: number; y: number };
  /** Horizontal pan in percent of width, applied over the scene. */
  panX?: [number, number];
  delay?: number;
  /** Reserve space at the bottom of the frame for a caption band. */
  bottomSpace?: number;
  /** Frame width as a % of the canvas. */
  width?: number;
}> = ({
  src,
  from = 1.06,
  to = 1.0,
  focus = { x: 0.5, y: 0.5 },
  panX = [0, 0],
  delay = 0,
  bottomSpace = 0,
  width = 84,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  const progress = interpolate(
    frame,
    [delay, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const scale = interpolate(progress, [0, 1], [from, to]);
  const tx = interpolate(progress, [0, 1], panX);

  // Translate so the focal point stays put while scaling.
  const ox = (0.5 - focus.x) * 100;
  const oy = (0.5 - focus.y) * 100;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        paddingBottom: bottomSpace,
        display: "grid",
        placeItems: "center",
        opacity: enter,
      }}
    >
      <div
        style={{
          width: `${width}%`,
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 40px 120px rgba(0,0,0,0.55)",
          border: `1px solid rgba(255,255,255,0.10)`,
          transform: `scale(${interpolate(enter, [0, 1], [0.96, 1])})`,
        }}
      >
        {/* browser chrome */}
        <div
          style={{
            height: 34,
            background: "#12233f",
            display: "flex",
            alignItems: "center",
            gap: 7,
            paddingLeft: 14,
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span
              key={c}
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: c,
                display: "block",
              }}
            />
          ))}
        </div>
        <div style={{ overflow: "hidden", background: COLORS.white }}>
          <Img
            src={staticFile(src)}
            style={{
              width: "100%",
              display: "block",
              transform: `scale(${scale}) translateX(${tx}%) translate(${ox}%, ${oy}%)`,
              transformOrigin: "center center",
            }}
          />
        </div>
      </div>
    </div>
  );
};

/** Ring that snaps onto a region of the frame to direct the eye. */
export const Highlight: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  delay?: number;
  color?: string;
}> = ({ x, y, w, h, delay = 0, color = COLORS.accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const pulse = 1 + Math.sin((frame - delay) / 9) * 0.012;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: `${w}%`,
        height: `${h}%`,
        border: `3px solid ${color}`,
        borderRadius: 12,
        boxShadow: `0 0 0 9999px rgba(4,12,26,${interpolate(s, [0, 1], [0, 0.5])})`,
        opacity: s,
        transform: `scale(${interpolate(s, [0, 1], [1.15, pulse])})`,
      }}
    />
  );
};

/** Small label that flies in next to a highlighted region. */
export const Callout: React.FC<{
  text: string;
  x: number;
  y: number;
  delay?: number;
}> = ({ text, x, y, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        opacity: s,
        transform: `translateX(${interpolate(s, [0, 1], [-24, 0])}px)`,
        background: COLORS.accent,
        color: COLORS.ink,
        fontWeight: 800,
        fontSize: 26,
        padding: "10px 18px",
        borderRadius: 999,
        whiteSpace: "nowrap",
        boxShadow: "0 12px 34px rgba(0,0,0,0.4)",
      }}
    >
      {text}
    </div>
  );
};

/** Number that counts up. */
export const Counter: React.FC<{
  to: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}> = ({ to, prefix = "", suffix = "", delay = 0, duration = 40, style }) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [delay, delay + duration], [0, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <span style={style}>
      {prefix}
      {Math.round(v).toLocaleString("en-US")}
      {suffix}
    </span>
  );
};

export const Headline: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, size = 82, color = COLORS.white, style }) => (
  <h1
    style={{
      fontSize: size,
      lineHeight: 1.08,
      fontWeight: 900,
      letterSpacing: "-0.02em",
      margin: 0,
      color,
      ...style,
    }}
  >
    {children}
  </h1>
);

/**
 * Bottom caption band for screenshot scenes. Pairs with
 * `<Screenshot bottomSpace={...} />` so the image never sits under the text.
 */
export const CaptionBand: React.FC<{
  children: React.ReactNode;
  height?: number;
  delay?: number;
}> = ({ children, height = 190, delay = 20 }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "0 120px",
      background:
        "linear-gradient(to top, rgba(4,12,26,0.96) 40%, rgba(4,12,26,0))",
    }}
  >
    <Rise delay={delay}>{children}</Rise>
  </div>
);

export const Kicker: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <p
    style={{
      fontSize: 26,
      fontWeight: 800,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: COLORS.cta,
      margin: "0 0 18px",
    }}
  >
    {children}
  </p>
);
