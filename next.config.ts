import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: "onboarding.educareleads.com" }],
          destination: "/onboarding",
        },
        {
          source: "/create",
          has: [{ type: "host", value: "onboarding.educareleads.com" }],
          destination: "/onboarding/create",
        },
      ],
      // Clean URLs for the standalone landing-page variations served from /public.
      afterFiles: [
        { source: "/vsl", destination: "/vsl.html" },
        { source: "/deck", destination: "/deck.html" },
        { source: "/squeeze", destination: "/squeeze.html" },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
