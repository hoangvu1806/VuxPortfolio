import type { Metadata } from "next";
import ContactPageClient from "./page-client";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Contact Do Hoang Vu | AI Engineer Portfolio",
    description:
        "Contact Do Hoang Vu for AI engineering, generative AI, LLM, NLP, computer vision, MLOps, and collaboration opportunities in English or Vietnamese.",
    path: "/contact",
    keywords: [
        "Contact Do Hoang Vu",
        "Contact Đỗ Hoàng Vũ",
        "Hire AI engineer Vietnam",
        "AI consultant Hoang Vu",
        "Generative AI collaboration Vietnam",
    ],
    images: ["/images/profile/profile.jpg"],
});

export default function ContactPage() {
    return <ContactPageClient />;
}
