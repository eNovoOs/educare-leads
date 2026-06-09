import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo_Black } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.educareleads.com"),
  title: {
    default: "Educare Leads — We Fill Childcare & Education Programs in 90 Days",
    template: "%s | Educare Leads",
  },
  description:
    "Educare Leads installs a done-for-you enrollment system — ads, AI booking, and CRM — that fills your daycare, school, or camp calendar with qualified families within 90 days.",
  keywords: [
    "daycare marketing",
    "childcare enrollment",
    "private school admissions marketing",
    "summer camp enrollment",
    "preschool lead generation",
    "childcare marketing agency",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Educare Leads — Fill Your Program to Capacity in 90 Days",
    description:
      "A done-for-you enrollment system for daycares, schools & camps — ads, AI booking & CRM installed for you. A full calendar of qualified families in 90 days.",
    url: "https://www.educareleads.com",
    siteName: "Educare Leads",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Educare Leads — fill your program to capacity in 90 days",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Educare Leads — Fill Your Program to Capacity in 90 Days",
    description:
      "A done-for-you enrollment system for daycares, schools & camps. A full calendar of qualified families in 90 days.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Microsoft Clarity */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "x4cj1ovak4");`}
        </Script>
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1534633631359400');
fbq('track', 'PageView');
window.addEventListener('message',function(e){if(e.data&&e.data.event==='calendly.event_scheduled'&&window.fbq){fbq('track','Schedule');}});`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: "none" }} alt=""
            src="https://www.facebook.com/tr?id=1534633631359400&ev=PageView&noscript=1" />
        </noscript>

        {children}
        {/* Calendly popup widget — loaded globally for all "Book a Call" CTAs */}
        <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
