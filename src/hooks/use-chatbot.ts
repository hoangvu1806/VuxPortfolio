"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { Message } from "@/components/chatbot";
import type { ContextData } from "@/contexts/ChatbotContext";
import { ChatbotAPI } from "@/lib/chatbot-api";

interface UseChatbotOptions {
    initialMessages?: Message[];
    maxMessages?: number;
}

export function useChatbot(options: UseChatbotOptions = {}) {
    const {
        initialMessages = [
            {
                id: "1",
                content:
                    "'Hi! I'm Vu Hoang. I can help you learn about my portfolio, experience, and projects. What would you like to ask?",
                role: "assistant" as const,
                timestamp: new Date(),
            },
        ],
        maxMessages = 50,
    } = options;

    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [isTyping, setIsTyping] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [context, setContext] = useState<ContextData | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const chatbotAPI = useRef<ChatbotAPI>(ChatbotAPI.getInstance());

    // Clean up abort controller on unmount
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    // Handle streaming response from API - optimized for real-time display
    const handleStreamingResponse = useCallback(
        async (userContent: string, context?: string) => {
            try {
                const conversation = messages.filter((msg) => !msg.isStreaming);
                const streamingIterable = await chatbotAPI.current.sendMessage(
                    userContent,
                    conversation,
                    context,
                    abortControllerRef.current?.signal
                );

                // Create initial assistant message
                const assistantMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    content: "",
                    role: "assistant",
                    timestamp: new Date(),
                    isStreaming: true,
                };

                // Add message to state
                setMessages((prev) => [...prev, assistantMessage]);

                let fullContent = "";

                // Process streaming chunks - real-time updates like ChatGPT
                for await (const chunk of streamingIterable) {
                    if (abortControllerRef.current?.signal.aborted) {
                        break;
                    }

                    fullContent += chunk;

                    // Update UI immediately for each chunk
                    setMessages((prev) =>
                        prev.map((msg) =>
                            msg.id === assistantMessage.id
                                ? { ...msg, content: fullContent }
                                : msg
                        )
                    );
                }

                // Mark streaming as complete
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === assistantMessage.id
                            ? { ...msg, isStreaming: false }
                            : msg
                    )
                );
            } catch (error) {
                console.error("Streaming response error:", error);
                throw error;
            }
        },
        [messages]
    );

    const sendMessage = useCallback(
        async (content: string, context?: string) => {
            if (!content.trim() || isTyping) return;

            // If context exists (selected text), add to message
            const messageContent = context
                ? `About this text: "${context}"\n\n${content.trim()}`
                : content.trim();

            const userMessage: Message = {
                id: Date.now().toString(),
                content: messageContent,
                role: "user",
                timestamp: new Date(),
            };

            // Add user message
            setMessages((prev) => {
                const newMessages = [...prev, userMessage];
                // Keep only the last maxMessages
                return newMessages.slice(-maxMessages);
            });

            setIsTyping(true);

            try {
                // Cancel previous request if exists
                if (abortControllerRef.current) {
                    abortControllerRef.current.abort();
                }

                // Create new abort controller
                abortControllerRef.current = new AbortController();

                // Call real API with streaming response
                await handleStreamingResponse(userMessage.content, context);
            } catch (error) {
                if (error instanceof Error && error.name !== "AbortError") {
                    console.error("Error sending message:", error);

                    // Add error message
                    const errorMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        content:
                            "Sorry, an error occurred. Please try again later.",
                        role: "assistant",
                        timestamp: new Date(),
                    };

                    setMessages((prev) => [...prev, errorMessage]);
                }
            } finally {
                setIsTyping(false);
                abortControllerRef.current = null;
            }
        },
        [isTyping, maxMessages, handleStreamingResponse]
    );

    const clearMessages = useCallback(() => {
        setMessages(initialMessages);
    }, [initialMessages]);

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const openChat = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeChat = useCallback(() => {
        setIsOpen(false);
    }, []);

    return {
        messages,
        isTyping,
        isOpen,
        context,
        sendMessage,
        setContext,
        clearMessages,
        toggleOpen,
        openChat,
        closeChat,
    };
}
