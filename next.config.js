/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL:process.env.BASE_URL,
    MONGODB_URL:process.env.MONGODB_URL,
    NEXT_SECRET: process.env.NEXT_SECRET,
    CLOUD_UPDATE_PRESET:process.env.CLOUD_UPDATE_PRESET,
    CLOUD_NAME:process.env.CLOUD_NAME,
    CLOUD_API:process.env.CLOUD_API
  },
  images: {
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig
