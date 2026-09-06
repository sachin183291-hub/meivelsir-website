import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["10.191.248.237", "localhost", "127.0.0.1", "*.local"],
};

export default nextConfig;
