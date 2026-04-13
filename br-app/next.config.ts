import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_BASE_URL: process.env.API_BASE_URL || "http://localhost:3001",
    CUSTOMER_API_BASE_URL: process.env.CUSTOMER_API_BASE_URL || "http://localhost:8000/api",
    ORDER_API_BASE_URL: process.env.ORDER_API_BASE_URL || "http://localhost:3000",
  },
};

export default nextConfig;
