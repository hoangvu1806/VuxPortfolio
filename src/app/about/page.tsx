"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { profile } from "@/data/profile";
import { ImagePaths } from "@/utils/image-paths";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
    FiAward,
    FiBriefcase,
    FiMessageCircle,
    FiUser,
    FiCode,
    FiGlobe,
    FiMail,
    FiMapPin,
} from "react-icons/fi";

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Giữ nguyên hiệu ứng fade-in/fade-out nhưng điều chỉnh để không quá mờ ở cuối
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0.3, 1, 1, 0.7]
    );
    const scale = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0.8, 1, 1, 0.95]
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
                        About Me
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                        AI Engineer passionate about developing innovative
                        solutions in Generative AI, natural language processing,
                        and computer vision.
                    </p>
                </motion.div>
            </section>

            <div className="container px-4 md:px-6 mx-auto" ref={containerRef}>
                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto mb-20"
                >
                    <div className="relative backdrop-blur-sm bg-gray-900/30 rounded-2xl overflow-hidden shadow-xl border border-gray-700/50 p-1">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 md:p-8">
                            <div className="md:col-span-5 flex justify-center items-start">
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    className="relative group rounded-xl overflow-hidden shadow-lg border border-gray-700/50 w-full h-[350px]"
                                >
                                    <Image
                                        src={ImagePaths.profile.profile}
                                        alt={profile.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h3 className="text-xl font-semibold text-white text-shadow-primary">
                                            {profile.name}
                                        </h3>
                                        <p className="text-primary">
                                            {profile.title}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="md:col-span-7">
                                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                    {profile.name}
                                </h2>
                                <h3 className="text-xl mb-6 text-primary">
                                    {profile.title}
                                </h3>

                                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                                    I am an AI Engineer with a passion for
                                    developing creative solutions in Generative
                                    AI, Natural Language Processing, and
                                    Computer Vision. Currently pursuing a
                                    Bachelor's degree in Artificial Intelligence
                                    at Saigon International University, I
                                    combine academic knowledge with practical
                                    experience to create impactful AI
                                    applications.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 10,
                                        }}
                                        className="flex items-start space-x-3 backdrop-blur-sm bg-gray-800/40 p-4 rounded-lg border border-gray-700/50 shadow-lg min-w-0"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shadow-primary-glow flex-shrink-0">
                                            <FiMapPin className="text-xl text-primary" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-medium text-gray-200 mb-1">
                                                Location
                                            </h4>
                                            <p className="text-gray-300 text-sm break-words">
                                                {profile.location.city},{" "}
                                                {profile.location.country}
                                            </p>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 10,
                                        }}
                                        className="flex items-start space-x-3 backdrop-blur-sm bg-gray-800/40 p-4 rounded-lg border border-gray-700/50 shadow-lg min-w-0"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shadow-secondary-glow flex-shrink-0">
                                            <FiMail className="text-xl text-secondary" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-medium text-gray-200 mb-1">
                                                Email
                                            </h4>
                                            <p className="text-gray-300 text-sm break-all">
                                                {profile.email}
                                            </p>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 10,
                                        }}
                                        className="flex items-start space-x-3 backdrop-blur-sm bg-gray-800/40 p-4 rounded-lg border border-gray-700/50 shadow-lg min-w-0"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shadow-accent-glow flex-shrink-0">
                                            <FiAward className="text-xl text-accent" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-medium text-gray-200 mb-1">
                                                Education
                                            </h4>
                                            <p className="text-gray-300 text-sm break-words">
                                                {profile.education.university}
                                            </p>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 10,
                                        }}
                                        className="flex items-start space-x-3 backdrop-blur-sm bg-gray-800/40 p-4 rounded-lg border border-gray-700/50 shadow-lg min-w-0"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shadow-primary-glow flex-shrink-0">
                                            <FiUser className="text-xl text-primary" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-medium text-gray-200 mb-1">
                                                Degree
                                            </h4>
                                            <p className="text-gray-300 text-sm break-words">
                                                {profile.education.degree}
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Education Timeline */}
                <motion.div
                    style={{ opacity, scale }}
                    className="max-w-4xl mx-auto mb-20"
                >
                    <h2 className="text-3xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Education Timeline
                    </h2>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-accent rounded-full"></div>

                        <div className="space-y-12">
                            <div className="relative">
                                <div className="flex flex-col md:flex-row items-center">
                                    <div className="flex-1 md:text-right md:pr-10 mb-4 md:mb-0">
                                        <motion.div
                                            initial={{ opacity: 0, x: -50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6 }}
                                            className="backdrop-blur-sm bg-gray-900/30 p-6 rounded-xl border border-gray-700/50 shadow-xl"
                                        >
                                            <h3 className="text-xl font-bold text-gray-100">
                                                {profile.education.university}
                                            </h3>
                                            <p className="text-primary mb-2">
                                                {profile.education.degree}
                                            </p>
                                            <p className="text-gray-300">
                                                Expected graduation:{" "}
                                                {profile.education.graduation}
                                            </p>
                                            <p className="text-gray-300">
                                                GPA: {profile.education.gpa}
                                            </p>
                                        </motion.div>
                                    </div>
                                    <div className="z-10 flex-shrink-0 bg-gradient-primary rounded-full h-10 w-10 flex items-center justify-center shadow-primary-glow border-4 border-gray-900">
                                        <FiAward className="text-white" />
                                    </div>
                                    <div className="flex-1 md:pl-10 hidden md:block">
                                        {/* Empty space for alignment */}
                                    </div>
                                </div>
                            </div>

                            {profile.certifications.map((cert, index) => (
                                <div className="relative" key={index}>
                                    <div className="flex flex-col md:flex-row items-center">
                                        <div
                                            className={`flex-1 ${index % 2 === 0
                                                    ? "md:text-right md:pr-10"
                                                    : "md:pl-10 order-1 md:order-3"
                                                } mb-4 md:mb-0 ${index % 2 === 0
                                                    ? "order-1 md:order-1"
                                                    : "order-1 md:order-3"
                                                }`}
                                        >
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    x:
                                                        index % 2 === 0
                                                            ? -50
                                                            : 50,
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6 }}
                                                className="backdrop-blur-sm bg-gray-900/30 p-6 rounded-xl border border-gray-700/50 shadow-xl"
                                            >
                                                <h3 className="text-xl font-bold text-gray-100">
                                                    {cert.title}
                                                </h3>
                                                <p className="text-gray-300">
                                                    Issued by: {cert.issuer}
                                                </p>
                                            </motion.div>
                                        </div>
                                        <div className="z-10 flex-shrink-0 bg-gradient-secondary rounded-full h-10 w-10 flex items-center justify-center shadow-secondary-glow border-4 border-gray-900 order-2">
                                            <FiBriefcase className="text-white" />
                                        </div>
                                        <div
                                            className={`flex-1 ${index % 2 === 0
                                                    ? "md:pl-10 hidden md:block"
                                                    : "md:text-right md:pr-10"
                                                } ${index % 2 === 0
                                                    ? "order-3"
                                                    : "order-1 md:order-1 hidden md:block"
                                                }`}
                                        >
                                            {/* Empty space for alignment on alternating sides */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Skills Section */}
                <motion.div
                    style={{ opacity, scale }}
                    className="max-w-5xl mx-auto mb-20"
                >
                    <h2 className="text-3xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Professional Skills
                    </h2>

                    <div className="mb-12">
                        <h3 className="text-2xl font-semibold mb-8 text-center text-gray-200 flex items-center justify-center">
                            <FiCode className="mr-2 text-primary" />
                            <span>Technical Skills</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {profile.skills.technical.map((skill, index) => (
                                <motion.div
                                    key={skill.category}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    whileHover={{ y: -5 }}
                                    className="backdrop-blur-sm bg-gradient-to-br from-gray-900/80 to-gray-800/50 rounded-xl shadow-lg border border-gray-700/50 overflow-hidden"
                                >
                                    <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
                                    <div className="p-6">
                                        <h4 className="font-semibold mb-3 text-lg text-primary-400">
                                            {skill.category}
                                        </h4>
                                        <ul className="space-y-2 text-gray-300">
                                            {skill.items.map((item) => (
                                                <li
                                                    key={item}
                                                    className="flex items-start"
                                                >
                                                    <span className="text-secondary mr-2">
                                                        •
                                                    </span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-12">
                        <h3 className="text-2xl font-semibold mb-8 text-center text-gray-200 flex items-center justify-center">
                            <FiMessageCircle className="mr-2 text-secondary" />
                            <span>Soft Skills</span>
                        </h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {profile.skills.soft.map((skill, index) => (
                                <motion.div
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.05,
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-5 py-3 backdrop-blur-sm bg-gradient-to-br from-primary-900/30 to-primary-800/10 text-primary-300 rounded-full text-sm font-medium border border-primary-900/30 shadow-primary-glow"
                                >
                                    {skill}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-8 text-center text-gray-200 flex items-center justify-center">
                            <FiGlobe className="mr-2 text-accent" />
                            <span>Languages</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {profile.skills.languages.map((lang, index) => (
                                <motion.div
                                    key={lang.language}
                                    initial={{
                                        opacity: 0,
                                        x: index % 2 === 0 ? -20 : 20,
                                    }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    className="backdrop-blur-sm bg-gray-900/40 rounded-xl shadow-lg border border-gray-700/50 overflow-hidden"
                                >
                                    <div className="h-1 bg-gradient-to-r from-accent to-secondary"></div>
                                    <div className="p-6">
                                        <h4 className="font-semibold text-xl text-gray-200 mb-2">
                                            {lang.language}
                                        </h4>
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-accent">
                                                {lang.level}
                                            </p>
                                        </div>
                                        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-accent to-secondary"
                                                initial={{ width: 0 }}
                                                whileInView={{
                                                    width:
                                                        lang.level === "Native"
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
                                                viewport={{ once: true }}
                                                transition={{
                                                    duration: 1,
                                                    delay: 0.2,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Interests Section */}
                <motion.div
                    style={{ opacity, scale }}
                    className="max-w-4xl mx-auto mb-12"
                >
                    <h2 className="w-full text-3xl font-bold mb-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Interests
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {profile.interests.map((interest, index) => (
                            <motion.div
                                key={interest}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.05,
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: "rgba(99, 102, 241, 0.2)",
                                    borderColor: "rgba(99, 102, 241, 0.3)",
                                }}
                                className="px-6 py-3 backdrop-blur-sm bg-gray-800/40 text-gray-200 rounded-full text-sm font-medium border border-gray-700/50 shadow-md transition-all duration-300"
                            >
                                {interest}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </MainLayout>
    );
}
