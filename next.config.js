/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    runtime: "experimental-edge",
  },
};

module.exports = nextConfig;
