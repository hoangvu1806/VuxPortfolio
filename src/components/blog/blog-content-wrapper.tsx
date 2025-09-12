"use client";

import { useRef } from "react";
import { TextSelectionPopup } from "./text-selection-popup";

interface BlogContentWrapperProps {
    content: string;
    className?: string;
}

export function BlogContentWrapper({
    content,
    className = "",
}: BlogContentWrapperProps) {
    const blogContentRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div
                ref={blogContentRef}
                className={className}
                dangerouslySetInnerHTML={{ __html: content }}
            />
            <TextSelectionPopup containerRef={blogContentRef} />
        </>
    );
}
