"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { ContextTag } from "./context-tag";
import type { ContextData } from "@/contexts/ChatbotContext";

interface ChatInputProps {
    onSendMessage: (message: string, context?: string) => void;
    disabled?: boolean;
    context?: ContextData | null;
    onRemoveContext?: () => void;
}

export function ChatInput({
    onSendMessage,
    disabled = false,
    context,
    onRemoveContext,
}: ChatInputProps) {
    const [message, setMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSendMessage(message.trim(), context?.text);
            setMessage("");

            if (context && onRemoveContext) {
                onRemoveContext();
            }

            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);

        // Auto-resize textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(
                textareaRef.current.scrollHeight,
                120
            )}px`;
        }
    };

    return (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
            {/* Context Tag */}
            <AnimatePresence>
                {context && onRemoveContext && (
                    <ContextTag context={context} onRemove={onRemoveContext} />
                )}
            </AnimatePresence>

            <div className="flex items-end space-x-2">
                {/* Input Field */}
                <div className="flex-1 relative">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter message..."
                        disabled={disabled}
                        className="w-full resize-none rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 pr-10 text-xs focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed max-h-[80px]"
                        rows={1}
                    />

                    {/* Character count */}
                    {message.length > 0 && (
                        <div className="absolute -bottom-5 right-0 text-xs text-gray-400">
                            {message.length}/1000
                        </div>
                    )}
                </div>

                {/* Send Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
                    disabled={!message.trim() || disabled}
                    className={`p-3 rounded-2xl transition-all duration-200 ${
                        message.trim() && !disabled
                            ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-primary/25"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                    }`}
                >
                    <FiSend className="w-4 h-4" />
                </motion.button>
            </div>
        </div>
    );
}
