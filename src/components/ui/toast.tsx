"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    Check,
    CircleX,
    AlertOctagon,
    AlertCircle,
    AlertTriangle,
    X,
    Minus,
} from "lucide";
import { MorphIconWrapper } from "@/components/ui/morph-icon";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "warning";

interface ToastProps {
    type: ToastType;
    title: string;
    message?: string;
    isVisible: boolean;
    onClose: () => void;
    autoClose?: boolean;
    duration?: number;
}

export function Toast({
    type,
    title,
    message,
    isVisible,
    onClose,
    autoClose = true,
    duration = 5000,
}: ToastProps) {
    useEffect(() => {
        if (isVisible && autoClose) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, autoClose, duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case "success":
                return (
                    <MorphIconWrapper
                        from={CheckCircle}
                        to={Check}
                        className="w-5 h-5 text-green-500"
                        size={20}
                    />
                );
            case "error":
                return (
                    <MorphIconWrapper
                        from={CircleX}
                        to={AlertOctagon}
                        className="w-5 h-5 text-red-500"
                        size={20}
                    />
                );
            case "warning":
                return (
                    <MorphIconWrapper
                        from={AlertCircle}
                        to={AlertTriangle}
                        className="w-5 h-5 text-yellow-500"
                        size={20}
                    />
                );
        }
    };

    const getColors = () => {
        switch (type) {
            case "success":
                return "bg-green-900/30 border-green-700/50 text-green-100";
            case "error":
                return "bg-red-900/30 border-red-700/50 text-red-100";
            case "warning":
                return "bg-yellow-900/30 border-yellow-700/50 text-yellow-100";
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed top-4 right-4 z-50 max-w-sm w-full"
                >
                    <div
                        className={`${getColors()} backdrop-blur-sm border rounded-xl p-4 shadow-xl`}
                    >
                        <div className="flex items-start">
                            <div className="flex-shrink-0">{getIcon()}</div>
                            <div className="ml-3 flex-1">
                                <h4 className="font-medium">{title}</h4>
                                {message && (
                                    <p className="mt-1 text-sm opacity-90">
                                        {message}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={onClose}
                                className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-200 transition-colors"
                            >
                                <MorphIconWrapper
                                    from={X}
                                    to={Minus}
                                    size={16}
                                />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
