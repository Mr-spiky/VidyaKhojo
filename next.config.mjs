/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
  },
  experimental: {
    // Output standalone for better Vercel compatibility
    outputFileTracingIncludes: {
      "/api/**": ["./src/generated/prisma/**/*"],
    },
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
  },
};

export default nextConfig;
