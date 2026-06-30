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
        {
            title: "Machine Learning Specialization",
            issuer: "Stanford Online - Coursera",
        },
    ],
    projects,
    skills: {
        technical: [
            {
                category: "Programming",
                items: [
                    "Python",
                    "LLM pipelines",
                    "RAG systems",
                    "Multi-agent systems",
                    "Data ingestion pipelines",
                    "Embedding pipelines",
                ],
            },
            {
                category: "Vector & Graph Databases",
                items: [
                    "Qdrant",
                    "Milvus",
                    "FalkorDB",
                    "Redis caching",
                ],
            },
            {
                category: "LLM Frameworks",
                items: [
                    "LangChain",
                    "LangGraph",
                    "Google ADK",
                ],
            },
            {
                category: "Backend",
                items: ["FastAPI", "Node.js"],
            },
            {
                category: "MLOps / LMOps",
                items: [
                    "MLflow",
                    "DeepEval",
                    "Docker",
                    "GitHub Actions",
                ],
            },
        ],
        soft: [
            "Research communication & scientific writing",
            "Experiment design and evaluation",
            "Collaborative coding & version control (Git workflow)",
            "Critical problem solving & analytical thinking",
            "Technical documentation & knowledge sharing",
        ],
        languages: [
            {
                language: "English",
                level: "Working proficiency",
                proficiency: 72,
            },
            { language: "Vietnamese", level: "Native", proficiency: 100 },
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
