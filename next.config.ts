import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.qwiklabs.com",
            },
        ],
    },
};

export default nextConfig;
