"use client";

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { injectGiscusTheme } from '@/utils/giscus-theme-injector';

interface GiscusCommentsProps {
    slug: string;
    title: string;
}

export function GiscusComments({ slug, title }: GiscusCommentsProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { theme, systemTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Ensure component is mounted to avoid hydration issues
    useEffect(() => {
        setMounted(true);
    }, []);

    // Get current theme
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const giscusTheme = currentTheme === 'dark' ? 'dark' : 'light';

    useEffect(() => {
        if (!mounted || !ref.current) return;

        // Clear previous instance
        if (ref.current.hasChildNodes()) {
            ref.current.innerHTML = '';
        }

        const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
        const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

        // Debug environment variables
        console.log('🔧 Giscus Debug Info:', {
            repoId: repoId ? '✅ Set' : '❌ Missing',
            categoryId: categoryId ? '✅ Set' : '❌ Missing',
            repoIdValue: repoId ? `${repoId.substring(0, 10)}...` : 'undefined',
            categoryIdValue: categoryId ? `${categoryId.substring(0, 10)}...` : 'undefined'
        });

        if (!repoId || !categoryId) {
            console.error('❌ Giscus Error: Environment variables not configured!');
            console.error('Please set NEXT_PUBLIC_GISCUS_REPO_ID and NEXT_PUBLIC_GISCUS_CATEGORY_ID in .env.local');
            setHasError(true);
            setIsLoading(false);
            return;
        }

        const scriptElem = document.createElement('script');
        scriptElem.src = 'https://giscus.app/client.js';
        scriptElem.async = true;
        scriptElem.crossOrigin = 'anonymous';

        // Giscus configuration with custom theme
        scriptElem.setAttribute('data-repo', 'hoangvu1806/VuxPortfolio');
        scriptElem.setAttribute('data-repo-id', repoId);
        scriptElem.setAttribute('data-category', 'General');
        scriptElem.setAttribute('data-category-id', categoryId);
        scriptElem.setAttribute('data-mapping', 'specific');
        scriptElem.setAttribute('data-term', `/blog/${slug}`);
        scriptElem.setAttribute('data-strict', '0');
        scriptElem.setAttribute('data-reactions-enabled', '1');
        scriptElem.setAttribute('data-emit-metadata', '1');
        scriptElem.setAttribute('data-input-position', 'bottom');
        scriptElem.setAttribute('data-theme', 'dark'); // Force dark theme for consistency
        scriptElem.setAttribute('data-lang', 'en');

        // Add custom CSS class for enhanced styling
        scriptElem.setAttribute('data-theme-url', 'https://giscus.app/themes/dark.css');

        // Loading timeout
        const timer = setTimeout(() => {
            if (isLoading) {
                console.error('❌ Giscus Error: Timeout after 10 seconds');
                setHasError(true);
                setIsLoading(false);
            }
        }, 10000); // 10s timeout

        // Listen for Giscus events
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== 'https://giscus.app') return;

            if (event.data.giscus) {
                setIsLoading(false);
                setHasError(false);
                clearTimeout(timer);
            }
        };

        window.addEventListener('message', handleMessage);
        ref.current.appendChild(scriptElem);

        // Inject custom theme after a delay
        setTimeout(() => {
            injectGiscusTheme();
        }, 2000);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('message', handleMessage);
        };
    }, [mounted, giscusTheme, isLoading]);

    // Update theme when it changes
    useEffect(() => {
        if (!mounted) return;

        const iframe = ref.current?.querySelector<HTMLIFrameElement>('.giscus-frame');
        if (iframe) {
            iframe.contentWindow?.postMessage(
                { giscus: { setConfig: { theme: giscusTheme } } },
                'https://giscus.app'
            );
        }
    }, [giscusTheme, mounted]);

    if (!mounted) {
        return null; // Avoid hydration mismatch
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 pt-8 border-t border-gray-700/30"
        >
            <div className="mb-8">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600"
                >
                    💬 Discussion
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-gray-400 leading-relaxed"
                >
                    Share your thoughts about this article! You need a GitHub account to comment.
                </motion.p>
            </div>

            {hasError ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-12 px-6 bg-gray-800/40 rounded-xl border border-gray-700/50"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
                        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">
                        Unable to load comments
                    </h3>
                    <p className="text-gray-400 mb-4">
                        {!process.env.NEXT_PUBLIC_GISCUS_REPO_ID || !process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID
                            ? 'Environment variables not configured. Please check .env.local file.'
                            : 'Comments system is temporarily unavailable. Please try again later.'
                        }
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={() => {
                                setHasError(false);
                                setIsLoading(true);
                                window.location.reload();
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Try Again
                        </button>

                        {(!process.env.NEXT_PUBLIC_GISCUS_REPO_ID || !process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID) && (
                            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-left">
                                <h4 className="text-yellow-400 font-semibold mb-2">🔧 Setup Required:</h4>
                                <p className="text-sm text-gray-300 mb-2">Create <code className="bg-gray-700 px-1 rounded">.env.local</code> file with:</p>
                                <pre className="text-xs bg-gray-900 p-2 rounded border text-green-400 overflow-x-auto">
                                    {`NEXT_PUBLIC_GISCUS_REPO_ID=your_repo_id
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id`}
                                </pre>
                                <p className="text-xs text-gray-400 mt-2">
                                    Get IDs from: <a href="https://giscus.app" target="_blank" rel="noopener" className="text-blue-400 hover:underline">giscus.app</a>
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
            ) : (
                <>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-center min-h-[200px] bg-gray-800/20 rounded-xl border border-gray-700/30"
                        >
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-400 border-t-transparent"></div>
                                </div>
                                <p className="text-gray-400 text-sm">Loading comments...</p>
                            </div>
                        </motion.div>
                    )}

                    <div
                        ref={ref}
                        className={`giscus-container ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
                        data-theme="dark"
                        style={{
                            '--giscus-primary': '#6366f1',
                            '--giscus-bg': '#030712',
                            '--giscus-text': '#e0f2fe'
                        } as React.CSSProperties}
                    />
                </>
            )}
        </motion.section>
    );
}

export default GiscusComments;
