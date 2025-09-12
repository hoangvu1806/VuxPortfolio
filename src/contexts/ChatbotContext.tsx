"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useChatbot } from "@/hooks/use-chatbot";
import type { Message } from "@/components/chatbot";

export interface ContextData {
    text: string;
    url: string;
    timestamp: Date;
}

interface ChatbotContextType {
    messages: Message[];
    isTyping: boolean;
    isOpen: boolean;
    context: ContextData | null;
    sendMessage: (content: string, context?: string) => Promise<void>;
    setContext: (context: ContextData | null) => void;
    clearMessages: () => void;
    toggleOpen: () => void;
    openChat: () => void;
    closeChat: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

interface ChatbotProviderProps {
    children: ReactNode;
}

export function ChatbotContextProvider({ children }: ChatbotProviderProps) {
    const chatbotState = useChatbot();

    return (
        <ChatbotContext.Provider value={chatbotState}>
            {children}
        </ChatbotContext.Provider>
    );
}

export function useChatbotContext() {
    const context = useContext(ChatbotContext);
    if (context === undefined) {
        throw new Error(
            "useChatbotContext must be used within a ChatbotContextProvider"
        );
    }
    return context;
}
