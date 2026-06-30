import type { MetadataRoute } from "next";
import { BlogService } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: absoluteUrl("/"),
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: absoluteUrl("/projects"),
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.95,
        },
        {
            url: absoluteUrl("/blog"),
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.92,
        },
        {
            url: absoluteUrl("/about"),
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.82,
        },
        {
            url: absoluteUrl("/resume"),
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.78,
        },
        {
            url: absoluteUrl("/contact"),
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.74,
        },
    ];

    const projectPages: MetadataRoute.Sitemap = getAllProjects()
        .filter((project) => project.slug)
        .map((project) => ({
            url: absoluteUrl(`/projects/${project.slug}`),
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: project.featured ? 0.9 : 0.8,
        }));

    const blogPosts = await BlogService.getAllPosts();
    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: absoluteUrl(`/blog/${post.slug}`),
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.88,
    }));

    return [...staticPages, ...projectPages, ...blogPages];
}
