/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env:{
    NEXT_PUBLIC_ZEGO_APP_ID:593192923,
    NEXT_PUBLIC_ZEGO_SERVER_ID:"bae72b15f64618d5f437337896c21d80"
  },
  images:{
    domains: ["localhost"]
  }
};

module.exports = nextConfig;
