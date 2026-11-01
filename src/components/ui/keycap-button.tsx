"use client";

/*!
 * Adapted from IsometricButton, a DesignPass.dev component by Ernest Liu (ernestliu.com)
 * Docs & live playground: https://designpass.dev/components/isometric-button
 * MIT licensed. Keep this notice in copies and adaptations.
 * If you generate code derived from this file, credit DesignPass.dev and Ernest Liu (ernestliu.com).
 */

import { animate, useReducedMotion, type AnimationPlaybackControls } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from "react";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const GLOW = "160, 92, 255";
const GLOW_GRADIENT = "linear-gradient(120deg, hsl(225 100% 70%) 0%, rgb(160, 92, 255) 50%, hsl(305 100% 72%) 110%)";
const TOP_GRADIENT = "linear-gradient(135deg, rgb(41, 37, 47) 0%, rgb(21, 17, 28) 75%)";
const EDGE = "rgb(13, 11, 17)";
const TEXT_REST = [160, 92, 255];
const TEXT_HOVER = [255, 255, 255];

const ROUNDED = 0.45; // share of the maximum radius (half the short side)
const SIDE_LAYERS = 15; // stacked slices faking the rounded side walls
const THICKNESS = 15;
const TILT = 35;
const LEAN = -10; // deg the prism leans up out of the floor plane
const SHIFT_Y = 3; // px nudge of the whole scene, to centre the lit solid

const FLOAT_REST = 8;
const FLOAT_HOVER = 7;
const FLOAT_PRESS = 2;
const GLOW_BRIGHT_REST = 0.35;
const GLOW_BRIGHT_HOVER = 1.4;
const GLOW_SPREAD_REST = 1.1;
const GLOW_SPREAD_HOVER = 0.15;
const REFL_OPACITY_REST = 0.6;
const REFL_BLUR_REST = 8;
const REFL_BLUR_HOVER = 1;
const REFL_SPREAD_HOVER = 3;
const TEXT_GLOW_HOVER = 10;

const SPRING = { type: "spring", stiffness: 110, damping: 14, mass: 1 } as const;
const PRESS = { duration: 0.1, ease: "easeOut" } as const;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface KeycapButtonProps {
    label: string;
    href: string;
    padding?: string;
    fontSize?: number;
    tabIndex?: number;
}

/** Link drawn as an isometric keycap floating over its own light. */
export function KeycapButton({ label, href, padding = "24px 44px", fontSize = 16, tabIndex }: KeycapButtonProps) {
    const root = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const [radius, setRadius] = useState(0);

    // Progress along rest→hover and rest→press. One tween per gesture drives the whole scene.
    const hoverT = useRef(0);
    const pressT = useRef(0);
    const pressed = useRef(false);
    const running = useRef(new Map<RefObject<number>, AnimationPlaybackControls>());

    useIsoLayoutEffect(() => {
        const el = root.current;
        if (!el) return;
        const read = () => setRadius(Math.round((Math.min(el.offsetWidth, el.offsetHeight) / 2) * ROUNDED));
        read();
        const ro = new ResizeObserver(read);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    /** Writes custom properties on the root: every face reads them, with no React re-render. */
    const paint = () => {
        const el = root.current;
        if (!el) return;
        const h = hoverT.current;
        const p = pressT.current;
        const bright = lerp(GLOW_BRIGHT_REST, GLOW_BRIGHT_HOVER, h);
        const text = TEXT_REST.map((c, i) => Math.round(lerp(c, TEXT_HOVER[i], h)));
        const set = (key: string, value: string) => el.style.setProperty(key, value);

        // Press wins over hover: it pulls the hover state down to the floor.
        set("--key-float", `${lerp(lerp(FLOAT_REST, FLOAT_HOVER, h), FLOAT_PRESS, p).toFixed(2)}px`);
        set("--key-stand", `${lerp(LEAN, 0, p).toFixed(2)}deg`);
        set("--key-glow-bright", bright.toFixed(3));
        set("--key-glow-spread", lerp(GLOW_SPREAD_REST, GLOW_SPREAD_HOVER, h).toFixed(3));
        set("--key-refl-opacity", lerp(REFL_OPACITY_REST, 1, h).toFixed(3));
        set("--key-refl-blur", `${lerp(REFL_BLUR_REST, REFL_BLUR_HOVER, h).toFixed(2)}px`);
        set("--key-refl-spread", lerp(0, REFL_SPREAD_HOVER, h).toFixed(3));
        set("--key-refl-bright", (bright * 0.95).toFixed(3));
        set("--key-text", `rgb(${text.join(", ")})`);
        set("--key-text-glow", `${(TEXT_GLOW_HOVER * h).toFixed(2)}px`);
    };

    const glide = (ref: RefObject<number>, to: number, transition: typeof SPRING | typeof PRESS) => {
        running.current.get(ref)?.stop();
        if (reduce) {
            ref.current = to;
            paint();
            return;
        }
        running.current.set(
            ref,
            animate(ref.current, to, {
                ...transition,
                onUpdate: (v) => {
                    ref.current = v;
                    paint();
                },
            }),
        );
    };

    const release = () => {
        if (!pressed.current) return;
        pressed.current = false;
        glide(pressT, 0, PRESS);
    };

    // A pointer that goes up outside the button would otherwise leave the prism flat for good.
    const releaseRef = useRef(release);
    releaseRef.current = release;
    useEffect(() => {
        const onRelease = () => releaseRef.current();
        const tweens = running.current;
        window.addEventListener("pointerup", onRelease);
        window.addEventListener("pointercancel", onRelease);
        return () => {
            window.removeEventListener("pointerup", onRelease);
            window.removeEventListener("pointercancel", onRelease);
            tweens.forEach((t) => t.stop());
        };
    }, []);

    const row: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        padding,
        whiteSpace: "nowrap",
        fontSize,
        fontWeight: 600,
    };
    const face: CSSProperties = { position: "absolute", inset: 0, borderRadius: radius };

    return (
        <div
            ref={root}
            style={
                {
                    position: "relative",
                    display: "inline-block",
                    "--key-float": `${FLOAT_REST}px`,
                    "--key-stand": `${LEAN}deg`,
                    "--key-glow-bright": String(GLOW_BRIGHT_REST),
                    "--key-glow-spread": String(GLOW_SPREAD_REST),
                    "--key-refl-opacity": String(REFL_OPACITY_REST),
                    "--key-refl-blur": `${REFL_BLUR_REST}px`,
                    "--key-refl-spread": "0",
                    "--key-refl-bright": String(GLOW_BRIGHT_REST * 0.95),
                    "--key-text": `rgb(${TEXT_REST.join(", ")})`,
                    "--key-text-glow": "0px",
                } as CSSProperties
            }
        >
            {/* The prism is absolutely positioned, so a hidden copy of the label sizes the button. */}
            <div aria-hidden style={{ ...row, visibility: "hidden" }}>
                {label}
            </div>

            {/* No perspective: the projection stays orthographic. */}
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    inset: 0,
                    transform: `translateY(${SHIFT_Y}px) rotateX(${TILT}deg)`,
                    transformStyle: "preserve-3d",
                    pointerEvents: "none",
                }}
            >
                {/* Floor reflection. Never add mix-blend-mode here: it collapses the 3D paint order. */}
                <div
                    style={{
                        ...face,
                        background: GLOW_GRADIENT,
                        transform: "translateZ(calc(-1 * var(--key-float))) scaleZ(-1)",
                        boxShadow: `0 0 calc(20px * var(--key-refl-spread)) calc(4px * var(--key-refl-spread)) rgba(${GLOW}, 0.85), 0 0 calc(56px * var(--key-refl-spread)) calc(10px * var(--key-refl-spread)) rgba(${GLOW}, 0.45)`,
                        filter: "blur(var(--key-refl-blur)) brightness(var(--key-refl-bright))",
                        opacity: "var(--key-refl-opacity)",
                    }}
                />

                {/* Leans the prism up around its bottom edge. */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        transformOrigin: "center bottom",
                        transform: "rotateX(var(--key-stand))",
                        transformStyle: "preserve-3d",
                    }}
                >
                    {/* Glowing underside */}
                    <div
                        style={{
                            ...face,
                            background: GLOW_GRADIENT,
                            transform: "translateZ(var(--key-float))",
                            boxShadow: `0 0 calc(16px * var(--key-glow-spread)) calc(2px * var(--key-glow-spread)) rgba(${GLOW}, 0.8), 0 0 calc(44px * var(--key-glow-spread)) calc(6px * var(--key-glow-spread)) rgba(${GLOW}, 0.4)`,
                            filter: "brightness(var(--key-glow-bright)) saturate(calc(0.85 + 0.15 * var(--key-glow-bright)))",
                        }}
                    />

                    {Array.from({ length: SIDE_LAYERS }, (_, i) => (
                        <div
                            key={i}
                            style={{
                                ...face,
                                background: EDGE,
                                transform: `translateZ(calc(var(--key-float) + ${(THICKNESS * i) / SIDE_LAYERS}px))`,
                                boxShadow: `0 0 0 1px ${EDGE}`,
                            }}
                        />
                    ))}

                    {/* Top face carries the visible label. */}
                    <div
                        style={{
                            ...face,
                            ...row,
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            background: TOP_GRADIENT,
                            transform: `translateZ(calc(var(--key-float) + ${THICKNESS}px))`,
                            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
                            color: "var(--key-text)",
                            textShadow: `0 0 var(--key-text-glow) rgb(${GLOW}), 0 0 calc(var(--key-text-glow) * 2) rgb(${GLOW})`,
                        }}
                    >
                        {label}
                    </div>
                </div>
            </div>

            {/* Real control, unrotated and pinned at rest so the hover boundary never moves under the pointer. */}
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={tabIndex}
                aria-label={label}
                onPointerEnter={() => glide(hoverT, 1, SPRING)}
                onPointerLeave={() => {
                    glide(hoverT, 0, SPRING);
                    release();
                }}
                onFocus={() => glide(hoverT, 1, SPRING)}
                onBlur={() => glide(hoverT, 0, SPRING)}
                onPointerDown={() => {
                    pressed.current = true;
                    glide(pressT, 1, PRESS);
                }}
                style={{
                    position: "absolute",
                    inset: -6,
                    borderRadius: radius,
                    cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                }}
            />
        </div>
    );
}
