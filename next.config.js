/** @type {import('next').NextConfig} */
const nextConfig = {
  future: { webpack5: true },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
