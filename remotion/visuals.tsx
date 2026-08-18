import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "./theme";

/* Pulsing alert ring — used behind the cost number in the hook. */
export const PulseRing: React.FC<{ color?: string; size?: number }> = ({
  color = COLORS.accent,
  size = 460,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {[0, 1, 2].map((i) => {
        const local = (frame - i * 20) / 60;
        const p = local - Math.floor(local);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              borderRadius: "50%",
              border: `2px solid ${color}`,
              opacity: (1 - p) * 0.35,
              transform: `scale(${0.6 + p * 0.9})`,
            }}
          />
        );
      })}
    </div>
  );
};

/* Row of "open spot" chair glyphs that blink red — the empty seats. */
export const EmptySpots: React.FC<{ count?: number }> = ({ count = 7 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 26, justifyContent: "center" }}>
      {Array.from({ length: count }).map((_, i) => {
        const e = spring({
          frame: frame - 10 - i * 6,
          fps: 30,
          config: { damping: 200 },
        });
        const blink = 0.55 + Math.sin(frame / 8 + i) * 0.35;
        return (
          <svg
            key={i}
            width="58"
            height="58"
            viewBox="0 0 24 24"
            style={{ opacity: e * blink }}
          >
            {/* simple chair */}
            <path
              d="M6 4v7h12V4M6 11v9M18 11v9M4 11h16"
              fill="none"
              stroke={COLORS.accent}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        );
      })}
    </div>
  );
};

/* A downward trend line that draws itself — the declining old playbook. */
export const DownTrend: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [10, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pts = "20,40 90,70 160,110 230,150 300,210 370,250";
  const len = 520;
  return (
    <svg width="420" height="300" viewBox="0 0 420 300">
      <line x1="20" y1="20" x2="20" y2="270" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
      <line x1="20" y1="270" x2="400" y2="270" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
      <polyline
        points={pts}
        fill="none"
        stroke={COLORS.cta}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - draw)}
      />
      <polygon points="370,250 358,232 388,238" fill={COLORS.cta} opacity={draw} />
    </svg>
  );
};

/* Slowly rotating interlocking gears — "it's a machine / system". */
const Gear: React.FC<{ size: number; color: string; speed: number; teeth?: number }> = ({
  size,
  color,
  speed,
  teeth = 9,
}) => {
  const frame = useCurrentFrame();
  const rot = (frame * speed) % 360;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ transform: `rotate(${rot}deg)` }}
    >
      {Array.from({ length: teeth }).map((_, i) => {
        const a = (i / teeth) * Math.PI * 2;
        return (
          <rect
            key={i}
            x={46}
            y={2}
            width={8}
            height={16}
            rx={2}
            fill={color}
            transform={`rotate(${(a * 180) / Math.PI} 50 50)`}
          />
        );
      })}
      <circle cx="50" cy="50" r="34" fill={color} />
      <circle cx="50" cy="50" r="15" fill={COLORS.inkDeep} />
    </svg>
  );
};

export const GearCluster: React.FC = () => (
  <div style={{ position: "relative", width: 360, height: 300, opacity: 0.5 }}>
    <div style={{ position: "absolute", left: 0, top: 30 }}>
      <Gear size={200} color={COLORS.brand} speed={0.8} />
    </div>
    <div style={{ position: "absolute", left: 160, top: 110 }}>
      <Gear size={140} color={COLORS.cta} speed={-1.15} teeth={7} />
    </div>
    <div style={{ position: "absolute", left: 60, top: 170 }}>
      <Gear size={100} color={COLORS.teal} speed={1.4} teeth={6} />
    </div>
  </div>
);

/* Icon set for step badges. */
const ICONS: Record<string, React.ReactNode> = {
  megaphone: (
    <path
      d="M3 11v2l13 5V6L3 11zM16 8a4 4 0 010 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  chat: (
    <path
      d="M4 5h16v11H8l-4 4V5z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  ),
  growth: (
    <path
      d="M4 19h16M6 16l4-5 3 3 5-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

/* Floating circular icon badge for the step scenes. */
export const IconBadge: React.FC<{ icon: keyof typeof ICONS; color: string }> = ({
  icon,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 12 } });
  const float = Math.sin(frame / 18) * 8;
  return (
    <div
      style={{
        width: 150,
        height: 150,
        borderRadius: 36,
        background: `${color}1f`,
        border: `2px solid ${color}66`,
        display: "grid",
        placeItems: "center",
        color,
        transform: `scale(${pop}) translateY(${float}px)`,
        boxShadow: `0 18px 50px ${color}33`,
      }}
    >
      <svg width="78" height="78" viewBox="0 0 24 24">
        {ICONS[icon]}
      </svg>
    </div>
  );
};

/* Phone mockup with chat bubbles popping in — for the AI step. */
export const PhoneChat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bubbles = [
    { side: "in", text: "Hi! Is there space in your toddler room?", at: 18 },
    { side: "out", text: "Yes! 2 spots open 🎉 Want a tour?", at: 48 },
    { side: "in", text: "Saturday 10am?", at: 86 },
    { side: "out", text: "Booked ✓ See you then!", at: 110 },
  ];
  return (
    <div
      style={{
        width: 360,
        height: 540,
        borderRadius: 46,
        background: "rgba(255,255,255,0.06)",
        border: "3px solid rgba(255,255,255,0.18)",
        padding: 24,
        boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          alignSelf: "center",
          width: 120,
          height: 8,
          borderRadius: 8,
          background: "rgba(255,255,255,0.2)",
          marginBottom: 8,
        }}
      />
      {bubbles.map((b, i) => {
        const e = spring({ frame: frame - b.at, fps, config: { damping: 14 } });
        const out = b.side === "out";
        return (
          <div
            key={i}
            style={{
              alignSelf: out ? "flex-end" : "flex-start",
              maxWidth: "82%",
              opacity: e,
              transform: `translateY(${interpolate(e, [0, 1], [16, 0])}px)`,
              background: out ? COLORS.cta : "rgba(255,255,255,0.12)",
              color: COLORS.white,
              fontSize: 23,
              lineHeight: 1.3,
              padding: "14px 18px",
              borderRadius: 20,
              borderBottomRightRadius: out ? 6 : 20,
              borderBottomLeftRadius: out ? 20 : 6,
            }}
          >
            {b.text}
          </div>
        );
      })}
    </div>
  );
};

/* Thin animated bar that fills to a fraction. */
export const MiniBar: React.FC<{ frac: number; delay: number; color?: string }> = ({
  frac,
  delay,
  color = COLORS.cta,
}) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [delay, delay + 36], [0, frac * 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        width: "100%",
        height: 8,
        borderRadius: 8,
        background: "rgba(255,255,255,0.1)",
        marginTop: 18,
        overflow: "hidden",
      }}
    >
      <div style={{ width: `${w}%`, height: "100%", background: color }} />
    </div>
  );
};

/* 5-star rating that fills in. */
export const StarRating: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const e = interpolate(frame, [delay + i * 6, delay + i * 6 + 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <svg key={i} width="40" height="40" viewBox="0 0 24 24" style={{ opacity: 0.3 + e * 0.7, transform: `scale(${0.7 + e * 0.3})` }}>
            <path
              d="M12 2l3 6.5 7 .9-5 4.8 1.3 7L12 18l-6.6 3.2L6.7 14l-5-4.8 7-.9z"
              fill={COLORS.accent}
            />
          </svg>
        );
      })}
    </div>
  );
};

/* Circular avatar with initials. */
export const Avatar: React.FC<{ initials: string; color?: string }> = ({
  initials,
  color = COLORS.brand,
}) => (
  <div
    style={{
      width: 96,
      height: 96,
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${color}, ${COLORS.cta})`,
      display: "grid",
      placeItems: "center",
      color: COLORS.white,
      fontSize: 38,
      fontWeight: 800,
      flexShrink: 0,
      boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
    }}
  >
    {initials}
  </div>
);

export const CalendarIcon: React.FC<{ size?: number }> = ({ size = 64 }) => {
  const frame = useCurrentFrame();
  const e = spring({ frame, fps: 30, config: { damping: 12 } });
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ transform: `scale(${e})` }}>
      <rect x="3" y="4" width="18" height="17" rx="3" fill="none" stroke={COLORS.cta} strokeWidth="1.7" />
      <path d="M3 9h18M8 2v4M16 2v4" stroke={COLORS.cta} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8 14l3 3 5-5" fill="none" stroke={COLORS.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/* Bouncing right arrow. */
export const BounceArrow: React.FC = () => {
  const frame = useCurrentFrame();
  const x = Math.sin(frame / 6) * 8;
  return (
    <svg width="60" height="60" viewBox="0 0 24 24" style={{ transform: `translateX(${x}px)` }}>
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke={COLORS.white} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
