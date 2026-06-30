import type { Metadata } from "next";
import ResumePageClient from "./page-client";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Do Hoang Vu Resume | AI Engineer CV",
    description:
        "Read the resume of Do Hoang Vu, AI Engineer, including experience in generative AI, large language models, machine learning, NLP, computer vision, and MLOps.",
    path: "/resume",
    keywords: [
        "Do Hoang Vu resume",
        "Đỗ Hoàng Vũ CV",
        "Hoang Vu AI engineer resume",
        "AI Engineer CV Vietnam",
        "LLM engineer resume",
    ],
});

export default function ResumePage() {
    return <ResumePageClient />;
}
