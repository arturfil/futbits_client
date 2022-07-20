/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_JWT_TOKEN: process.env.REACT_APP_JWT_TOKEN
  }
}

module.exports = nextConfig
