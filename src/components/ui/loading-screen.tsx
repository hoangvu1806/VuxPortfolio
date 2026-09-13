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

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isLoading || !mounted) return;

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(onComplete, 500); // Exiting transition buffer
                    return 100;
                }
                return prev + 12 + prev * 0.08;
            });
        }, 110);

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
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712] overflow-hidden"
                >
                    {/* Tech-Grid Background */}
                    <div 
                        className="absolute inset-0 opacity-40 pointer-events-none"
                        style={{
                            backgroundSize: "40px 40px",
                            backgroundImage: `
                                linear-gradient(to right, rgba(99, 102, 241, 0.02) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(99, 102, 241, 0.02) 1px, transparent 1px)
                            `
                        }}
                    />

                    {/* Ambient Glow Orbs */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{
                                x: [-20, 20, -20],
                                y: [-20, 20, -20],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-[100px]"
                        />
                        <motion.div
                            animate={{
                                x: [20, -20, 20],
                                y: [20, -20, 20],
                                scale: [1.2, 1, 1.2],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-accent/5 rounded-full filter blur-[120px]"
                        />
                    </div>

                    {/* 3D Quantum Gyroscope Loader (Borderless) */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative w-56 h-56 flex items-center justify-center"
                    >
                        {/* Orbit Assembly with 3D Perspective */}
                        <div className="relative w-40 h-40 flex items-center justify-center" style={{ perspective: 1000 }}>
                            
                            {/* Outer Orbit (Cyan) */}
                            <motion.div
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "50%",
                                    border: "1.8px solid rgba(6, 182, 212, 0.08)",
                                    borderTopColor: "rgba(6, 182, 212, 0.75)",
                                    borderRightColor: "rgba(6, 182, 212, 0.4)",
                                    rotateX: 65,
                                    rotateY: 20,
                                }}
                                animate={{ rotateZ: 360 }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />

                            {/* Middle Orbit (Purple) */}
                            <motion.div
                                style={{
                                    position: "absolute",
                                    width: "78%",
                                    height: "78%",
                                    borderRadius: "50%",
                                    border: "1.8px solid rgba(139, 92, 246, 0.08)",
                                    borderBottomColor: "rgba(139, 92, 246, 0.75)",
                                    borderLeftColor: "rgba(139, 92, 246, 0.4)",
                                    rotateX: 65,
                                    rotateY: -30,
                                }}
                                animate={{ rotateZ: -360 }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />

                            {/* Inner Orbit (Fuchsia) */}
                            <motion.div
                                style={{
                                    position: "absolute",
                                    width: "56%",
                                    height: "56%",
                                    borderRadius: "50%",
                                    border: "1.8px solid rgba(236, 72, 153, 0.08)",
                                    borderLeftColor: "rgba(236, 72, 153, 0.75)",
                                    borderTopColor: "rgba(236, 72, 153, 0.4)",
                                    rotateX: 30,
                                    rotateY: 65,
                                }}
                                animate={{ rotateZ: 360 }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />

                            {/* Pulsing Core */}
                            <motion.div
                                animate={{
                                    scale: [0.92, 1.08, 0.92],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="w-11 h-11 rounded-full bg-gradient-to-tr from-primary via-secondary to-accent flex items-center justify-center z-10 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                            >
                                <div className="w-6 h-6 rounded-full bg-[#030712]/90 backdrop-blur-md flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
