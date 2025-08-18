"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import {
    FiExternalLink,
    FiGithub,
    FiArrowLeft,
    FiTag,
    FiLayers,
} from "react-icons/fi";
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
    githubUrl?: string;
    demoUrl?: string;
    [key: string]: any;
}

// Component that uses useSearchParams
function ProjectDetailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [project, setProject] = useState<ProjectData | null>(null);
    const [loading, setLoading] = useState(true);

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
                foundProject.title !== "SciHorizone - IELTS Exam Generator")
        ) {
            router.push("/projects");
            return;
        }

        // Prepare project data for display
        const projectData: ProjectData = {
            ...foundProject,
            longDescription: foundProject.description,
            coverImage: foundProject.image,
            images: foundProject.image ? [foundProject.image] : [],
            features: foundProject.details || [],
            challenges:
                foundProject.title === "SciHorizone - IELTS Exam Generator"
                    ? [
                        "Integrating Google Gemini AI for intelligent question generation",
                        "Implementing robust PDF processing with multiple extraction methods",
                        "Creating professional exam interface that mimics real IELTS/TOEIC tests",
                        "Developing automated grading system with detailed explanations",
                        "Ensuring scalability and performance for production deployment",
                        "Handling various PDF formats and scientific document structures",
                    ]
                    : foundProject.title === "Deeplearning-Practice"
                        ? [
                            "Implementing complex neural network architectures from scratch",
                            "Optimizing model performance for various tasks",
                            "Ensuring proper data preprocessing for different domains",
                            "Balancing model complexity with training efficiency",
                            "Documenting implementations with clear explanations",
                        ]
                        : [
                            "Building an intuitive user interface",
                            "Ensuring cross-platform compatibility",
                            "Optimizing performance for all users",
                        ],
            results:
                foundProject.title === "SciHorizone - IELTS Exam Generator"
                    ? [
                        "Successfully deployed AI-powered exam generation system",
                        "Achieved high accuracy in question generation using Google Gemini AI",
                        "Implemented robust PDF processing supporting various scientific document formats",
                        "Created professional exam interface with timer and navigation features",
                        "Deployed production-ready application with Docker containerization",
                        "Positive user feedback on exam quality and user experience",
                        "Automated grading system with detailed explanations and analysis",
                    ]
                    : foundProject.title === "Deeplearning-Practice"
                        ? [
                            "Comprehensive library of deep learning implementations",
                            "Successfully applied models to real-world datasets",
                            "Well-documented code showcasing best practices",
                            "Educational resource for understanding deep learning concepts",
                            "Organized structure by application domains",
                        ]
                        : [
                            "Successfully deployed and available for public use",
                            "Positive user feedback on functionality and design",
                            "Continuous improvement based on community input",
                        ],
            technologies:
                foundProject.title === "SciHorizone - IELTS Exam Generator"
                    ? ["Next.js", "FastAPI", "Google Gemini AI", "Python", "TypeScript", "Tailwind CSS", "Docker", "docling-serve"]
                    : foundProject.title === "EzClip"
                        ? ["JavaScript", "Electron.js", "HTML", "CSS", "Node.js"]
                        : foundProject.title === "Deeplearning-Practice"
                            ? [
                                "Python",
                                "PyTorch",
                                "Wandb",
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

                        {project.images && project.images.length > 0 && (
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
                                    {project.images.map((image, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.3 + index * 0.1,
                                            }}
                                            whileHover={{ scale: 1.03 }}
                                            className="relative aspect-video rounded-xl overflow-hidden shadow-lg"
                                        >
                                            <Image
                                                src={image}
                                                alt={`${project.title} - Image ${index + 1}`}
                                                fill
                                                className="object-cover object-center"
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
