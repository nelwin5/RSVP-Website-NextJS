import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  eslint: {
    // Ignore specific ESLint rules during build
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/:subdomain',
        destination: '/subdomain/:subdomain',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
