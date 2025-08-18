import { BlogService } from "@/lib/blog";
import BlogClient from "./blog-client";

export default async function BlogPage() {
    // Load posts on server-side
    const allPosts = await BlogService.getAllPosts();

    return <BlogClient initialPosts={allPosts} />;
}