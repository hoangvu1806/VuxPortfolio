"use client";

import Link from "next/link";
import {
    FiGithub,
    FiLinkedin,
    FiMail,
    FiArrowUp,
    FiCode,
    FiHome,
    FiUser,
    FiBriefcase,
    FiFileText,
    FiBookOpen,
} from "react-icons/fi";
import { profile } from "@/data/profile";
import { ImagePaths } from "@/utils/image-paths";
import { motion } from "framer-motion";
import Image from "next/image";

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="relative overflow-hidden py-16">
            {/* Background image */}
            <Image
                src="/images/ui/footer.png"
                alt=""
                fill
                className="object-cover object-center opacity-55"
                priority={false}
                aria-hidden="true"
            />
            {/* Top fade — blends footer into the body background with no hard line */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#080b14] to-transparent pointer-events-none z-10" />
            {/* Bottom & side darkening overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60 pointer-events-none z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    <div className="md:col-span-5">
                        <div className="flex items-center mb-6 gap-2">
                            <div className="w-10 h-10 rounded-lg overflow-hidden">
                                <Image
                                    src={ImagePaths.ui.logo}
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="logo-text">VU HOANG</span>
                                <span className="logo-subtitle">
                                    AI-DEAS FOR BRIGHT MINDS
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-200 mb-6 max-w-md drop-shadow-md">
                            Researching and engineering intelligent systems with
                            Generative AI, AI Agents, and Computer Vision to
                            drive innovation and real-world impact
                        </p>
                        <div className="flex items-center gap-4">
                            <Link
                                href={profile.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 shadow-md text-gray-200 hover:text-primary transition-colors"
                                aria-label="GitHub"
                            >
                                <FiGithub size={18} />
                            </Link>
                            <Link
                                href={profile.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 shadow-md text-gray-400 hover:text-primary transition-colors"
                                aria-label="LinkedIn"
                            >
                                <FiLinkedin size={18} />
                            </Link>
                            <Link
                                href={`mailto:${profile.email}`}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 shadow-md text-gray-400 hover:text-primary transition-colors"
                                aria-label="Email"
                            >
                                <FiMail size={18} />
                            </Link>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="font-bold text-lg mb-6 text-white text-shadow-sm">
                            Menu
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2"
                                >
                                    <FiHome size={16} />
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2"
                                >
                                    <FiUser size={16} />
                                    <span>About</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/projects"
                                    className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2"
                                >
                                    <FiBriefcase size={16} />
                                    <span>Projects</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/resume"
                                    className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2"
                                >
                                    <FiFileText size={16} />
                                    <span>Resume</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                                >
                                    <FiBookOpen size={16} />
                                    <span>Blog</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <h4 className="font-bold text-lg mb-6 text-white text-shadow-sm">
                            Contact
                        </h4>
                        <ul className="space-y-4">
                            <li className="text-gray-200 flex items-start gap-2 drop-shadow-sm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mt-0.5 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <div>
                                    {profile.location.address}
                                    <br />
                                    {profile.location.district},{" "}
                                    {profile.location.city}
                                    <br />
                                    {profile.location.country}
                                </div>
                            </li>
                            <li className="text-gray-200 flex items-center gap-2 drop-shadow-sm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <Link
                                    href={`mailto:${profile.email}`}
                                    className="hover:text-primary transition-colors"
                                >
                                    {profile.email}
                                </Link>
                            </li>
                            <li className="text-gray-200 flex items-center gap-2 drop-shadow-sm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <span>{profile.phone}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-300 text-sm mb-4 md:mb-0 drop-shadow-sm">
                        © {new Date().getFullYear()} Do Hoang Vu. All Rights
                        Reserved.
                    </p>
                    <motion.button
                        onClick={scrollToTop}
                        className="p-3 bg-gray-800 hover:bg-primary hover:text-white rounded-full shadow-md transition-colors"
                        whileHover={{ y: -5 }}
                        aria-label="Back to top"
                    >
                        <FiArrowUp size={18} />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
}
