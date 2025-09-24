"use client";

import { useState, useEffect } from "react";

interface ReadingProgressBarProps {
    target?: string; // CSS selector for the content to track
    className?: string;
}

export function ReadingProgressBar({ 
    target = "article", 
    className = "" 
}: ReadingProgressBarProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const targetElement = document.querySelector(target);
            if (!targetElement) return;

            const { top, height } = targetElement.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate how much of the article has been scrolled past
            const scrolled = Math.max(0, -top);
            const totalScrollable = Math.max(1, height - windowHeight);
            const progressPercentage = Math.min(100, (scrolled / totalScrollable) * 100);
            
            setProgress(progressPercentage);
        };

        // Update on scroll
        window.addEventListener("scroll", updateProgress);
        // Update on resize
        window.addEventListener("resize", updateProgress);
        // Initial update
        updateProgress();

        return () => {
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", updateProgress);
        };
    }, [target]);

    return (
        <>
            {/* Fixed progress bar at top */}
            <div className={`fixed top-0 left-0 right-0 z-50 h-1 bg-gray-800/50 backdrop-blur-sm ${className}`}>
                <div 
                    className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300 ease-out shadow-lg"
                    style={{ 
                        width: `${progress}%`,
                        boxShadow: progress > 0 ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none'
                    }}
                />
            </div>
            
            {/* Circular progress indicator with arrow - Aligned with chatbot */}
            <div className="fixed bottom-28 right-8 z-50">
                <div className="relative w-12 h-12 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    {/* Background circle */}
                    <svg className="w-12 h-12 transform -rotate-90 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 36 36">
                        <path
                            className="text-gray-700/30"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="transparent"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        {/* Progress circle */}
                        <path
                            className="text-primary group-hover:text-secondary"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="transparent"
                            strokeDasharray={`${progress}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            style={{
                                filter: progress > 0 ? 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.4))' : 'none',
                                transition: 'stroke-dasharray 0.3s ease-out, filter 0.3s ease-out, stroke 0.3s ease-out'
                            }}
                        />
                    </svg>
                    
                    {/* Arrow icon in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg 
                            className="w-4 h-4 text-gray-300 group-hover:text-primary transition-all duration-300 group-hover:-translate-y-0.5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900/90 text-xs text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap backdrop-blur-sm">
                        Scroll to top
                    </div>
                </div>
            </div>
        </>
    );
}