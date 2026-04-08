import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Prevent Turbopack from picking an unrelated lockfile above this folder.
    root: process.cwd(),
  },
};

export default nextConfig;
