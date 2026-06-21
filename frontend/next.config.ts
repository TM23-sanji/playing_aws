import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  async rewrites() {
    const proxyUrl = process.env.API_PROXY_URL || "http://localhost:8000";
    return [
      {
        source: "/api/:path*",
        destination: `${proxyUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
