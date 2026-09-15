"use client";

import Link from "next/link";
import {
    GitBranch,
    Share2,
    Mail,
    MailOpen,
    ArrowUp,
    ChevronsUp,
    Home,
    Sparkles,
    User,
    Smile,
    Briefcase,
    FolderGit2,
    FileText,
    Scroll,
    BookOpen,
    BookMarked,
    MapPin,
    Navigation,
    Phone,
    PhoneCall,
} from "lucide";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { MorphIconWrapper } from "@/components/ui/morph-icon";
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
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 shadow-md text-gray-200 hover:text-primary transition-colors group"
                                aria-label="GitHub"
                            >
                                <MorphIconWrapper
                                    from={GithubIcon}
                                    to={GitBranch}
                                    trigger="hover"
                                    size={18}
                                />
                            </Link>
                            <Link
                                href={profile.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 shadow-md text-gray-400 hover:text-primary transition-colors group"
                                aria-label="LinkedIn"
                            >
                                <MorphIconWrapper
                                    from={LinkedinIcon}
                                    to={Share2}
                                    trigger="hover"
                                    size={18}
                                />
                            </Link>
                            <Link
                                href={`mailto:${profile.email}`}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 shadow-md text-gray-400 hover:text-primary transition-colors group"
                                aria-label="Email"
                            >
                                <MorphIconWrapper
                                    from={Mail}
                                    to={MailOpen}
                                    trigger="hover"
                                    size={18}
                                />
                            </Link>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <h3 className="font-bold text-lg mb-6 text-white text-shadow-sm">
                            Menu
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <MorphIconWrapper
                                        from={Home}
                                        to={Sparkles}
                                        trigger="hover"
                                        size={16}
                                    />
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <MorphIconWrapper
                                        from={User}
                                        to={Smile}
                                        trigger="hover"
                                        size={16}
                                    />
                                    <span>About</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/projects"
                                    className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <MorphIconWrapper
                                        from={Briefcase}
                                        to={FolderGit2}
                                        trigger="hover"
                                        size={16}
                                    />
                                    <span>Projects</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/resume"
                                    className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <MorphIconWrapper
                                        from={FileText}
                                        to={Scroll}
                                        trigger="hover"
                                        size={16}
                                    />
                                    <span>Resume</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <MorphIconWrapper
                                        from={BookOpen}
                                        to={BookMarked}
                                        trigger="hover"
                                        size={16}
                                    />
                                    <span>Blog</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <h3 className="font-bold text-lg mb-6 text-white text-shadow-sm">
                            Contact
                        </h3>
                        <ul className="space-y-4">
                            <li className="text-gray-200 flex items-start gap-2 drop-shadow-sm">
                                <MorphIconWrapper
                                    from={MapPin}
                                    to={Navigation}
                                    trigger="hover"
                                    size={18}
                                    className="mt-0.5 text-primary"
                                />
                                <div>
                                    {profile.location.address}
                                    <br />
                                    {profile.location.district},{" "}
                                    {profile.location.city}
                                    <br />
                                    {profile.location.country}
                                </div>
                            </li>
                            <li className="text-gray-200 flex items-center gap-2 drop-shadow-sm group">
                                <MorphIconWrapper
                                    from={Mail}
                                    to={MailOpen}
                                    trigger="hover"
                                    size={18}
                                    className="text-primary"
                                />
                                <Link
                                    href={`mailto:${profile.email}`}
                                    className="hover:text-primary transition-colors"
                                >
                                    {profile.email}
                                </Link>
                            </li>
                            <li className="text-gray-200 flex items-center gap-2 drop-shadow-sm group">
                                <MorphIconWrapper
                                    from={Phone}
                                    to={PhoneCall}
                                    trigger="hover"
                                    size={18}
                                    className="text-primary"
                                />
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
                        className="p-3 bg-gray-800 hover:bg-primary hover:text-white rounded-full shadow-md transition-colors group"
                        whileHover={{ y: -5 }}
                        aria-label="Back to top"
                    >
                        <MorphIconWrapper
                            from={ArrowUp}
                            to={ChevronsUp}
                            trigger="hover"
                            size={18}
                        />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
}
