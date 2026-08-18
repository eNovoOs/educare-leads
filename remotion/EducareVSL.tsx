import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadArchivoBlack } from "@remotion/google-fonts/ArchivoBlack";
import { COLORS, FONT_BODY } from "./theme";
import {
  Background,
  FadeUp,
  Eyebrow,
  Watermark,
  ProgressBar,
  SceneTransition,
  useCountUp,
} from "./components";
import {
  PulseRing,
  EmptySpots,
  DownTrend,
  GearCluster,
  IconBadge,
  PhoneChat,
  MiniBar,
  StarRating,
  Avatar,
  CalendarIcon,
  BounceArrow,
} from "./visuals";
import {
  scenes,
  sceneStarts,
  totalDurationInFrames,
  VOICEOVER,
} from "./narration";

const { fontFamily: DISPLAY } = loadArchivoBlack();

const fmtMoney = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

/* ----------------------------------------------------------------- *
 * Scene 1 — Hook: silent revenue loss + counting cost
 * ----------------------------------------------------------------- */
const SceneHook: React.FC = () => {
  const cost = useCountUp(18000, 120, 70);
  return (
    <AbsoluteFill style={center}>
      <FadeUp>
        <Eyebrow color={COLORS.accent}>The hidden cost</Eyebrow>
      </FadeUp>
      <FadeUp delay={8}>
        <h1 style={{ ...h1, maxWidth: 1400, marginTop: 24 }}>
          Every empty spot is{" "}
          <span style={{ color: COLORS.accent }}>silent revenue loss.</span>
        </h1>
      </FadeUp>
      <FadeUp delay={55}>
        <div style={{ marginTop: 38 }}>
          <EmptySpots count={7} />
        </div>
      </FadeUp>
      <FadeUp delay={110}>
        <div
          style={{
            position: "relative",
            marginTop: 30,
            display: "grid",
            placeItems: "center",
            padding: "0 60px",
          }}
        >
          <PulseRing />
          <div
            style={{
              fontFamily: DISPLAY,
              fontSize: 148,
              lineHeight: 1,
              color: COLORS.accent,
              letterSpacing: -2,
            }}
          >
            −{fmtMoney(cost)}
          </div>
        </div>
        <div style={{ ...sub, marginTop: 6, textAlign: "center" }}>
          lost per open spot — every year
        </div>
      </FadeUp>
      <FadeUp delay={300}>
        <div style={{ ...sub, marginTop: 30, color: COLORS.muted }}>
          No bill. No alarm. Just revenue you never see.
        </div>
      </FadeUp>
    </AbsoluteFill>
  );
};

/* ----------------------------------------------------------------- *
 * Scene 2 — Agitate: the old playbook, struck through
 * ----------------------------------------------------------------- */
const StrikeItem: React.FC<{ text: string; appear: number; strike: number }> = ({
  text,
  appear,
  strike,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame: frame - appear, fps, config: { damping: 200 } });
  const strikeW = interpolate(frame, [strike, strike + 16], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dim = interpolate(frame, [strike, strike + 16], [1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        opacity: e * dim,
        transform: `translateX(${interpolate(e, [0, 1], [40, 0])}px)`,
        position: "relative",
        fontSize: 52,
        fontWeight: 600,
        color: COLORS.white,
        padding: "14px 0",
      }}
    >
      {text}
      <div
        style={{
          position: "absolute",
          top: "52%",
          left: 0,
          height: 5,
          width: `${strikeW}%`,
          background: COLORS.cta,
          borderRadius: 4,
        }}
      />
    </div>
  );
};

const SceneAgitate: React.FC = () => {
  const items = [
    "Referrals & a little “Google luck”",
    "Boosted posts → tire-kickers",
    "Good leads with no fast follow-up",
    "You marketing AND running the program",
  ];
  return (
    <AbsoluteFill
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 200,
        paddingRight: 170,
      }}
    >
      <div>
        <FadeUp>
          <Eyebrow>The old playbook</Eyebrow>
          <h2 style={{ ...h2, marginTop: 22, marginBottom: 36 }}>
            Why your spots stay empty
          </h2>
        </FadeUp>
        <div>
          {items.map((t, i) => (
            <StrikeItem
              key={t}
              text={t}
              appear={20 + i * 60}
              strike={70 + i * 60}
            />
          ))}
        </div>
      </div>
      <FadeUp delay={40}>
        <div style={{ textAlign: "center" }}>
          <DownTrend />
          <div style={{ ...sub, fontSize: 30, color: COLORS.muted, marginTop: 4 }}>
            Enrollment, left to luck
          </div>
        </div>
      </FadeUp>
    </AbsoluteFill>
  );
};

/* ----------------------------------------------------------------- *
 * Scene 3 — Reframe
 * ----------------------------------------------------------------- */
const SceneReframe: React.FC = () => {
  const frame = useCurrentFrame();
  const strikeW = interpolate(frame, [40, 60], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={center}>
      <div style={{ position: "absolute", right: 150, top: 150, opacity: 0.7 }}>
        <GearCluster />
      </div>
      <FadeUp>
        <div style={{ position: "relative", display: "inline-block" }}>
          <span style={{ ...h2, color: COLORS.cloud }}>
            It&apos;s not a marketing problem.
          </span>
          <div
            style={{
              position: "absolute",
              top: "55%",
              left: 0,
              height: 6,
              width: `${strikeW}%`,
              background: COLORS.muted,
              borderRadius: 4,
            }}
          />
        </div>
      </FadeUp>
      <FadeUp delay={70}>
        <h1 style={{ ...h1, marginTop: 36 }}>
          It&apos;s a <span style={{ color: COLORS.cta }}>system</span> problem.
        </h1>
      </FadeUp>
    </AbsoluteFill>
  );
};

/* ----------------------------------------------------------------- *
 * Scene 4 — Intro the mechanism
 * ----------------------------------------------------------------- */
const SceneIntro: React.FC = () => (
  <AbsoluteFill style={center}>
    <FadeUp>
      <Eyebrow>Introducing</Eyebrow>
    </FadeUp>
    <FadeUp delay={6}>
      <h1
        style={{
          ...h1,
          fontSize: 104,
          marginTop: 22,
          maxWidth: 1500,
          background: `linear-gradient(120deg, ${COLORS.white}, ${COLORS.cta})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        The Educare Enrollment System
      </h1>
    </FadeUp>
    <FadeUp delay={26}>
      <div style={{ ...sub, marginTop: 26 }}>One system. Three steps.</div>
    </FadeUp>
  </AbsoluteFill>
);

/* ----------------------------------------------------------------- *
 * Scenes 5–7 — The three steps
 * ----------------------------------------------------------------- */
const Chip: React.FC<{ children: React.ReactNode; delay: number }> = ({
  children,
  delay,
}) => (
  <FadeUp delay={delay} distance={24}>
    <span
      style={{
        display: "inline-block",
        fontSize: 34,
        fontWeight: 600,
        color: COLORS.white,
        background: "rgba(255,255,255,0.08)",
        border: `1px solid rgba(255,255,255,0.16)`,
        borderRadius: 999,
        padding: "16px 32px",
        margin: "0 14px 16px 0",
      }}
    >
      {children}
    </span>
  </FadeUp>
);

const StepScene: React.FC<{
  n: string;
  title: string;
  chips: string[];
  accent: string;
  icon: "megaphone" | "chat" | "growth";
  extra?: React.ReactNode;
}> = ({ n, title, chips, accent, icon, extra }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 12, mass: 0.7 } });
  return (
    <AbsoluteFill
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: extra ? "space-between" : "flex-start",
        paddingLeft: 200,
        paddingRight: 170,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 26,
          }}
        >
          <div
            style={{
              fontFamily: DISPLAY,
              fontSize: 210,
              lineHeight: 1,
              color: accent,
              transform: `scale(${interpolate(pop, [0, 1], [0.6, 1])})`,
            }}
          >
            {n}
          </div>
          <IconBadge icon={icon} color={accent} />
        </div>
        <div>
          <FadeUp delay={6}>
            <h2 style={{ ...h2, maxWidth: 760 }}>{title}</h2>
          </FadeUp>
          <div style={{ marginTop: 36 }}>
            {chips.map((c, i) => (
              <Chip key={c} delay={30 + i * 16}>
                {c}
              </Chip>
            ))}
          </div>
        </div>
      </div>
      {extra && <FadeUp delay={20}>{extra}</FadeUp>}
    </AbsoluteFill>
  );
};

/* ----------------------------------------------------------------- *
 * Scene 8 — Proof numbers
 * ----------------------------------------------------------------- */
const StatTile: React.FC<{
  value: string;
  label: string;
  delay: number;
  frac: number;
  barColor: string;
}> = ({ value, label, delay, frac, barColor }) => (
  <FadeUp delay={delay} distance={50}>
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 28,
        padding: "40px 34px",
        width: 380,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: DISPLAY,
          fontSize: 84,
          color: COLORS.accent,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div style={{ ...sub, fontSize: 27, marginTop: 16, color: COLORS.cloud, minHeight: 76 }}>
        {label}
      </div>
      <MiniBar frac={frac} delay={delay + 20} color={barColor} />
    </div>
  </FadeUp>
);

const SceneProofNumbers: React.FC = () => {
  const cpa = useCountUp(14.1, 50, 50);
  const roas = useCountUp(4.2, 60, 50);
  const progs = useCountUp(37, 70, 50);
  const days = useCountUp(90, 80, 50);
  return (
    <AbsoluteFill style={center}>
      <FadeUp>
        <Eyebrow>The proof</Eyebrow>
        <h2 style={{ ...h2, marginTop: 20, marginBottom: 56 }}>
          Proven across 37+ programs
        </h2>
      </FadeUp>
      <div style={{ display: "flex", gap: 28 }}>
        <StatTile value={`$${cpa.toFixed(2)}`} label="avg. cost per booked family" delay={50} frac={0.86} barColor={COLORS.cta} />
        <StatTile value={`${roas.toFixed(1)}×`} label="average return on ad spend" delay={60} frac={0.84} barColor={COLORS.teal} />
        <StatTile value={`${Math.round(progs)}+`} label="programs filled across the U.S." delay={70} frac={0.74} barColor={COLORS.brand} />
        <StatTile value={`${Math.round(days)} days`} label="to a full calendar" delay={80} frac={0.9} barColor={COLORS.accent} />
      </div>
    </AbsoluteFill>
  );
};

/* ----------------------------------------------------------------- *
 * Scene 9 — Testimonials (one at a time)
 * ----------------------------------------------------------------- */
const testimonials = [
  {
    metric: "42 enrollments in 50 days",
    quote:
      "We went from praying for a phone call to turning families away.",
    name: "Maria T.",
    role: "Owner, 2-center daycare · Texas",
    initials: "MT",
    color: COLORS.brand,
  },
  {
    metric: "61 applications in 45 days",
    quote:
      "Our open-house calendar was packed for the first time in years.",
    name: "James P.",
    role: "Admissions Director, private school · Florida",
    initials: "JP",
    color: COLORS.teal,
  },
  {
    metric: "Sold out in 3 weeks",
    quote:
      "We filled every session and started a waitlist a month early.",
    name: "Aisha R.",
    role: "Director, day camp · Georgia",
    initials: "AR",
    color: COLORS.ctaDark,
  },
];

const SceneTestimonials: React.FC = () => {
  const frame = useCurrentFrame();
  const per = 195; // frames per card (~6.5s)
  const idx = Math.min(testimonials.length - 1, Math.floor(frame / per));
  const local = frame - idx * per;
  const t = testimonials[idx];
  const enterX = interpolate(local, [0, 18], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const enterO = interpolate(local, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={center}>
      <Eyebrow>Real programs, real results</Eyebrow>
      <div
        style={{
          marginTop: 40,
          width: 1320,
          opacity: enterO,
          transform: `translateX(${enterX}px)`,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 32,
          padding: "60px 72px",
        }}
      >
        <StarRating delay={idx * per} />
        <div
          style={{
            fontFamily: DISPLAY,
            fontSize: 70,
            color: COLORS.accent,
            lineHeight: 1.05,
            marginTop: 22,
          }}
        >
          {t.metric}
        </div>
        <div
          style={{
            fontSize: 46,
            fontStyle: "italic",
            color: COLORS.white,
            lineHeight: 1.35,
            marginTop: 26,
          }}
        >
          “{t.quote}”
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            marginTop: 32,
          }}
        >
          <Avatar initials={t.initials} color={t.color} />
          <div style={{ ...sub, fontSize: 30, color: COLORS.cloud, textAlign: "left" }}>
            <strong style={{ color: COLORS.white }}>{t.name}</strong>
            <br />
            {t.role}
          </div>
        </div>
      </div>
      {/* dots */}
      <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
        {testimonials.map((_, i) => (
          <div
            key={i}
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: i === idx ? COLORS.cta : "rgba(255,255,255,0.25)",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

/* ----------------------------------------------------------------- *
 * Scene 10 — Offer + guarantee stamp
 * ----------------------------------------------------------------- */
const stackItems = [
  "Hyper-local Meta + Google campaigns — built for you",
  "AI lead-conversion system — instant text, qualify, book",
  "CRM setup + weekly optimization",
  "90-day enrollment playbook + done-for-you creative",
];

const SceneOffer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stamp = spring({
    frame: frame - 300,
    fps,
    config: { damping: 9, mass: 0.8 },
  });
  return (
    <AbsoluteFill style={{ ...centerLeft, paddingLeft: 220, paddingRight: 160 }}>
      <FadeUp>
        <Eyebrow>The offer</Eyebrow>
        <h2 style={{ ...h2, marginTop: 18, marginBottom: 40 }}>
          Everything you get
        </h2>
      </FadeUp>
      <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          {stackItems.map((s, i) => (
            <FadeUp key={s} delay={20 + i * 28} distance={26}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  fontSize: 38,
                  color: COLORS.white,
                  padding: "16px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <span style={{ color: COLORS.cta, fontSize: 40 }}>✓</span>
                {s}
              </div>
            </FadeUp>
          ))}
        </div>
        <div
          style={{
            flexShrink: 0,
            width: 520,
            transform: `scale(${interpolate(stamp, [0, 1], [0.4, 1])}) rotate(${interpolate(stamp, [0, 1], [-12, -6])}deg)`,
            opacity: stamp,
            background: `linear-gradient(135deg, ${COLORS.cta}, ${COLORS.brand})`,
            borderRadius: 28,
            padding: "46px 40px",
            textAlign: "center",
            boxShadow: `0 26px 70px ${COLORS.cta}55`,
          }}
        >
          <div style={{ ...sub, color: "rgba(255,255,255,0.85)", fontSize: 28 }}>
            Our guarantee
          </div>
          <div
            style={{
              fontFamily: DISPLAY,
              fontSize: 52,
              color: COLORS.white,
              lineHeight: 1.05,
              marginTop: 16,
            }}
          >
            First families in 7 days
          </div>
          <div style={{ fontSize: 34, color: COLORS.white, marginTop: 16 }}>
            — or we work free until they arrive.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ----------------------------------------------------------------- *
 * Scene 11 — Scarcity + CTA
 * ----------------------------------------------------------------- */
const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse = 1 + Math.sin(frame / 9) * 0.02;
  const btn = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  return (
    <AbsoluteFill style={center}>
      <FadeUp>
        <div style={{ marginBottom: 24 }}>
          <CalendarIcon size={96} />
        </div>
      </FadeUp>
      <FadeUp delay={6}>
        <div
          style={{
            display: "inline-block",
            fontSize: 30,
            fontWeight: 700,
            color: COLORS.accent,
            border: `1px solid ${COLORS.accent}66`,
            background: `${COLORS.accent}14`,
            borderRadius: 999,
            padding: "12px 30px",
          }}
        >
          One program per area · limited spots each month
        </div>
      </FadeUp>
      <FadeUp delay={14}>
        <h1 style={{ ...h1, fontSize: 120, marginTop: 40 }}>
          Book your free strategy call
        </h1>
      </FadeUp>
      <FadeUp delay={30}>
        <div style={{ ...sub, marginTop: 26, maxWidth: 1100, textAlign: "center" }}>
          We&apos;ll map your exact numbers — projected leads, cost per
          enrollment, and a 90-day plan for your market.
        </div>
      </FadeUp>
      <div
        style={{
          marginTop: 48,
          display: "flex",
          alignItems: "center",
          gap: 18,
          transform: `scale(${interpolate(btn, [0, 1], [0.7, 1]) * pulse})`,
          opacity: btn,
          background: `linear-gradient(135deg, ${COLORS.cta}, ${COLORS.brand})`,
          color: COLORS.white,
          fontFamily: DISPLAY,
          fontSize: 46,
          padding: "32px 68px",
          borderRadius: 999,
          boxShadow: `0 22px 60px ${COLORS.cta}66`,
        }}
      >
        Fill out the application
        <BounceArrow />
      </div>
      <FadeUp delay={90}>
        <div style={{ ...sub, fontSize: 28, marginTop: 34, color: COLORS.muted }}>
          For programs doing $25k+/month with spots to fill · takes 2 minutes
        </div>
      </FadeUp>
      <FadeUp delay={110}>
        <Img
          src={staticFile("educare-leads-logo-white.png")}
          style={{ width: 260, marginTop: 40, opacity: 0.95 }}
        />
      </FadeUp>
    </AbsoluteFill>
  );
};

/* ----------------------------------------------------------------- *
 * Scene registry → maps narration ids to components
 * ----------------------------------------------------------------- */
const sceneComponents: Record<string, React.FC> = {
  s01_hook: SceneHook,
  s02_agitate: SceneAgitate,
  s03_reframe: SceneReframe,
  s04_intro: SceneIntro,
  s05_step1: () => (
    <StepScene
      n="01"
      title="We build your enrollment system"
      chips={["Hyper-local Meta ads", "Google ads", "Written & designed for you"]}
      accent={COLORS.cta}
      icon="megaphone"
    />
  ),
  s06_step2: () => (
    <StepScene
      n="02"
      title="AI converts every lead for you"
      chips={["Instant text", "Qualifies the family", "Books the visit"]}
      accent={COLORS.teal}
      icon="chat"
      extra={<PhoneChat />}
    />
  ),
  s07_step3: () => (
    <StepScene
      n="03"
      title="You enroll & we scale"
      chips={["CRM tracking", "Double down on winners", "Build a waitlist"]}
      accent={COLORS.accent}
      icon="growth"
    />
  ),
  s08_proof_numbers: SceneProofNumbers,
  s09_testimonials: SceneTestimonials,
  s10_offer: SceneOffer,
  s11_cta: SceneCTA,
};

/* ----------------------------------------------------------------- *
 * Main composition
 * ----------------------------------------------------------------- */
export const EducareVSL: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: FONT_BODY, backgroundColor: COLORS.ink }}>
      <Background />
      <Audio src={staticFile(VOICEOVER)} />
      {scenes.map((s) => {
        const Comp = sceneComponents[s.id];
        return (
          <Sequence
            key={s.id}
            from={sceneStarts[s.id]}
            durationInFrames={s.durationInFrames}
            name={s.id}
          >
            <SceneTransition>
              <Comp />
            </SceneTransition>
          </Sequence>
        );
      })}
      <Watermark />
      <ProgressBar progress={frame / totalDurationInFrames} />
    </AbsoluteFill>
  );
};

/* ----------------------------- styles ----------------------------- */
const center: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  flexDirection: "column",
  padding: "0 140px",
};
const centerLeft: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "flex-start",
  flexDirection: "column",
};
const h1: React.CSSProperties = {
  fontFamily: DISPLAY,
  fontSize: 96,
  lineHeight: 1.04,
  letterSpacing: -1.5,
  color: COLORS.white,
  margin: 0,
};
const h2: React.CSSProperties = {
  fontFamily: DISPLAY,
  fontSize: 72,
  lineHeight: 1.06,
  letterSpacing: -1,
  color: COLORS.white,
  margin: 0,
};
const sub: React.CSSProperties = {
  fontSize: 40,
  lineHeight: 1.4,
  color: COLORS.cloud,
};
