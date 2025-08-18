"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ImageModal } from "./image-modal";
import { FiZoomIn } from "react-icons/fi";

interface ProjectImageProps {
    src: string;
    alt: string;
    thumbnail?: string;
    className?: string;
    priority?: boolean;
    title?: string;
    enableZoom?: boolean;
}

export function ProjectImage({
    src,
    alt,
    thumbnail,
    className = "",
    priority = false,
    title,
    enableZoom = true,
}: ProjectImageProps) {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Fallback to placeholder if image fails to load
    const fallbackSrc = "/images/ui/project-placeholder.svg";
    const displaySrc = imageError ? fallbackSrc : src;

    const handleImageClick = () => {
        if (enableZoom && !imageError) {
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <div
                className={`relative overflow-hidden ${className} ${enableZoom && !imageError ? 'cursor-pointer' : ''}`}
                onClick={handleImageClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {isLoading && (
                    <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center z-10">
                        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoading ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                >
                    <Image
                        src={displaySrc}
                        alt={alt}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        priority={priority}
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                            setImageError(true);
                            setIsLoading(false);
                        }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                        quality={90}
                    />
                </motion.div>

                {/* Zoom indicator */}
                {enableZoom && !imageError && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            scale: isHovered ? 1 : 0.8
                        }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-sm rounded-full p-2"
                    >
                        <FiZoomIn className="text-white" size={16} />
                    </motion.div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Image Modal */}
            <ImageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                src={displaySrc}
                alt={alt}
                title={title}
            />
        </>
    );
}
