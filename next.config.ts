import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "totpi0dl7f.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com", //TODO for while
      },
      {
        protocol: "https",
        hostname: "c14.patreon.com", //TODO for while
      },
    ],
  },
};

export default nextConfig;
