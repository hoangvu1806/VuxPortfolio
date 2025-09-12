"use client";

import { motion } from "framer-motion";
import { FiX, FiCornerDownRight } from "react-icons/fi";

import type { ContextData } from "@/contexts/ChatbotContext";

interface ContextTagProps {
    context: ContextData;
    onRemove: () => void;
}

export function ContextTag({ context, onRemove }: ContextTagProps) {
    const truncateText = (text: string, maxLength: number = 25) => {
        return text.length > maxLength
            ? text.substring(0, maxLength) + "..."
            : text;
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="mb-2 inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 rounded-full text-xs font-medium backdrop-blur-sm group hover:from-primary/30 hover:to-secondary/30 transition-all duration-200"
            title={`Reference: "${context.text}"`}
        >
            <FiCornerDownRight size={12} className="flex-shrink-0" />
            <span className="max-w-[120px] truncate">
                {truncateText(context.text)}
            </span>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onRemove}
                className="flex-shrink-0 text-primary/70 hover:text-primary transition-colors ml-1"
                title="Remove reference"
            >
                <FiX size={12} />
            </motion.button>
        </motion.div>
    );
}
