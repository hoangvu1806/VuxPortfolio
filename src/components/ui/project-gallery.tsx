"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus } from "lucide";
import { MorphIconWrapper } from "./morph-icon";

interface ProjectGalleryProps {
    images: string[];
    title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Close on ESC key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelectedImage(null);
            }
        };
        if (selectedImage) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [selectedImage]);

    if (!images || images.length === 0) return null;

    return (
        <>
            <section className="mt-16 pt-10 border-t border-gray-800/60">
                <h2 className="mb-6 text-2xl font-semibold text-white">
                    Project Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((imgSrc, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedImage(imgSrc)}
                            className="relative aspect-video overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900/40 cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
                        >
                            <Image
                                src={imgSrc}
                                alt={`${title} screenshot ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Lightbox Modal — Clean Direct Image View without Extra Container Frame */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md cursor-pointer"
                    >
                        {/* Close button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-gray-900/80 text-gray-300 hover:text-white border border-gray-700/60 transition-colors"
                            aria-label="Close modal"
                        >
                            <MorphIconWrapper from={X} to={Minus} size={24} />
                        </button>

                        {/* Direct Image Presentation */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-[92vw] max-h-[90vh] flex items-center justify-center"
                        >
                            <img
                                src={selectedImage}
                                alt="Expanded project view"
                                className="max-w-[92vw] max-h-[90vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
