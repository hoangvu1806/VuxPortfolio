"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    X,
    Home,
    User,
    Briefcase,
    BookOpen,
    FileText,
    Mail,
} from "lucide";
import { MorphIconWrapper } from "@/components/ui/morph-icon";
import { ImagePaths } from "@/utils/image-paths";
import Image from "next/image";

const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: User },
    { name: "Projects", path: "/projects", icon: Briefcase },
    { name: "Blog", path: "/blog", icon: BookOpen },
    { name: "Resume", path: "/resume", icon: FileText },
    { name: "Contact", path: "/contact", icon: Mail },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled ? "header-blur py-3 shadow-sm" : "bg-transparent py-5"
            }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="relative flex items-center justify-between">
                    <Link href="/" className="relative z-10 flex items-center">
                        <motion.div
                            className="text-2xl font-bold flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-10 h-10 rounded-lg overflow-hidden mr-2">
                                <Image
                                    src={ImagePaths.ui.logo}
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="flex flex-col">
                                <span className="logo-text">VU HOANG</span>
                                <span className="logo-subtitle">
                                    AI-DEAS FOR BRIGHT MINDS
                                </span>
                            </span>
                        </motion.div>
                    </Link>

                    {/* Centered Desktop / Tablet Menu */}
                    <nav className="header-desktop-nav absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 items-center gap-4 lg:gap-6 xl:gap-8">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                            >
                                <Link
                                    href={item.path}
                                    className={`relative whitespace-nowrap text-xs lg:text-sm font-medium transition-all duration-300 px-2 py-1 rounded-md ${
                                        pathname === item.path
                                            ? "text-primary bg-primary/20 font-semibold"
                                            : "text-gray-100 hover:text-primary"
                                    }`}
                                >
                                    {item.name}
                                    {pathname === item.path && (
                                        <motion.span
                                            layoutId="header-underline"
                                            className="absolute left-1/2 bottom-0 block h-[2px] bg-primary rounded-full transform -translate-x-1/2"
                                            style={{
                                                width: "calc(100% - 0.75rem)",
                                            }}
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{
                                                duration: 0.3,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Mobile Menu Toggle - Only show on small screens */}
                    <div className="header-mobile-toggle ml-auto items-center">
                        <button
                            className="inline-flex p-2 rounded-md bg-transparent text-gray-300 hover:bg-gray-800/50 transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={
                                mobileMenuOpen ? "Close menu" : "Open menu"
                            }
                        >
                            <MorphIconWrapper
                                from={Menu}
                                to={X}
                                active={mobileMenuOpen}
                                trigger="controlled"
                                size={20}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="header-mobile-menu mx-4 mt-2 p-1.5 rounded-lg bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden"
                    >
                        <nav className="flex flex-col gap-0.5">
                            {navItems.map((item) => {
                                const isActive = pathname === item.path;
                                return (
                                    <Link
                                        key={`mobile-${item.name}`}
                                        href={item.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? "bg-primary/10 text-primary"
                                                : "text-gray-300 hover:text-white hover:bg-white/5"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <MorphIconWrapper
                                                from={item.icon}
                                                size={16}
                                                className={
                                                    isActive
                                                        ? "text-primary"
                                                        : "text-gray-400"
                                                }
                                            />
                                            <span>{item.name}</span>
                                        </div>
                                        {isActive && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
