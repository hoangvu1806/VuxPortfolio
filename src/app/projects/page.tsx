import type { Metadata } from "next";
import ProjectsPageClient from "./page-client";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllProjects, getProjectUrl } from "@/lib/projects";

export const metadata: Metadata = buildMetadata({
    title: "AI Projects by Do Hoang Vu | Generative AI, LLM, RAG, Computer Vision",
    description:
        "Explore AI projects by Do Hoang Vu across generative AI, LLM systems, RAG pipelines, NLP, MLOps, research, and computer vision.",
    path: "/projects",
    keywords: [
        "Do Hoang Vu projects",
        "Hoang Vu AI projects",
        "Đỗ Hoàng Vũ projects",
        "Generative AI projects Vietnam",
        "LLM portfolio projects",
        "RAG portfolio projects",
        "Computer vision projects",
    ],
});

export default function ProjectsPage() {
    const projects = getAllProjects();
    const itemList = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "AI Projects by Do Hoang Vu",
        url: "https://hoangvu.id.vn/projects",
        hasPart: projects
            .filter((project) => project.slug)
            .map((project, index) => ({
                "@type": "CreativeWork",
                position: index + 1,
                name: project.title,
                url: getProjectUrl(project.slug),
                description: project.description,
            })),
    };

    return (
        <>
            <JsonLd data={itemList} />
            <ProjectsPageClient />
        </>
    );
}
