/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env:{
    ZEGO_APP_ID:1777083563,
    ZEGO_SERVER_SECRET:"09dcd88ebde423eaf6a6b69742af0f6e"
  },
  images:{
    domains: ["localhost"],
  }
};

module.exports = nextConfig;
