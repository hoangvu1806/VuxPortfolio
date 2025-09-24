"use client";

import { useState, useEffect, useRef } from "react";

interface TocItem {
    id: string;
    text: string;
}

interface TableOfContentsProps {
    className?: string;
}

export function TableOfContents({ className = "" }: TableOfContentsProps) {
    const [tocItems, setTocItems] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const [isVisible, setIsVisible] = useState(false);
    const tocRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Generate TOC from h2 headings only
        const headings = document.querySelectorAll(".blog-content h2");
        const items: TocItem[] = [];

        headings.forEach((heading) => {
            const text = heading.textContent || "";
            let id = heading.id;

            if (!id) {
                id = text
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");
                heading.id = id;
            }

            items.push({ id, text });
        });

        setTocItems(items);
    }, []);

    useEffect(() => {
        // Simplified visibility detection
        const handleScroll = () => {
            const blogContent = document.querySelector(".blog-content");
            
            if (!blogContent) {
                setIsVisible(false);
                return;
            }
            
            const blogRect = blogContent.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Show when blog content is visible
            const inBlogArea = blogRect.top < viewportHeight * 0.5 && blogRect.bottom > 200;
            
            // Simple check for end of content - hide when we're near the bottom
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000;
            
            setIsVisible(inBlogArea && !nearBottom);
        };

        // Intersection Observer for active heading
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-20% 0% -35% 0%",
                threshold: 0,
            }
        );

        tocItems.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        window.addEventListener("scroll", handleScroll, { passive: true });
        
        // Delay initial check to ensure DOM is ready
        setTimeout(handleScroll, 100);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, [tocItems]);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    // Don't render if no items
    if (tocItems.length === 0) return null;
    
    // Always show initially, then let scroll handler control visibility
    const shouldRender = true;

    return (
        <div 
            ref={tocRef}
            className={`fixed left-8 top-32 z-30 w-52 transition-all duration-700 ease-in-out ${
                isVisible 
                    ? "opacity-100 translate-x-0 scale-100" 
                    : "opacity-0 -translate-x-8 scale-95 pointer-events-none"
            } ${className}`}
            style={{
                transform: `translateX(${isVisible ? '0' : '-2rem'}) scale(${isVisible ? '1' : '0.95'})`,
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
        >
            {/* Contents Title with smooth animation */}
            <div 
                className="transform transition-all duration-700 ease-out"
                style={{
                    transitionDelay: isVisible ? '100ms' : '0ms',
                    opacity: isVisible ? 1 : 0,
                    transform: `translateY(${isVisible ? '0' : '-0.5rem'})`
                }}
            >
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1 mb-4">
                    <div className={`w-1 h-1 bg-primary rounded-full transition-all duration-500 ${isVisible ? 'animate-pulse' : 'opacity-0'}`}></div>
                    Contents
                </h3>
            </div>

            {/* TOC List with smooth staggered animations */}
            <div className="max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-hide">
                <nav>
                    <ul className="space-y-1">
                        {tocItems.map(({ id, text }, index) => {
                            const truncatedText = text.length > 30 ? text.substring(0, 30) + "..." : text;

                            return (
                                <li 
                                    key={id}
                                    className="transform transition-all duration-500 ease-out"
                                    style={{ 
                                        transitionDelay: isVisible ? `${index * 80 + 200}ms` : '0ms',
                                        opacity: isVisible ? 1 : 0,
                                        transform: `translateX(${isVisible ? '0' : '-1rem'}) translateY(${isVisible ? '0' : '0.5rem'})`
                                    }}
                                >
                                    <button
                                        onClick={() => scrollToHeading(id)}
                                        className={`w-full text-left text-xs py-2 px-3 rounded-lg transition-all duration-300 hover:bg-gray-800/40 hover:scale-[1.02] ${
                                            activeId === id
                                                ? "text-primary bg-primary/15 border-l-3 border-primary font-medium shadow-lg shadow-primary/20"
                                                : "text-gray-500 hover:text-gray-300"
                                        }`}
                                        title={text}
                                    >
                                        {truncatedText}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
}