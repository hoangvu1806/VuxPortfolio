"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiX, FiZoomIn, FiZoomOut, FiRotateCw } from "react-icons/fi";
import { useState, useEffect } from "react";

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    src: string;
    alt: string;
    title?: string;
}

export function ImageModal({ isOpen, onClose, src, alt, title }: ImageModalProps) {
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // Reset state when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setScale(1);
            setRotation(0);
            setPosition({ x: 0, y: 0 });
        }
    }, [isOpen]);

    // Handle keyboard shortcuts
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case '+':
                case '=':
                    e.preventDefault();
                    setScale(prev => Math.min(prev * 1.2, 5));
                    break;
                case '-':
                    e.preventDefault();
                    setScale(prev => Math.max(prev / 1.2, 0.5));
                    break;
                case 'r':
                case 'R':
                    e.preventDefault();
                    setRotation(prev => prev + 90);
                    break;
                case '0':
                    e.preventDefault();
                    setScale(1);
                    setRotation(0);
                    setPosition({ x: 0, y: 0 });
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleZoomIn = () => setScale(prev => Math.min(prev * 1.2, 5));
    const handleZoomOut = () => setScale(prev => Math.max(prev / 1.2, 0.5));
    const handleRotate = () => setRotation(prev => prev + 90);
    const handleReset = () => {
        setScale(1);
        setRotation(0);
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale > 1) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && scale > 1) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    onClick={onClose}
                >
                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative max-w-[95vw] max-h-[95vh] bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-700/50 backdrop-blur-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    {title && (
                                        <h3 className="text-lg font-semibold text-white mb-1">
                                            {title}
                                        </h3>
                                    )}
                                    <p className="text-sm text-gray-300">
                                        Click and drag to pan • Scroll to zoom • Press R to rotate
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-white transition-colors"
                                    aria-label="Close modal"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Image Container */}
                        <div
                            className="relative w-[90vw] h-[80vh] flex items-center justify-center overflow-hidden cursor-move"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onWheel={(e) => {
                                e.preventDefault();
                                if (e.deltaY < 0) {
                                    handleZoomIn();
                                } else {
                                    handleZoomOut();
                                }
                            }}
                        >
                            <motion.div
                                animate={{
                                    scale,
                                    rotate: rotation,
                                    x: position.x,
                                    y: position.y,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="relative"
                            >
                                <Image
                                    src={src}
                                    alt={alt}
                                    width={800}
                                    height={600}
                                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                    priority
                                    draggable={false}
                                />
                            </motion.div>
                        </div>

                        {/* Controls */}
                        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <div className="flex items-center justify-center gap-2">
                                <button
                                    onClick={handleZoomOut}
                                    className="p-3 rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-white transition-colors"
                                    aria-label="Zoom out"
                                >
                                    <FiZoomOut size={18} />
                                </button>
                                
                                <div className="px-4 py-2 bg-gray-800/80 rounded-full text-white text-sm font-mono">
                                    {Math.round(scale * 100)}%
                                </div>
                                
                                <button
                                    onClick={handleZoomIn}
                                    className="p-3 rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-white transition-colors"
                                    aria-label="Zoom in"
                                >
                                    <FiZoomIn size={18} />
                                </button>
                                
                                <div className="w-px h-8 bg-gray-600 mx-2" />
                                
                                <button
                                    onClick={handleRotate}
                                    className="p-3 rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-white transition-colors"
                                    aria-label="Rotate"
                                >
                                    <FiRotateCw size={18} />
                                </button>
                                
                                <button
                                    onClick={handleReset}
                                    className="px-4 py-2 bg-primary/80 hover:bg-primary text-white rounded-full text-sm font-medium transition-colors"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}