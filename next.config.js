const { setupDevPlatform } = require("@cloudflare/next-on-pages/next-dev");
const { withContentlayer } = require("next-contentlayer2");

import("./env.mjs");

// Setup the Cloudflare dev platform if in development mode
if (process.env.NODE_ENV === 'development') {
  setupDevPlatform().then(() => {
    console.log('Cloudflare dev platform setup complete');
  }).catch((err) => {
    console.error('Failed to set up Cloudflare dev platform', err);
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
};

module.exports = withContentlayer(nextConfig);
