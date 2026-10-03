import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: {
    unoptimized: true,    // next/image optimization requires a server; static export uses raw files
  },
};

export default nextConfig;
