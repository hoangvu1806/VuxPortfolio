"use client";

import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

interface ScrollToTopProps {
    showAfter?: number; // Show button after scrolling this many pixels
    className?: string;
}

export function ScrollToTop({ 
    showAfter = 300, 
    className = "" 
}: ScrollToTopProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > showAfter) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, [showAfter]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 left-8 z-50 w-12 h-12 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-full flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary/50 hover:bg-gray-800/90 transition-all duration-300 hover:scale-110 shadow-lg ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            } ${className}`}
            aria-label="Scroll to top"
        >
            <FiArrowUp size={20} />
        </button>
    );
}