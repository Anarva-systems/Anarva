import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // <--- ADD THIS LINE
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
