"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { profile } from "@/data/profile";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    FiDownload,
    FiAward,
    FiBriefcase,
    FiCode,
    FiStar,
    FiBookOpen,
    FiLayers,
    FiGlobe,
    FiMail,
    FiPhone,
    FiMapPin,
} from "react-icons/fi";
import Link from "next/link";
import { useRef } from "react";

export default function ResumePage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0.3, 1, 1, 0.7]
    );
    const scale = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0.95, 1, 1, 0.98]
    );

    const SkillBar = ({ title, level }: { title: string; level: number }) => (
        <div className="mb-3">
            <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">
                    {title}
                </span>
                <span className="text-sm font-medium text-primary">
                    {level}%
                </span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.1 }}
                />
            </div>
        </div>
    );

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
                        Resume
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                        My experience, education, and professional skills
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            href="/resume.pdf"
                            className="inline-flex items-center justify-center px-8 py-3 font-medium bg-gradient-to-r from-primary to-secondary text-white transition-all rounded-lg shadow-lg hover:shadow-primary-glow"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Download PDF <FiDownload className="ml-2" />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            <div className="container px-4 md:px-6 mx-auto" ref={containerRef}>
                <div className="max-w-5xl mx-auto">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative backdrop-blur-sm bg-gray-900/30 rounded-2xl overflow-hidden shadow-xl border border-gray-700/50 mb-16"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                        <div className="p-8 md:p-10">
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-grow">
                                    <h2 className="text-3xl font-bold text-gray-100 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                        {profile.name}
                                    </h2>
                                    <h3 className="text-xl text-primary mb-6">
                                        {profile.title}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-gray-300">
                                        <div className="flex items-start gap-2">
                                            <FiMapPin className="mt-1 text-primary" />
                                            <div>
                                                <p>
                                                    {profile.location.address}
                                                </p>
                                                <p>
                                                    {profile.location.city},{" "}
                                                    {profile.location.district}
                                                </p>
                                                <p>
                                                    {profile.location.country}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="flex items-center gap-2 mb-2">
                                                <FiMail className="text-primary" />
                                                <a
                                                    href={`mailto:${profile.email}`}
                                                    className="hover:text-primary transition-colors"
                                                >
                                                    {profile.email}
                                                </a>
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <FiPhone className="text-primary" />
                                                <a
                                                    href={`tel:${profile.phone}`}
                                                    className="hover:text-primary transition-colors"
                                                >
                                                    {profile.phone}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {/* Left Column */}
                        <div className="md:col-span-1 space-y-8">
                            {/* Education Section */}
                            <motion.div
                                style={{ opacity, scale }}
                                className="relative backdrop-blur-sm bg-gray-900/30 rounded-xl overflow-hidden shadow-lg border border-gray-700/50"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-light"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-100 flex items-center gap-2 mb-6">
                                        <FiBookOpen className="text-primary" />
                                        <span>Education</span>
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="relative pl-8 pb-5 border-l-2 border-gray-700">
                                            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary shadow-primary-glow"></div>
                                            <h4 className="text-lg font-semibold text-gray-100">
                                                {profile.education.university}
                                            </h4>
                                            <p className="text-primary mb-1">
                                                {profile.education.degree}
                                            </p>
                                            <p className="text-gray-300 text-sm">
                                                Expected graduation:{" "}
                                                {profile.education.graduation}
                                            </p>
                                            <p className="text-gray-300 text-sm">
                                                GPA: {profile.education.gpa}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Certifications Section */}
                            <motion.div
                                style={{ opacity, scale }}
                                className="relative backdrop-blur-sm bg-gray-900/30 rounded-xl overflow-hidden shadow-lg border border-gray-700/50"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-secondary-light"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-100 flex items-center gap-2 mb-6">
                                        <FiAward className="text-secondary" />
                                        <span>Certifications</span>
                                    </h3>

                                    <div className="space-y-5">
                                        {profile.certifications.map(
                                            (cert, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay: index * 0.1,
                                                    }}
                                                    className="relative pl-8 pb-5 border-l-2 border-gray-700 last:pb-0"
                                                >
                                                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-secondary shadow-secondary-glow"></div>
                                                    <h4 className="text-base font-semibold text-gray-100 mb-1">
                                                        {cert.title}
                                                    </h4>
                                                    <p className="text-gray-300 text-sm">
                                                        {cert.issuer}
                                                    </p>
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Languages Section */}
                            <motion.div
                                style={{ opacity, scale }}
                                className="relative backdrop-blur-sm bg-gray-900/30 rounded-xl overflow-hidden shadow-lg border border-gray-700/50"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-light"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-100 flex items-center gap-2 mb-6">
                                        <FiGlobe className="text-accent" />
                                        <span>Languages</span>
                                    </h3>

                                    <div className="space-y-5">
                                        {profile.skills.languages.map(
                                            (lang, index) => (
                                                <motion.div
                                                    key={lang.language}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 10,
                                                    }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay: index * 0.1,
                                                    }}
                                                >
                                                    <div className="flex justify-between mb-2">
                                                        <span className="font-medium text-gray-200">
                                                            {lang.language}
                                                        </span>
                                                        <span className="text-accent">
                                                            {lang.level}
                                                        </span>
                                                    </div>
                                                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className="h-full bg-gradient-to-r from-accent to-accent-light"
                                                            initial={{
                                                                width: 0,
                                                            }}
                                                            whileInView={{
                                                                width:
                                                                    lang.level ===
                                                                        "Native"
                                                                        ? "100%"
                                                                        : lang.level ===
                                                                            "Fluent"
                                                                            ? "90%"
                                                                            : lang.level ===
                                                                                "Advanced"
                                                                                ? "80%"
                                                                                : lang.level ===
                                                                                    "Intermediate"
                                                                                    ? "60%"
                                                                                    : "40%",
                                                            }}
                                                            viewport={{
                                                                once: true,
                                                            }}
                                                            transition={{
                                                                duration: 1,
                                                                delay: 0.2,
                                                            }}
                                                        />
                                                    </div>
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column (main content) */}
                        <div className="md:col-span-2 space-y-8">
                            {/* Projects Section */}
                            <motion.div
                                style={{ opacity, scale }}
                                className="relative backdrop-blur-sm bg-gray-900/30 rounded-xl overflow-hidden shadow-lg border border-gray-700/50"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-100 flex items-center gap-2 mb-6">
                                        <FiBriefcase className="text-primary" />
                                        <span>Projects & Competitions</span>
                                    </h3>

                                    <div className="space-y-8">
                                        {profile.projects.map(
                                            (project, index) => (
                                                <motion.div
                                                    key={project.title}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 20,
                                                    }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay: index * 0.1,
                                                    }}
                                                    className="relative pl-8 pb-8 border-l-2 border-gray-700 last:pb-0"
                                                >
                                                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary shadow-xl"></div>
                                                    <h4 className="text-lg font-semibold text-gray-100 mb-2">
                                                        {project.title}
                                                    </h4>
                                                    <p className="text-gray-300 mb-3">
                                                        {project.description}
                                                    </p>
                                                    {project.details && (
                                                        <ul className="space-y-1">
                                                            {project.details.map(
                                                                (detail, i) => (
                                                                    <li
                                                                        key={i}
                                                                        className="text-gray-300 flex items-start"
                                                                    >
                                                                        <span className="text-primary mr-2 mt-1">
                                                                            •
                                                                        </span>
                                                                        <span>
                                                                            {
                                                                                detail
                                                                            }
                                                                        </span>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    )}
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Technical Skills Section */}
                            <motion.div
                                style={{ opacity, scale }}
                                className="relative backdrop-blur-sm bg-gray-900/30 rounded-xl overflow-hidden shadow-lg border border-gray-700/50"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-accent"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-100 flex items-center gap-2 mb-6">
                                        <FiCode className="text-secondary" />
                                        <span>Technical Skills</span>
                                    </h3>

                                    <div className="space-y-6">
                                        {profile.skills.technical.map(
                                            (skillGroup, index) => (
                                                <motion.div
                                                    key={skillGroup.category}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 20,
                                                    }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay: index * 0.1,
                                                    }}
                                                >
                                                    <h4 className="text-base font-semibold text-gray-100 mb-3 flex items-center">
                                                        <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                                                        {skillGroup.category}
                                                    </h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                        {skillGroup.items.map(
                                                            (skill, i) => (
                                                                <div
                                                                    key={i}
                                                                    className="flex items-center gap-2 text-gray-300"
                                                                >
                                                                    <span className="text-secondary">
                                                                        •
                                                                    </span>
                                                                    {skill}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Soft Skills Section */}
                            <motion.div
                                style={{ opacity, scale }}
                                className="relative backdrop-blur-sm bg-gray-900/30 rounded-xl overflow-hidden shadow-lg border border-gray-700/50"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-100 flex items-center gap-2 mb-6">
                                        <FiStar className="text-accent" />
                                        <span>Soft Skills & Interests</span>
                                    </h3>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-base font-semibold text-gray-100 mb-3 flex items-center">
                                                <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                                                Soft Skills
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {profile.skills.soft.map(
                                                    (skill, i) => (
                                                        <motion.span
                                                            key={i}
                                                            initial={{
                                                                opacity: 0,
                                                                scale: 0.9,
                                                            }}
                                                            whileInView={{
                                                                opacity: 1,
                                                                scale: 1,
                                                            }}
                                                            viewport={{
                                                                once: true,
                                                            }}
                                                            transition={{
                                                                duration: 0.4,
                                                                delay: i * 0.05,
                                                            }}
                                                            whileHover={{
                                                                scale: 1.05,
                                                            }}
                                                            className="px-3 py-1.5 bg-accent-900/20 text-accent-300 rounded-full text-sm"
                                                        >
                                                            {skill}
                                                        </motion.span>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-base font-semibold text-gray-100 mb-3 flex items-center">
                                                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                                                Interests
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {profile.interests.map(
                                                    (interest, i) => (
                                                        <motion.span
                                                            key={i}
                                                            initial={{
                                                                opacity: 0,
                                                                scale: 0.9,
                                                            }}
                                                            whileInView={{
                                                                opacity: 1,
                                                                scale: 1,
                                                            }}
                                                            viewport={{
                                                                once: true,
                                                            }}
                                                            transition={{
                                                                duration: 0.4,
                                                                delay: i * 0.05,
                                                            }}
                                                            whileHover={{
                                                                scale: 1.05,
                                                            }}
                                                            className="px-3 py-1.5 bg-primary-900/20 text-primary-300 rounded-full text-sm"
                                                        >
                                                            {interest}
                                                        </motion.span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
