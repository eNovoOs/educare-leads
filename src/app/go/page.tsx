import type { Metadata } from "next";
import { site, results, faqs, steps, systemInstall, smsThread, costReceipt, comparison } from "@/lib/site";
import { UglyCTA } from "./UglyCTA";

// Ad-traffic landing page. Intentionally "ugly" direct-response style —
// system fonts, centered column, inline styles, no design-system components.
export const metadata: Metadata = {
  title: "EduCare Leads — Here's The Proof",
  description:
    "We fill daycares, preschools, private schools & camps with qualified families. $14.10 avg. cost per booked family. See the proof.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/go" },
};

const yellow: React.CSSProperties = { backgroundColor: "#ffff00", padding: "0 3px" };
const redCaps: React.CSSProperties = {
  color: "#d80000",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.3px",
};
const box: React.CSSProperties = {
  border: "1px solid #c9c9c9",
  borderRadius: "4px",
  backgroundColor: "#ffffff",
  boxShadow: "1px 2px 6px rgba(0,0,0,0.18)",
  padding: "16px 18px",
  margin: "14px auto",
  maxWidth: "560px",
  textAlign: "left",
};

function MetricLine({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ ...redCaps, fontSize: "19px", textAlign: "center", margin: "34px 0 4px" }}>
      {children} 👇
    </p>
  );
}

export default function GoPage() {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        color: "#111111",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "17px",
        lineHeight: 1.55,
        width: "100%",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "26px 16px 40px" }}>
        {/* Logo */}
        <p style={{ textAlign: "center", margin: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/educare-leads-logo.png" alt="EduCare Leads" width={170} style={{ display: "inline-block" }} />
        </p>

        {/* Eyebrow */}
        <p style={{ ...redCaps, fontSize: "16px", textAlign: "center", marginTop: "22px" }}>
          Attention: Daycare, Preschool, Private School &amp; Camp Owners Doing {site.minMonthlyRevenue}+
        </p>

        {/* Headline */}
        <h1
          style={{
            fontSize: "32px",
            lineHeight: 1.2,
            fontWeight: 900,
            textAlign: "center",
            textTransform: "uppercase",
            margin: "10px 0 0",
          }}
        >
          We Book Qualified Families Onto Your Calendar{" "}
          <span style={yellow}>Until Every Spot Is Full</span> — Done Entirely For You
        </h1>

        <p style={{ textAlign: "center", fontSize: "19px", marginTop: "16px" }}>
          <b>$14.10</b> average cost per booked family. <b>37+ programs filled</b> across the U.S.
          A full calendar within <b>90 days</b>.{" "}
          <span style={{ color: "#0000ee", textDecoration: "underline", fontWeight: 700 }}>
            Scroll down for the proof.
          </span>
        </p>

        <UglyCTA />

        <p style={{ textAlign: "center", fontSize: "26px", margin: "6px 0" }}>⬇️ ⬇️ ⬇️</p>

        {/* PROOF STACK */}
        <h2
          style={{
            fontSize: "27px",
            fontWeight: 900,
            textTransform: "uppercase",
            textAlign: "center",
            margin: "26px 0 4px",
          }}
        >
          Here&apos;s The Proof
        </h2>
        <p style={{ textAlign: "center", margin: "0 0 6px" }}>
          We do this every day for daycares, preschools, private schools and camps.
          Real owners. Real numbers. Keep scrolling 👇
        </p>

        {/* Proof 1 — Google review style */}
        <MetricLine>{results[0].metric}</MetricLine>
        <div style={box}>
          <p style={{ margin: 0 }}>
            <b>{results[0].name}</b>{" "}
            <span style={{ color: "#fbbc05", fontSize: "18px" }}>★★★★★</span>
          </p>
          <p style={{ color: "#666", fontSize: "13px", margin: "2px 0 8px" }}>{results[0].role}</p>
          <p style={{ margin: 0 }}>&ldquo;{results[0].quote}&rdquo;</p>
        </div>

        {/* Proof 2 — text message screenshot style */}
        <MetricLine>{results[1].metric}</MetricLine>
        <div style={{ ...box, backgroundColor: "#f6f6f6" }}>
          <p style={{ color: "#666", fontSize: "12px", textAlign: "center", margin: "0 0 10px" }}>
            Text Message · Today 9:41 AM
          </p>
          <div
            style={{
              backgroundColor: "#e5e5ea",
              borderRadius: "16px",
              padding: "10px 14px",
              maxWidth: "85%",
              margin: "0 auto 0 0",
            }}
          >
            &ldquo;{results[1].quote}&rdquo;
          </div>
          <p style={{ color: "#666", fontSize: "13px", margin: "8px 0 0" }}>
            — {results[1].name}, {results[1].role}
          </p>
        </div>

        {/* Proof 3 — Facebook comment style */}
        <MetricLine>{results[2].metric}</MetricLine>
        <div style={box}>
          <p style={{ margin: 0 }}>
            <b style={{ color: "#385898" }}>{results[2].name}</b>{" "}
            <span style={{ color: "#666", fontSize: "13px" }}>· {results[2].role}</span>
          </p>
          <p style={{ margin: "6px 0" }}>&ldquo;{results[2].quote}&rdquo;</p>
          <p style={{ color: "#385898", fontSize: "13px", margin: 0 }}>
            👍 Like &nbsp; 💬 Reply &nbsp; <span style={{ color: "#666" }}>14w</span>
          </p>
        </div>

        {/* Proof 4 — plain quote */}
        <MetricLine>{results[3].metric}</MetricLine>
        <div style={{ ...box, borderLeft: "5px solid #1da10b" }}>
          <p style={{ margin: 0 }}>&ldquo;{results[3].quote}&rdquo;</p>
          <p style={{ margin: "8px 0 0" }}>
            <b>{results[3].name}</b>{" "}
            <span style={{ color: "#666", fontSize: "13px" }}>— {results[3].role}</span>
          </p>
        </div>

        <UglyCTA sub="(We Only Take On A Handful Of New Programs Each Month)" />

        <hr style={{ border: "none", borderTop: "2px dashed #bbb", margin: "30px 0" }} />

        {/* PAIN / LETTER */}
        <h2 style={{ fontSize: "25px", fontWeight: 900, textAlign: "center", textTransform: "uppercase" }}>
          Let&apos;s Be Honest About Why Your Rooms Aren&apos;t Full…
        </h2>
        <p>Dear Owner / Director,</p>
        <p>
          If you&apos;re reading this, you probably already know the problem. It&apos;s not your
          program. It&apos;s not your staff. It&apos;s not your building.
        </p>
        <p>
          <b>It&apos;s that the families who would happily enroll tomorrow have no idea you exist</b>{" "}
          — and the few that do inquire go cold before anyone calls them back.
        </p>
        <p>Right now you&apos;re probably dealing with some version of this:</p>
        <p style={{ margin: "4px 0" }}>❌ Praying the phone rings</p>
        <p style={{ margin: "4px 0" }}>❌ Leads going cold because nobody followed up in time</p>
        <p style={{ margin: "4px 0" }}>❌ Relying on word-of-mouth and &ldquo;Google luck&rdquo;</p>
        <p style={{ margin: "4px 0" }}>❌ Empty rooms quietly bleeding revenue every single month</p>
        <p style={{ marginTop: "18px" }}>
          And here&apos;s the math nobody likes to look at: every empty spot is worth{" "}
          <span style={yellow}>
            <b>{costReceipt.perSpot} per month</b>
          </span>
          . Four empty spots? That&apos;s around <b>{costReceipt.totalMonth} a month</b> —{" "}
          <span style={{ ...redCaps, textTransform: "none" }}>{costReceipt.totalYear} a year</span> —
          walking out the door while you wait for referrals.
        </p>

        <hr style={{ border: "none", borderTop: "2px dashed #bbb", margin: "30px 0" }} />

        {/* WHAT WE DO */}
        <h2 style={{ fontSize: "25px", fontWeight: 900, textAlign: "center", textTransform: "uppercase" }}>
          Here&apos;s Exactly What We Do (In Plain English)
        </h2>
        {steps.map((s, i) => (
          <p key={s.n}>
            <b>
              STEP {i + 1}: {s.title}.
            </b>{" "}
            {s.body}
          </p>
        ))}

        <p style={{ textAlign: "center", fontWeight: 700, marginTop: "20px" }}>
          Here&apos;s what that AI follow-up actually looks like (real conversation flow) 👇
        </p>
        <div style={{ ...box, maxWidth: "420px", backgroundColor: "#f6f6f6" }}>
          {smsThread.map((m, i) => (
            <div
              key={i}
              style={
                m.from === "parent"
                  ? {
                      backgroundColor: "#e5e5ea",
                      borderRadius: "16px",
                      padding: "8px 13px",
                      maxWidth: "82%",
                      margin: "6px auto 6px 0",
                    }
                  : {
                      backgroundColor: "#34c759",
                      color: "#fff",
                      borderRadius: "16px",
                      padding: "8px 13px",
                      maxWidth: "82%",
                      margin: "6px 0 6px auto",
                    }
              }
            >
              {m.text}
            </div>
          ))}
          <p style={{ color: "#666", fontSize: "12px", textAlign: "center", margin: "8px 0 0" }}>
            ☝️ Our AI replies in 7 seconds — nights, weekends, holidays.
          </p>
        </div>

        {/* WHAT YOU GET */}
        <p style={{ fontWeight: 700, marginTop: "26px" }}>
          When we say <span style={yellow}>done-for-you</span>, we mean ALL of it gets installed and
          run for you:
        </p>
        {systemInstall.items.map((it) => (
          <p key={it.name} style={{ margin: "6px 0" }}>
            ✅ <b>{it.name}</b> — {it.body}
          </p>
        ))}
        <p style={{ fontWeight: 700 }}>{systemInstall.closer}</p>

        <UglyCTA />

        <hr style={{ border: "none", borderTop: "2px dashed #bbb", margin: "30px 0" }} />

        {/* COMPARISON */}
        <h2 style={{ fontSize: "25px", fontWeight: 900, textAlign: "center", textTransform: "uppercase" }}>
          &ldquo;But I&apos;ve Tried An Agency Before…&rdquo;
        </h2>
        <p>
          We hear this on almost every call. Here&apos;s the difference between what you bought last
          time and what we install:
        </p>
        <div style={{ ...box, padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #c9c9c9", padding: "8px", backgroundColor: "#eee" }}>
                  {comparison.them.label}
                </th>
                <th style={{ border: "1px solid #c9c9c9", padding: "8px", backgroundColor: "#fffbcc" }}>
                  {comparison.us.label}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.them.points.map((p, i) => (
                <tr key={p}>
                  <td style={{ border: "1px solid #c9c9c9", padding: "8px" }}>❌ {p}</td>
                  <td style={{ border: "1px solid #c9c9c9", padding: "8px", backgroundColor: "#fffef0" }}>
                    ✅ {comparison.us.points[i]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr style={{ border: "none", borderTop: "2px dashed #bbb", margin: "30px 0" }} />

        {/* FAQ */}
        <h2 style={{ fontSize: "25px", fontWeight: 900, textAlign: "center", textTransform: "uppercase" }}>
          Common Questions
        </h2>
        {faqs.map((f) => (
          <div key={f.q} style={{ margin: "16px 0" }}>
            <p style={{ fontWeight: 800, margin: 0 }}>Q: {f.q}</p>
            <p style={{ margin: "4px 0 0" }}>A: {f.a}</p>
          </div>
        ))}

        <hr style={{ border: "none", borderTop: "2px dashed #bbb", margin: "30px 0" }} />

        {/* FINAL CTA */}
        <h2 style={{ fontSize: "27px", fontWeight: 900, textAlign: "center", textTransform: "uppercase" }}>
          Ready To Stop Paying For <span style={yellow}>Empty Rooms?</span>
        </h2>
        <p style={{ textAlign: "center" }}>
          Book a free 20-minute call. We&apos;ll look at your market, your capacity, and tell you
          exactly how many families your area can produce — and what it takes to fill every spot in
          90 days. If we can&apos;t help, we&apos;ll tell you that too.
        </p>
        <UglyCTA sub={`(For Programs Doing ${site.minMonthlyRevenue}+ In Revenue Only)`} />

        {/* Footer / disclaimers */}
        <div style={{ marginTop: "44px", color: "#888", fontSize: "12px", textAlign: "center" }}>
          <p>
            {site.name} · {site.email} · {site.phone}
          </p>
          <p>
            This site is not a part of the Facebook™ website or Facebook™ Inc. Additionally, this
            site is NOT endorsed by Facebook™ in any way. FACEBOOK™ is a trademark of META
            PLATFORMS, Inc.
          </p>
          <p>
            Results shown are from real client campaigns and are not a guarantee of your results.
            Your results will vary based on your market, capacity, pricing, and follow-through.
          </p>
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
