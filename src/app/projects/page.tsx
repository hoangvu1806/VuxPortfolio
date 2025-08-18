"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { profile } from "@/data/profile";
import { ProjectImage } from "@/components/ui/project-image";
import { hasDemo, hasGithub } from "@/types/project";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiExternalLink,
    FiGithub,
    FiCode,
    FiFilter,
    FiSearch,
    FiLayers,
    FiCpu,
    FiFeather,
} from "react-icons/fi";
import Link from "next/link";
import { useState, useRef } from "react";

export default function ProjectsPage() {
    const allProjects = [...profile.projects];
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const searchRef = useRef(null);

    // Project categories
    const categories = [
        { id: "all", label: "All", icon: <FiLayers className="mr-2" /> },
        { id: "ai", label: "AI & ML", icon: <FiCpu className="mr-2" /> },
        { id: "web", label: "Web App", icon: <FiCode className="mr-2" /> },
        {
            id: "research",
            label: "Research",
            icon: <FiFeather className="mr-2" />,
        },
    ];

    // Filter projects by category and search
    const filteredProjects = allProjects.filter((project) => {
        const matchesCategory =
            activeFilter === "all" ||
            (project.type &&
                project.type
                    .toLowerCase()
                    .includes(activeFilter.toLowerCase()));

        const matchesSearch =
            searchQuery === "" ||
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (project.description &&
                project.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 },
        },
    };

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="min-h-[40vh] relative flex items-center justify-center overflow-hidden mb-12">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary opacity-10 rounded-full filter blur-3xl -z-10"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="container px-4 md:px-6 mx-auto text-center"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Projects
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                        A collection of AI and machine learning projects, from
                        academic research to real-world applications.
                    </p>
                </motion.div>
            </section>

            <div className="container px-4 md:px-6 mx-auto">
                {/* Filters & Search */}
                <div className="relative backdrop-blur-sm bg-gray-900/30 rounded-xl overflow-hidden shadow-lg border border-gray-700/50 p-6 mb-12">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <motion.button
                                    key={category.id}
                                    onClick={() => setActiveFilter(category.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-all duration-300 ${activeFilter === category.id
                                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-primary-glow"
                                        : "bg-gray-800/70 text-gray-300 hover:bg-gray-700/70"
                                        }`}
                                >
                                    {category.icon}
                                    {category.label}
                                </motion.button>
                            ))}
                        </div>

                        <div className="relative max-w-md w-full">
                            <FiSearch className="absolute left-4 top-4 text-gray-400 w-4 h-4 pointer-events-none" />
                            <input
                                ref={searchRef}
                                type="text"
                                className="bg-gray-800/70 text-white w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                                    onClick={() => setSearchQuery("")}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Project Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-7xl mx-auto"
                >
                    {filteredProjects.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="text-gray-400 mb-4">
                                <FiFilter className="w-12 h-12 mx-auto" />
                            </div>
                            <h3 className="text-xl text-gray-200 mb-2">
                                No projects found
                            </h3>
                            <p className="text-gray-400">
                                Try different filters or search terms
                            </p>
                            <button
                                onClick={() => {
                                    setActiveFilter("all");
                                    setSearchQuery("");
                                }}
                                className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                            >
                                Reset filters
                            </button>
                        </motion.div>
                    ) : (
                        <div className="grid gap-6 md:gap-8">
                            <AnimatePresence>
                                {filteredProjects
                                    .filter((p) => p.featured)
                                    .map((project, index) => (
                                        <motion.div
                                            key={project.title}
                                            variants={itemVariants}
                                            layout
                                            className="project-card-featured relative backdrop-blur-sm bg-gray-900/30 rounded-xl overflow-hidden shadow-lg border border-gray-700/50 group hover:shadow-xl transition-all duration-300"
                                        >
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>

                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6">
                                                <div className="lg:col-span-4 project-image-container relative h-[200px] lg:h-auto overflow-hidden">
                                                    <ProjectImage
                                                        src={
                                                            project.image ||
                                                            "/images/ui/project-placeholder.svg"
                                                        }
                                                        alt={project.title}
                                                        title={project.title}
                                                        className="w-full h-full object-cover object-center"
                                                        priority={index < 3}
                                                        enableZoom={true}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-gray-900/60 lg:via-gray-900/20 lg:to-transparent"></div>

                                                    <div className="absolute bottom-0 left-0 p-4 z-10">
                                                        {project.type && (
                                                            <span className="inline-block bg-primary-900/80 backdrop-blur-sm text-primary-200 text-xs px-3 py-1.5 rounded-full font-medium">
                                                                {project.type}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="lg:col-span-8 p-6 flex flex-col">
                                                    <h2 className="text-xl lg:text-2xl font-bold text-gray-100 mb-3">
                                                        {project.title}
                                                    </h2>

                                                    <p className="text-gray-300 text-sm lg:text-base mb-4 flex-grow line-clamp-3">
                                                        {project.description}
                                                    </p>

                                                    {project.details &&
                                                        project.details.length >
                                                        0 && (
                                                            <div className="mb-4">
                                                                <h3 className="text-base font-medium text-gray-200 mb-2">
                                                                    Key Features
                                                                </h3>
                                                                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-y-1 gap-x-3">
                                                                    {project.details
                                                                        .slice(
                                                                            0,
                                                                            6
                                                                        )
                                                                        .map(
                                                                            (
                                                                                detail,
                                                                                i
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                    className="flex items-start text-gray-300 text-sm"
                                                                                >
                                                                                    <span className="text-primary mr-2 mt-1 text-xs">
                                                                                        •
                                                                                    </span>
                                                                                    <span className="line-clamp-2">
                                                                                        {
                                                                                            detail
                                                                                        }
                                                                                    </span>
                                                                                </li>
                                                                            )
                                                                        )}
                                                                </ul>
                                                                {project.details
                                                                    .length >
                                                                    6 && (
                                                                        <p className="text-primary mt-1 text-xs">
                                                                            +
                                                                            {project
                                                                                .details
                                                                                .length -
                                                                                6}{" "}
                                                                            more features
                                                                        </p>
                                                                    )}
                                                            </div>
                                                        )}

                                                    {/* Tech Stack */}
                                                    {'techStack' in project && project.techStack && project.techStack.length > 0 && (
                                                        <div className="mb-3">
                                                            <h3 className="text-sm font-medium text-gray-200 mb-2">
                                                                Tech Stack
                                                            </h3>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {project.techStack.slice(0, 8).map((tech, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className="inline-block bg-gray-800/60 text-gray-300 text-xs px-2.5 py-1 rounded-md border border-gray-700/30"
                                                                    >
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                                {project.techStack.length > 8 && (
                                                                    <span className="inline-block text-gray-400 text-xs px-2 py-1">
                                                                        +{project.techStack.length - 8} more
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Highlights */}
                                                    {'highlights' in project && project.highlights && project.highlights.length > 0 && (
                                                        <div className="mb-4">
                                                            <h3 className="text-sm font-medium text-gray-200 mb-2">
                                                                Highlights
                                                            </h3>
                                                            <ul className="space-y-1">
                                                                {project.highlights.slice(0, 3).map((highlight, i) => (
                                                                    <li
                                                                        key={i}
                                                                        className="flex items-start text-gray-300 text-xs"
                                                                    >
                                                                        <span className="mr-2 mt-0.5 text-sm">
                                                                            {highlight.split(' ')[0]}
                                                                        </span>
                                                                        <span className="line-clamp-1">
                                                                            {highlight.split(' ').slice(1).join(' ')}
                                                                        </span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    <div className="flex flex-wrap gap-3 mt-auto pt-2">
                                                        <motion.div
                                                            whileHover={{
                                                                scale: 1.02,
                                                            }}
                                                            whileTap={{
                                                                scale: 0.98,
                                                            }}
                                                        >
                                                            <Link
                                                                href={`/projects/detail?project=${encodeURIComponent(
                                                                    project.title
                                                                )}`}
                                                                className="inline-flex items-center px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                                                            >
                                                                Details{" "}
                                                                <FiExternalLink className="ml-1.5 w-4 h-4" />
                                                            </Link>
                                                        </motion.div>

                                                        {hasDemo(project) && (
                                                            <motion.div
                                                                whileHover={{
                                                                    scale: 1.02,
                                                                }}
                                                                whileTap={{
                                                                    scale: 0.98,
                                                                }}
                                                            >
                                                                <Link
                                                                    href={project.demoUrl}
                                                                    target="_blank"
                                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                                                >
                                                                    Live Demo{" "}
                                                                    <FiExternalLink className="ml-1.5 w-4 h-4" />
                                                                </Link>
                                                            </motion.div>
                                                        )}

                                                        {hasGithub(project) && (
                                                            <motion.div
                                                                whileHover={{
                                                                    scale: 1.05,
                                                                }}
                                                                whileTap={{
                                                                    scale: 0.95,
                                                                }}
                                                            >
                                                                <Link
                                                                    href={project.githubUrl}
                                                                    target="_blank"
                                                                    className="inline-flex items-center px-5 py-2.5 font-medium bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                                                                >
                                                                    GitHub{" "}
                                                                    <FiGithub className="ml-2" />
                                                                </Link>
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                            </AnimatePresence>

                            <h2 className="text-3xl font-bold mt-16 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                Other Projects
                            </h2>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <AnimatePresence>
                                    {filteredProjects
                                        .filter((p) => !p.featured)
                                        .map((project, index) => (
                                            <motion.div
                                                key={project.title}
                                                variants={itemVariants}
                                                layout
                                                className="relative backdrop-blur-sm bg-gray-900/30 rounded-xl overflow-hidden shadow-lg border border-gray-700/50 group hover:shadow-xl transition-all duration-300"
                                            >
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>

                                                <div className="p-6">
                                                    <div className="mb-4 flex justify-between items-start">
                                                        <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-primary transition-colors">
                                                            {project.title}
                                                        </h3>
                                                        {project.type && (
                                                            <span className="inline-block bg-primary-900/30 text-primary-300 text-xs px-2.5 py-1 rounded-full">
                                                                {project.type}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                                                        {project.description}
                                                    </p>

                                                    <div className="flex gap-3">
                                                        <motion.div
                                                            whileHover={{
                                                                scale: 1.05,
                                                            }}
                                                            whileTap={{
                                                                scale: 0.95,
                                                            }}
                                                        >
                                                            <Link
                                                                href={`/projects/detail?project=${encodeURIComponent(
                                                                    project.title
                                                                )}`}
                                                                className="inline-flex items-center text-sm px-3 py-1.5 font-medium bg-primary-900/30 text-primary-300 rounded-md hover:bg-primary-900/50 transition-colors"
                                                            >
                                                                Details{" "}
                                                                <FiExternalLink className="ml-1 w-3 h-3" />
                                                            </Link>
                                                        </motion.div>

                                                        {hasDemo(project) && (
                                                            <motion.div
                                                                whileHover={{
                                                                    scale: 1.05,
                                                                }}
                                                                whileTap={{
                                                                    scale: 0.95,
                                                                }}
                                                            >
                                                                <Link
                                                                    href={project.demoUrl}
                                                                    target="_blank"
                                                                    className="inline-flex items-center text-sm px-3 py-1.5 font-medium bg-green-600/30 text-green-300 rounded-md hover:bg-green-600/50 transition-colors"
                                                                >
                                                                    Live Demo{" "}
                                                                    <FiExternalLink className="ml-1 w-3 h-3" />
                                                                </Link>
                                                            </motion.div>
                                                        )}

                                                        {hasGithub(project) && (
                                                            <motion.div
                                                                whileHover={{
                                                                    scale: 1.05,
                                                                }}
                                                                whileTap={{
                                                                    scale: 0.95,
                                                                }}
                                                            >
                                                                <Link
                                                                    href={project.githubUrl}
                                                                    target="_blank"
                                                                    className="inline-flex items-center text-sm px-3 py-1.5 font-medium bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
                                                                >
                                                                    GitHub{" "}
                                                                    <FiGithub className="ml-1 w-3 h-3" />
                                                                </Link>
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </MainLayout>
    );
}
