"use client";

import { FacebookIcon, GithubIcon, LinkedinIcon, TelegramIcon } from "@/components/ui/brand-icons";
import { MorphIconWrapper } from "@/components/ui/morph-icon";
import { useChatbotContext } from "@/contexts/ChatbotContext";
import { profile } from "@/data/profile";
import {
    ArrowUpRight,
    FileText,
    GitBranch,
    Globe,
    Mail,
    MailOpen,
    Nfc,
    Phone,
    PhoneCall,
    Scroll,
    Send,
    Share2,
    Sparkles,
    UserCheck,
    UserPlus,
    type IconNode,
} from "lucide";
import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties, type PointerEvent } from "react";
import styles from "./information.module.css";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

const ACTIONS: { label: string; href: string; from: IconNode; to: IconNode; external?: boolean }[] = [
    { label: "Call", href: `tel:${profile.phone.replace(/\s/g, "")}`, from: Phone, to: PhoneCall },
    { label: "Telegram", href: profile.social.telegram, from: TelegramIcon, to: Send, external: true },
    { label: "Email", href: `mailto:${profile.email}`, from: Mail, to: MailOpen },
    { label: "LinkedIn", href: profile.social.linkedin, from: LinkedinIcon, to: Share2, external: true },
];

const LINKS: { label: string; note: string; href: string; from: IconNode; to: IconNode; external: boolean }[] = [
    { label: "View CV", note: "PDF resume", href: "/DOHOANGVU_CV.pdf", from: FileText, to: Scroll, external: true },
    { label: "GitHub", note: "hoangvu1806", href: profile.social.github, from: GithubIcon, to: GitBranch, external: true },
    { label: "Facebook", note: "hoangvu.nt1806", href: profile.social.facebook, from: FacebookIcon, to: Share2, external: true },
    { label: "Portfolio", note: "Projects, research and writing", href: "/", from: Globe, to: Sparkles, external: false },
];

function HoloCard({ age }: { age: number }) {
    const tilt = useRef<HTMLDivElement>(null);

    const onMove = (e: PointerEvent<HTMLDivElement>) => {
        const el = tilt.current;
        if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--ry", `${(x - 0.5) * 16}deg`);
        el.style.setProperty("--rx", `${(0.5 - y) * 16}deg`);
        el.style.setProperty("--px", `${x * 100}%`);
        el.style.setProperty("--py", `${y * 100}%`);
    };
    const onLeave = () => {
        tilt.current?.style.setProperty("--rx", "0deg");
        tilt.current?.style.setProperty("--ry", "0deg");
    };

    return (
        <div className={styles.stage}>
            <div aria-hidden className={styles.rings}>
                {[0, 1, 2].map((i) => (
                    <span key={i} style={delay(i)} />
                ))}
            </div>
            <div className={styles.float}>
                <div className={styles.entry}>
                    <div
                        ref={tilt}
                        className={styles.tilt}
                        onPointerMove={onMove}
                        onPointerLeave={onLeave}
                        onPointerCancel={onLeave}
                    >
                        <div aria-hidden className={styles.surface}>
                            <span className={styles.foil} />
                            <span className={styles.glare} />
                            <span className={styles.sweep} />
                        </div>
                        <div className={styles.face}>
                            <div className={styles.cardTop}>
                                <span className={styles.brand}>
                                    <Image src="/images/ui/logo.png" alt="" width={40} height={40} />
                                    VU HOANG
                                </span>
                                <span aria-hidden className={styles.nfc}>
                                    <MorphIconWrapper from={Nfc} size="100%" wrapperClassName={styles.nfcIcon} />
                                </span>
                            </div>
                            <div className={styles.identity}>
                                <div className={styles.avatar}>
                                    <Image
                                        src="/images/profile/profile.webp"
                                        alt="Portrait of Do Hoang Vu"
                                        fill
                                        sizes="128px"
                                        priority
                                    />
                                </div>
                                <div>
                                    <h1 className={styles.name} aria-label={profile.name}>
                                        {[...profile.name].map((ch, i) => (
                                            <span key={i} aria-hidden style={delay(i)}>
                                                {ch === " " ? " " : ch}
                                            </span>
                                        ))}
                                    </h1>
                                    <p className={styles.role}>{profile.title}</p>
                                    <p className={styles.age}>{age} years old</p>
                                </div>
                            </div>
                            <div className={styles.cardBottom}>
                                <span>{profile.location.city}</span>
                                <span>hoangvu.id.vn</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function InformationPageClient({ age }: { age: number }) {
    const { openChat } = useChatbotContext();

    return (
        <main className={styles.page}>
            <div aria-hidden className={styles.aurora} />
            <div className={styles.layout}>
                <div className={styles.lead}>
                    <HoloCard age={age} />
                    <a className={styles.save} href="/information/contact.vcf" download="Do-Hoang-Vu.vcf">
                        <MorphIconWrapper from={UserPlus} to={UserCheck} size={20} />
                        Save contact
                    </a>
                </div>

                <div className={styles.details}>
                    <nav aria-label="Contact" className={styles.actions}>
                        {ACTIONS.map((a, i) => (
                            <a
                                key={a.label}
                                href={a.href}
                                {...(a.external && { target: "_blank", rel: "noopener noreferrer" })}
                                className={styles.action}
                                style={delay(i)}
                            >
                                <span className={styles.actionIcon}>
                                    <MorphIconWrapper from={a.from} to={a.to} size={22} />
                                </span>
                                {a.label}
                            </a>
                        ))}
                    </nav>

                    <nav aria-label="Links" className={styles.links}>
                        {LINKS.map((l, i) => {
                            const body = (
                                <>
                                    <MorphIconWrapper from={l.from} to={l.to} size={20} />
                                    <span className={styles.linkText}>
                                        {l.label}
                                        <small>{l.note}</small>
                                    </span>
                                    <MorphIconWrapper from={ArrowUpRight} size={18} wrapperClassName={styles.arrow} />
                                </>
                            );
                            return l.external ? (
                                <a
                                    key={l.label}
                                    href={l.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.link}
                                    style={delay(i)}
                                >
                                    {body}
                                </a>
                            ) : (
                                <Link key={l.label} href={l.href} className={styles.link} style={delay(i)}>
                                    {body}
                                </Link>
                            );
                        })}
                        <button type="button" onClick={openChat} className={styles.twin} style={delay(LINKS.length)}>
                            <Image src="/images/profile/twinself.webp" alt="" width={40} height={40} />
                            <span className={styles.linkText}>
                                Ask TwinSelf
                                <small>My AI twin answers questions about my work</small>
                            </span>
                            <MorphIconWrapper from={ArrowUpRight} size={18} wrapperClassName={styles.arrow} />
                        </button>
                    </nav>
                </div>
            </div>
        </main>
    );
}
