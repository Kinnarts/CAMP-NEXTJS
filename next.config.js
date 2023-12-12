/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "s3.tebi.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
