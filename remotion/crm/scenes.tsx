import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../theme";
import {
  Callout,
  CaptionBand,
  Counter,
  Headline,
  Highlight,
  Kicker,
  Rise,
  Screenshot,
  Stage,
  useBeat,
} from "./ui";

const center: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "0 140px",
};

/* ── S01 — Hook: the 9pm inquiry nobody answered ─────────────────── */
export const S01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const days = ["Sunday 9:04 PM", "Monday", "Tuesday 8:12 AM"];
  const at = useBeat();
  const idx = Math.min(
    2,
    Math.floor(interpolate(frame, [at(0.08), at(0.62)], [0, 3]))
  );

  return (
    <Stage>
      <div style={center}>
        <Rise delay={6}>
          <div
            style={{
              width: 520,
              borderRadius: 28,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: 34,
              textAlign: "left",
            }}
          >
            <p style={{ color: COLORS.cloud, fontSize: 24, margin: 0 }}>
              {days[idx]}
            </p>
            <p
              style={{
                fontSize: 34,
                fontWeight: 800,
                margin: "14px 0 6px",
                color: COLORS.white,
              }}
            >
              New inquiry — website form
            </p>
            <p style={{ fontSize: 26, color: COLORS.cloud, margin: 0 }}>
              &ldquo;Hi, do you have any openings for a 3 year old?&rdquo;
            </p>
            <p
              style={{
                marginTop: 22,
                fontSize: 22,
                color: idx >= 1 ? "#ff8a8a" : COLORS.cloud,
                fontWeight: 700,
              }}
            >
              {idx >= 1 ? "● Unread" : "● Delivered"}
            </p>
          </div>
        </Rise>

        <Rise delay={at(0.68)} style={{ marginTop: 54 }}>
          <Headline size={70}>
            She was ready.
            <br />
            <span style={{ color: COLORS.accent }}>Nobody answered.</span>
          </Headline>
        </Rise>
      </div>
    </Stage>
  );
};

/* ── S02 — Agitate: five tools, none connected ───────────────────── */
export const S02Agitate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = useBeat();
  const tools = [
    { name: "Spreadsheet", x: 12, y: 20 },
    { name: "Calendar", x: 66, y: 14 },
    { name: "Shared inbox", x: 40, y: 44 },
    { name: "Form builder", x: 8, y: 66 },
    { name: "Billing app", x: 70, y: 66 },
  ];

  return (
    <Stage>
      <AbsoluteFill>
        {tools.map((t, i) => {
          const s = spring({
            frame: frame - 10 - i * 12,
            fps,
            config: { damping: 200 },
          });
          const drift = Math.sin((frame + i * 40) / 60) * 10;
          return (
            <div
              key={t.name}
              style={{
                position: "absolute",
                left: `${t.x}%`,
                top: `${t.y}%`,
                opacity: s * 0.85,
                transform: `translateY(${drift}px) scale(${s})`,
                background: "rgba(255,255,255,0.06)",
                border: "1px dashed rgba(255,255,255,0.25)",
                borderRadius: 16,
                padding: "26px 40px",
                fontSize: 34,
                fontWeight: 700,
                color: COLORS.cloud,
              }}
            >
              {t.name}
            </div>
          );
        })}
      </AbsoluteFill>

      <div style={{ ...center, justifyContent: "flex-end", paddingBottom: 90 }}>
        <Rise delay={at(0.62)}>
          <Headline size={68}>
            Five tools.{" "}
            <span style={{ color: COLORS.accent }}>None of them talking.</span>
          </Headline>
        </Rise>
      </div>
    </Stage>
  );
};

/* ── S03 — Cost: the receipt ─────────────────────────────────────── */
export const S03Cost: React.FC = () => {
  const at = useBeat();
  const lines = ["Open spot #1", "Open spot #2", "Open spot #3", "Open spot #4"];
  return (
    <Stage>
      <div style={center}>
        <Kicker>The hidden cost</Kicker>
        <div
          style={{
            width: 760,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 20,
            padding: "36px 44px",
          }}
        >
          {lines.map((l, i) => (
            <Rise key={l} delay={at(0.06) + i * 22}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 38,
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.10)",
                  color: COLORS.cloud,
                }}
              >
                <span>{l}</span>
                <span style={{ fontWeight: 800, color: COLORS.white }}>
                  $1,500
                </span>
              </div>
            </Rise>
          ))}

          <Rise delay={at(0.42)}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 46,
                fontWeight: 900,
                paddingTop: 22,
                color: COLORS.accent,
              }}
            >
              <span>Every month</span>
              <Counter to={6000} prefix="$" delay={at(0.42)} duration={34} />
            </div>
          </Rise>
        </div>

        <Rise delay={at(0.62)} style={{ marginTop: 44 }}>
          <Headline size={72}>
            <Counter to={72000} prefix="$" delay={at(0.62)} duration={46} /> a year
          </Headline>
          <p style={{ fontSize: 32, color: COLORS.cloud, marginTop: 12 }}>
            in rooms you&apos;ve already paid rent on
          </p>
        </Rise>
      </div>
    </Stage>
  );
};

/* ── S04 — Reframe + product reveal ──────────────────────────────── */
export const S04Reframe: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useBeat();
  const revealAt = at(0.55);

  if (frame < revealAt) {
    return (
      <Stage>
        <div style={center}>
          <Rise delay={8}>
            <Headline size={76} style={{ opacity: 0.45 }}>
              <span style={{ textDecoration: "line-through" }}>
                You don&apos;t have a marketing problem.
              </span>
            </Headline>
          </Rise>
          <Rise delay={at(0.22)} style={{ marginTop: 34 }}>
            <Headline size={86}>
              You have a{" "}
              <span style={{ color: COLORS.accent }}>follow-up problem.</span>
            </Headline>
          </Rise>
        </div>
      </Stage>
    );
  }

  return (
    <Stage>
      <Screenshot
        src="vsl/dashboard.png"
        from={1.12}
        to={1.0}
        delay={revealAt}
      />
    </Stage>
  );
};

/* ── S05 — One inbox ─────────────────────────────────────────────── */
export const S05Inbox: React.FC = () => (
  <Stage>
    <Screenshot
      src="vsl/inbox.png"
      from={1.05}
      to={1.0}
      width={80}
      bottomSpace={200}
    />
    {/* Ring sits on the Jesse Fernandez conversation card */}
    <Highlight x={34} y={18.5} w={19} h={6} delay={110} />
    <Callout text="Came in from Facebook" x={55} y={27} delay={175} />
    <Callout text="Nothing gets buried" x={55} y={36} delay={240} />
    <CaptionBand>
      <Headline size={56}>
        Every channel. <span style={{ color: COLORS.cta }}>One inbox.</span>
      </Headline>
    </CaptionBand>
  </Stage>
);

/* ── S06 — AI front desk + SMS thread ────────────────────────────── */
export const S06Ai: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useBeat();
  const thread = [
    { who: "parent", text: "Hi, do you have spots for a 3yr old?", at: 200 },
    {
      who: "ai",
      text: "We do! We have a few openings. Would Sat 10am or Mon 4pm work for a quick tour?",
      at: at(0.46),
    },
    { who: "parent", text: "Saturday works!", at: 320 },
    { who: "ai", text: "Booked ✅ Sat 10am. We'll send a reminder.", at: 370 },
  ];

  return (
    <Stage>
      <Screenshot src="vsl/ai-hub.png" from={1.1} to={1.18} delay={0} />

      {frame > at(0.28) && (
        <AbsoluteFill
          style={{ background: "rgba(4,12,26,0.72)", padding: "70px 0" }}
        >
          <div
            style={{
              width: 760,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <Rise delay={at(0.30)}>
              <p
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: COLORS.accent,
                  textAlign: "center",
                  margin: 0,
                }}
              >
                Saturday, 9:04 PM
              </p>
            </Rise>
            {thread.map((m) => (
              <Rise key={m.text} delay={m.at}>
                <div
                  style={{
                    alignSelf: m.who === "ai" ? "flex-end" : "flex-start",
                    marginLeft: m.who === "ai" ? "auto" : 0,
                    maxWidth: 540,
                    background:
                      m.who === "ai" ? COLORS.cta : "rgba(255,255,255,0.12)",
                    color: COLORS.white,
                    borderRadius: 22,
                    padding: "20px 26px",
                    fontSize: 29,
                    lineHeight: 1.35,
                  }}
                >
                  {m.text}
                </div>
              </Rise>
            ))}
            <Rise delay={at(0.80)}>
              <p
                style={{
                  textAlign: "center",
                  fontSize: 34,
                  fontWeight: 900,
                  color: COLORS.accent,
                  marginTop: 16,
                }}
              >
                Replied in 7 seconds. While you slept.
              </p>
            </Rise>
          </div>
        </AbsoluteFill>
      )}
    </Stage>
  );
};

/* ── S07 — Pipeline ──────────────────────────────────────────────── */
export const S07Pipeline: React.FC = () => (
  <Stage>
    <Screenshot
      src="vsl/deals.png"
      from={1.06}
      to={1.0}
      width={80}
      bottomSpace={200}
    />
    {/* Ring on the "Demo Scheduled" column header */}
    <Highlight x={58} y={27.5} w={16.5} h={8} delay={150} />
    <Callout text="28 families mid-tour" x={52} y={19} delay={205} />
    <CaptionBand>
      <Headline size={56}>
        Every family,{" "}
        <span style={{ color: COLORS.cta }}>tracked to enrolled.</span>
      </Headline>
    </CaptionBand>
  </Stage>
);

/* ── S08 — Marketing stack ───────────────────────────────────────── */
export const S08Marketing: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useBeat();
  const items = [
    "Email campaigns",
    "SMS & WhatsApp",
    "Social planner",
    "Landing pages",
    "Website & CMS",
    "Reputation",
    "Facebook Ads",
    "E-signature",
    "Payments",
  ];
  const gridAt = at(0.42);

  if (frame < gridAt) {
    return (
      <Stage>
        <Screenshot
          src="vsl/email.png"
          from={1.05}
          to={1.0}
          width={80}
          bottomSpace={200}
        />
        <CaptionBand>
          <Headline size={56}>
            Everything you&apos;d{" "}
            <span style={{ color: COLORS.cta }}>pay an agency for.</span>
          </Headline>
        </CaptionBand>
      </Stage>
    );
  }

  return (
    <Stage>
      <div style={{ ...center }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 22,
            width: 1100,
          }}
        >
          {items.map((it, i) => (
            <Rise key={it} delay={gridAt + i * 9}>
              <div
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 16,
                  padding: "26px 20px",
                  fontSize: 30,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <span style={{ color: COLORS.cta, fontSize: 32 }}>✓</span>
                {it}
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </Stage>
  );
};

/* ── S09 — Consolidation savings ─────────────────────────────────── */
export const S09Savings: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useBeat();
  const tools = [
    "Calendly",
    "Mailchimp",
    "ClickFunnels",
    "Pipedrive",
    "ActiveCampaign",
    "Spreadsheets",
  ];
  return (
    <Stage>
      <div style={center}>
        <Kicker>Cancel these</Kicker>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
            justifyContent: "center",
            maxWidth: 1100,
          }}
        >
          {tools.map((t, i) => {
            const strike = frame > at(0.22) + i * 20;
            return (
              <Rise key={t} delay={10 + i * 12}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    borderRadius: 999,
                    padding: "18px 34px",
                    fontSize: 34,
                    fontWeight: 700,
                    color: strike ? "rgba(255,255,255,0.4)" : COLORS.white,
                    textDecoration: strike ? "line-through" : "none",
                    textDecorationColor: "#ff5f57",
                    textDecorationThickness: 4,
                  }}
                >
                  {t}
                </div>
              </Rise>
            );
          })}
        </div>

        <Rise delay={at(0.60)} style={{ marginTop: 60 }}>
          <Headline size={92} color={COLORS.accent}>
            − <Counter to={700} prefix="$" delay={at(0.60)} duration={40} /> / month
          </Headline>
          <p style={{ fontSize: 30, color: COLORS.cloud, marginTop: 10 }}>
            before you count the enrollments you stop losing
          </p>
        </Rise>
      </div>
    </Stage>
  );
};

/* ── S10 — The differentiator: your specialist ───────────────────── */
export const S10Specialist: React.FC = () => {
  const at = useBeat();
  const checks = [
    "Pipeline built around your program",
    "AI agent trained on your policies",
    "Follow-up sequences live",
  ];
  return (
    <Stage>
      <AbsoluteFill style={{ flexDirection: "row" }}>
        {/* Everyone else */}
        <div
          style={{
            flex: 1,
            padding: 80,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            filter: "grayscale(1)",
            opacity: 0.42,
          }}
        >
          <p style={{ fontSize: 26, letterSpacing: "0.16em", margin: 0 }}>
            EVERYONE ELSE
          </p>
          <p style={{ fontSize: 46, fontWeight: 800, marginTop: 18 }}>
            Here&apos;s your login.
            <br />
            Good luck.
          </p>
          <p style={{ fontSize: 28, color: COLORS.cloud, marginTop: 20 }}>
            An empty dashboard, a help doc, and a chat widget that answers
            tomorrow.
          </p>
        </div>

        {/* You */}
        <div
          style={{
            flex: 1.15,
            padding: 80,
            background: "rgba(17,160,216,0.10)",
            borderLeft: `3px solid ${COLORS.cta}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Rise delay={20}>
            <p
              style={{
                fontSize: 26,
                letterSpacing: "0.16em",
                margin: 0,
                color: COLORS.cta,
                fontWeight: 800,
              }}
            >
              YOU, ON DAY ONE
            </p>
            <p style={{ fontSize: 54, fontWeight: 900, marginTop: 16 }}>
              A specialist, one-on-one.
            </p>
          </Rise>

          <div style={{ marginTop: 34 }}>
            {checks.map((c, i) => (
              <Rise key={c} delay={at(0.28) + i * 55}>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                    fontSize: 32,
                    marginBottom: 20,
                  }}
                >
                  <span
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 999,
                      background: COLORS.cta,
                      display: "grid",
                      placeItems: "center",
                      fontSize: 24,
                      fontWeight: 900,
                    }}
                  >
                    ✓
                  </span>
                  {c}
                </div>
              </Rise>
            ))}
          </div>

          <Rise delay={at(0.72)}>
            <p
              style={{
                fontSize: 38,
                fontWeight: 900,
                color: COLORS.accent,
                marginTop: 20,
                lineHeight: 1.25,
              }}
            >
              You are not handed a login
              <br />
              and wished good luck.
            </p>
          </Rise>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/* ── S11 — The offer ─────────────────────────────────────────────── */
export const S11Offer: React.FC = () => {
  const at = useBeat();
  const unlocked = [
    "CRM & enrollment pipeline",
    "AI front desk",
    "Tour & open-house booking",
    "Email, SMS & WhatsApp",
    "Automations & workflows",
    "Registration pages",
    "Analytics & reporting",
    "Full training Academy",
    "1-on-1 setup call",
  ];
  const billing = [
    ["Today", "Nothing charged"],
    ["Days 1–7", "Full access"],
    ["Day 8", "Cancel before this"],
  ];

  return (
    <Stage>
      <div style={{ ...center, padding: "0 120px" }}>
        <Rise delay={6}>
          <Headline size={94}>
            <span style={{ color: COLORS.accent }}>7 days.</span> Free.
          </Headline>
          <p style={{ fontSize: 32, color: COLORS.cloud, marginTop: 12 }}>
            Every module unlocked. Not a stripped-down demo.
          </p>
        </Rise>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
            marginTop: 44,
            width: 1160,
          }}
        >
          {unlocked.map((u, i) => (
            <Rise key={u} delay={at(0.18) + i * 12}>
              <div
                style={{
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: 12,
                  padding: "18px 20px",
                  fontSize: 26,
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <span style={{ color: COLORS.cta }}>✓</span>
                {u}
              </div>
            </Rise>
          ))}
        </div>

        <Rise delay={at(0.62)} style={{ marginTop: 46 }}>
          <div style={{ display: "flex", gap: 18 }}>
            {billing.map(([k, v]) => (
              <div
                key={k}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid ${COLORS.cta}55`,
                  borderRadius: 16,
                  padding: "20px 30px",
                  minWidth: 300,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 22,
                    color: COLORS.cta,
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                  }}
                >
                  {k.toUpperCase()}
                </p>
                <p style={{ margin: "8px 0 0", fontSize: 30, fontWeight: 700 }}>
                  {v}
                </p>
              </div>
            ))}
          </div>
        </Rise>
      </div>
    </Stage>
  );
};

/* ── S12 — CTA ───────────────────────────────────────────────────── */
export const S12Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useBeat();
  const pulse = 1 + Math.sin(frame / 7) * 0.02;

  return (
    <Stage>
      <Screenshot src="vsl/dashboard.png" from={1.0} to={1.08} />
      <AbsoluteFill style={{ background: "rgba(4,12,26,0.78)" }} />
      <div style={center}>
        <Rise delay={10}>
          <Headline size={78}>
            Let&apos;s get your
            <br />
            <span style={{ color: COLORS.cta }}>rooms full.</span>
          </Headline>
        </Rise>

        <Rise delay={at(0.30)} style={{ marginTop: 46 }}>
          <div
            style={{
              background: COLORS.cta,
              color: COLORS.white,
              fontSize: 44,
              fontWeight: 900,
              padding: "30px 68px",
              borderRadius: 999,
              transform: `scale(${pulse})`,
              boxShadow: "0 24px 70px rgba(17,160,216,0.5)",
            }}
          >
            Start My 7-Day Free Trial
          </div>
        </Rise>

        <Rise delay={at(0.52)} style={{ marginTop: 28 }}>
          <p style={{ fontSize: 26, color: COLORS.cloud, margin: 0 }}>
            Card required · Cancel any time before day 7
          </p>
          <p
            style={{
              fontSize: 40,
              marginTop: 26,
              color: COLORS.accent,
              fontWeight: 800,
            }}
          >
            ↓ The button is right below this video ↓
          </p>
        </Rise>
      </div>
    </Stage>
  );
};
