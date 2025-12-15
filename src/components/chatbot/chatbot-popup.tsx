"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { ChatHeader } from "./chat-header";

import { useChatbotContext } from "@/contexts/ChatbotContext";

export interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
    isStreaming?: boolean;
}

interface ChatbotPopupProps {
    className?: string;
}

export function ChatbotPopup({ className = "" }: ChatbotPopupProps) {
    const {
        messages,
        isTyping,
        isOpen,
        context,
        sendMessage,
        setContext,
        closeChat,
        openChat,
    } = useChatbotContext();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isDragLocked, setIsDragLocked] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const toggleDragLock = useCallback(() => {
        setIsDragLocked((prev) => !prev);
    }, []);

    const handleRemoveContext = useCallback(() => {
        setContext(null);
    }, [setContext]);

    return (
        <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
            {/* Chat Toggle Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={openChat}
                        className="relative w-14 h-14 rounded-full shadow-2xl hover:shadow-primary/25 transition-all duration-300 overflow-hidden border-3 border-primary/30"
                    >
                        <img
                            src="/images/profile/twinself.png"
                            alt="Open Chat"
                            className="w-full h-full object-cover"
                        />

                        {/* Notification dot */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-white"
                        />

                        {/* Pulse effect */}
                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300,
                        }}
                        drag={!isDragLocked}
                        dragMomentum={false}
                        dragElastic={0}
                        dragConstraints={{
                            left: -window.innerWidth + 320,
                            right: 0,
                            top: -window.innerHeight + 500,
                            bottom: 0,
                        }}
                        whileDrag={
                            !isDragLocked
                                ? {
                                    scale: 1.02,
                                    boxShadow:
                                        "0 25px 50px rgba(0, 0, 0, 0.25)",
                                }
                                : {}
                        }
                        className={`absolute bottom-0 right-0 w-80 h-[500px] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 flex flex-col overflow-hidden ${isDragLocked
                            ? ""
                            : "cursor-grab active:cursor-grabbing"
                            }`}
                    >
                        {/* Header */}
                        <ChatHeader
                            onClose={closeChat}
                            isDragLocked={isDragLocked}
                            onToggleDragLock={toggleDragLock}
                        />

                        {/* Messages Container */}
                        <div className="flex-1 overflow-y-auto p-3 space-y-3 chatbot-scrollbar">
                            {messages.map((message) => (
                                <ChatMessage
                                    key={message.id}
                                    message={message}
                                />
                            ))}

                            {/* Only show typing indicator when no messages are streaming */}
                            {isTyping && !messages.some(msg => msg.isStreaming) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center space-x-2"
                                >
                                    <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-primary/30">
                                        <img
                                            src="/images/profile/twinself.png"
                                            alt="AI Assistant"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="bg-gray-800 rounded-2xl px-4 py-2">
                                        <div className="flex space-x-1">
                                            {[0, 1, 2].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ y: [0, -5, 0] }}
                                                    transition={{
                                                        repeat: Infinity,
                                                        duration: 0.6,
                                                        delay: i * 0.1,
                                                    }}
                                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <ChatInput
                            onSendMessage={sendMessage}
                            disabled={isTyping}
                            context={context}
                            onRemoveContext={handleRemoveContext}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
