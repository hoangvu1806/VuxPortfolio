"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { KeycapButton } from "@/components/ui/keycap-button";
import { MorphIconWrapper } from "@/components/ui/morph-icon";
import { TextMorph } from "@/components/ui/text-morph";
import { profile } from "@/data/profile";
import { resume, type Metric } from "@/data/resume";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide";
import { Fragment, useEffect, useRef, useState } from "react";

const mono = "font-[family-name:var(--font-roboto-mono)]";
const EASE = [0.22, 1, 0.36, 1] as const;
const CV_URL = "/DOHOANGVU_CV.pdf";

const SECTIONS = [
    { id: "projects", label: "Projects" },
    { id: "research", label: "Research" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
];

/* ───────────────────────── reveal primitives ───────────────────────── */

/**
 * Text rises out of a clipped line box. Visibility is observed on the
 * clipping wrapper: the shifted inner span is fully clipped, so observing it
 * directly would never report an intersection.
 */
function Mask({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
    return (
        <span ref={ref} className={`block overflow-hidden pb-[0.08em] ${className}`}>
            <motion.span
                className="block"
                initial={reduce ? false : { y: "110%" }}
                animate={inView || reduce ? { y: 0 } : { y: "110%" }}
                transition={{ duration: 0.9, ease: EASE, delay }}
            >
                {children}
            </motion.span>
        </span>
    );
}

/** A hairline that draws itself left → right. */
function Rule({ delay = 0, className = "" }: { delay?: number; className?: string }) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            aria-hidden
            className={`h-px origin-left bg-white/15 ${className}`}
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE, delay }}
        />
    );
}

/** Fade + slight blur-in for blocks of prose. */
function Fade({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            className={className}
            initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay }}
        >
            {children}
        </motion.div>
    );
}

function Count({ m }: { m: Metric }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
    const reduce = useReducedMotion();
    const [val, setVal] = useState(reduce ? m.value : 0);
    const decimals = m.decimals ?? 0;

    useEffect(() => {
        if (!inView || reduce) return;
        const controls = animate(0, m.value, { duration: 1.6, ease: EASE, onUpdate: setVal });
        return () => controls.stop();
    }, [inView, reduce, m.value]);

    return (
        <span ref={ref}>
            {m.prefix}
            {val.toLocaleString("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            })}
            {m.suffix}
        </span>
    );
}

function Metrics({ items }: { items: Metric[] }) {
    if (!items.length) return null;
    return (
        <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-5">
            {items.map((m) => (
                <div key={m.label}>
                    <dd className="text-3xl font-medium tabular-nums tracking-tight text-white">
                        <Count m={m} />
                    </dd>
                    <dt className={`${mono} mt-1 text-[11px] uppercase tracking-widest text-gray-500`}>
                        {m.label}
                    </dt>
                </div>
            ))}
        </dl>
    );
}

/** Renders **bold** markers as emphasised figures. */
function Rich({ text }: { text: string }) {
    return (
        <>
            {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
                part.startsWith("**") ? (
                    <strong key={i} className="font-semibold text-white">
                        {part.slice(2, -2)}
                    </strong>
                ) : (
                    <Fragment key={i}>{part}</Fragment>
                ),
            )}
        </>
    );
}

/* ───────────────────────── section chrome ───────────────────────── */

function SectionHead({ n, title }: { n: string; title: string }) {
    return (
        <header className="mb-10">
            <div className="flex items-baseline gap-4 pb-4">
                <span className={`${mono} text-xs text-[color:var(--primary-light)]`}>{n}</span>
                <h2 className="block text-2xl font-medium tracking-tight text-white after:hidden md:text-3xl">
                    <Mask>{title}</Mask>
                </h2>
            </div>
            <Rule />
        </header>
    );
}

/** Left index: scroll-spy with a vertical track that fills as you read. */
function Rail() {
    const [active, setActive] = useState(SECTIONS[0].id);

    useEffect(() => {
        const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
            (e): e is HTMLElement => Boolean(e),
        );
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(e.target.id);
                });
            },
            { rootMargin: "-35% 0px -60% 0px" },
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    const idx = SECTIONS.findIndex((s) => s.id === active);

    return (
        <nav aria-label="Resume sections" className="sticky top-32 hidden lg:block">
            <div className="relative pl-5">
                <div className="absolute bottom-1 left-0 top-1 w-px bg-white/10" />
                <motion.div
                    className="absolute left-0 top-1 w-px bg-[color:var(--primary-light)]"
                    animate={{ height: `calc(${((idx + 1) / SECTIONS.length) * 100}% - 4px)` }}
                    transition={{ duration: 0.6, ease: EASE }}
                />
                <ul className="space-y-3">
                    {SECTIONS.map((s, i) => (
                        <li key={s.id}>
                            <a
                                href={`#${s.id}`}
                                className={`${mono} flex gap-3 text-xs transition-colors duration-300 ${
                                    active === s.id ? "text-white" : "text-gray-500 hover:text-gray-300"
                                }`}
                            >
                                <span className={active === s.id ? "text-[color:var(--primary-light)]" : ""}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                {s.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

/* ───────────────────────── page ───────────────────────── */

export default function ResumePage() {
    const links: [string, string][] = [
        ["GitHub", profile.social.github],
        ["LinkedIn", profile.social.linkedin],
        ["Telegram", profile.social.telegram],
    ];

    return (
        <MainLayout>
            <div className="mx-auto max-w-6xl [&_p]:mb-0 px-5 pb-32 pt-32 md:px-8 md:pt-40">
                {/* ───────── masthead ───────── */}
                <section className="mb-20 md:mb-24">
                    {/* Inline: the global h1 rule outranks utilities, and its background-clip gradient would paint hidden words. */}
                    <h1
                        aria-label="Do Hoang Vu, AI Engineer"
                        className="text-center font-semibold after:hidden"
                        style={{
                            fontSize: "clamp(2.2rem, 10.5vw, 7.5rem)",
                            letterSpacing: "-0.04em",
                            background: "none",
                            animation: "none",
                            color: "#fff",
                            WebkitTextFillColor: "currentColor",
                        }}
                    >
                        <TextMorph words={["Do Hoang Vu", "AI ENGINEER"]} />
                    </h1>

                    <Fade delay={0.3} className="mx-auto mt-14 flex max-w-3xl flex-col items-center gap-10 text-center">
                        <p className="text-xl leading-snug text-gray-200 md:text-2xl">{resume.objective}</p>
                        <div className="flex flex-col items-center">
                            <KeycapButton label="View CV" href={CV_URL} />
                            <ul className={`${mono} mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm`}>
                                {links.map(([label, href]) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[color:var(--primary-light)] hover:decoration-[color:var(--primary-light)]"
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Fade>
                </section>

                <div className="grid gap-16 lg:grid-cols-[150px_1fr]">
                    <Rail />

                    <div className="min-w-0 space-y-20 md:space-y-24">
                        {/* ───────── projects ───────── */}
                        <section id="projects" className="scroll-mt-32">
                            <SectionHead n="01" title="Projects" />
                            <div className="space-y-6">
                                {resume.projects.map((p, i) => (
                                    <Fade key={p.id}>
                                        <article className="border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-white/25">
                                            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-3 md:px-8">
                                                <span className={`${mono} text-xs text-[color:var(--primary-light)]`}>
                                                    Project {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <span className={`${mono} text-xs text-gray-400`}>{p.period}</span>
                                            </header>
                                            <div className="grid gap-6 px-[1.5rem] py-7 md:grid-cols-[1fr_auto] md:gap-10 md:px-8">
                                                <div>
                                                    <h3 className="text-2xl text-white md:text-3xl">
                                                        <Mask>{p.name}</Mask>
                                                    </h3>
                                                    <p className="mt-1 text-gray-400">{p.subtitle}</p>
                                                    <p className={`${mono} mt-3 text-xs text-gray-500`}>
                                                        {p.kind} · {p.role}
                                                    </p>
                                                    <p className="mt-5 max-w-2xl leading-relaxed text-gray-300">{p.text}</p>
                                                    <Metrics items={p.metrics} />
                                                </div>
                                                <a
                                                    href={p.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group inline-flex items-center gap-2 self-start border border-white/20 px-4 py-2 text-sm text-gray-200 transition-colors hover:border-[color:var(--primary-light)] hover:text-[color:var(--primary-light)]"
                                                >
                                                    GitHub
                                                    <MorphIconWrapper from={ExternalLink} to={ArrowUpRight} size={14} />
                                                </a>
                                            </div>
                                        </article>
                                    </Fade>
                                ))}
                            </div>
                        </section>

                        {/* ───────── research ───────── */}
                        <section id="research" className="scroll-mt-32">
                            <SectionHead n="02" title="Research & Competitions" />
                            <div className="grid gap-14 md:grid-cols-2">
                                <div>
                                    <div className={`${mono} mb-4 text-[11px] uppercase tracking-widest text-gray-500`}>
                                        Research Papers
                                    </div>
                                    <ul className="border-t border-white/10">
                                        {resume.papers.map((p, i) => (
                                            <li key={p.name} className="border-b border-white/10">
                                                <Fade delay={i * 0.1}>
                                                    <a
                                                        href={p.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group flex items-baseline justify-between gap-4 py-4"
                                                    >
                                                        <span>
                                                            <span className="text-xl text-white">{p.name}</span>
                                                            <span className="ml-3 text-sm text-gray-400">{p.role}</span>
                                                        </span>
                                                        <span className={`${mono} text-xs text-gray-500 transition-colors group-hover:text-[color:var(--primary-light)]`}>
                                                            {p.venue} ↗
                                                        </span>
                                                    </a>
                                                </Fade>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <div className={`${mono} mb-4 text-[11px] uppercase tracking-widest text-gray-500`}>
                                        Competitions
                                    </div>
                                    <ul className="border-t border-white/10">
                                        {resume.competitions.map((c, i) => (
                                            <li key={c} className="border-b border-white/10 py-4 text-xl text-white">
                                                <Mask delay={i * 0.08}>{c}</Mask>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* ───────── skills ───────── */}
                        <section id="skills" className="scroll-mt-32">
                            <SectionHead n="03" title="Skills" />
                            <dl className="border-t border-white/10">
                                {resume.skills.map((s, i) => (
                                    <Fade key={s.group} delay={i * 0.05}>
                                        <div className="grid gap-2 border-b border-white/10 py-5 md:grid-cols-[170px_1fr] md:gap-10">
                                            <dt className={`${mono} text-xs text-gray-500`}>{s.group}</dt>
                                            <dd className="leading-relaxed text-gray-200">
                                                {s.items.map((it, j) => (
                                                    <Fragment key={it}>
                                                        {j > 0 && <span className="mx-2 text-gray-700">/</span>}
                                                        {it}
                                                    </Fragment>
                                                ))}
                                            </dd>
                                        </div>
                                    </Fade>
                                ))}
                            </dl>

                            <div className="mt-10 grid gap-10 md:grid-cols-3">
                                <Fade>
                                    <div className={`${mono} mb-3 text-[11px] uppercase tracking-widest text-gray-500`}>
                                        Areas of Interest
                                    </div>
                                    <ul className="space-y-1.5 text-gray-200">
                                        {resume.interests.map((s) => (
                                            <li key={s}>{s}</li>
                                        ))}
                                    </ul>
                                </Fade>
                                <Fade delay={0.08}>
                                    <div className={`${mono} mb-3 text-[11px] uppercase tracking-widest text-gray-500`}>
                                        Soft Skills
                                    </div>
                                    <ul className="space-y-1.5 text-gray-300">
                                        {resume.softSkills.map((s) => (
                                            <li key={s}>{s}</li>
                                        ))}
                                    </ul>
                                </Fade>
                                <Fade delay={0.16}>
                                    <div className={`${mono} mb-3 text-[11px] uppercase tracking-widest text-gray-500`}>
                                        Languages
                                    </div>
                                    <ul className="space-y-1.5 text-gray-200">
                                        {resume.languages.map((l) => (
                                            <li key={l.name}>
                                                {l.name} <span className="text-gray-500">· {l.level}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Fade>
                            </div>
                        </section>

                        {/* ───────── experience ───────── */}
                        <section id="experience" className="scroll-mt-32">
                            <SectionHead n="04" title="Experience" />
                            <div className="space-y-20">
                                {resume.experience.map((e) => (
                                    <article key={e.id} className="grid gap-6 md:grid-cols-[170px_1fr] md:gap-10">
                                        <Fade>
                                            <p className={`${mono} text-xs leading-relaxed text-gray-400`}>{e.period}</p>
                                        </Fade>
                                        <div>
                                            <h3 className="text-xl text-white md:text-2xl">
                                                <Mask>{e.org}</Mask>
                                            </h3>
                                            <p className="mt-1 text-gray-400">
                                                <Mask delay={0.08}>{e.role}</Mask>
                                            </p>
                                            <Fade delay={0.12}>
                                                <Metrics items={e.metrics} />
                                            </Fade>
                                            <ol className="mt-8 border-t border-white/10">
                                                {e.points.map((p, i) => (
                                                    <li key={i} className="border-b border-white/10 py-4">
                                                        <Fade delay={i * 0.08} className="grid grid-cols-[2rem_1fr]">
                                                            <span className={`${mono} pt-1 text-[11px] text-gray-600`}>
                                                                {String(i + 1).padStart(2, "0")}
                                                            </span>
                                                            <p className="leading-relaxed text-gray-300">
                                                                <Rich text={p} />
                                                            </p>
                                                        </Fade>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                        {/* ───────── education ───────── */}
                        <section id="education" className="scroll-mt-32">
                            <SectionHead n="05" title="Education" />
                            <div className="grid gap-4 md:grid-cols-[170px_1fr_auto] md:items-baseline md:gap-10">
                                <Fade>
                                    <p className={`${mono} text-xs text-gray-400`}>{resume.education.graduation}</p>
                                </Fade>
                                <div>
                                    <h3 className="text-xl text-white md:text-2xl">
                                        <Mask>{resume.education.school}</Mask>
                                    </h3>
                                    <p className="mt-1 text-gray-400">
                                        <Mask delay={0.08}>{resume.education.degree}</Mask>
                                    </p>
                                </div>
                                <Fade delay={0.15} className="flex items-baseline gap-3 md:block md:text-right">
                                    <p className={`${mono} text-[11px] uppercase tracking-widest text-gray-500`}>GPA</p>
                                    <p className="text-3xl font-medium tabular-nums text-white">{resume.education.gpa}</p>
                                </Fade>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
