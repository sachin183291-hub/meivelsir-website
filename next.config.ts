import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-expect-error - aggressively hide dev indicators
  devIndicators: false,
};

export default nextConfig;
