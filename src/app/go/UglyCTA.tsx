import Link from "next/link";

// Deliberately "ugly" direct-response button — big, green, all-caps, no design-system styles.
// Sends traffic to the /apply2 form (Resend automation) — Calendly comes after the form.
export function UglyCTA({ sub = "(Limited Onboarding Spots Available This Month)" }: { sub?: string }) {
  return (
    <div style={{ textAlign: "center", margin: "28px 0" }}>
      <Link
        href="/apply2"
        style={{
          display: "inline-block",
          backgroundColor: "#1da10b",
          color: "#ffffff",
          fontWeight: 800,
          fontSize: "21px",
          lineHeight: 1.25,
          textDecoration: "none",
          padding: "20px 34px",
          borderRadius: "10px",
          border: "1px solid #157a08",
          borderBottom: "5px solid #116806",
          boxShadow: "0 4px 0 #0e5a05",
          maxWidth: "92%",
        }}
      >
        👉 BOOK A CALL WITH OUR TEAM HERE 👈
        <span style={{ display: "block", fontSize: "14px", fontWeight: 400, marginTop: "6px" }}>
          Free 20-Minute Enrollment Strategy Call
        </span>
      </Link>
      <p style={{ color: "#d80000", fontSize: "14px", fontWeight: 700, marginTop: "10px" }}>{sub}</p>
    </div>
  );
}
