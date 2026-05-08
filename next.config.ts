import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/patient-education",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/patient-education/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
