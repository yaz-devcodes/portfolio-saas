import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      { source: "/how-to", destination: "/get-started", permanent: true },
      { source: "/how-to/", destination: "/get-started", permanent: true },
    ];
  },
};

export default nextConfig;
