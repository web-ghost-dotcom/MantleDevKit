import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@mantle/ai", "@mantle/compiler", "@mantle/storage", "@mantle/ui"],
};

export default nextConfig;
