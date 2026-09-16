"use client";

import { MainLayout } from "@/components/layout/main-layout";
import {
    ArrowRight,
    ArrowUpRight,
    Mail,
    MailOpen,
    Code,
    Terminal,
    Layers,
    LayoutGrid,
    Server,
    Database,
    Cpu,
    Sparkles,
    Award,
    Trophy,
    Briefcase,
    FolderGit2,
    Globe,
    Languages,
    GitBranch,
    Share2,
} from "lucide";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { MorphIconWrapper } from "@/components/ui/morph-icon";
import Image from "next/image";
import { profile } from "@/data/profile";
import { ImagePaths } from "@/utils/image-paths";
import { ProjectImage } from "@/components/ui/project-image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { useEffect, useState } from "react";

const skillCategoryConfigs = [
    {
        // 0. AI / ML
        icon: (
            <MorphIconWrapper
                from={Cpu}
                to={Sparkles}
                className="text-primary"
                size={20}
            />
        ),
    },
    {
        // 1. Programming
        icon: (
            <MorphIconWrapper
                from={Code}
                to={Terminal}
                className="text-secondary"
                size={20}
            />
        ),
    },
    {
        // 2. Frameworks
        icon: (
            <MorphIconWrapper
                from={Layers}
                to={LayoutGrid}
                className="text-cyan-400"
                size={20}
            />
        ),
    },
    {
        // 3. Data & Retrieval
        icon: (
            <MorphIconWrapper
                from={Database}
                to={Server}
                className="text-emerald-400"
                size={20}
            />
        ),
    },
    {
        // 4. Backend & MLOps
        icon: (
            <MorphIconWrapper
                from={Server}
                to={GitBranch}
                className="text-indigo-400"
                size={20}
            />
        ),
    },
];

export default function Home() {
    const [isAvatarHovered, setIsAvatarHovered] = useState(false);
    const featuredCertifications = profile.certifications.slice(-2).reverse();

    const introTexts = [
        "AI Engineer specializing in generative AI programming, advanced large language models, and multimodal visual processing.",
        "Extensive experience developing enterprise-grade chatbot systems and voice interaction pipelines optimized for high-concurrency environments.",
        "Proficient in leveraging state-of-the-art AI frameworks to tackle complex challenges in natural language processing.",
        "Adept at integrating cutting-edge models and architectures to deliver scalable, efficient solutions.",
    ];

    return (
        <MainLayout>
            {/* Dynamic Background */}
            <DynamicBackground />

            {/* SVG Filter for Liquid Glass lens refraction */}
            <svg
                className="absolute w-0 h-0 pointer-events-none opacity-0"
                aria-hidden="true"
            >
                <defs>
                    <filter
                        id="glass-refraction"
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="140%"
                        colorInterpolationFilters="sRGB"
                    >
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.035 0.035"
                            numOctaves="3"
                            result="noise"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale="12"
                            xChannelSelector="R"
                            yChannelSelector="G"
                            result="displaced"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Hero Section */}
            <section className="hero-section pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-6 relative">
                    {/* Background Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-5 rounded-full filter blur-3xl -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary opacity-5 rounded-full filter blur-3xl -z-10"></div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="md:col-span-7 flex flex-col"
                        >
                            <div className="py-4 my-2">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider !bg-transparent !bg-none text-transparent">
                                    <span className="animated-border-text">
                                        {profile.name}
                                    </span>
                                </h1>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-300">
                                <span className="text-secondary text-shadow-secondary">
                                    {profile.title}
                                </span>
                            </h2>

                            <TypingAnimation
                                texts={introTexts}
                                className="block text-lg md:text-xl max-w-xl leading-relaxed mb-8 mt-2 min-h-[120px] sm:min-h-[96px] md:min-h-[84px] lg:min-h-[72px]"
                            />

                            <div className="flex flex-wrap gap-6 mb-12">
                                <Link
                                    href="/projects"
                                    className="btn btn-primary group"
                                >
                                    View Projects
                                    <MorphIconWrapper
                                        from={ArrowRight}
                                        to={ArrowUpRight}
                                        className="ml-2"
                                        size={18}
                                    />
                                </Link>
                                <Link
                                    href="/resume"
                                    className="btn btn-outline"
                                >
                                    View Resume
                                </Link>
                            </div>

                            <div className="flex items-center gap-6">
                                <Link
                                    href={profile.social.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    className="text-gray-400 hover:text-primary transition-colors w-10 h-10 rounded-full flex items-center justify-center border border-gray-700 hover:border-primary"
                                >
                                    <MorphIconWrapper
                                        from={GithubIcon}
                                        to={GitBranch}
                                        size={20}
                                    />
                                </Link>
                                <Link
                                    href={profile.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="text-gray-400 hover:text-primary transition-colors w-10 h-10 rounded-full flex items-center justify-center border border-gray-700 hover:border-primary"
                                >
                                    <MorphIconWrapper
                                        from={LinkedinIcon}
                                        to={Share2}
                                        size={20}
                                    />
                                </Link>
                                <Link
                                    href={`mailto:${profile.email}`}
                                    aria-label="Email"
                                    className="text-gray-400 hover:text-primary transition-colors w-10 h-10 rounded-full flex items-center justify-center border border-gray-700 hover:border-primary"
                                >
                                    <MorphIconWrapper
                                        from={Mail}
                                        to={MailOpen}
                                        size={20}
                                    />
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.2,
                                ease: "easeOut",
                            }}
                            className="md:col-span-5 relative flex justify-center"
                        >
                            <motion.div
                                className="relative z-10 w-64 h-64 md:w-80 md:h-80 bg-gradient-primary rounded-full flex items-center justify-center overflow-hidden shadow-primary-glow cursor-pointer"
                                onHoverStart={() => setIsAvatarHovered(true)}
                                onHoverEnd={() => setIsAvatarHovered(false)}
                                whileHover={{
                                    scale: 1.02,
                                    transition: { duration: 0.3 },
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Inner glow effect with dynamic intensity */}
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/40 to-secondary/40 z-10"
                                    animate={{
                                        opacity: isAvatarHovered ? 0.7 : 0.5,
                                    }}
                                    transition={{ duration: 0.5 }}
                                ></motion.div>

                                {/* Avatar container with focus effect */}
                                <div className="relative w-[94%] h-[94%] rounded-full overflow-hidden z-20">
                                    {/* Vignette overlay for edge blur effect */}
                                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_10px_rgba(0,0,0,0.3)] z-30"></div>

                                    <Image
                                        src={ImagePaths.profile.avatar}
                                        alt={`${profile.name}'s avatar`}
                                        width={320}
                                        height={320}
                                        className="object-cover w-full h-full scale-110 rounded-full filter saturate-[1.1] contrast-[1.05]"
                                        style={{
                                            objectPosition: "center 40%", // Adjust to focus more on the face
                                        }}
                                        priority
                                    />
                                </div>

                                {/* Outer glow ring with dynamic intensity */}
                                <motion.div
                                    className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 blur-sm -z-10"
                                    animate={{
                                        opacity: isAvatarHovered ? 0.85 : 0.7,
                                        scale: isAvatarHovered ? 1.03 : 1,
                                    }}
                                    transition={{ duration: 0.5 }}
                                ></motion.div>
                            </motion.div>

                            {/* Floating elements — Liquid Glass style */}
                            <motion.div
                                className="absolute top-10 -left-4 z-20 px-4 py-2.5 ml-4 rounded-xl bg-gray-900/85 backdrop-blur-md border border-white/10 shadow-xl cursor-default"
                                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                whileHover={{ scale: 1.05, y: -3 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.4,
                                    type: "spring",
                                    stiffness: 100,
                                }}
                            >
                                <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                    Working on
                                </div>
                                <div className="text-sm font-bold text-white">
                                    AI Engineering
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute bottom-10 -right-4 z-20 px-4 py-2.5 mr-4 rounded-xl bg-gray-900/85 backdrop-blur-md border border-white/10 shadow-xl cursor-default"
                                initial={{ opacity: 0, x: 30, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                whileHover={{ scale: 1.05, y: -3 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.6,
                                    type: "spring",
                                    stiffness: 100,
                                }}
                            >
                                <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                    Focusing on
                                </div>
                                <div className="text-sm font-bold text-white leading-snug">
                                    <div className="whitespace-nowrap">
                                        Agentic AI · Speech & Audio AI
                                    </div>
                                    <div>Optimize Model</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Key facts section */}
            <section className="py-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            className="flex flex-col items-center text-center h-full min-h-[260px] p-6 backdrop-blur-sm bg-gray-900/30 rounded-lg border border-gray-700/50 hover:border-primary/40 transition-all duration-300"
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                type: "spring",
                                stiffness: 100,
                            }}
                            whileHover={{ y: -6, scale: 1.02 }}
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center mb-4 shadow-primary-glow">
                                <MorphIconWrapper
                                    from={Award}
                                    to={Trophy}
                                    className="text-primary"
                                    size={24}
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-shadow-primary">
                                Education
                            </h3>
                            <div className="flex-grow flex flex-col justify-center w-full">
                                <p className="text-gray-300 mb-3">
                                    {profile.education.degree}
                                </p>
                                <p className="text-gray-300">
                                    {profile.education.university}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex flex-col items-center text-center h-full min-h-[260px] p-6 backdrop-blur-sm bg-gray-900/30 rounded-lg border border-gray-700/50 hover:border-secondary/40 transition-all duration-300"
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: 0.12,
                                type: "spring",
                                stiffness: 100,
                            }}
                            whileHover={{ y: -6, scale: 1.02 }}
                        >
                            <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center mb-4 shadow-secondary-glow">
                                <MorphIconWrapper
                                    from={Briefcase}
                                    to={FolderGit2}
                                    className="text-secondary"
                                    size={24}
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-shadow-secondary">
                                Certifications
                            </h3>
                            <div className="flex-grow flex flex-col justify-center w-full">
                                {featuredCertifications.map((cert, idx) => (
                                    <div
                                        key={`${cert.title}-${cert.issuer}`}
                                        className={
                                            idx <
                                            featuredCertifications.length - 1
                                                ? "mb-4"
                                                : ""
                                        }
                                    >
                                        <p className="text-gray-300 mb-1">
                                            {cert.title}
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            {cert.issuer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex flex-col items-center text-center h-full min-h-[260px] p-6 backdrop-blur-sm bg-gray-900/30 rounded-lg border border-gray-700/50 hover:border-accent/40 transition-all duration-300"
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: 0.24,
                                type: "spring",
                                stiffness: 100,
                            }}
                            whileHover={{ y: -6, scale: 1.02 }}
                        >
                            <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center mb-4 shadow-accent-glow">
                                <MorphIconWrapper
                                    from={Globe}
                                    to={Languages}
                                    className="text-accent"
                                    size={24}
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-shadow-accent">
                                Languages
                            </h3>
                            <div className="flex-grow flex flex-col justify-center w-full">
                                {profile.skills.languages.map(
                                    (lang, index, arr) => (
                                        <p
                                            key={index}
                                            className={`text-gray-300 ${
                                                index < arr.length - 1
                                                    ? "mb-3"
                                                    : ""
                                            }`}
                                        >
                                            {lang.language} - {lang.level}
                                        </p>
                                    ),
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="section py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold mb-4">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                                    Technical Skills
                                </span>
                            </h2>
                            <p className="text-gray-300 max-w-2xl mx-auto text-base">
                                Skills and technologies I've gained experience
                                in.
                            </p>
                        </motion.div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-5 xl:gap-6 items-stretch">
                        {profile.skills.technical.map((skill, index) => {
                            const config =
                                skillCategoryConfigs[index] ||
                                skillCategoryConfigs[0];
                            return (
                                <motion.div
                                    key={skill.category}
                                    initial={{ opacity: 0, y: 35, scale: 0.93 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.09,
                                        type: "spring",
                                        stiffness: 100,
                                    }}
                                    whileHover={{
                                        y: -6,
                                        scale: 1.02,
                                        transition: { duration: 0.2 },
                                    }}
                                    className="group relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(20%-16px)] xl:w-[calc(20%-20px)] min-w-[210px] p-6 backdrop-blur-md bg-gray-900/40 hover:bg-gray-900/70 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col justify-between"
                                >
                                    {/* Subtle top border accent */}
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/50 via-secondary/40 to-accent/40 rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity" />

                                    <div className="flex flex-col h-full">
                                        {/* Header: Icon badge + Title */}
                                        <div className="flex items-center gap-3 mb-5 min-h-[48px]">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-800/90 border border-gray-700/70 group-hover:border-gray-600 transition-all shadow-sm">
                                                {config.icon}
                                            </div>
                                            <h3 className="font-bold text-base xl:text-lg leading-tight text-gray-100 group-hover:text-white transition-colors">
                                                {skill.category}
                                            </h3>
                                        </div>

                                        {/* Skill items */}
                                        <ul className="space-y-3 flex-1">
                                            {skill.items.map((item) => (
                                                <li
                                                    key={item}
                                                    className="text-gray-300 group/item flex items-start gap-2.5 text-sm leading-relaxed"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 bg-primary/70 group-hover/item:bg-primary group-hover/item:scale-125 transition-all" />
                                                    <span className="break-words font-medium text-gray-300 group-hover/item:text-gray-100 transition-colors">
                                                        {item}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="section py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold mb-4">
                                <span className="text-primary text-shadow-primary">
                                    Featured Projects
                                </span>
                            </h2>
                            <p className="text-gray-300 max-w-2xl mx-auto text-base">
                                Some of my notable projects I've worked on
                                recently.
                            </p>
                        </motion.div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {profile.projects.slice(0, 3).map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 35, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.12,
                                    type: "spring",
                                    stiffness: 90,
                                }}
                                whileHover={{
                                    y: -6,
                                    transition: { duration: 0.2 },
                                }}
                                className="overflow-hidden backdrop-blur-sm bg-gray-900/30 rounded-lg border border-gray-700/50 hover:border-primary/40 transition-all duration-300"
                            >
                                <div className="h-40 relative overflow-hidden rounded-t-lg">
                                    <ProjectImage
                                        src={
                                            project.thumbnail ||
                                            project.image ||
                                            "/images/ui/project-placeholder.svg"
                                        }
                                        alt={project.title}
                                        title={project.title}
                                        className="w-full h-full object-cover object-center"
                                        priority={index === 0}
                                    />
                                </div>
                                <div className="p-6">
                                    <h3
                                        className={`font-semibold text-xl mb-3 ${
                                            index === 0
                                                ? "text-primary text-shadow-primary"
                                                : index === 1
                                                  ? "text-secondary text-shadow-secondary"
                                                  : "text-accent text-shadow-accent"
                                        }`}
                                    >
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-300 mb-4">
                                        {project.description}
                                    </p>
                                    {/* {project.details && (
                                        <ul className="list-disc list-inside text-sm text-gray-300 mb-6 pl-2">
                                            {project.details.map(
                                                (detail, index) => (
                                                    <li
                                                        key={index}
                                                        className="mb-1"
                                                    >
                                                        {detail}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    )} */}
                                    <Link
                                        href={
                                            project.slug
                                                ? `/projects/${project.slug}`
                                                : "/projects"
                                        }
                                        className={`hover:text-${
                                            index === 0
                                                ? "primary"
                                                : index === 1
                                                  ? "secondary"
                                                  : "accent"
                                        } font-medium inline-flex items-center transition-colors`}
                                    >
                                        View Details
                                        <MorphIconWrapper
                                            from={ArrowRight}
                                            to={ArrowUpRight}
                                            className="ml-2"
                                            size={16}
                                        />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link href="/projects" className="btn btn-outline">
                            View All Projects
                        </Link>
                    </div>
                </div>
            </section>
            {/* Google Cloud Skill Badges */}
            <section className="py-16">
                <div className="container mx-auto px-4 md:px-6 mb-10">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold mb-3">
                            <span className="text-secondary text-shadow-secondary">
                                Google Cloud Skill Badges
                            </span>
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Verified credentials earned on Google Cloud Skills
                            Boost
                        </p>
                    </motion.div>
                </div>

                {/* Marquee — clipped and faded within the container boundary */}
                <div
                    className="container mx-auto px-4 md:px-6 overflow-hidden"
                    style={{
                        maskImage:
                            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                        WebkitMaskImage:
                            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                    }}
                >
                    <div
                        className="flex"
                        style={{
                            gap: "64px",
                            width: "max-content",
                            animation: "marquee 28s linear infinite",
                        }}
                    >
                        {[
                            "https://cdn.qwiklabs.com/bBm0Xa704q%2B7D3OgWQF3GN2z8fnYiOiYf2uLhJ0ICcg%3D",
                            "https://cdn.qwiklabs.com/MgEJopIn%2B0%2FRgVYyRdN9oKCXlBaCo109DBffcXaRQLw%3D",
                            "https://cdn.qwiklabs.com/UBftucJEwdVxtDjjtdRGNUDHqrGta4rbgbfuZZzPST4%3D",
                            "https://cdn.qwiklabs.com/R%2BYhbP40DQcgaBNwV5nSLyIehXVx2j9KZslV6rCb9K4%3D",
                            "https://cdn.qwiklabs.com/LXKNPzUg6ccZ2XjPlMEPAPboNI4Mk6E%2FSXOz9Rd7EGo%3D",
                            "https://cdn.qwiklabs.com/%2FvUnhNLXU3u4eWSxsIDrnnTYROA7NpzxNZgLJ5B3gVM%3D",
                            "https://cdn.qwiklabs.com/pcY2o7HIWRjjwiJ6Vphnb4NkTe1BVJEZk9gVmEQijnk%3D",
                            "https://cdn.qwiklabs.com/1f%2FoEwyOkH3Qc9LiPgj9Ru9vgSY5gJ7yW006hj1KBg0%3D",
                            // duplicate for seamless loop
                            "https://cdn.qwiklabs.com/bBm0Xa704q%2B7D3OgWQF3GN2z8fnYiOiYf2uLhJ0ICcg%3D",
                            "https://cdn.qwiklabs.com/MgEJopIn%2B0%2FRgVYyRdN9oKCXlBaCo109DBffcXaRQLw%3D",
                            "https://cdn.qwiklabs.com/UBftucJEwdVxtDjjtdRGNUDHqrGta4rbgbfuZZzPST4%3D",
                            "https://cdn.qwiklabs.com/R%2BYhbP40DQcgaBNwV5nSLyIehXVx2j9KZslV6rCb9K4%3D",
                            "https://cdn.qwiklabs.com/LXKNPzUg6ccZ2XjPlMEPAPboNI4Mk6E%2FSXOz9Rd7EGo%3D",
                            "https://cdn.qwiklabs.com/%2FvUnhNLXU3u4eWSxsIDrnnTYROA7NpzxNZgLJ5B3gVM%3D",
                            "https://cdn.qwiklabs.com/pcY2o7HIWRjjwiJ6Vphnb4NkTe1BVJEZk9gVmEQijnk%3D",
                            "https://cdn.qwiklabs.com/1f%2FoEwyOkH3Qc9LiPgj9Ru9vgSY5gJ7yW006hj1KBg0%3D",
                        ].map((src, i) => (
                            <a
                                key={i}
                                href="https://www.skills.google/public_profiles/802d5f0c-216e-4500-9b99-b40a159c01b4"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 hover:opacity-80 hover:scale-105 transition-all duration-200"
                            >
                                <Image
                                    src={src}
                                    alt={`Google Cloud Skill Badge ${(i % 8) + 1}`}
                                    width={240}
                                    height={240}
                                    className="object-contain"
                                    style={{ width: 240, height: 240 }}
                                    unoptimized
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
