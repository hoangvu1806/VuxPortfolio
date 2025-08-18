"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
    isLoading: boolean;
    onComplete: () => void;
}

export function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [mounted, setMounted] = useState(false);

    // Generate stable random values for particles
    const particleData = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        initialX: (i * 137.5) % 1920, // Golden ratio distribution
        initialY: (i * 73.2) % 1080,
        targetX: ((i + 15) * 137.5) % 1920,
        targetY: ((i + 15) * 73.2) % 1080,
        duration: 3 + (i % 4),
        delay: (i % 10) * 0.2,
    }));

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isLoading || !mounted) return;

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 10 + prev * 0.1; // Deterministic progress
            });
        }, 150);

        return () => {
            clearInterval(progressInterval);
        };
    }, [isLoading, onComplete, mounted]);

    if (!mounted) {
        return null;
    }

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden"
                >
                    {/* Animated Background */}
                    <div className="absolute inset-0">
                        {/* Floating particles */}
                        {mounted &&
                            particleData.map((particle) => (
                                <motion.div
                                    key={particle.id}
                                    className="absolute w-1 h-1 bg-primary rounded-full"
                                    initial={{
                                        x: particle.initialX,
                                        y: particle.initialY,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        x: particle.targetX,
                                        y: particle.targetY,
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: particle.duration,
                                        repeat: Infinity,
                                        delay: particle.delay,
                                    }}
                                />
                            ))}

                        {/* Pulsing circles */}
                        {mounted &&
                            [...Array(5)].map((_, i) => (
                                <motion.div
                                    key={`circle-${i}`}
                                    className="absolute rounded-full border border-secondary/20"
                                    style={{
                                        width: 100 + i * 50,
                                        height: 100 + i * 50,
                                        left: "50%",
                                        top: "50%",
                                        marginLeft: -(50 + i * 25),
                                        marginTop: -(50 + i * 25),
                                    }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                        scale: [0, 1.2, 0],
                                        opacity: [0, 0.3, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: i * 0.5,
                                    }}
                                />
                            ))}

                        {/* Grid pattern */}
                        {mounted && (
                            <div className="absolute inset-0 opacity-5">
                                <div className="grid grid-cols-12 h-full">
                                    {[...Array(12)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="border-r border-primary/30"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 0.5, 0] }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: i * 0.1,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Loading Content */}
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Multiple rotating rings */}
                        <div className="relative mb-8">
                            {/* Outer ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="w-32 h-32 border-2 border-primary/20 border-t-primary rounded-full"
                            />

                            {/* Middle ring */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute inset-2 border-2 border-secondary/20 border-r-secondary rounded-full"
                            />

                            {/* Inner ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute inset-4 border-2 border-accent/20 border-b-accent rounded-full"
                            />

                            {/* Center core */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        rotate: [0, 180, 360],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="w-12 h-12 bg-gradient-to-r from-primary via-secondary to-accent rounded-full shadow-primary-glow"
                                />
                            </div>
                        </div>

                        {/* Progress indicator */}
                        <div className="w-64">
                            <div className="w-full h-1 bg-gray-700/50 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${Math.min(progress, 100)}%`,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Completion effect */}
                        {progress >= 100 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0, 2, 0],
                                }}
                                transition={{ duration: 1 }}
                                className="absolute inset-0 border-4 border-primary/30 rounded-full"
                            />
                        )}
                    </div>

                    {/* Corner decorations */}
                    <div className="absolute top-6 left-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="w-12 h-12 border-l-2 border-t-2 border-primary/40"
                        />
                    </div>
                    <div className="absolute top-6 right-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 }}
                            className="w-12 h-12 border-r-2 border-t-2 border-secondary/40"
                        />
                    </div>
                    <div className="absolute bottom-6 left-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.9 }}
                            className="w-12 h-12 border-l-2 border-b-2 border-accent/40"
                        />
                    </div>
                    <div className="absolute bottom-6 right-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.1 }}
                            className="w-12 h-12 border-r-2 border-b-2 border-primary/40"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
