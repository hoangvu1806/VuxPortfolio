'use client';

import { useMemo } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    const processedContent = useMemo(() => {
        try {
            const result = unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(remarkMath) 
                .use(remarkRehype)
                .use(rehypeHighlight)
                .use(rehypeKatex) 
                .use(rehypeStringify)
                .processSync(content);

            return result.toString();
        } catch (error) {
            console.error('Error processing markdown:', error);
            return content;
        }
    }, [content]);

    // Simple fallback renderer for basic markdown
    const renderSimpleMarkdown = (text: string) => {
        return text
            // Bold text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italic text
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Inline code
            .replace(/`(.*?)`/g, '<code class="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary-dark underline">$1</a>')
            // Line breaks
            .replace(/\n/g, '<br />');
    };

    // Check if content has complex markdown that needs full processing
    const hasComplexMarkdown = content.includes('```') || content.includes('|') || content.includes('#') || content.includes('$');

    if (hasComplexMarkdown) {
        return (
            <div
                className="chatbot-markdown max-w-none text-sm"
                dangerouslySetInnerHTML={{ __html: processedContent }}
            />
        );
    }

    // Use simple renderer for basic formatting
    return (
        <div
            className="chatbot-markdown leading-relaxed text-sm"
            dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(content) }}
        />
    );
}