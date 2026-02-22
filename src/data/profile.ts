import { ImagePaths } from "@/utils/image-paths";
import { Project } from "@/types/project";

// Project slug mapping for consistent paths
const projectSlugs = {
    "ENTERPRISE AI CHATBOT PLATFORM": "enterprise-ai-chatbot-platform",
    "INTERNAL DOCUMENT INTELLIGENCE SYSTEM":
        "internal-document-intelligence-system",
    "Deeplearning-Practice": "deeplearning-practice",
    EzClip: "ezclip",
    "Decision Tree Visualization": "decision-tree-visualization",
    "AcaRead": "acaread",
    "PlugAgentX": "plugagentx",
    "TwinSelf": "twinself",
    "Face Attendance": "face-attendance",
    "Ready4RAG": "ready4rag",
    "Viettel AI Race 2025": "viettel-ai-race-2025",
    "AIC25 Competition": "aic25-competition",
    "TARS: SOICT 2025": "tars-soict25",
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
            title: "AcaRead: AI-Powered Academic Assessment System",
            type: "Web App, AI",
            description:
                "An advanced educational platform that transforms academic papers (PDFs) into interactive IELTS-style reading exams using Gemini 2.5 Flash, bridging passive reading and active comprehension assessment.",
            details: [
                "AI-Driven Exam Generation: Utilizes LLM to analyze text logic, arguments, and generate distractor-based questions.",
                "Authentic Material Processing: Handles complex PDF layouts including multi-column structures and citations via Docling and PyMuPDF.",
                "Interactive Exam Engine: Features a split-screen 'Focused Mode' for distraction-free reading and real-time state management.",
                "Scientific Validation: Implements a multi-level evaluation framework based on CEFR B2-C1 standards and NLP metrics.",
                "Modern Cyberpunk UI: Designed with glassmorphism, neon accents, and micro-animations for a premium user experience.",
            ],
            image: ImagePaths.project.hero(projectSlugs["AcaRead"]),
            thumbnail: ImagePaths.project.thumbnail(
                projectSlugs["AcaRead"]
            ),
            images: [
                ImagePaths.project.hero(projectSlugs["AcaRead"]),
                ImagePaths.project.thumbnail(projectSlugs["AcaRead"]),
            ],
            githubUrl: "https://github.com/hoangvu1806/AcaRead",
            featured: true,
            status: "Completed" as const,
            role: "Technical Lead",
            projectType: "team project" as const,
            startDate: "03/2025",
            endDate: "12/2025",
            techStack: [
                "Next.js 15",
                "FastAPI",
                "Python",
                "Tailwind CSS",
                "Docker",
            ],
            highlights: [
                "Autonomous Exam Generation with LLM",
                "Structural Compliance Analysis for PDFs",
                "IELTS-Standard Question Synthesis",
                "Real-time Grading & Feedback Engine",
                "Futuristic Cyberpunk/HUD Design System",
            ],
        },
        {
            title: "TwinSelf - Digital Twin Chatbot",
            type: "AI & ML, MLOps",
            description:
                "A sophisticated RAG-based chatbot system using a triple-memory architecture (Semantic, Episodic, Procedural). This system serves as the intelligence behind the AI Chatbot on this portfolio, providing an authentic digital twin experience.",
            details: [
                "Portfolio Integration: Currently acting as the core engine for this website's personal chatbot assistant.",
                "Cognitive Memory System: Implements Semantic (facts), Episodic (experience), and Procedural (behavioral rules) memory layers.",
                "Vector Search: Highly efficient retrieval using Qdrant vector database and specialized Vietnamese document embeddings.",
                "MLOps Integration: Comprehensive tracking with MLflow and automated response quality evaluation using DeepEval.",
                "Version Control: Robust data management system supporting snapshots, versioning, and rollback of knowledge bases.",
            ],
            image: ImagePaths.project.hero(projectSlugs["TwinSelf"]),
            thumbnail: ImagePaths.project.thumbnail(
                projectSlugs["TwinSelf"]
            ),
            images: [
                ImagePaths.project.hero(projectSlugs["TwinSelf"]),
                ImagePaths.project.thumbnail(projectSlugs["TwinSelf"]),
            ],
            githubUrl: "https://github.com/hoangvu1806/TwinSelf",
            featured: true,
            status: "Completed" as const,
            role: "Principal AI Engineer",
            projectType: "personal project" as const,
            startDate: "09/2024",
            endDate: "12/2024",
            techStack: [
                "Python",
                "Google Gemini",
                "FastAPI",
                "Qdrant",
                "MLflow",
                "DeepEval",
            ],
            highlights: [
                "Core Engine: Currently integrated into this portfolio's Chatbot",
                "Cognitive Architecture inspired by human memory",
                "Data Versioning & Rollback support",
                "Integrated MLOps with MLflow & DeepEval",
                "Production-ready async streaming server",
            ],
        },
        {
            title: "Face Attendance: Kiosk-Based Recognition & Anti-Spoofing",
            type: "AI & ML, Computer Vision",
            description:
                "A modular kiosk-based face recognition system for attendance and access control, featuring facial alignment, quality gating, and anti-spoofing mechanisms for near real-time biometric verification.",
            details: [
                "Modular Vision Pipeline: Integrates face detection, 2D similarity transform alignment, and identity matching into a unified flow.",
                "Quality Gate System: Automatically filters frames affected by blur, low contrast, or poor lighting to maintain high embedding accuracy.",
                "Anti-Spoofing Mechanism: Implements verification layers to detect printed or digital attack attempts in various lighting conditions.",
                "High Performance: Optimized to run on limited hardware with a latency of 1-2 seconds from subject detection to result.",
                "Robust Data Processing: Standardizes input via similarity transforms, significantly reducing intra-class variation for stable recognition.",
            ],
            image: ImagePaths.project.hero(projectSlugs["Face Attendance"]),
            thumbnail: ImagePaths.project.thumbnail(
                projectSlugs["Face Attendance"]
            ),
            images: [
                ImagePaths.project.hero(projectSlugs["Face Attendance"]),
                ImagePaths.project.thumbnail(projectSlugs["Face Attendance"]),
            ],
            githubUrl: "https://github.com/hoangvu1806/FaceAttendance",
            featured: true,
            status: "Completed" as const,
            role: "AI/Vision Engineer",
            projectType: "personal project" as const,
            startDate: "11/2025",
            endDate: "12/2025",
            techStack: [
                "Python",
                "OpenCV",
                "InsightFace",
                "MediaPipe",
                "PyTorch",
                "FastAPI",
            ],
            highlights: [
                "Biometric pipeline with 93.75% average accuracy",
                "Facial Alignment via 2D Similarity Transform",
                "Quality Gate filtering for motion & blur",
                "100% spoofing detection in optimal lighting",
                "Near real-time 1-2s system latency",
            ],
        },
        {
            title: "Ready4RAG: High-Precision Dual-Layer RAG Pipeline",
            type: "AI & ML, RAG",
            description:
                "A next-generation ingestion system converting complex PDFs into value using Vision LLMs and Hybrid Memory (Vector + Graph) for grounded, high-precision answers.",
            details: [
                "Vision-Powered Extraction: Converts PDF to Markdown with near-perfect layout preservation using multimodal Vision LLMs.",
                "Dual-Layer Memory: Hybrid storage system using Qdrant for vector similarity and NetworkX for graph-based reasoning.",
                "Auto-Graph Construction: Automatically extracts entities (People, Locations, Concepts) and relationships to build a knowledge graph.",
                "Hybrid Chatbot Engine: Interactive interface that retrieves and merges context from both vector and graph layers.",
                "Multi-Provider Infrastructure: Plug-and-play support for Google Gemini, OpenAI, Groq, and local Ollama models.",
            ],
            status: "Completed" as const,
            image: ImagePaths.project.hero(projectSlugs["Ready4RAG"]),
            thumbnail: ImagePaths.project.thumbnail(
                projectSlugs["Ready4RAG"]
            ),
            images: [
                ImagePaths.project.hero(projectSlugs["Ready4RAG"]),
                ImagePaths.project.thumbnail(projectSlugs["Ready4RAG"]),
            ],
            githubUrl: "https://github.com/hoangvu1806/Ready4RAG",
            featured: true,
            role: "Principal AI Engineer",
            projectType: "personal project" as const,
            startDate: "01/2026",
            endDate: "02/2026",
            techStack: [
                "Python",
                "Qdrant",
                "NetworkX",
                "Google Gemini",
                "OpenAI",
                "Ollama",
                "LangChain",
            ],
            highlights: [
                "Vision-Powered PDF to Markdown conversion",
                "Hybrid Memory: Vector + Knowledge Graph",
                "Automatic Entity & Relationship Extraction",
                "Multi-Model Support (Gemini, OpenAI, Groq)",
                "Interactive Hybrid Context Chatbot",
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
            status: "Completed" as const,
            role: "Principal AI Researcher",
            projectType: "personal project" as const,
            startDate: "11/2024",
            endDate: "05/2025",
            techStack: ["PyTorch", "Python", "WandB", "NumPy", "Scikit-Learn"],
            highlights: [
                "From-scratch Neural Network Implementations",
                "Experimental Tracking with WandB",
                "Domain-specific model fine-tuning",
            ],
            image: ImagePaths.project.hero(
                projectSlugs["Deeplearning-Practice"]
            ),
            thumbnail: ImagePaths.project.thumbnail(
                projectSlugs["Deeplearning-Practice"]
            ),
            images: [
                ImagePaths.project.hero(projectSlugs["Deeplearning-Practice"]),
                ImagePaths.project.thumbnail(projectSlugs["Deeplearning-Practice"]),
            ],
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
            status: "Completed" as const,
            role: "Principal Software Engineer",
            projectType: "personal project" as const,
            startDate: "02/2024",
            endDate: "04/2024",
            techStack: ["Electron.js", "Node.js", "JavaScript", "FFmpeg", "HTML/CSS"],
            highlights: [
                "Cross-platform Desktop Core",
                "Native Hardware Acceleration",
                "Offline-first Architecture",
            ],
            image: ImagePaths.project.hero(projectSlugs["EzClip"]),
            thumbnail: ImagePaths.project.thumbnail(projectSlugs["EzClip"]),
            images: [
                ImagePaths.project.hero(projectSlugs["EzClip"]),
                ImagePaths.project.thumbnail(projectSlugs["EzClip"]),
            ],
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
            status: "Completed" as const,
            role: "Principal AI Engineer",
            projectType: "personal project" as const,
            startDate: "09/2024",
            endDate: "10/2024",
            techStack: ["Python", "FastAPI", "Scikit-Learn", "Tailwind CSS", "JavaScript"],
            highlights: [
                "Dynamic Tree Graph Rendering",
                "Real-time Hyperparameter Tuning",
                "Educational Dataset Analysis",
            ],
            image: ImagePaths.project.hero(
                projectSlugs["Decision Tree Visualization"]
            ),
            thumbnail: ImagePaths.project.thumbnail(
                projectSlugs["Decision Tree Visualization"]
            ),
            images: [
                ImagePaths.project.hero(projectSlugs["Decision Tree Visualization"]),
                ImagePaths.project.thumbnail(projectSlugs["Decision Tree Visualization"]),
            ],
            githubUrl:
                "https://github.com/hoangvu1806/Decision-Tree-Visualization",
            featured: true,
        },
        {
            title: "TARS: SOICT 2025",
            type: "Research Paper",
            description:
                "Co-first authored a research paper accepted at SOICT 2025 presenting TARS (Temporal Alignment Retrieval System), a training-free order-aware framework for multi-segment video event retrieval using monotonic dynamic programming alignment over vision-language encoders.",
            details: [
                "Query decomposed into ordered sub-event sequences embedded by complementary vision-language encoders.",
                "Monotonic DP alignment finds the best ordered path on the frame-subevent similarity matrix with O(nm) time and O(m) memory.",
                "Training-free design requires no additional dataset-specific training beyond base encoders, ensuring robustness under domain shift.",
                "Integrates cleanly with standard two-stage candidate retrieval and re-ranking pipelines.",
                "Demonstrated 93.15% accuracy on the Ho Chi Minh City AI Challenge 2025 benchmark.",
            ],
            status: "Completed" as const,
            role: "Co-first Author",
            projectType: "research project" as const,
            startDate: "10/2025",
            endDate: "12/2025",
            achievement: "Accepted at SOICT 2025 | 93.15% benchmark accuracy",
            techStack: ["Python", "PyTorch", "CLIP", "FAISS", "NumPy", "Google Gemini"],
            highlights: [
                "Accepted at SOICT 2025",
                "Training-free temporal reasoning at inference time",
                "Monotonic DP with O(nm) time, O(m) memory",
                "93.15% accuracy on competition benchmark",
            ],
        },
        {
            title: "Viettel AI Race 2025",
            type: "Competition",
            description:
                "Competed solo in the NLP track of Viettel AI Race 2025, building a pipeline for complex PDF table extraction, numerical data retrieval, and multiple-choice QA. Achieved Top 5 in Round 1 as a solo competitor among team-based entries.",
            details: [
                "Complex PDF table extraction preserving multi-level headers and merged cells via coordinate-based bounding box grouping.",
                "Numeric normalization pipeline handling diverse formatting conventions across financial and technical document types.",
                "Chain-of-thought prompting for multi-step numerical reasoning over extracted tabular data.",
                "Constrained answer selection strategy reducing hallucination on borderline numerical comparisons.",
            ],
            status: "Completed" as const,
            role: "Solo Competitor (1 of 3 individual slots)",
            projectType: "competition project" as const,
            startDate: "10/2025",
            endDate: "12/2025",
            achievement: "Top 5 in Round 1",
            techStack: ["Python", "PyMuPDF", "Google Gemini", "LangChain", "Pandas"],
            highlights: [
                "Top 5 in Round 1 as a solo competitor",
                "Complex PDF table reconstruction from coordinates",
                "Chain-of-thought numerical reasoning",
            ],
        },
        {
            title: "AIC25 COMPETITION",
            type: "Competition",
            description:
                "Led team SIU Cerberus at Ho Chi Minh City AI Challenge 2025, deploying the TARS (Temporal Alignment Retrieval System) framework for order-aware video event retrieval. Achieved 93.15% accuracy on the benchmark with a training-free monotonic DP alignment approach.",
            details: [
                "Designed and led implementation of TARS: a training-free, order-aware video retrieval system decomposing queries into ordered sub-event sequences.",
                "Monotonic dynamic-programming alignment enforcing strict temporal ordering at inference time with O(nm) time and O(m) memory complexity.",
                "Complementary vision-language encoders reducing sensitivity to individual encoder weaknesses across diverse query types.",
                "Two-stage retrieve-then-rerank pipeline: FAISS coarse retrieval followed by TARS re-ranking for precision-latency balance.",
            ],
            status: "Completed" as const,
            role: "Team Leader",
            projectType: "competition project" as const,
            startDate: "09/2025",
            endDate: "12/2025",
            achievement: "93.15% accuracy on HCM AI Challenge 2025 benchmark",
            techStack: ["Python", "PyTorch", "FAISS", "CLIP", "Google Gemini", "NumPy", "FFmpeg"],
            highlights: [
                "93.15% accuracy on HCM AI Challenge 2025",
                "Training-free temporal alignment via monotonic DP",
                "Query decomposed into ordered sub-event sequences",
                "O(nm) time complexity per video shot",
            ],
        },
        {
            title: "ZALO AI CHALLENGE 2023",
            type: "Competition",
            description:
                "Built deep generative models for symbolic and audio-based music generation using Transformer-based architectures. Fine-tuned temporal coherence and structural consistency to align with evaluation metrics in generative audio tasks.",
            status: "Completed" as const,
            role: "Team Member",
            projectType: "competition project" as const,
            startDate: "10/2023",
            endDate: "12/2023",
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
            role: "Team Member",
            projectType: "competition project" as const,
            startDate: "09/2024",
            endDate: "12/2024",
        },
        {
            title: "VIZQUEST: ENHANCED VIDEO EVENT RETRIEVAL USING FUSION AND TEMPORAL MODELING",
            type: "Research Paper",
            description:
                "Co-authored a research paper accepted at SOICT24, introducing a novel framework combining spatio-temporal attention with hierarchical feature fusion to optimize long-range video event detection.",
            status: "Completed" as const,
            role: "Co-author",
            projectType: "research project" as const,
            startDate: "08/2024",
            endDate: "11/2024",
        },
    ] as Project[],
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
