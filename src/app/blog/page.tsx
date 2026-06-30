import { BlogService } from "@/lib/blog";
import BlogClient from "./blog-client";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata = buildMetadata({
    title: "AI Blog by Do Hoang Vu | Generative AI, LLMs, NLP, Research",
    description:
        "Read the AI blog of Do Hoang Vu covering generative AI, LLMs, NLP, MLOps, AI agents, mathematics, and research insights with an English-first SEO setup.",
    path: "/blog",
    keywords: [
        "Do Hoang Vu blog",
        "Hoang Vu AI blog",
        "AI blog Vietnam",
        "Generative AI blog",
        "LLM blog",
        "NLP blog",
        "AI engineering articles",
        "Machine learning research blog",
    ],
});

export default async function BlogPage() {
    // Load posts on server-side
    const allPosts = await BlogService.getAllPosts();
    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Do Hoang Vu AI Blog",
        description:
            "Technical writing on AI engineering, generative AI, LLMs, NLP, MLOps, and research.",
        url: "https://hoangvu.id.vn/blog",
        inLanguage: ["en", "vi"],
        author: {
            "@type": "Person",
            name: "Do Hoang Vu",
            url: "https://hoangvu.id.vn/",
        },
    };

    return (
        <>
            <JsonLd data={blogSchema} />
            <BlogClient initialPosts={allPosts} />
        </>
    );
}
