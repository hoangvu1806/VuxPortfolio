import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/about", "/blog", "/projects", "/resume", "/contact"],
                disallow: ["/api/", "/projects/detail", "/_next/", "/private/"],
            },
            {
                userAgent: "Googlebot",
                allow: "/",
                disallow: ["/api/", "/projects/detail"],
            },
            {
                userAgent: "Bingbot",
                allow: "/",
                disallow: ["/api/", "/projects/detail"],
            },
            {
                userAgent: "GPTBot",
                allow: ["/", "/about", "/blog", "/projects"],
                disallow: ["/api/", "/contact"],
            },
            {
                userAgent: "ChatGPT-User",
                allow: ["/", "/about", "/blog", "/projects", "/resume"],
                disallow: ["/api/"],
            },
            {
                userAgent: "ClaudeBot",
                allow: ["/", "/about", "/blog", "/projects"],
                disallow: ["/api/", "/contact"],
            },
            {
                userAgent: "PerplexityBot",
                allow: ["/", "/about", "/blog", "/projects"],
                disallow: ["/api/"],
            },
            {
                userAgent: "Google-Extended",
                allow: ["/", "/about", "/blog", "/projects"],
                disallow: ["/api/", "/contact"],
            },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}
