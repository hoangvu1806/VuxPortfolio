import { headers } from "next/headers";

/**
 * Get the current URL from Next.js headers
 * Works in both development and production environments
 */
export async function getCurrentUrl(path?: string): Promise<string> {
    const headersList = await headers();

    // Get host from headers
    const host = headersList.get('host') || 'localhost:3000';

    // Determine protocol
    // In production, x-forwarded-proto is usually set by the reverse proxy
    // In development, we default to http
    const forwardedProto = headersList.get('x-forwarded-proto');
    const protocol = forwardedProto || (host.includes('localhost') ? 'http' : 'https');

    // Construct base URL
    const baseUrl = `${protocol}://${host}`;

    // Add path if provided
    if (path) {
        return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
    }

    return baseUrl;
}

export async function getBlogPostUrl(slug: string): Promise<string> {
    return getCurrentUrl(`/blog/${slug}`);
}

export function getSiteUrl(): string {
    return process.env.NEXT_PUBLIC_SITE_URL || 'https://hoangvu.id.vn';
}