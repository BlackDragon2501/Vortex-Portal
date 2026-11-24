import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export estatico: el portal es 100% client-side, se sirve desde
  // Cloudflare Workers Assets (out/) y en Vercel como sitio estatico.
  output: "export",
  images: { unoptimized: true },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
