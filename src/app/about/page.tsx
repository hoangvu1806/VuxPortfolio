import type { Metadata } from "next";
import AboutPageClient from "./page-client";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "About Do Hoang Vu | AI Engineer in Vietnam",
    description:
        "Learn about Do Hoang Vu, an AI Engineer in Vietnam focused on generative AI, LLM systems, natural language processing, computer vision, and research-driven engineering.",
    path: "/about",
    keywords: [
        "About Do Hoang Vu",
        "About Đỗ Hoàng Vũ",
        "Hoang Vu biography",
        "AI engineer Vietnam profile",
        "Generative AI engineer background",
    ],
    images: ["/images/profile/profile.jpg"],
});

export default function AboutPage() {
    return <AboutPageClient />;
}
