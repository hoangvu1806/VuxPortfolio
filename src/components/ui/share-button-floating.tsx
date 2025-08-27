"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShareButton } from "./share-button";
import { FiShare2 } from "react-icons/fi";

interface ShareButtonFloatingProps {
    url: string;
    title: string;
    description?: string;
}

export function ShareButtonFloating({ url, title, description }: ShareButtonFloatingProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show floating button after scrolling 300px
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.3 }}
                    className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
                >
                    <div className="flex flex-col items-center gap-3 p-3 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl">
                        <ShareButton
                            url={url}
                            title={title}
                            description={description}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}