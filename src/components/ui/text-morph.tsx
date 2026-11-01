"use client";

import { useId } from "react";

const EASE = "cubic-bezier(0.785, 0.135, 0.15, 0.86)";

interface TextMorphProps {
    words: string[];
    /** Seconds one word takes to dissolve into the next. */
    morph?: number;
    /** Seconds a word stays fully visible. */
    hold?: number;
    className?: string;
}

/**
 * Words dissolve into one another: a blur animation run through an SVG alpha
 * threshold makes the letterforms merge. Adapted from Originkit's Text Morph.
 * Decorative: render the accessible text alongside it.
 */
export function TextMorph({ words, morph = 1, hold = 1, className = "" }: TextMorphProps) {
    // useId can contain characters that are invalid in url(#id) and keyframe names.
    const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
    const filterId = `text-morph-filter-${id}`;
    const animation = `text-morph-${id}`;
    const wordClass = `text-morph-word-${id}`;

    // Each word's animation spans the whole loop, offset by its slot, so word
    // i's morph-out overlaps word i+1's morph-in.
    const slot = morph + hold;
    const cycle = slot * words.length;
    const pct = (seconds: number) => ((seconds / cycle) * 100).toFixed(4);

    const css = `
@keyframes ${animation} {
    0% { opacity: 0; filter: blur(20px); transform: scale(0.8); }
    ${pct(morph)}%, ${pct(slot)}% { opacity: 1; filter: blur(0); transform: scale(1); }
    ${pct(slot + morph)}%, 100% { opacity: 0; filter: blur(20px); transform: scale(1.2); }
}
@media (prefers-reduced-motion: reduce) {
    .${wordClass} { animation: none !important; }
    .${wordClass}:first-of-type { opacity: 1 !important; }
}`;

    return (
        <span aria-hidden className={`block select-none overflow-x-clip ${className}`}>
            <style>{css}</style>
            <svg className="pointer-events-none absolute h-0 w-0">
                <defs>
                    <filter id={filterId} x="-10%" y="-50%" width="120%" height="200%">
                        <feColorMatrix
                            in="SourceGraphic"
                            type="matrix"
                            values="1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 25 -9"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>
            {/* Words share one grid cell, so the widest sets the size and nothing shifts. */}
            <span className="grid place-items-center" style={{ filter: `url(#${filterId})` }}>
                {words.map((word, i) => (
                    <span
                        key={word}
                        className={`${wordClass} whitespace-nowrap`}
                        style={{
                            gridArea: "1 / 1",
                            opacity: 0,
                            willChange: "opacity, filter, transform",
                            animation: `${animation} ${cycle}s ${(slot * i).toFixed(3)}s infinite ${EASE}`,
                        }}
                    >
                        {word}
                    </span>
                ))}
            </span>
        </span>
    );
}
