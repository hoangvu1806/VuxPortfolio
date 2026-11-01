import { projects } from "./projects";

export const profile = {
    name: "Do Hoang Vu",
    title: "AI Engineer",
    birthYear: 2005,
    email: "dohoangvu.forwork@gmail.com",
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
        telegram: "https://t.me/hoangvunt1806",
        facebook: "https://www.facebook.com/hoangvu.nt1806",
    },
    education: {
        university: "The Saigon International University",
        degree: "Bachelor of Artificial Intelligence",
        graduation: "2027",
        gpa: "3.65/4.00",
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
                category: "AI / ML",
                items: [
                    "Deep Learning",
                    "Multimodal AI",
                    "Retrieval Systems",
                    "Agentic AI",
                    "Model Evaluation",
                ],
            },
            {
                category: "Programming",
                items: [
                    "Python (Agentic AI & ML)",
                    "Rust (High-Performance Systems & Inference)",
                ],
            },
            {
                category: "Frameworks",
                items: [
                    "PyTorch",
                    "Hugging Face",
                    "OpenCV",
                    "LangChain",
                    "Google ADK",
                ],
            },
            {
                category: "Data & Retrieval",
                items: ["Qdrant", "Milvus", "FalkorDB", "PostgreSQL", "Redis"],
            },
            {
                category: "Backend & MLOps",
                items: [
                    "FastAPI",
                    "Node.js",
                    "S3 API",
                    "Docker",
                    "MLflow",
                    "DeepEval",
                    "GitHub Actions",
                ],
            },
        ],
        soft: [
            "Research communication & scientific writing",
            "Experiment design and evaluation",
            "Critical problem solving & analytical thinking",
            "Technical documentation & knowledge sharing",
        ],
        languages: [
            {
                language: "English",
                level: "Working proficiency",
            },
            { language: "Vietnamese", level: "Native" },
        ],
    },
    interests: [
        "Large Language Models",
        "Speech & Audio AI",
        "Model Optimization",
        "Multi-Agent Systems",
        "Voice Transformation",
        "Mathematics & Physics",
        "AI Ethics",
    ],
};
