"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiShare2,
    FiTwitter,
    FiFacebook,
    FiLinkedin,
    FiCopy,
    FiCheck,
    FiMail,
    FiX
} from "react-icons/fi";

interface ShareButtonMobileProps {
    url: string;
    title: string;
    description?: string;
}

export function ShareButtonMobile({ url, title, description }: ShareButtonMobileProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

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
            setIsOpen(true);
        }
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                setIsOpen(false);
            }, 1500);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const shareLinks = [
        {
            name: "Twitter",
            icon: FiTwitter,
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            color: "bg-blue-500"
        },
        {
            name: "Facebook",
            icon: FiFacebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: "bg-blue-600"
        },
        {
            name: "LinkedIn",
            icon: FiLinkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            color: "bg-blue-700"
        },
        {
            name: "Email",
            icon: FiMail,
            url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${title}\n\n${url}`)}`,
            color: "bg-green-600"
        }
    ];

    return (
        <>
            {/* Share Button */}
            <motion.button
                onClick={handleNativeShare}
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 rounded-lg font-medium hover:from-primary/30 hover:to-secondary/30 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <FiShare2 size={14} />
                <span>Share</span>
            </motion.button>

            {/* Full Screen Modal for Mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-t-2xl sm:rounded-2xl w-full max-w-md p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-100">Share Article</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>

                            {/* Article Info */}
                            <div className="mb-6 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
                                <h4 className="font-medium text-gray-200 text-sm line-clamp-2 mb-1">
                                    {title}
                                </h4>
                                {description && (
                                    <p className="text-gray-400 text-xs line-clamp-2">
                                        {description}
                                    </p>
                                )}
                            </div>

                            {/* Share Options */}
                            <div className="space-y-3">
                                {shareLinks.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 group"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className={`p-2 rounded-lg ${link.color} text-white`}>
                                            <link.icon size={16} />
                                        </div>
                                        <span className="text-gray-200 font-medium group-hover:text-white transition-colors">
                                            Share on {link.name}
                                        </span>
                                    </motion.a>
                                ))}

                                {/* Copy Link */}
                                <motion.button
                                    onClick={handleCopyLink}
                                    className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 group w-full"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: shareLinks.length * 0.1 }}
                                >
                                    <div className={`p-2 rounded-lg ${copied ? 'bg-green-600' : 'bg-accent'} text-white`}>
                                        {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                                    </div>
                                    <span className={`font-medium transition-colors ${copied ? 'text-green-400' : 'text-gray-200 group-hover:text-white'}`}>
                                        {copied ? 'Link Copied!' : 'Copy Link'}
                                    </span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}