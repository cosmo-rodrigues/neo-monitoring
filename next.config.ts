import type { NextConfig } from "next";

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ["antd", "@ant-design/icons", "@ant-design/cssinjs"],
}

export default nextConfig;
