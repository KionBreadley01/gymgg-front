import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
  dest: 'public',
  register: false,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

const nextConfig: NextConfig = {
  reactStrictMode: true
};

export default withPWA(nextConfig)
