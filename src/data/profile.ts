import { ImagePaths } from "@/utils/image-paths";

// Project slug mapping for consistent paths
const projectSlugs = {
    "ENTERPRISE AI CHATBOT PLATFORM": "enterprise-ai-chatbot-platform",
    "INTERNAL DOCUMENT INTELLIGENCE SYSTEM":
        "internal-document-intelligence-system",
    "Deeplearning-Practice": "deeplearning-practice",
    EzClip: "ezclip",
    "Decision Tree Visualization": "decision-tree-visualization",
    "SciHorizone": "scihorizone",
    "PlugAgentX": "plugagentx"
};

// Helper function to get project image path 
const getProjectImage = (slug: string, type: "hero" | "thumbnail" = "hero") => {

    if (
        slug === "enterprise-ai-chatbot-platform" ||
        slug === "internal-document-intelligence-system"
    ) {
        return `/images/projects/${slug}/${type}.svg`;
    }

    return `/images/projects/${slug}/${type}.jpg`;
};

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
    projects: [
        // {
        //     title: "PERSONAL FINANCE AI ASSISTANT",
        //     type: "AI & ML",
        //     description:
        //         "Building a privacy-focused AI assistant for personal finance management, with capabilities for expense tracking, budget optimization, investment recommendations, and financial goal planning.",
        //     details: [
        //         "Implementing secure, local-first data processing for financial information",
        //         "Developing NLP capabilities for natural language financial queries",
        //         "Creating visualization and reporting tools for financial insights",
        //         "Building integration with financial data providers while maintaining user privacy",
        //     ],
        //     status: "In Development" as const,
        // },
        {
            title: "VIZQUEST: ENHANCED VIDEO EVENT RETRIEVAL USING FUSION AND TEMPORAL MODELING",
            type: "Research Paper",
            description:
                "Co-authored a research paper accepted at SOICT24, introducing a novel framework combining spatio-temporal attention with hierarchical feature fusion to optimize long-range video event detection.",
            status: "Completed" as const,
        },
        {
            title: "SciHorizone - IELTS Exam Generator",
            type: "AI & ML",
            description:
                "AI-powered application that converts scientific papers (PDF) into IELTS/TOEIC reading comprehension exams using Google Gemini AI. Features intelligent PDF processing, automated question generation, and interactive exam interface.",
            details: [
                "Google Gemini AI integration for intelligent question generation",
                "Advanced PDF processing with docling-serve and fallback methods",
                "Support for IELTS (band 4.0-9.0) and TOEIC (400-900 points) formats",
                "Interactive exam interface with timer and navigation system",
                "Automated grading with detailed explanations and analysis",
                "Multiple question types: Multiple choice, True/False/Not Given, Matching, Fill in blanks",
                "Professional exam simulation with responsive design",
                "Real-time PDF extraction from uploads or URLs",
                "Comprehensive result analysis with improvement recommendations",
                "Production deployment with Docker containerization",
            ],
            image: ImagePaths.project.hero(projectSlugs["SciHorizone"]),
            thumbnail: ImagePaths.project.thumbnail(
                projectSlugs["SciHorizone"]
            ),
            githubUrl: "https://github.com/hoangvu1806/SciHorizone",
            // demoUrl: "https://scihorizone.hoangvu.id.vn", // Temporarily disabled - domain not accessible
            featured: true,
            status: "Completed" as const,
            techStack: [
                "Python",
                "Google Gemini AI",
                "FastAPI",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Docker",
            ],
            highlights: [
                "🤖 AI-powered exam generation using Google Gemini API",
                "📄 Intelligent PDF processing with multiple extraction methods",
                "🎯 Professional exam simulation interface",
                "📊 Automated grading with detailed analysis",
                "🌐 Full-stack application with modern tech stack",
            ],
        },
        {
            title: "Deeplearning-Practice",
            type: "AI & ML",
            description:
                "A comprehensive collection of deep learning implementations coded from scratch, covering everything from computer vision to natural language processing. This repository showcases high-quality implementations of fundamental and advanced deep learning algorithms.",
            details: [
                "Computer Vision models including CNN architectures and ResNet implementations",
                "Natural Language Processing models including LSTM with attention mechanisms",
                "Regression models with detailed logging for housing price prediction",
                "Sentiment analysis on IMDb reviews with deep learning approaches",
                "Classification models for Vietnamese news articles",
                "All implementations feature clean, well-documented code with detailed explanations",
            ],
            image: ImagePaths.project.hero(
                projectSlugs["Deeplearning-Practice"]
            ),
            thumbnail: ImagePaths.project.thumbnail(
                projectSlugs["Deeplearning-Practice"]
            ),
            githubUrl: "https://github.com/hoangvu1806/Deeplearning-Practice",
            featured: true,
        },
        {
            title: "EzClip",
            type: "Web App",
            description:
                "A powerful desktop application designed to effortlessly download videos from various online platforms including YouTube, Facebook, and TikTok. Built with Electron.js and leverages yt-dlp for wide format support.",
            details: [
                "Support for multiple platforms including YouTube, Facebook, TikTok",
                "Download videos in various formats and resolutions",
                "Simple and intuitive user interface with modern design",
                "Offline functionality - no server required",
                "Built with Electron.js for cross-platform compatibility",
            ],
            image: ImagePaths.project.hero(projectSlugs["EzClip"]),
            thumbnail: ImagePaths.project.thumbnail(projectSlugs["EzClip"]),
            githubUrl: "https://github.com/hoangvu1806/EzClip",
            featured: true,
        },
        {
            title: "Decision Tree Visualization",
            type: "AI & ML",
            description:
                "A web application for building and visualizing decision trees from CSV data. Features include customizing model parameters, interactive visualization of decision trees, and performance metrics calculation.",
            details: [
                "Built with Python, FastAPI, and scikit-learn for the backend",
                "Interactive UI with HTML, CSS, JavaScript, and TailwindCSS",
                "Supports custom model parameters (max depth, min samples split, criterion)",
                "Visualizes decision trees as hierarchical structures",
                "Calculates and displays model evaluation metrics",
            ],
            image: ImagePaths.project.hero(
                projectSlugs["Decision Tree Visualization"]
            ),
            thumbnail: ImagePaths.project.thumbnail(
                projectSlugs["Decision Tree Visualization"]
            ),
            githubUrl:
                "https://github.com/hoangvu1806/Decision-Tree-Visualization",
            featured: true,
        },
        {
            title: "PlugAgentX: Adaptive Plugin-Based LLM Agent Framework",
            type: "AI & ML",
            description:
                "Developing a plugin-based framework for LLM agents, enabling dynamic integration of external tools and services. Features include plugin management, context management, and adaptive agent behavior based on task requirements.",
            details: [
                "Plugin management system for adding, removing, and updating external tools",
                "Context management to track and update agent state",
                "Adaptive agent behavior based on task requirements",
                "Integration with external APIs and services",
            ],
            status: "In Development" as const,
            image: ImagePaths.project.hero(projectSlugs["PlugAgentX"]),
            thumbnail: ImagePaths.project.thumbnail(projectSlugs["PlugAgentX"]),
            githubUrl: "https://github.com/hoangvu1806/PlugAgentX",
            // featured: true,
        },
        {
            title: "ZALO AI CHALLENGE 2023",
            type: "Competition",
            description:
                "Built deep generative models for symbolic and audio-based music generation using Transformer-based architectures. Fine-tuned temporal coherence and structural consistency to align with evaluation metrics in generative audio tasks.",
            status: "Completed" as const,
        },
        {
            title: "AIC24 COMPETITION",
            type: "Competition",
            description:
                "Developed scalable video understanding pipelines for event retrieval, leveraging contrastive learning and multimodal embeddings to enhance temporal-semantic alignment in untrimmed video datasets.",
            details: [
                "Integrated multi-head self-attention, temporal convolutional networks, and cross-modal fusion to improve mAP and retrieval latency in benchmark datasets.",
            ],
            status: "Completed" as const,
        },
    ],
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
                    "Node.js",
                    "Next.js",
                ],
            },
            {
                category: "AI Expertise",
                items: [
                    "LLMs",
                    "Multi-Agent Systems",
                    "Neuro-Symbolic AI",
                    "Graph-RAG",
                    "Computer Vision",
                ],
            },
            {
                category: "Tools",
                items: ["Git", "Docker", "Jenkins", "Cloudflared", "VScode"],
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
        "Voice Transformation",
        "Mathematics & Physics",
    ],
};
