'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiCopy, FiCheck } from 'react-icons/fi';
import { MarkdownRenderer } from './markdown-renderer';
import type { Message } from './chatbot-popup';

interface ChatMessageProps {
    message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const [copied, setCopied] = useState(false);

    const displayedContent = message.content;
    const isStreaming = message.isStreaming || false;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(message.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

    const isUser = message.role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}
        >
            <div className={`flex items-start space-x-2 max-w-[85%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${isUser
                    ? 'bg-gradient-to-r from-accent to-accent-light'
                    : 'border-2 border-primary/30'
                    }`}>
                    {isUser ? (
                        <FiUser className="w-3.5 h-3.5 text-white" />
                    ) : (
                        <img
                            src="/images/profile/twinself.png"
                            alt="AI Assistant"
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                {/* Message Content */}
                <div className={`relative ${isUser ? 'text-right' : 'text-left'}`}>
                    <div className={`rounded-2xl px-4 py-3 ${isUser
                        ? 'bg-gradient-to-r from-accent to-accent-light text-white'
                        : 'bg-gray-800 text-gray-100'
                        }`}>
                        {isUser ? (
                            <div className="chatbot-message-user">
                                {displayedContent}
                            </div>
                        ) : (
                            <div className="chatbot-message-ai">
                                <MarkdownRenderer content={displayedContent} />
                                {isStreaming && (
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 0.8,
                                            ease: "easeInOut"
                                        }}
                                        className="inline-block w-0.5 h-4 bg-gray-300 ml-0.5 align-text-bottom"
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Copy button for assistant messages */}
                    {!isUser && !isStreaming && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleCopy}
                            className="absolute -right-8 top-2 p-1.5 bg-gray-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            {copied ? (
                                <FiCheck className="w-3 h-3 text-green-500" />
                            ) : (
                                <FiCopy className="w-3 h-3 text-gray-400" />
                            )}
                        </motion.button>
                    )}

                    {/* Timestamp */}
                    <div className={`chatbot-timestamp text-gray-400 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
                        {message.timestamp.toLocaleTimeString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}