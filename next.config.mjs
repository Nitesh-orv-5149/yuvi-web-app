import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  devIndicators: false,
};

export default withPWA({
  ...nextConfig,
  dest: "public",
  register: true,
  skipWaiting: true,
});