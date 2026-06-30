import { absoluteUrl, siteUrl } from "@/lib/seo";

/**
 * Build an absolute URL using the configured site URL.
 */
export async function getCurrentUrl(path?: string): Promise<string> {
    return absoluteUrl(path || "/");
}

export async function getBlogPostUrl(slug: string): Promise<string> {
    return getCurrentUrl(`/blog/${slug}`);
}

export function getSiteUrl(): string {
    return siteUrl;
}
