import { BlogService } from '@/lib/blog';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        // Get all URLs for sitemap using our BlogService
        const urls = await BlogService.getSitemapUrls();
        
        // Convert to Next.js sitemap format
        return urls.map(url => ({
            url: url.url,
            lastModified: new Date(url.lastModified),
            changeFrequency: url.changeFrequency,
            priority: url.priority,
        }));
    } catch (error) {
        console.error('Error generating sitemap:', error);
        
        // Fallback sitemap with static pages only
        const baseUrl = 'https://hoangvu.id.vn';
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 1,
            },
            {
                url: `${baseUrl}/about`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.8,
            },
            {
                url: `${baseUrl}/projects`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.9,
            },
            {
                url: `${baseUrl}/blog`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 0.9,
            },
            {
                url: `${baseUrl}/contact`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
            },
            {
                url: `${baseUrl}/resume`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.6,
            },
        ];
    }
}