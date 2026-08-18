import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Clean URLs for the standalone landing-page variations served from /public.
  async rewrites() {
    return [
      { source: "/vsl", destination: "/vsl.html" },
      { source: "/deck", destination: "/deck.html" },
      { source: "/squeeze", destination: "/squeeze.html" },
    ];
  },
};

export default nextConfig;
