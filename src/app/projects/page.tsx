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
    FiArrowRight,
    FiStar,
    FiUser,
    FiCalendar,
    FiBriefcase,
    FiAward,
} from "react-icons/fi";
import Link from "next/link";
import { useState, useRef } from "react";

export default function ProjectsPage() {
    const allProjects = [...profile.projects];
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const searchRef = useRef(null);

    const categories = [
        { id: "all", label: "All", icon: <FiLayers className="mr-2" /> },
        { id: "ai", label: "AI & ML", icon: <FiCpu className="mr-2" /> },
        { id: "web", label: "Web App", icon: <FiCode className="mr-2" /> },
        {
            id: "research",
            label: "Research",
            icon: <FiFeather className="mr-2" />,
        },
        {
            id: "competition",
            label: "Competition",
            icon: <FiAward className="mr-2" />,
        },
    ];

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

    const featuredProjects = filteredProjects.filter((p) => p.featured);
    const otherProjects = filteredProjects.filter((p) => !p.featured);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const itemVariants = {
        hidden: { y: 24, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="min-h-[40vh] relative flex items-center justify-center overflow-hidden mb-12">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary opacity-10 rounded-full filter blur-3xl -z-10" />

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
                                    onClick={() =>
                                        setActiveFilter(category.id)
                                    }
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-all duration-300 ${
                                        activeFilter === category.id
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
                                onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                }
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
                        <div className="space-y-16">
                            {/* ── Featured: Bento Magazine Layout ── */}
                            {featuredProjects.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-8">
                                        <FiStar className="text-primary w-5 h-5" />
                                        <h2 className="text-2xl font-bold text-gray-100">
                                            Featured Projects
                                        </h2>
                                        <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
                                    </div>

                                    {/* Bento grid — first card spans 2 cols, rest fill in */}
                                    <AnimatePresence>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-auto">
                                            {featuredProjects.map(
                                                (project, index) => (
                                                    <motion.div
                                                        key={project.title}
                                                        variants={itemVariants}
                                                        layout
                                                        // First card takes full width on desktop
                                                        className={`group relative rounded-2xl overflow-hidden border border-gray-700/50 bg-gray-900/40 backdrop-blur-sm shadow-xl transition-all duration-500 hover:border-primary/40 hover:shadow-primary/10 hover:shadow-2xl ${
                                                            index === 0
                                                                ? "lg:col-span-2"
                                                                : ""
                                                        }`}
                                                    >
                                                        {/* Accent line */}
                                                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-secondary to-accent z-10" />

                                                        {/* ── Image Banner ── */}
                                                        <div
                                                            className={`relative w-full overflow-hidden ${
                                                                index === 0
                                                                    ? "h-64 md:h-80"
                                                                    : "h-48 md:h-56"
                                                            }`}
                                                        >
                                                            <ProjectImage
                                                                src={
                                                                    project.image ||
                                                                    "/images/ui/project-placeholder.svg"
                                                                }
                                                                alt={
                                                                    project.title
                                                                }
                                                                title={
                                                                    project.title
                                                                }
                                                                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                                                priority={
                                                                    index < 3
                                                                }
                                                            />

                                                            {/* Cinematic gradient overlay */}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

                                                            {/* Floating type badge — max-w prevents collision with status badge on mobile */}
                                                            <div className="absolute top-4 left-4 z-10 max-w-[55%]">
                                                                {project.type && (
                                                                    <span className="inline-flex items-center gap-1.5 bg-gray-900/80 backdrop-blur-md text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/30 truncate max-w-full">
                                                                        {
                                                                            project.type
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* Status badge */}
                                                            {"status" in
                                                                project &&
                                                                project.status && (
                                                                    <div className="absolute top-4 right-4 z-10">
                                                                        <span
                                                                            className={`font-sans text-[10px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 backdrop-blur-md ${
                                                                                project.status ===
                                                                                "Completed"
                                                                                    ? "bg-white/10 text-white/80"
                                                                                    : "bg-white/10 text-white/60 italic"
                                                                            }`}
                                                                            style={{ clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}
                                                                        >
                                                                            {
                                                                                project.status ===
                                                                                "Completed"
                                                                                    ? "Completed"
                                                                                    : "In Progress"
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}

                                                            {/* Title overlay on image */}
                                                            <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                                                                <h2
                                                                    className={`font-bold text-white leading-tight line-clamp-2 ${
                                                                        index ===
                                                                        0
                                                                            ? "text-xl md:text-3xl"
                                                                            : "text-lg md:text-xl"
                                                                    }`}
                                                                    style={{ textShadow: "0 2px 12px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,1)" }}
                                                                >
                                                                    {
                                                                        project.title
                                                                    }
                                                                </h2>
                                                            </div>
                                                        </div>

                                                        {/* ── Content body ── */}
                                                        <div className="p-5 flex flex-col gap-4">

                                                            {/* Metadata row: role, timeline, project type */}
                                                            {(project.role || project.startDate || project.projectType) && (
                                                                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-400">
                                                                    {project.role && (
                                                                        <span className="flex items-center gap-1">
                                                                            <FiUser className="shrink-0 text-primary" />
                                                                            {project.role}
                                                                        </span>
                                                                    )}
                                                                    {(project.startDate || project.endDate) && (
                                                                        <span className="flex items-center gap-1">
                                                                            <FiCalendar className="shrink-0 text-primary" />
                                                                            {project.startDate ?? "—"}
                                                                            {project.endDate ? ` → ${project.endDate}` : " → Present"}
                                                                        </span>
                                                                    )}
                                                                    {project.projectType && (
                                                                        <span className="flex items-center gap-1 capitalize">
                                                                            <FiBriefcase className="shrink-0 text-primary" />
                                                                            {project.projectType}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}

                                                            <div className="flex flex-wrap gap-3 items-start">
                                                                {/* Tech Stack pills */}
                                                                {"techStack" in
                                                                    project &&
                                                                    project.techStack &&
                                                                    project
                                                                        .techStack
                                                                        .length >
                                                                        0 && (
                                                                        <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                                                                            {project.techStack
                                                                                .slice(
                                                                                    0,
                                                                                    index ===
                                                                                        0
                                                                                        ? 7
                                                                                        : 5
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        tech,
                                                                                        i
                                                                                    ) => (
                                                                                        <span
                                                                                            key={
                                                                                                i
                                                                                            }
                                                                                            className="inline-block bg-gray-800/80 text-gray-300 text-xs px-2.5 py-1 rounded-md border border-gray-700/40 hover:border-primary/40 transition-colors"
                                                                                        >
                                                                                            {
                                                                                                tech
                                                                                            }
                                                                                        </span>
                                                                                    )
                                                                                )}
                                                                            {project
                                                                                .techStack
                                                                                .length >
                                                                                (index ===
                                                                                0
                                                                                    ? 7
                                                                                    : 5) && (
                                                                                <span className="inline-block text-gray-500 text-xs px-1 py-1">
                                                                                    +
                                                                                    {project
                                                                                        .techStack
                                                                                        .length -
                                                                                        (index ===
                                                                                        0
                                                                                            ? 7
                                                                                            : 5)}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                            </div>

                                                            {/* Highlights — show for all featured cards */}
                                                            {"highlights" in
                                                                project &&
                                                                project.highlights &&
                                                                project.highlights
                                                                    .length >
                                                                    0 && (
                                                                    <div
                                                                        className={`grid gap-0.25 ${
                                                                            index === 0
                                                                                ? "grid-cols-1 sm:grid-cols-2"
                                                                                : "grid-cols-1"
                                                                        }`}
                                                                    >
                                                                        {project.highlights
                                                                            .slice(
                                                                                0,
                                                                                index === 0 ? 4 : 3
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    h,
                                                                                    i
                                                                                ) => (
                                                                                    <div
                                                                                        key={i}
                                                                                        className="flex items-start gap-1 text-xs text-gray-400"
                                                                                    >
                                                                                        <span className="text-primary mt-0.5 shrink-0">
                                                                                            ›
                                                                                        </span>
                                                                                        <span>{h}</span>
                                                                                    </div>
                                                                                )
                                                                            )}
                                                                    </div>
                                                                )}

                                                            {/* Action buttons */}
                                                            <div className="flex flex-wrap gap-2 mt-auto pt-1 border-t border-gray-700/40">
                                                                <Link
                                                                    href={`/projects/detail?project=${encodeURIComponent(project.title)}`}
                                                                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition-all"
                                                                >
                                                                    Details
                                                                    <FiArrowRight className="w-3.5 h-3.5" />
                                                                </Link>

                                                                {hasDemo(
                                                                    project
                                                                ) && (
                                                                    <Link
                                                                        href={
                                                                            project.demoUrl
                                                                        }
                                                                        target="_blank"
                                                                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-emerald-600/20 border border-emerald-600/30 text-emerald-300 rounded-lg hover:bg-emerald-600/30 transition-colors"
                                                                    >
                                                                        Live Demo
                                                                        <FiExternalLink className="w-3.5 h-3.5" />
                                                                    </Link>
                                                                )}

                                                                {hasGithub(
                                                                    project
                                                                ) && (
                                                                    <Link
                                                                        href={
                                                                            project.githubUrl
                                                                        }
                                                                        target="_blank"
                                                                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-gray-800/80 border border-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700/80 hover:text-white transition-colors"
                                                                    >
                                                                        GitHub
                                                                        <FiGithub className="w-3.5 h-3.5" />
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )
                                            )}
                                        </div>
                                    </AnimatePresence>
                                </div>
                            )}

                            {/* ── Other Projects: compact grid cards ── */}
                            {otherProjects.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-8">
                                        <FiCode className="text-secondary w-5 h-5" />
                                        <h2 className="text-2xl font-bold text-gray-100">
                                            Other Projects
                                        </h2>
                                        <div className="flex-1 h-px bg-gradient-to-r from-secondary/40 to-transparent" />
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                        <AnimatePresence>
                                            {otherProjects.map(
                                                (project, index) => (
                                                    <motion.div
                                                        key={project.title}
                                                        variants={itemVariants}
                                                        layout
                                                        className="group relative rounded-xl overflow-hidden border border-gray-700/50 bg-gray-900/30 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-secondary/40 transition-all duration-300 flex flex-col"
                                                    >
                                                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-secondary to-primary" />

                                                        <div className="p-5 flex flex-col gap-3 flex-1">
                                                            <div className="flex justify-between items-start gap-2">
                                                                <h3 className="text-base font-bold text-gray-100 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                                                    {
                                                                        project.title
                                                                    }
                                                                </h3>
                                                                {project.type && (
                                                                    <span className="shrink-0 inline-block bg-gray-800/60 text-gray-400 text-xs px-2 py-0.5 rounded-md border border-gray-700/40 whitespace-nowrap">
                                                                        {
                                                                            project.type
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>


                                                            {"status" in
                                                                project &&
                                                                project.status && (
                                                                    <span
                                                                        className="self-start font-sans text-[9px] font-semibold tracking-[0.15em] uppercase bg-gray-700/50 text-gray-400 px-2 py-0.5"
                                                                        style={{ clipPath: "polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%)" }}
                                                                    >
                                                                        {
                                                                            project.status === "Completed"
                                                                                ? "Stable"
                                                                                : "In Progress"
                                                                        }
                                                                    </span>
                                                                )}

                                                            {/* Metadata row for compact cards */}
                                                            {(project.role || project.startDate || project.projectType) && (
                                                                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-500">
                                                                    {project.role && (
                                                                        <span className="flex items-center gap-1">
                                                                            <FiUser className="shrink-0 text-primary/70" />
                                                                            {project.role}
                                                                        </span>
                                                                    )}
                                                                    {(project.startDate || project.endDate) && (
                                                                        <span className="flex items-center gap-1">
                                                                            <FiCalendar className="shrink-0 text-primary/70" />
                                                                            {project.startDate ?? "—"}
                                                                            {project.endDate ? ` → ${project.endDate}` : " → Present"}
                                                                        </span>
                                                                    )}
                                                                    {project.projectType && (
                                                                        <span className="flex items-center gap-1 capitalize">
                                                                            <FiBriefcase className="shrink-0 text-primary/70" />
                                                                            {project.projectType}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}

                                                            <div className="flex gap-2 pt-2 border-t border-gray-700/40 mt-auto">
                                                                {(
                                                                    "details" in
                                                                        project &&
                                                                    project.details
                                                                ) ? (
                                                                    <Link
                                                                        href={`/projects/detail?project=${encodeURIComponent(project.title)}`}
                                                                        className="inline-flex items-center gap-1 text-xs px-3 py-1.5 font-medium bg-primary/10 border border-primary/20 text-primary rounded-md hover:bg-primary/20 transition-colors"
                                                                    >
                                                                        Details
                                                                        <FiArrowRight className="w-3 h-3" />
                                                                    </Link>
                                                                ) : null}

                                                                {hasDemo(
                                                                    project
                                                                ) && (
                                                                    <Link
                                                                        href={
                                                                            project.demoUrl
                                                                        }
                                                                        target="_blank"
                                                                        className="inline-flex items-center gap-1 text-xs px-3 py-1.5 font-medium bg-emerald-600/10 border border-emerald-600/20 text-emerald-400 rounded-md hover:bg-emerald-600/20 transition-colors"
                                                                    >
                                                                        Demo
                                                                        <FiExternalLink className="w-3 h-3" />
                                                                    </Link>
                                                                )}

                                                                {hasGithub(
                                                                    project
                                                                ) && (
                                                                    <Link
                                                                        href={
                                                                            project.githubUrl
                                                                        }
                                                                        target="_blank"
                                                                        className="inline-flex items-center gap-1 text-xs px-3 py-1.5 font-medium bg-gray-800/60 border border-gray-700/40 text-gray-400 rounded-md hover:bg-gray-700/60 hover:text-white transition-colors"
                                                                    >
                                                                        GitHub
                                                                        <FiGithub className="w-3 h-3" />
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </MainLayout>
    );
}
