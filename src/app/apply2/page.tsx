import type { Metadata } from "next";
import { site } from "@/lib/site";
import { UglyLeadForm } from "./UglyLeadForm";

// "Ugly" direct-response apply page — the form step of the /go funnel.
// Same lead automation as /apply, styled to match /go.
export const metadata: Metadata = {
  title: "Last Step — Book Your Free Strategy Call",
  description:
    "Tell us about your program and pick a time for your free enrollment strategy call.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/apply2" },
};

const redCaps: React.CSSProperties = {
  color: "#d80000",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.3px",
};

export default function Apply2Page() {
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
      <div style={{ maxWidth: "620px", margin: "0 auto", padding: "26px 16px 40px" }}>
        {/* Logo */}
        <p style={{ textAlign: "center", margin: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/educare-leads-logo.png" alt="EduCare Leads" width={170} style={{ display: "inline-block" }} />
        </p>

        <p style={{ ...redCaps, fontSize: "16px", textAlign: "center", marginTop: "22px" }}>
          You&apos;re Almost There — One Quick Step
        </p>

        <h1
          style={{
            fontSize: "29px",
            lineHeight: 1.2,
            fontWeight: 900,
            textAlign: "center",
            textTransform: "uppercase",
            margin: "10px 0 0",
          }}
        >
          Fill This Out &amp;{" "}
          <span style={{ backgroundColor: "#ffff00", padding: "0 3px" }}>
            Pick Your Call Time
          </span>{" "}
          On The Next Page
        </h1>

        <p style={{ textAlign: "center", marginTop: "14px" }}>
          Takes 60 seconds. On your free 20-minute call we&apos;ll look at your
          market and capacity, and show you:
        </p>
        <div style={{ maxWidth: "480px", margin: "0 auto", textAlign: "left" }}>
          <p style={{ margin: "4px 0" }}>✅ How many families your area can realistically produce</p>
          <p style={{ margin: "4px 0" }}>✅ What it costs to book each one (avg. <b>$14.10</b>)</p>
          <p style={{ margin: "4px 0" }}>✅ Exactly what it takes to fill every spot in <b>90 days</b></p>
        </div>

        <p style={{ textAlign: "center", fontSize: "26px", margin: "14px 0 0" }}>⬇️ ⬇️ ⬇️</p>

        {/* Form box */}
        <div
          style={{
            border: "2px dashed #1da10b",
            borderRadius: "8px",
            backgroundColor: "#fafff7",
            padding: "20px 18px",
            marginTop: "16px",
          }}
        >
          <UglyLeadForm />
        </div>

        <p style={{ ...redCaps, fontSize: "14px", textAlign: "center", marginTop: "14px" }}>
          (Limited Onboarding Spots Available This Month — For Programs Doing{" "}
          {site.minMonthlyRevenue}+ Only)
        </p>

        {/* Footer / disclaimers */}
        <div style={{ marginTop: "40px", color: "#888888", fontSize: "12px", textAlign: "center" }}>
          <p>
            {site.name} · {site.email} · {site.phone}
          </p>
          <p>
            This site is not a part of the Facebook™ website or Facebook™ Inc.
            Additionally, this site is NOT endorsed by Facebook™ in any way.
            FACEBOOK™ is a trademark of META PLATFORMS, Inc.
          </p>
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
