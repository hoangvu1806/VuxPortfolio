"use client";

import { useEffect } from "react";

export function CustomScrollbar() {
    useEffect(() => {
        // Add custom scrollbar styles to document
        const style = document.createElement("style");
        style.textContent = `
            /* Custom Scrollbar Styles */
            ::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }

            ::-webkit-scrollbar-track {
                background: rgba(17, 24, 39, 0.5);
                border-radius: 4px;
            }

            ::-webkit-scrollbar-thumb {
                background: linear-gradient(180deg, #3b82f6, #8b5cf6);
                border-radius: 4px;
                border: 1px solid rgba(55, 65, 81, 0.3);
                box-shadow: 0 0 6px rgba(59, 130, 246, 0.3);
            }

            ::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(180deg, #2563eb, #7c3aed);
                box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
            }

            ::-webkit-scrollbar-corner {
                background: rgba(17, 24, 39, 0.5);
            }

            /* Firefox scrollbar */
            html {
                scrollbar-width: thin;
                scrollbar-color: #3b82f6 rgba(17, 24, 39, 0.5);
            }

            /* Smooth scrolling */
            html {
                scroll-behavior: smooth;
            }

            /* Custom scrollbar for specific containers */
            .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
                height: 4px;
            }

            .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(31, 41, 55, 0.3);
                border-radius: 2px;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: linear-gradient(180deg, #6366f1, #a855f7);
                border-radius: 2px;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(180deg, #4f46e5, #9333ea);
            }

            /* Line clamp utility */
            .line-clamp-2 {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            /* Hide scrollbar but keep functionality */
            .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }

            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }

            /* Custom border width */
            .border-l-3 {
                border-left-width: 3px;
            }
        `;
        
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return null;
}