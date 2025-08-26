"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { FiSearch, FiTag, FiX, FiCalendar, FiUser, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState, useEffect } from "react";
import  CommentCount  from "@/components/ui/comment-count";
import { blogCategories } from "@/data/blog/config";

// Types
export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    category: string;
    tags: string[];
    image: string;
    published: "published" | "draft";
    content: string;
}

// Client-side filtering logic (no file system access)
class ClientBlogService {
    static filterPosts(posts: BlogPost[], filters: {
        category?: string;
        tag?: string;
        search?: string;
    }): BlogPost[] {
        let filteredPosts = [...posts];

        if (filters.category) {
            filteredPosts = filteredPosts.filter(post =>
                post.category === filters.category
            );
        }

        if (filters.tag) {
            filteredPosts = filteredPosts.filter(post =>
                post.tags.includes(filters.tag!)
            );
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filteredPosts = filteredPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm) ||
                post.description.toLowerCase().includes(searchTerm) ||
                post.content.toLowerCase().includes(searchTerm) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        return filteredPosts;
    }

    static paginatePosts(posts: BlogPost[], page: number = 1, limit: number = 6) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedPosts = posts.slice(startIndex, endIndex);

        return {
            posts: paginatedPosts,
            currentPage: page,
            totalPages: Math.ceil(posts.length / limit),
            totalPosts: posts.length,
            hasNextPage: endIndex < posts.length,
            hasPrevPage: page > 1
        };
    }
}
import Link from "next/link";

interface BlogClientProps {
    initialPosts: BlogPost[];
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(initialPosts);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const categories = blogCategories;

    // Filter posts when search or category changes
    useEffect(() => {
        let filtered = ClientBlogService.filterPosts(initialPosts, {
            category: selectedCategory || undefined,
            search: searchQuery || undefined
        });
        setFilteredPosts(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchQuery, selectedCategory, initialPosts]);

    // Pagination
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, endIndex);

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="min-h-[40vh] relative flex items-center justify-center overflow-hidden mb-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary opacity-10 rounded-full filter blur-3xl -z-10"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="container px-4 md:px-6 mx-auto text-center"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Blog
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Thoughts and insights on AI, machine learning, and technology trends.
                    </p>
                </motion.div>
            </section>

            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                {/* Search Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="relative max-w-2xl mx-auto">
                        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        />
                    </div>
                </motion.div>

                {/* Category Filter Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-12"
                >
                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => setSelectedCategory("")}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!selectedCategory
                                ? "bg-primary text-white shadow-primary-glow"
                                : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50"
                                }`}
                        >
                            All Categories
                        </button>
                        {categories.map((category, index) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                    ? "bg-secondary text-gray-900 shadow-secondary-glow"
                                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Active Filters */}
                {(searchQuery || selectedCategory) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mb-8"
                    >
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <span className="text-sm text-gray-400">Active filters:</span>
                            {searchQuery && (
                                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30 flex items-center gap-2">
                                    Search: "{searchQuery}"
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="hover:text-primary-300 transition-colors"
                                    >
                                        <FiX size={14} />
                                    </button>
                                </span>
                            )}
                            {selectedCategory && (
                                <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm border border-secondary/30 flex items-center gap-2">
                                    {selectedCategory}
                                    <button
                                        onClick={() => setSelectedCategory("")}
                                        className="hover:text-secondary-300 transition-colors"
                                    >
                                        <FiX size={14} />
                                    </button>
                                </span>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Blog Posts Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-20"
                >
                    {filteredPosts.length === 0 ? (
                        // No Posts State
                        <div className="text-center py-20">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                className="backdrop-blur-sm bg-gray-900/30 rounded-2xl border border-gray-700/50 p-12 max-w-2xl mx-auto"
                            >
                                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 shadow-primary-glow">
                                    <FiSearch className="text-3xl text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-200">
                                    {searchQuery || selectedCategory ? "No articles found" : "Coming Soon"}
                                </h3>
                                <p className="text-gray-300 mb-6 leading-relaxed">
                                    {searchQuery || selectedCategory
                                        ? "Try adjusting your search or filter criteria."
                                        : "I'm working on creating valuable content about AI, machine learning, and technology. Check back soon for insightful articles and tutorials."
                                    }
                                </p>
                                {(searchQuery || selectedCategory) && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedCategory("");
                                        }}
                                        className="btn btn-primary"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </motion.div>
                        </div>
                    ) : (
                        // Posts Grid
                        <>
                            {/* Results Summary */}
                            <div className="mb-8 text-center">
                                <p className="text-gray-400">
                                    Showing {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} articles
                                </p>
                            </div>

                            {/* Posts Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {currentPosts.map((post, index) => (
                                    <motion.div
                                        key={post.slug}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Link href={`/blog/${post.slug}`} className="group block h-full">
                                            <article className="h-full flex flex-col backdrop-blur-sm bg-gray-900/30 rounded-xl border border-gray-700/50 overflow-hidden hover:border-primary/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                                                {post.image && (
                                                    <div className="aspect-video overflow-hidden flex-shrink-0">
                                                        <img
                                                            src={post.image}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                    </div>
                                                )}
                                                <div className="p-6 flex flex-col flex-grow">
                                                    <div className="mb-3">
                                                        <span className="px-2 py-1 bg-secondary/20 text-secondary rounded text-xs font-medium">
                                                            {post.category}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-semibold mb-3 text-gray-100 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm line-clamp-3 flex-grow mb-4">
                                                        {post.description}
                                                    </p>
                                                    <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-700/30">
                                                        <div className="flex items-center gap-1">
                                                            <FiUser size={12} />
                                                            <span>{post.author}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <FiCalendar size={12} />
                                                            <span>{new Date(post.date).toLocaleDateString()}</span>
                                                        </div>
                                                        <CommentCount slug={post.slug}  />
                                                    </div>
                                                </div>
                                            </article>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg border border-gray-700/50 hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                    >
                                        <FiChevronLeft size={16} />
                                        Previous
                                    </button>

                                    <div className="flex items-center gap-2">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${currentPage === page
                                                    ? 'bg-primary text-white shadow-primary-glow'
                                                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg border border-gray-700/50 hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                    >
                                        Next
                                        <FiChevronRight size={16} />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </motion.div>
            </div>
        </MainLayout>
    );
}