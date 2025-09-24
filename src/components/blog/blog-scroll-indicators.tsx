"use client";

import { ReadingProgressBar } from "./reading-progress-bar";
import { ScrollToTop } from "./scroll-to-top";

interface BlogScrollIndicatorsProps {
    target?: string; // CSS selector for content to track
    showScrollToTop?: boolean;
    showProgressBar?: boolean;
    className?: string;
}

export function BlogScrollIndicators({
    target = "article",
    showScrollToTop = false,
    showProgressBar = true,
    className = ""
}: BlogScrollIndicatorsProps) {
    return (
        <div className={className}>
            {showProgressBar && (
                <ReadingProgressBar target={target} />
            )}
            {showScrollToTop && (
                <ScrollToTop />
            )}
        </div>
    );
}