import type { NextConfig } from "next";

// Static export for GitHub Pages (served at /portfolio)
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/portfolio",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
