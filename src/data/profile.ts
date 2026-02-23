import { projects } from "./projects";

export const profile = {
    name: "Do Hoang Vu",
    title: "AI Engineer",
    email: "dohoangvu.nt2005@gmail.com",
    phone: "+84 835901375",
    location: {
        address: "Hoang Van Thu Street",
        city: "Ho Chi Minh City",
        district: "Phu Nhuan District",
        country: "Vietnam",
    },
    social: {
        github: "https://github.com/hoangvu1806",
        linkedin: "https://linkedin.com/in/hoangvu1806",
        portfolio: "https://hoangvu.id.vn",
    },
    education: {
        university: "The Saigon International University",
        degree: "Bachelor of Artificial Intelligence",
        graduation: "2027",
        gpa: "3.62/4.00",
    },
    tech_stack: ["PyTorch", "LangChain", "FastAPI"],
    certifications: [
        {
            title: "Machine Learning - Deep Learning Foundation",
            issuer: "cole.vn",
        },
        {
            title: "Exploratory Data Analysis for Machine Learning",
            issuer: "IBM - Coursera",
        },
        {
            title: "Machine Learning Specialization",
            issuer: "Stanford - Coursera",
        },
    ],
    projects,
    skills: {
        technical: [
            {
                category: "Programming",
                items: ["Python", "JavaScript", "SQL", "Bash", "C/C++"],
            },
            {
                category: "Libraries/Frameworks",
                items: [
                    "PyTorch",
                    "LangChain",
                    "FastAPI",
                    "Transformers",
                    "MLFlow",
                    "Node.js",
                    "Next.js",
                ],
            },
            {
                category: "AI Expertise",
                items: [
                    "LLMs",
                    "Multi-Agent Systems",
                    "Explainable AI",
                    "Graph-RAG",
                    "MLOps",
                    "Computer Vision",
                ],
            },
            {
                category: "Tools",
                items: ["Git", "Github Actions", "Docker", "Cloudflared", "VScode"],
            },
        ],
        soft: [
            "Analytical & Problem-solving",
            "Effective collaboration",
            "Personable communication",
            "Presentation",
            "Time management",
            "Responsible AI Usage",
        ],
        languages: [
            { language: "English", level: "Intermediate" },
            { language: "Vietnamese", level: "Native" },
        ],
    },
    interests: [
        "Generative AI",
        "LLMs",
        "Multi-Agent Systems",
        "MLOps",
        "Voice Transformation",
        "Mathematics & Physics",
        "AI Ethics",
    ],
};
