import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    poweredByHeader: false,
    experimental: {
        serverMinification: true,
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    async rewrites() {
        return [
            {
                source: "/chatbot/:path*",
                destination: "http://127.0.0.1:8080/chatbot/:path*",
            },
        ];
    },
    images: {
        dangerouslyAllowSVG: true,
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.qwiklabs.com",
            },
        ],
        formats: ["image/webp", "image/avif"],
    },
    async redirects() {
        return [
            {
                source: "/resume.pdf",
                destination: "/DOHOANGVU_CV.pdf",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
