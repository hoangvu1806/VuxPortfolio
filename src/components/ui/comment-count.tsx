"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CommentCountProps {
  slug: string;
  className?: string;
}

export function CommentCount({ slug, className = "" }: CommentCountProps) {
  const [count, setCount] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Listen for Giscus metadata
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://giscus.app') return;
      
      if (event.data.giscus?.discussion) {
        const commentCount = event.data.giscus.discussion.totalCommentCount || 0;
        setCount(commentCount);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [mounted]);

  if (!mounted || count === null) {
    return (
      <span className={`inline-flex items-center gap-1.5 text-sm text-gray-500 ${className}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="animate-pulse w-8 h-3 bg-gray-600 rounded"></span>
      </span>
    );
  }

  return (
    <motion.span 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200 ${className}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <span>
        {count === 0 ? 'No comments' : `${count} comment${count === 1 ? '' : 's'}`}
      </span>
    </motion.span>
  );
}

export default CommentCount;
