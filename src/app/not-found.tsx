"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, MoveLeft, Sparkles } from "lucide";
import type { CSSProperties } from "react";
import { FormulaStream } from "@/components/ui/formula-stream";
import { MorphIconWrapper } from "@/components/ui/morph-icon";
import styles from "./not-found.module.css";

const PHOTO = "/images/profile/404_bg.webp";

// Bulb positions in the photo (855 × 1073). The third one is on its way out.
const BULBS = [
    { x: "6.1%", y: "28%" },
    { x: "26.7%", y: "29.4%" },
    { x: "47.1%", y: "28.7%", dying: true },
    { x: "67%", y: "29.6%" },
    { x: "87.3%", y: "28.9%" },
];

const FRIENDS = [
    { label: "About me", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

export default function NotFound() {
    return (
        <main className={styles.page}>
            <div aria-hidden className={styles.backdrop}>
                <Image src={PHOTO} alt="" fill sizes="50vw" quality={40} />
            </div>

            <div className={styles.photo}>
                <Image
                    src={PHOTO}
                    alt="Do Hoang Vu slumped on a chair under balloons and string lights, next to an empty seat"
                    fill
                    priority
                    sizes="(min-width: 900px) 50vw, 100vw"
                />
                {BULBS.map((b, i) => (
                    <span
                        key={b.x}
                        aria-hidden
                        className={b.dying ? styles.bulbDying : styles.bulb}
                        style={{ left: b.x, top: b.y, "--i": i } as CSSProperties}
                    />
                ))}
            </div>

            <div aria-hidden className={styles.scrim} />
            <FormulaStream className={styles.stream} alpha={0.24} />
            <div aria-hidden className={styles.grain} />

            <div className={styles.content}>
                <h1 className={styles.code} aria-label="404">
                    <span className={styles.four}>4</span>
                    <span className={styles.balloon}>
                        <span className={styles.zero}>0</span>
                    </span>
                    <span className={styles.fourLate}>4</span>
                </h1>

                <h2 className={styles.title}>This page stood me up.</h2>
                <p className={styles.copy}>
                    I blew up the balloons, hung the lights and saved it a chair. Three hours later, still no sign of
                    this URL. It may have moved, or it never planned on coming.
                </p>

                <div className={styles.actions}>
                    <Link href="/" className={styles.primary}>
                        <MorphIconWrapper from={Home} to={Sparkles} size={20} />
                        Take me to the real party
                    </Link>
                    <button type="button" onClick={() => window.history.back()} className={styles.secondary}>
                        <MorphIconWrapper from={ArrowLeft} to={MoveLeft} size={20} />
                        Go back
                    </button>
                </div>

                <nav aria-label="Other pages" className={styles.friends}>
                    <span>Pages that did show up:</span>
                    {FRIENDS.map((f) => (
                        <Link key={f.href} href={f.href}>
                            {f.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </main>
    );
}
