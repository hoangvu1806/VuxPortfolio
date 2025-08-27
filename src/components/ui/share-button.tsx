"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiShare2,
    FiTwitter,
    FiFacebook,
    FiLinkedin,
    FiCopy,
    FiCheck,
    FiMail,
    FiMessageCircle
} from "react-icons/fi";
import { ShareButtonMobile } from "./share-button-mobile";

interface ShareButtonProps {
    url: string;
    title: string;
    description?: string;
    className?: string;
}

export function ShareButton({ url, title, description, className = "" }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const shareData = {
        title,
        text: description || title,
        url
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            setIsOpen(!isOpen);
        }
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const shareLinks = [
        {
            name: "Twitter",
            icon: FiTwitter,
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            color: "hover:text-blue-400 hover:bg-blue-400/10"
        },
        {
            name: "Facebook",
            icon: FiFacebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: "hover:text-blue-600 hover:bg-blue-600/10"
        },
        {
            name: "LinkedIn",
            icon: FiLinkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            color: "hover:text-blue-500 hover:bg-blue-500/10"
        },
        {
            name: "Email",
            icon: FiMail,
            url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${title}\n\n${url}`)}`,
            color: "hover:text-green-500 hover:bg-green-500/10"
        }
    ];

    // Use mobile version on small screens
    if (isMobile) {
        return (
            <ShareButtonMobile
                url={url}
                title={title}
                description={description}
            />
        );
    }

    return (
        <div className={`relative ${className}`}>
            {/* Main Share Button */}
            <motion.button
                onClick={handleNativeShare}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 rounded-xl font-medium hover:from-primary/30 hover:to-secondary/30 hover:border-primary/50 hover:scale-105 transition-all duration-300 backdrop-blur-sm shadow-lg group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <FiShare2 size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Share</span>
            </motion.button>

            {/* Share Options Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 right-0 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl p-3 min-w-[200px] z-50"
                    >
                        <div className="space-y-2">
                            {shareLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 transition-all duration-300 ${link.color}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ x: 4 }}
                                >
                                    <link.icon size={16} />
                                    <span className="text-sm font-medium">{link.name}</span>
                                </motion.a>
                            ))}

                            {/* Copy Link Button */}
                            <motion.button
                                onClick={handleCopyLink}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-accent hover:bg-accent/10 transition-all duration-300 w-full"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: shareLinks.length * 0.05 }}
                                whileHover={{ x: 4 }}
                            >
                                {copied ? (
                                    <>
                                        <FiCheck size={16} className="text-green-500" />
                                        <span className="text-sm font-medium text-green-500">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <FiCopy size={16} />
                                        <span className="text-sm font-medium">Copy Link</span>
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop to close dropdown */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}