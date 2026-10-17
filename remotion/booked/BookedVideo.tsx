import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_BODY } from "../theme";
import { timed } from "./script";
import { SceneFg } from "./scenes";

const Captions: React.FC<{ text: string; audioFrames: number }> = ({ text, audioFrames }) => {
  const frame = useCurrentFrame();
  const words = text.split(/\s+/);
  // chunks of ~6 words, split at punctuation when possible
  const chunks: string[] = [];
  let cur: string[] = [];
  for (const w of words) {
    cur.push(w);
    if (cur.length >= 6 || (cur.length >= 3 && /[.!?:,]$/.test(w))) { chunks.push(cur.join(" ")); cur = []; }
  }
  if (cur.length) chunks.push(cur.join(" "));
  const total = chunks.reduce((a, c) => a + c.length, 0);
  let acc = 0;
  const lead = 4;
  const span = audioFrames - lead;
  const idx = chunks.findIndex((c) => { const end = (acc += c.length) / total; return frame - lead < end * span; });
  const i = idx === -1 ? chunks.length - 1 : idx;
  if (frame > audioFrames + 6) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 56, display: "flex", justifyContent: "center" }}>
      <div style={{ background: "rgba(7,26,55,0.82)", color: "#fff", fontFamily: FONT_BODY, fontWeight: 700, fontSize: 44, padding: "12px 30px", borderRadius: 16, maxWidth: 1500, textAlign: "center", lineHeight: 1.25 }}>
        {chunks[i]}
      </div>
    </div>
  );
};

const Bg: React.FC<{ image: string }> = ({ image }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const scale = interpolate(frame, [0, durationInFrames], [1.04, 1.16]);
  return (
    <AbsoluteFill>
      <Img src={staticFile(`booked/${image}`)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})` }} />
      <AbsoluteFill style={{ background: `linear-gradient(160deg, ${COLORS.inkDeep}e6 0%, ${COLORS.ink}b3 55%, ${COLORS.inkSoft}99 100%)` }} />
    </AbsoluteFill>
  );
};

const Logo: React.FC = () => {
  const frame = useCurrentFrame();
  const s = spring({ frame, fps: 30, config: { damping: 200 } });
  return <Img src={staticFile("educare-leads-logo-white.png")} style={{ position: "absolute", left: 70, top: 50, height: 60, opacity: s }} />;
};

export const BookedVideo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.inkDeep }}>
    {timed.map((s) => (
      <Sequence key={s.id} from={s.startFrame} durationInFrames={s.durationInFrames} name={s.id}>
        <Bg image={s.image} />
        <Logo />
        <SceneFg id={s.id} />
        <Captions text={s.vo} audioFrames={s.audioFrames} />
        <Audio src={staticFile(`vo/booked/${s.id}.mp3`)} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
