import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_BODY } from "../theme";

const useSpring = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping: 200 } });
};

const Rise: React.FC<{ delay?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ delay = 0, children, style }) => {
  const s = useSpring(delay);
  return <div style={{ opacity: s, transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`, ...style }}>{children}</div>;
};

const Title: React.FC<{ kicker?: string; title: string; sub?: string }> = ({ kicker, title, sub }) => (
  <div style={{ position: "absolute", left: 110, top: 190, maxWidth: 1000, color: "#fff", fontFamily: FONT_BODY }}>
    {kicker && <Rise><div style={{ color: COLORS.cta, fontWeight: 800, letterSpacing: "0.12em", fontSize: 28, textTransform: "uppercase" }}>{kicker}</div></Rise>}
    <Rise delay={5}><div style={{ fontSize: 88, fontWeight: 900, lineHeight: 1.04, marginTop: 12 }}>{title}</div></Rise>
    {sub && <Rise delay={14}><div style={{ fontSize: 38, marginTop: 24, color: COLORS.cloud, lineHeight: 1.3 }}>{sub}</div></Rise>}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties }> = ({ children, delay = 0, style }) => (
  <Rise delay={delay} style={{ background: "#fff", color: COLORS.ink, borderRadius: 28, padding: "26px 34px", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", fontFamily: FONT_BODY, ...style }}>{children}</Rise>
);

const Check: React.FC<{ size?: number; delay?: number }> = ({ size = 220, delay = 6 }) => {
  const frame = useCurrentFrame();
  const s = useSpring(delay);
  const draw = interpolate(frame, [delay + 8, delay + 30], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: COLORS.cta, display: "grid", placeItems: "center", transform: `scale(${s})`, boxShadow: `0 0 0 ${18 * s}px ${COLORS.cta}33` }}>
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
        <path d="M20 6 9 17l-5-5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={24} strokeDashoffset={24 * draw} />
      </svg>
    </div>
  );
};

const Num: React.FC<{ n: number; active?: boolean }> = ({ n, active }) => (
  <div style={{ width: 64, height: 64, borderRadius: "50%", background: active ? COLORS.accent : COLORS.cta, color: COLORS.inkDeep, fontWeight: 900, fontSize: 36, display: "grid", placeItems: "center", flex: "none" }}>{n}</div>
);

const Row: React.FC<{ icon: React.ReactNode; text: string; delay: number }> = ({ icon, text, delay }) => (
  <Card delay={delay} style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 38, fontWeight: 700 }}>{icon}<span>{text}</span></Card>
);

const Dot = () => <div style={{ width: 22, height: 22, borderRadius: 11, background: COLORS.cta, flex: "none" }} />;

const Right: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", right: 110, top: 200, width: 700, display: "flex", flexDirection: "column", gap: 24 }}>{children}</div>
);

const Phone: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const enter = useSpring(0);
  const t = (f: number) => Math.round(durationInFrames * f);
  const bubble1 = useSpring(t(0.08));
  const bubble2 = useSpring(t(0.45));
  const check = useSpring(t(0.55));
  const pulse = 1 + 0.06 * Math.sin(frame / 6);
  return (
    <div style={{ position: "absolute", right: 200, top: 60, width: 420, height: 780, borderRadius: 64, background: "#0a0f1c", border: "10px solid #1b2538", boxShadow: "0 40px 90px rgba(0,0,0,0.55)", transform: `translateY(${interpolate(enter, [0, 1], [120, 0])}px)`, opacity: enter, fontFamily: FONT_BODY, overflow: "hidden" }}>
      <div style={{ background: "#f4f6fa", position: "absolute", inset: 0 }}>
        <div style={{ background: "#fff", padding: "50px 20px 16px", textAlign: "center", borderBottom: "1px solid #e3e8f0" }}>
          <div style={{ width: 56, height: 56, borderRadius: 28, background: COLORS.brand, color: "#fff", fontWeight: 800, fontSize: 28, display: "grid", placeItems: "center", margin: "0 auto" }}>J</div>
          <div style={{ fontWeight: 800, color: COLORS.ink, marginTop: 6, fontSize: 22 }}>Jessica – Educare Leads</div>
        </div>
        <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ opacity: bubble1, transform: `translateY(${interpolate(bubble1, [0, 1], [20, 0])}px)`, alignSelf: "flex-start", background: "#e6ebf3", color: COLORS.ink, padding: "16px 20px", borderRadius: "22px 22px 22px 6px", fontSize: 24, lineHeight: 1.3, maxWidth: 340 }}>
            Hi! This is Jessica from Educare Leads. Reply <b>YES</b> to confirm your call. 👍
          </div>
          <div style={{ opacity: bubble2, transform: `scale(${interpolate(bubble2, [0, 1], [0.6, 1])})`, transformOrigin: "right bottom", alignSelf: "flex-end", background: COLORS.cta, color: "#fff", padding: "14px 34px", borderRadius: "22px 22px 6px 22px", fontSize: 40, fontWeight: 900 }}>YES</div>
          <div style={{ opacity: check, alignSelf: "flex-end", color: COLORS.teal, fontWeight: 800, fontSize: 22 }}>✓ Confirmed — see you then!</div>
        </div>
      </div>
      <div style={{ position: "absolute", inset: -10, borderRadius: 64, border: `6px solid ${COLORS.cta}`, opacity: 0.5, transform: `scale(${pulse})`, pointerEvents: "none" }} />
    </div>
  );
};

const Timeline: React.FC = () => {
  const items = ["Where enrollment stands & open spots", "How families find you today", "How our enrollment system would work for you", "An honest fit check"];
  return (
    <Right>
      <Card delay={0} style={{ padding: "18px 34px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 28 }}><span>0 min</span><span style={{ color: COLORS.cta }}>20 min</span></div>
        <div style={{ height: 12, borderRadius: 6, background: "#dbe4f3", marginTop: 12, overflow: "hidden" }}><TimelineFill /></div>
      </Card>
      {items.map((t, i) => <Row key={t} icon={<Dot />} text={t} delay={20 + i * 40} />)}
    </Right>
  );
};
const TimelineFill = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return <div style={{ height: "100%", width: `${interpolate(frame, [10, durationInFrames - 20], [0, 100], { extrapolateRight: "clamp" })}%`, background: COLORS.cta }} />;
};

const Clock: React.FC = () => {
  const frame = useCurrentFrame();
  const sec = Math.max(0, 20 * 60 - Math.floor(frame / 30) * 75);
  return <span>{String(Math.floor(sec / 60)).padStart(2, "0")}:{String(sec % 60).padStart(2, "0")}</span>;
};

export const SceneFg: React.FC<{ id: string }> = ({ id }) => {
  const frame = useCurrentFrame();
  switch (id) {
    case "s01":
      return (<>
        <Title kicker="Welcome" title="You're booked!" sub="Your free 20-minute strategy call is on the calendar." />
        <div style={{ position: "absolute", right: 200, top: 300 }}><Check /></div>
      </>);
    case "s02":
      return (<>
        <Title title="Get ready in 3 quick steps" sub="About two minutes, total." />
        <Right>{[1, 2, 3].map((n) => <Card key={n} delay={10 + n * 10} style={{ display: "flex", gap: 22, alignItems: "center", fontSize: 40, fontWeight: 800 }}><Num n={n} />{["Know your numbers", "Quiet spot + laptop", "Find your Meet link"][n - 1]}</Card>)}</Right>
      </>);
    case "s03":
      return (<>
        <Title kicker="Step 1" title="Know your numbers" sub="Estimates are fine." />
        <Right>
          <Row icon={<Num n={1} active />} text="Monthly revenue" delay={14} />
          <Row icon={<Num n={1} active />} text="Open spots right now" delay={34} />
          <Card delay={54} style={{ display: "flex", gap: 14 }}>{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{ flex: 1, height: 70, borderRadius: 14, background: i < 3 ? COLORS.accent : "#dbe4f3" }} />)}</Card>
        </Right>
      </>);
    case "s04":
      return (<>
        <Title kicker="Step 2" title="Quiet spot + laptop" sub="20 minutes, stable connection." />
        <Right>
          <Card delay={14} style={{ textAlign: "center" }}><div style={{ fontSize: 120, fontWeight: 900, color: COLORS.brand, fontVariantNumeric: "tabular-nums" }}><Clock /></div><div style={{ fontSize: 30, color: COLORS.muted, fontWeight: 700 }}>our time together</div></Card>
          <Row icon={<span style={{ fontSize: 44 }}>💻</span>} text="Laptop + steady Wi-Fi" delay={40} />
        </Right>
      </>);
    case "s05":
      return (<>
        <Title kicker="Step 3" title="Find your Google Meet link" sub="In your Calendly invite + confirmation email." />
        <Right>
          <Card delay={14}>
            <div style={{ fontSize: 26, color: COLORS.muted, fontWeight: 700 }}>From: Educare Leads · Your call is confirmed</div>
            <div style={{ marginTop: 16, background: COLORS.cta, color: "#fff", borderRadius: 14, padding: "18px 24px", fontSize: 36, fontWeight: 800 }}>🎥 Join with Google Meet</div>
          </Card>
          <Card delay={44} style={{ border: `4px solid ${COLORS.accent}`, fontSize: 34, fontWeight: 800 }}>Can&apos;t see it? Check spam / promotions</Card>
        </Right>
      </>);
    case "s06":
      return (<>
        <Title kicker="Most important" title="Reply YES to confirm" sub="No reply = no team member on the call." />
        <Phone />
      </>);
    case "s07":
      return (<>
        <Title kicker="The call" title="Your 20-minute call" sub="A working conversation about your program." />
        <Timeline />
      </>);
    case "s08": {
      const slide = interpolate(frame, [30, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      return (<>
        <Title title="Can't make it? Reschedule." sub="Use the link in your Calendly email. It takes seconds." />
        <Right>
          <Card delay={14} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 30, color: COLORS.muted, fontWeight: 700 }}>📅 Reschedule</div>
            <div style={{ position: "relative", height: 90, marginTop: 14 }}>
              {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ position: "absolute", left: `${i * 20 + 1}%`, width: "17%", height: 80, borderRadius: 14, background: "#dbe4f3" }} />)}
              <div style={{ position: "absolute", top: 0, width: "17%", height: 80, borderRadius: 14, background: COLORS.cta, left: `${1 + slide * 60}%`, boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }} />
            </div>
          </Card>
        </Right>
      </>);
    }
    default:
      return (<AbsoluteFill style={{ fontFamily: FONT_BODY, color: "#fff", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <Rise><div style={{ fontSize: 120, fontWeight: 900 }}>See you soon!</div></Rise>
        <Rise delay={14}><div style={{ fontSize: 44, marginTop: 20, color: COLORS.cloud }}>info@educareleads.com · +1 (438) 799-4574</div></Rise>
      </AbsoluteFill>);
  }
};
