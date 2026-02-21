"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import {
    FiExternalLink,
    FiGithub,
    FiArrowLeft,
    FiTag,
    FiLayers,
    FiX,
} from "react-icons/fi";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { profile } from "@/data/profile";

interface ProjectData {
    title: string;
    description: string;
    longDescription: string;
    coverImage?: string;
    images?: string[];
    type?: string;
    details?: string[];
    features: string[];
    challenges: string[];
    results: string[];
    technologies: string[];
    githubUrl?: string | null;
    demoUrl?: string | null;
    [key: string]: any;
}

// Component that uses useSearchParams
function ProjectDetailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [project, setProject] = useState<ProjectData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [projectImages, setProjectImages] = useState<string[]>([]);

    useEffect(() => {
        // Get project title from URL query parameter
        const projectTitle = searchParams.get("project");

        if (!projectTitle) {
            router.push("/projects");
            return;
        }

        // Find the project in projects array
        const allProjects = [...profile.projects];
        const foundProject = allProjects.find(
            (p) => p.title.toLowerCase() === projectTitle.toLowerCase()
        );

        // Only allow specific projects with detailed information
        if (
            !foundProject ||
            (foundProject.title !== "EzClip" &&
                foundProject.title !== "Decision Tree Visualization" &&
                foundProject.title !== "Deeplearning-Practice" &&
                foundProject.title !== "AcaRead: AI-Powered Academic Assessment System" &&
                foundProject.title !== "TwinSelf - Digital Twin Chatbot" &&
                foundProject.title !== "Face Attendance: Kiosk-Based Recognition & Anti-Spoofing" &&
                foundProject.title !== "Ready4RAG: High-Precision Dual-Layer RAG Pipeline")
        ) {
            router.push("/projects");
            return;
        }

        // Prepare project data for display
        const projectData: ProjectData = {
            ...foundProject,
            longDescription: foundProject.description,
            coverImage: foundProject.image,
            images: [],  // populated by API call below
            features: foundProject.details || [],
            challenges:
                foundProject.title === "AcaRead: AI-Powered Academic Assessment System"
                    ? [
                        "Hallucination in AI: Ensuring the model doesn't invent facts by implementing 'Grounding Verification' with specific citation requirements.",
                        "PDF Structure Chaos: Handling messy academic PDF layouts (multi-column, floats) using a custom 'StructuralComplianceAnalyzer'.",
                        "Latency & Feedback: Managing long generation times (30-60s) by implementing an engaging 'Cyberpunk Loader' with real-time system logs.",
                        "Format Compliance: Strictly adhering to IELTS formatting rules (e.g., 'TRUE' vs 'YES') and question sequencing.",
                        "Pedagogical Validity: Ensuring generated questions test true comprehension rather than simple keyword matching.",
                    ]
                    : foundProject.title === "Deeplearning-Practice"
                        ? [
                            "Implementing complex neural network architectures from scratch",
                            "Optimizing model performance for various tasks",
                            "Ensuring proper data preprocessing for different domains",
                            "Balancing model complexity with training efficiency",
                            "Documenting implementations with clear explanations",
                        ]
                        : foundProject.title === "TwinSelf - Digital Twin Chatbot"
                            ? [
                                "Memory Balancing: Tuning the retrieval weights (Semantic vs Episodic vs Procedural) to ensure facts don't override personality.",
                                "Personality Alignment: Creating a robust Episodic memory that accurately captures and mimics user-specific tone and humor.",
                                "Data Versioning Conflict: Implementing a safe snapshot and rollback mechanism for the Qdrant vector database.",
                                "Evaluator Latency: Resolving the bottleneck caused by asynchronous DeepEval metrics logging to MLflow.",
                                "Vietnamese Nuance: Optimizing semantic search for complex Vietnamese phrasing and professional terminology.",
                            ]
                            : foundProject.title === "Face Attendance: Kiosk-Based Recognition & Anti-Spoofing"
                                ? [
                                    "Preprocessing Stability: Ensuring consistent recognition results by implementing 2D similarity transform facial alignment.",
                                    "Low-light Performance: Mitigating accuracy drops in suboptimal lighting (from 97% to 85.2%) without depth-sensing hardware.",
                                    "Anti-Spoofing Reliability: Detecting printed and digital attacks using software-only methods in varying illumination levels.",
                                    "Quality Control: Building a 'Quality Gate' to filter out blurry or low-contrast frames before embedding extraction.",
                                    "System Latency: Optimizing the modular pipeline to maintain a 1-2 second response time in a real-time kiosk environment.",
                                ]
                                : foundProject.title === "Ready4RAG: High-Precision Dual-Layer RAG Pipeline"
                                    ? [
                                        "Complex Layout Extraction: Handling multi-column research papers and complex tables using Vision LLMs without losing structural integrity.",
                                        "Graph-Vector Fusion: Designing a retrieval mechanism that effectively merges similarity scores from Qdrant with relationship weights from NetworkX.",
                                        "Entity Disambiguation: Ensuring the auto-graph construction doesn't create duplicate nodes for the same entity mentioned in different contexts.",
                                        "Scalability: Managing the computational cost of using Vision LLMs for large-scale document ingestion pipelines.",
                                        "Context Noise: Filtering out irrelevant retrieved chunks and nodes to maintain high precision in generated answers.",
                                    ]
                                    : [
                                        "Building an intuitive user interface",
                                "Ensuring cross-platform compatibility",
                                "Optimizing performance for all users",
                            ],
            results:
                foundProject.title === "AcaRead: AI-Powered Academic Assessment System"
                    ? [
                        "Successfully processes raw PDFs, handling complex layouts, citations, and dual-column formats.",
                        "Provides instant, AI-driven grading with detailed explanations citing specific text evidence.",
                        "Delivers a distraction-free 'Focused Mode' interface with split-screen view.",
                        "Demonstrates true understanding of logic and arguments using Gemini 2.5 Flash (1M token context).",
                        "Achieved a premium, responsive 'Cyberpunk/HUD' UI that feels engaging and modern.",
                        "Bridged the gap between passive reading and active assessment for specialized academic texts.",
                    ]
                    : foundProject.title === "Deeplearning-Practice"
                        ? [
                            "Comprehensive library of deep learning implementations",
                            "Successfully applied models to real-world datasets",
                            "Well-documented code showcasing best practices",
                            "Educational resource for understanding deep learning concepts",
                            "Organized structure by application domains",
                        ]
                        : foundProject.title === "TwinSelf - Digital Twin Chatbot"
                            ? [
                                "Successfully integrated as the core intelligence of this portfolio's chatbot assistant.",
                                "Created a high-fidelity digital twin capable of authentic, personality-aware interactions.",
                                "Established a full MLOps loop with real-time performance tracking in MLflow.",
                                "Achieved high 'Faithfulness' and 'Relevancy' scores across diverse testing scenarios using DeepEval.",
                                "Successfully implemented a modular memory system that is fully evolvable and version-controlled.",
                                "Deployed a production-ready system with sub-second retrieval and generation times.",
                            ]
                            : foundProject.title === "Face Attendance: Kiosk-Based Recognition & Anti-Spoofing"
                                ? [
                                    "Achieved 93.75% average recognition accuracy across 15 participants.",
                                    "Successfully identified 100% of printed and phone-based spoofing attacks in well-lit conditions.",
                                    "Reduced intra-class variation significantly through standardized facial alignment preprocessing.",
                                    "Maintained acceptable system latency of 1-2 seconds for practical kiosk deployment.",
                                    "Validated that preprocessing (Quality Gate) is a critical bottleneck for real-world biometric stability.",
                                ]
                                : foundProject.title === "Ready4RAG: High-Precision Dual-Layer RAG Pipeline"
                                    ? [
                                        "Near-perfect preservation of document structure during PDF to Markdown conversion.",
                                        "Significant reduction in hallucination by grounding chatbot answers in both vector and graph context.",
                                        "Automated knowledge base creation that surfaces hidden relationships between distinct data points.",
                                        "High retrieval precision by combining semantic search with structural reasoning.",
                                        "Demonstrated flexibility across multiple LLM providers, including local and cloud models.",
                                    ]
                                    : [
                                        "Successfully deployed and available for public use",
                                "Positive user feedback on functionality and design",
                                "Continuous improvement based on community input",
                            ],
            technologies:
                foundProject.title === "AcaRead: AI-Powered Academic Assessment System"
                    ? ["Next.js 15", "FastAPI", "Gemini 2.5 Flash", "Python", "SQLite", "Tailwind CSS", "Docker", "Docling", "PyMuPDF"]
                    : foundProject.title === "EzClip"
                        ? ["JavaScript", "Electron.js", "HTML", "CSS", "Node.js"]
                        : foundProject.title === "Deeplearning-Practice"
                            ? [
                                "Python",
                                "PyTorch",
                                "Wandb",
                            ]
                        : foundProject.title === "TwinSelf - Digital Twin Chatbot"
                            ? [
                                "Python",
                                "Google Gemini",
                                "FastAPI",
                                "Qdrant",
                                "MLflow",
                                "DeepEval",
                            ]
                        : foundProject.title === "Face Attendance: Kiosk-Based Recognition & Anti-Spoofing"
                            ? [
                                "Python",
                                "OpenCV",
                                "InsightFace",
                                "MediaPipe",
                                "PyTorch",
                                "FastAPI",
                            ]
                        : foundProject.title === "Ready4RAG: High-Precision Dual-Layer RAG Pipeline"
                            ? [
                                "Python",
                                "Qdrant",
                                "NetworkX",
                                "Google Gemini",
                                "OpenAI",
                                "Ollama",
                                "LangChain",
                                "PyMuPDF",
                                "Docling",
                            ]
                            : [
                                "Python",
                                "FastAPI",
                                "scikit-learn",
                                "HTML",
                                "CSS",
                                "JavaScript",
                                "TailwindCSS",
                            ],
        };

        setProject(projectData);
        setLoading(false);
    }, [searchParams, router]);

    // Fetch all images for this project from the filesystem via API
    useEffect(() => {
        if (!project?.image) return;

        // Extract slug from the image path: /images/projects/{slug}/hero.jpg
        const match = project.image.match(/\/images\/projects\/([^/]+)\//);
        if (!match) return;
        const slug = match[1];

        fetch(`/api/project-images?slug=${slug}`)
            .then((res) => res.json())
            .then((data: { images?: string[] }) => {
                if (data.images && data.images.length > 0) {
                    setProjectImages(data.images);
                }
            })
            .catch(() => {
                // Silently fall back to empty gallery
            });
    }, [project?.image]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 md:px-6 py-20 text-center">
                <div className="flex justify-center items-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="container mx-auto px-4 md:px-6 py-20 text-center">
                <h1 className="text-4xl font-bold text-white mb-6">
                    Project Not Found
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                    The project you're looking for doesn't exist or has been
                    moved.
                </p>
                <Link
                    href="/projects"
                    className="inline-flex items-center px-6 py-3 font-medium bg-primary text-white rounded-lg"
                >
                    <FiArrowLeft className="mr-2" /> Back to Projects
                </Link>
            </div>
        );
    }

    return (
        <>
            {/* Hero Section */}
            <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                <div className="absolute inset-0 bg-gray-900/70">
                    <Image
                        src={project.coverImage || "/project-placeholder.jpg"}
                        alt={project.title}
                        fill
                        className="object-cover object-center opacity-50"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/90"></div>
                </div>

                <div className="container mx-auto px-4 md:px-6 relative h-full flex flex-col justify-end pb-12">
                    <Link
                        href="/projects"
                        className="inline-flex items-center text-gray-400 hover:text-primary transition-colors mb-6"
                    >
                        <FiArrowLeft className="mr-2" /> Back to projects
                    </Link>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
                    >
                        {project.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-300 max-w-3xl"
                    >
                        {project.description}
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-12"
                        >
                            <h3 className="text-2xl font-bold mb-6 text-primary">
                                Project Overview
                            </h3>
                            <div className="prose prose-lg prose-invert max-w-none">
                                {project.longDescription
                                    .split("\n\n")
                                    .map((paragraph: string, idx: number) => (
                                        <p
                                            key={idx}
                                            className="text-gray-300 mb-4"
                                        >
                                            {paragraph}
                                        </p>
                                    ))}
                            </div>
                        </motion.section>

                        {project.features && project.features.length > 0 && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="mb-12"
                            >
                                <h3 className="text-2xl font-bold mb-6 text-primary">
                                    Key Features
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: 0.2 + index * 0.05,
                                            }}
                                            className="flex items-start"
                                        >
                                            <span className="text-primary text-lg mr-2">
                                                •
                                            </span>
                                            <p className="text-gray-300">
                                                {feature}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-12 grid gap-8"
                        >
                            {project.challenges &&
                                project.challenges.length > 0 && (
                                    <div>
                                        <h3 className="text-2xl font-bold mb-6 text-primary">
                                            Challenges
                                        </h3>
                                        <ul className="space-y-3">
                                            {project.challenges.map(
                                                (challenge, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-start text-gray-300"
                                                    >
                                                        <span className="text-secondary text-lg mr-2">
                                                            •
                                                        </span>
                                                        <span>{challenge}</span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}

                            {project.results && project.results.length > 0 && (
                                <div>
                                    <h3 className="text-2xl font-bold mb-6 text-primary">
                                        Results
                                    </h3>
                                    <ul className="space-y-3">
                                        {project.results.map(
                                            (result, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start text-gray-300"
                                                >
                                                    <span className="text-accent text-lg mr-2">
                                                        •
                                                    </span>
                                                    <span>{result}</span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                        </motion.section>

                        {projectImages.length > 0 && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="mb-12"
                            >
                                <h3 className="text-2xl font-bold mb-6 text-primary">
                                    Project Images
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {projectImages.map((image, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.3 + index * 0.1,
                                            }}
                                            whileHover={{ scale: 1.03 }}
                                            className="relative aspect-video rounded-xl overflow-hidden shadow-lg cursor-pointer"
                                            onClick={() => setSelectedImage(image)}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${project.title} - Image ${index + 1}`}
                                                fill
                                                className="object-cover object-center transition-transform duration-500 hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div>
                        <div className="backdrop-blur-sm bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 sticky top-24">
                            <h3 className="text-xl font-bold text-white mb-6">
                                Project Details
                            </h3>

                            <div className="space-y-4">
                                {project.type && (
                                    <div className="flex items-start">
                                        <div className="text-primary mr-3 mt-1">
                                            <FiTag />
                                        </div>
                                        <div>
                                            <h4 className="text-sm text-gray-400 mb-1">
                                                Category
                                            </h4>
                                            <p className="text-gray-200">
                                                {project.type}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {project.technologies && (
                                    <div className="flex items-start">
                                        <div className="text-primary mr-3 mt-1">
                                            <FiLayers />
                                        </div>
                                        <div>
                                            <h4 className="text-sm text-gray-400 mb-1">
                                                Technologies
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map(
                                                    (tech, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-block bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded"
                                                        >
                                                            {tech}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col gap-4 mt-8">
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                                        >
                                            <FiGithub className="mr-2" />
                                            View on GitHub
                                        </a>
                                    )}

                                    {project.demoUrl && (
                                        <a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg hover:shadow-primary-glow transition-all"
                                        >
                                            <FiExternalLink className="mr-2" />
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/95 backdrop-blur-md"
                    >
                        <motion.button
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute top-6 right-6 text-white text-3xl z-50 hover:text-primary transition-colors bg-gray-800/50 p-2 rounded-full"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                        >
                            <FiX />
                        </motion.button>
                        
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-6xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-700/50"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Selected Project Image"
                                fill
                                className="object-contain"
                                sizes="90vw"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// The main page component wrapped with Suspense
export default function ProjectDetailPage() {
    return (
        <MainLayout>
            <Suspense
                fallback={
                    <div className="container mx-auto px-4 md:px-6 py-20 text-center">
                        <div className="flex justify-center items-center min-h-[50vh]">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                        </div>
                    </div>
                }
            >
                <ProjectDetailContent />
            </Suspense>
        </MainLayout>
    );
}
