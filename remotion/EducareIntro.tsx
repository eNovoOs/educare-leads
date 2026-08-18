import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadArchivoBlack } from "@remotion/google-fonts/ArchivoBlack";

const { fontFamily: archivoBlack } = loadArchivoBlack();

// Educare Leads brand palette (sampled from globals.css)
const COLORS = {
  inkDeep: "#071a37",
  ink: "#0b2447",
  brand: "#1d5fd8",
  cta: "#11a0d8",
  teal: "#1c8b9c",
  accent: "#f5c518",
};

export type EducareIntroProps = {
  headline: string;
  subhead: string;
  cta: string;
};

const FONT = archivoBlack;
const FONT_BODY =
  '-apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif';

const GlowBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drift = interpolate(frame, [0, 12 * fps], [0, 1]);
  const y = interpolate(drift, [0, 1], [-60, 60]);
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 80% at 50% ${30 + y / 6}%, ${
          COLORS.brand
        }33 0%, transparent 55%), linear-gradient(160deg, ${COLORS.ink} 0%, ${
          COLORS.inkDeep
        } 100%)`,
      }}
    />
  );
};

const FadeUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.6 },
  });
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const translateY = interpolate(enter, [0, 1], [40, 0]);
  return (
    <div style={{ ...style, opacity, transform: `translateY(${translateY}px)` }}>
      {children}
    </div>
  );
};

export const EducareIntro: React.FC<EducareIntroProps> = ({
  headline,
  subhead,
  cta,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Global fade out at the very end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - fps * 0.75, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  const logoPop = spring({ frame, fps, config: { damping: 12, mass: 0.8 } });
  const logoScale = interpolate(logoPop, [0, 1], [0.6, 1]);

  return (
    <AbsoluteFill style={{ opacity: fadeOut, fontFamily: FONT_BODY }}>
      <GlowBackground />

      {/* Scene 1 — Logo reveal */}
      <Sequence durationInFrames={3 * fps}>
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Img
            src={staticFile("educare-leads-logo-white.png")}
            style={{
              width: 620,
              transform: `scale(${logoScale})`,
              filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.45))",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2 — Headline */}
      <Sequence from={3 * fps} durationInFrames={4.5 * fps}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "0 110px",
            textAlign: "center",
          }}
        >
          <FadeUp delay={0}>
            <div
              style={{
                color: COLORS.cta,
                fontSize: 34,
                letterSpacing: 4,
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 36,
              }}
            >
              Educare Leads
            </div>
          </FadeUp>
          <FadeUp delay={6}>
            <div
              style={{
                color: "#ffffff",
                fontFamily: FONT,
                fontSize: 84,
                lineHeight: 1.05,
                letterSpacing: -1,
              }}
            >
              {headline}
            </div>
          </FadeUp>
          <FadeUp delay={16}>
            <div
              style={{
                color: "#c7d6ee",
                fontSize: 38,
                lineHeight: 1.35,
                marginTop: 40,
                maxWidth: 760,
              }}
            >
              {subhead}
            </div>
          </FadeUp>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3 — CTA */}
      <Sequence from={7.5 * fps} durationInFrames={4.5 * fps}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "0 110px",
            textAlign: "center",
          }}
        >
          <FadeUp delay={2}>
            <div
              style={{
                color: COLORS.accent,
                fontFamily: FONT,
                fontSize: 64,
                lineHeight: 1.1,
                maxWidth: 820,
              }}
            >
              {cta}
            </div>
          </FadeUp>
          <FadeUp delay={14}>
            <div
              style={{
                marginTop: 56,
                background: `linear-gradient(135deg, ${COLORS.cta}, ${COLORS.brand})`,
                color: "#ffffff",
                fontFamily: FONT,
                fontSize: 40,
                padding: "30px 64px",
                borderRadius: 999,
                boxShadow: `0 16px 50px ${COLORS.cta}66`,
              }}
            >
              Book a free strategy call →
            </div>
          </FadeUp>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
