"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiGlobe } from "react-icons/fi";

interface LanguageSwitcherProps {
    currentSlug: string;
    className?: string;
}

export function LanguageSwitcher({
    currentSlug,
    className = "",
}: LanguageSwitcherProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState<"vi" | "en">("vi");

    useEffect(() => {
        const lang = searchParams.get("language");
        setCurrentLang(lang === "en" ? "en" : "vi");
    }, [searchParams]);

    const handleLanguageChange = (lang: "vi" | "en") => {
        setIsOpen(false);
        if (lang === "vi") {
            router.push(`/blog/${currentSlug}`);
        } else {
            router.push(`/blog/${currentSlug}?language=en`);
        }
    };

    return (
        <div className={`relative ${className}`}>
            {/* Language Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 rounded-xl font-medium hover:from-primary/30 hover:to-secondary/30 hover:border-primary/50 hover:scale-105 transition-all duration-300 backdrop-blur-sm shadow-lg group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Switch language"
            >
                <FiGlobe
                    size={16}
                    className="group-hover:rotate-12 transition-transform duration-300"
                />
                <span className="text-sm font-medium uppercase">
                    {currentLang}
                </span>
            </motion.button>

            {/* Language Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 right-0 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl p-2 min-w-[140px] z-50"
                    >
                        <div className="space-y-1">
                            {/* Vietnamese Option */}
                            <motion.button
                                onClick={() => handleLanguageChange("vi")}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 w-full ${
                                    currentLang === "vi"
                                        ? "text-primary bg-primary/20 font-semibold"
                                        : "text-gray-300 hover:text-primary hover:bg-primary/10"
                                }`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0 }}
                                whileHover={{ x: 4 }}
                            >
                                <span className="text-sm font-medium">
                                    Tiếng Việt
                                </span>
                            </motion.button>

                            {/* English Option */}
                            <motion.button
                                onClick={() => handleLanguageChange("en")}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 w-full ${
                                    currentLang === "en"
                                        ? "text-primary bg-primary/20 font-semibold"
                                        : "text-gray-300 hover:text-primary hover:bg-primary/10"
                                }`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 }}
                                whileHover={{ x: 4 }}
                            >
                                <span className="text-sm font-medium">
                                    English
                                </span>
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop to close dropdown */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}
