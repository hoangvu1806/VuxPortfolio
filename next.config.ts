import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    poweredByHeader: false,
    env: {
        PORT: process.env.NODE_ENV === "production" ? "8000" : "8001",
    },
    experimental: {
        serverMinification: true,
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    output: "standalone",
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
