/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        dangerouslyAllowSVG: true,
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
        domains: ["localhost"],
        formats: ["image/webp", "image/avif"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    turbopack: {
        rules: {
            "*.svg": {
                loaders: ["@svgr/webpack"],
                as: "*.js",
            },
        },
    },
};

module.exports = nextConfig;
