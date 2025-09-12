"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi";
import { useChatbotContext, type ContextData } from "@/contexts/ChatbotContext";

interface SelectionPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface TextSelectionPopupProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
}

export function TextSelectionPopup({ containerRef }: TextSelectionPopupProps) {
    const [selectedText, setSelectedText] = useState("");
    const [position, setPosition] = useState<SelectionPosition | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const { openChat, setContext } = useChatbotContext();
    const popupRef = useRef<HTMLDivElement>(null);

    const handleTextSelection = useCallback(() => {
        const selection = window.getSelection();

        if (!selection || selection.rangeCount === 0) {
            setIsVisible(false);
            setSelectedText("");
            setPosition(null);
            return;
        }

        const selectedText = selection.toString().trim();

        if (selectedText.length === 0) {
            setIsVisible(false);
            setSelectedText("");
            setPosition(null);
            return;
        }

        // Check if selected text is within container
        if (containerRef.current) {
            const range = selection.getRangeAt(0);
            const isWithinContainer = containerRef.current.contains(
                range.commonAncestorContainer
            );

            if (!isWithinContainer) {
                setIsVisible(false);
                return;
            }
        }

        // Calculate popup position
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        setSelectedText(selectedText);
        setPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 5, // Display closer to selected text
            width: rect.width,
            height: rect.height,
        });
        setIsVisible(true);
    }, [containerRef]);

    const handleAskVux = useCallback(async () => {
        if (!selectedText.trim()) return;

        // Save context (text + current page URL)
        const contextData: ContextData = {
            text: selectedText,
            url: window.location.href,
            timestamp: new Date(),
        };

        setContext(contextData);

        // Open chatbot
        openChat();

        // Hide popup
        setIsVisible(false);

        // Clear selection
        window.getSelection()?.removeAllRanges();
    }, [selectedText, openChat, setContext]);

    // Handle click outside
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (
            popupRef.current &&
            !popupRef.current.contains(event.target as Node)
        ) {
            // Check if there's an active selection
            const selection = window.getSelection();
            if (!selection || selection.toString().trim() === "") {
                setIsVisible(false);
            }
        }
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Listen for selection events
        const handleSelectionChange = () => {
            // Delay slightly to ensure selection is complete
            setTimeout(handleTextSelection, 10);
        };

        document.addEventListener("selectionchange", handleSelectionChange);
        document.addEventListener("mouseup", handleTextSelection);
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener(
                "selectionchange",
                handleSelectionChange
            );
            document.removeEventListener("mouseup", handleTextSelection);
            document.removeEventListener("click", handleClickOutside);
        };
    }, [handleTextSelection, handleClickOutside, containerRef]);

    if (!isVisible || !position || !selectedText) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                ref={popupRef}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 400 }}
                className="fixed z-50 pointer-events-auto"
                style={{
                    left: Math.max(
                        10,
                        Math.min(position.x - 40, window.innerWidth - 90)
                    ),
                    top: Math.max(70, position.y - 45), // Position above selected text
                }}
            >
                {/* Compact Ask Vux button */}
                <motion.button
                    onClick={handleAskVux}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white text-xs font-medium rounded-full shadow-xl hover:shadow-primary/25 transition-all duration-200 backdrop-blur-sm border border-white/10"
                >
                    <FiMessageCircle size={12} />
                    <span>Ask Vux</span>
                </motion.button>
            </motion.div>
        </AnimatePresence>
    );
}
