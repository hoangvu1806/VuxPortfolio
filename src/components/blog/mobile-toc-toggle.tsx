"use client";

import { useState } from "react";
import { FiList, FiX } from "react-icons/fi";
import { TableOfContents } from "./table-of-contents";

export function MobileTocToggle() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile TOC Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-20 right-4 z-50 w-10 h-10 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-lg flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary/50 transition-all duration-300 shadow-lg"
                aria-label="Toggle table of contents"
            >
                <FiList size={16} />
            </button>

            {/* Mobile TOC Overlay */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
                    <div className="absolute right-4 top-16 bottom-4 w-72 max-w-[calc(100vw-2rem)] bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl">
                        <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
                            <h3 className="text-sm font-semibold text-gray-300">
                                Table of Contents
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-300 transition-colors"
                            >
                                <FiX size={18} />
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto max-h-full">
                            <TableOfContents className="sticky-none" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}