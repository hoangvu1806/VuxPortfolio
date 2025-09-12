"use client";

import { useState, useEffect, useRef } from "react";

interface TypingAnimationProps {
    texts: string[];
    className?: string;
}

export function TypingAnimation({
    texts,
    className = "",
}: TypingAnimationProps) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [displayText, setDisplayText] = useState("");
    const [typingSpeed, setTypingSpeed] = useState(50);
    const [fadeClass, setFadeClass] = useState("");

    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        // Ensure there are texts to display
        if (texts.length === 0) return;

        // If currently deleting text
        if (isDeleting) {
            timer = setTimeout(() => {
                setDisplayText((prevText) =>
                    prevText.substring(0, prevText.length - 1)
                );
                setTypingSpeed(20); // Faster deletion speed

                // When text is completely deleted
                if (displayText.length <= 1) {
                    setIsDeleting(false);
                    // Đặt fadeClass và displayText trước khi chuyển sang text mới
                    setFadeClass("");
                    setDisplayText("");

                    // Chuyển sang text tiếp theo sau một khoảng thời gian ngắn
                    setTimeout(() => {
                        setCurrentTextIndex(
                            (prevIndex) => (prevIndex + 1) % texts.length
                        );
                    }, 300);
                }
            }, typingSpeed);
        }
        // Nếu đang gõ văn bản
        else {
            const currentFullText = texts[currentTextIndex];

            // Chỉ đặt fadeClass khi bắt đầu gõ văn bản mới
            if (displayText === "") {
                setFadeClass("typing-fade-in");
            }

            timer = setTimeout(() => {
                if (
                    currentFullText &&
                    displayText.length < currentFullText.length
                ) {
                    setDisplayText((prevText) => {
                        const nextChar = currentFullText.charAt(
                            prevText.length
                        );
                        return prevText + nextChar;
                    });

                    // Tốc độ gõ ngẫu nhiên để trông tự nhiên hơn
                    setTypingSpeed(Math.random() * 30 + 40);
                }

                // Khi đã gõ xong toàn bộ văn bản
                if (
                    currentFullText &&
                    displayText.length >= currentFullText.length
                ) {
                    // Đợi trước khi bắt đầu xóa
                    setTimeout(() => {
                        setFadeClass("typing-fade-out");
                        setTimeout(() => {
                            setIsDeleting(true);
                        }, 800);
                    }, 3000);
                }
            }, typingSpeed);
        }

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, currentTextIndex, texts, typingSpeed]);

    return (
        <p ref={textRef} className={`typing-text ${fadeClass} ${className}`}>
            {displayText}
            <span className="typing-cursor"></span>
        </p>
    );
}
