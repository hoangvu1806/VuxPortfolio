import { JsonLd } from "@/components/seo/json-ld";
import HomePageClient from "./home-page-client";
import {
    buildMetadata,
    buildPersonSchema,
    buildWebsiteSchema,
} from "@/lib/seo";

export const metadata = buildMetadata({
    title: "Do Hoang Vu | AI Engineer, Generative AI, LLM, NLP, Computer Vision",
    description:
        "Do Hoang Vu is an AI Engineer from Vietnam specializing in generative AI, large language models, NLP, computer vision, RAG, MLOps, and AI agent systems.",
    path: "/",
    keywords: [
        "Do Hoang Vu portfolio",
        "Hoang Vu AI engineer",
        "Đỗ Hoàng Vũ portfolio",
        "Hoàng Vũ AI engineer",
        "Vu Hoang AI",
        "AI engineer portfolio Vietnam",
        "LLM engineer Vietnam",
        "Generative AI portfolio",
        "NLP and computer vision engineer",
    ],
    images: ["/images/profile/profile.jpg"],
    type: "profile",
});

export default function HomePage() {
    return (
        <>
            <JsonLd data={[buildPersonSchema(), buildWebsiteSchema()]} />
            <HomePageClient />
        </>
    );
}
