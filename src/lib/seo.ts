import type { Metadata } from "next";

export const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://hoangvu.id.vn";

export const siteName = "Do Hoang Vu";
export const siteTitle = "Do Hoang Vu | AI Engineer Portfolio";
export const siteDescription =
    "Official portfolio of Do Hoang Vu, AI Engineer building generative AI, LLM, NLP, computer vision, MLOps, and AI agent systems.";
export const defaultOgImage = `${siteUrl}/images/ui/logo.png`;

export const brandKeywords = [
    "Do Hoang Vu",
    "Đỗ Hoàng Vũ",
    "Hoang Vu Do",
    "Vu Hoang Do",
    "Hoang Vu",
    "Hoàng Vũ",
    "Vu Hoang",
    "Vũ Hoàng",
    "Hoang Vu AI",
    "Hoàng Vũ AI",
    "Vu Hoang AI",
    "Vũ Hoàng AI",
    "Do Hoang Vu AI",
    "Đỗ Hoàng Vũ AI",
    "AI Engineer Hoang Vu",
    "AI engineer Vietnam",
    "Vietnam AI engineer",
    "AI engineer Vietnam",
];

export const coreKeywords = [
    "AI Engineer",
    "Artificial Intelligence Engineer",
    "Generative AI",
    "LLM Engineer",
    "Machine Learning Engineer",
    "NLP Engineer",
    "Computer Vision Engineer",
    "MLOps Engineer",
    "AI Agent Developer",
    "RAG Engineer",
    "Graph RAG",
    "Prompt Engineering",
    "Deep Learning",
    "Next.js portfolio",
];

export function absoluteUrl(path = "/"): string {
    if (/^https?:\/\//i.test(path)) return path;
    return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetadataInput = {
    title: string;
    description: string;
    path?: string;
    keywords?: string[];
    images?: string[];
    type?: "website" | "article" | "profile";
    noIndex?: boolean;
};

export function buildMetadata({
    title,
    description,
    path = "/",
    keywords = [],
    images,
    type = "website",
    noIndex = false,
}: PageMetadataInput): Metadata {
    const canonical = absoluteUrl(path);
    const ogImages =
        images?.map((image) => ({
            url: absoluteUrl(image),
            width: 1200,
            height: 630,
            alt: title,
        })) || [
            {
                url: defaultOgImage,
                width: 1200,
                height: 630,
                alt: siteTitle,
            },
        ];

    return {
        title,
        description,
        keywords: [...brandKeywords, ...coreKeywords, ...keywords],
        alternates: {
            canonical,
        },
        openGraph: {
            type,
            title,
            description,
            url: canonical,
            siteName,
            images: ogImages,
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImages.map((image) => image.url),
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            },
        },
    };
}

export function buildPersonSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: "Do Hoang Vu",
        alternateName: [
            "Đỗ Hoàng Vũ",
            "Hoang Vu",
            "Hoàng Vũ",
            "Vũ Hoàng",
            "Vu Hoang",
            "Hoang Vu Do",
            "Do Hoang Vu AI",
            "Đỗ Hoàng Vũ AI",
            "Hoàng Vũ AI",
        ],
        url: absoluteUrl("/"),
        image: absoluteUrl("/images/profile/profile.jpg"),
        jobTitle: "AI Engineer",
        description: siteDescription,
        knowsAbout: [
            "Generative AI",
            "Large Language Models",
            "Natural Language Processing",
            "Computer Vision",
            "RAG",
            "Graph RAG",
            "MLOps",
            "Multi-Agent Systems",
            "Machine Learning",
            "Deep Learning",
        ],
        sameAs: [
            "https://github.com/hoangvu1806",
            "https://linkedin.com/in/hoangvu1806",
            absoluteUrl("/"),
        ],
        worksFor: {
            "@type": "Organization",
            name: "Independent AI Engineer",
        },
        alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "The Saigon International University",
        },
        address: {
            "@type": "PostalAddress",
            addressLocality: "Ho Chi Minh City",
            addressCountry: "VN",
        },
    };
}

export function buildWebsiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        name: siteTitle,
        alternateName: ["Hoang Vu AI", "Do Hoang Vu AI", "Đỗ Hoàng Vũ AI"],
        url: absoluteUrl("/"),
        description: siteDescription,
        inLanguage: ["en", "vi"],
        publisher: {
            "@id": absoluteUrl("/#person"),
        },
    };
}
