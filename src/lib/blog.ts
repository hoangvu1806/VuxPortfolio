import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { blogConfig } from '@/data/blog/config';

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

export interface BlogMetadata {
    title: string;
    description: string;
    date: string;
    author: string;
    category: string;
    tags: string[];
    image: string;
    published: "published" | "draft";
}

export class BlogService {
    private static postsDirectory = path.join(process.cwd(), 'src/data/blog/posts');

    // Core functions
    static async getAllPosts(): Promise<BlogPost[]> {
        try {
            if (!fs.existsSync(this.postsDirectory)) {
                return [];
            }

            const fileNames = fs.readdirSync(this.postsDirectory);
            const allPostsPromises = fileNames
                .filter(fileName => fileName.endsWith('.md'))
                .map(async fileName => {
                    const slug = this.generateSlug(fileName);
                    return await this.getPostBySlug(slug);
                });

            const allPosts = await Promise.all(allPostsPromises);

            return allPosts
                .filter((post): post is BlogPost => post !== null)
                .filter(post => post.published === 'published')
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } catch (error) {
            console.error('Error getting all posts:', error);
            return [];
        }
    }

    static async getPostBySlug(slug: string): Promise<BlogPost | null> {
        try {
            const fileName = this.findFileBySlug(slug);
            if (!fileName) return null;

            const filePath = path.join(this.postsDirectory, fileName);
            return await this.parseMarkdownFile(filePath, slug);
        } catch (error) {
            console.error(`Error getting post by slug ${slug}:`, error);
            return null;
        }
    }

    static async parseMarkdownFile(filePath: string, slug: string): Promise<BlogPost | null> {
        try {
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const { data, content } = matter(fileContents);

            // Preprocess content to handle additional LaTeX delimiters
            let processedContent = content;

            // Convert \[ \] to $$ $$ for display math (fix the regex!)
            processedContent = processedContent.replace(/\\\[([\s\S]*?)\\\]/g, (match, p1) => {
                return `$$${p1}$$`;
            });

            // Convert \( \) to $ $ for inline math (fix the regex!)
            processedContent = processedContent.replace(/\\\(([\s\S]*?)\\\)/g, (match, p1) => {
                return `$${p1}$`;
            });

            console.log('Processed content sample:', processedContent.substring(0, 500));

            // Process markdown to HTML with enhanced features
            const unifiedContent = await unified()
                .use(remarkParse) // Parse markdown
                .use(remarkGfm) // GitHub Flavored Markdown
                .use(remarkMath, {
                    singleDollarTextMath: true // Enable single $ for inline math
                }) // Math support
                .use(remarkRehype, { allowDangerousHtml: true }) // Convert to HTML
                .use(rehypeKatex, {
                    strict: false,
                    trust: true,
                    throwOnError: false,
                    macros: {
                        "\\RR": "\\mathbb{R}",
                        "\\NN": "\\mathbb{N}",
                        "\\ZZ": "\\mathbb{Z}",
                        "\\QQ": "\\mathbb{Q}",
                        "\\CC": "\\mathbb{C}"
                    }
                } as any)
                .use(rehypeHighlight) // Code syntax highlighting
                .use(rehypeStringify, { allowDangerousHtml: true }) // Convert to string
                .process(processedContent);

            const htmlContent = unifiedContent.toString();
            console.log('HTML content sample:', htmlContent.substring(0, 500));

            return {
                slug,
                title: data.title || 'Untitled',
                description: data.description || '',
                date: data.date || new Date().toISOString().split('T')[0],
                author: data.author || blogConfig.defaultAuthor,
                category: data.category || 'Uncategorized',
                tags: data.tags || [],
                image: data.image || '/images/blog/default-hero.jpg',
                published: data.published || 'draft',
                content: htmlContent
            };
        } catch (error) {
            console.error(`Error parsing markdown file ${filePath}:`, error);
            return null;
        }
    }

    // Filter & Search
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

    // Utilities
    static generateSlug(filename: string): string {
        // Remove .md extension and date prefix (YYYY-MM-DD-)
        const nameWithoutExt = filename.replace('.md', '');
        const slug = nameWithoutExt.replace(/^\d{4}-\d{2}-\d{2}-/, '');
        return slug;
    }

    static getRelatedPosts(post: BlogPost, allPosts: BlogPost[], limit: number = 3): BlogPost[] {
        const related = allPosts
            .filter(p => p.slug !== post.slug)
            .map(p => {
                let score = 0;

                // Same category gets higher score
                if (p.category === post.category) score += 3;

                // Shared tags get points
                const sharedTags = p.tags.filter(tag => post.tags.includes(tag));
                score += sharedTags.length;

                return { post: p, score };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(item => item.post);

        return related;
    }

    // Helper functions
    private static findFileBySlug(slug: string): string | null {
        try {
            if (!fs.existsSync(this.postsDirectory)) {
                return null;
            }

            const files = fs.readdirSync(this.postsDirectory);
            const matchingFile = files.find(file => {
                const fileSlug = this.generateSlug(file);
                return fileSlug === slug;
            });

            return matchingFile || null;
        } catch (error) {
            console.error(`Error finding file by slug ${slug}:`, error);
            return null;
        }
    }

    // Pagination
    static paginatePosts(posts: BlogPost[], page: number = 1, limit: number = blogConfig.postsPerPage) {
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

    // Sitemap URLs - Generate all URLs for sitemap
    static async getSitemapUrls(baseUrl: string = 'https://hoangvu.id.vn'): Promise<Array<{
        url: string;
        lastModified: string;
        changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
        priority: number;
    }>> {
        const urls = [];

        // Static pages with high priority
        const staticPages = [
            { path: '/', changeFreq: 'weekly' as const, priority: 1.0 },
            { path: '/about', changeFreq: 'monthly' as const, priority: 0.8 },
            { path: '/projects', changeFreq: 'weekly' as const, priority: 0.9 },
            { path: '/blog', changeFreq: 'daily' as const, priority: 0.9 },
            { path: '/contact', changeFreq: 'monthly' as const, priority: 0.7 },
            { path: '/resume', changeFreq: 'monthly' as const, priority: 0.6 },
        ];

        // Add static pages
        for (const page of staticPages) {
            urls.push({
                url: `${baseUrl}${page.path}`,
                lastModified: new Date().toISOString(),
                changeFrequency: page.changeFreq,
                priority: page.priority
            });
        }

        // Add blog posts
        try {
            const posts = await this.getAllPosts();
            for (const post of posts) {
                urls.push({
                    url: `${baseUrl}/blog/${post.slug}`,
                    lastModified: new Date(post.date).toISOString(),
                    changeFrequency: 'monthly' as const,
                    priority: 0.7
                });
            }
        } catch (error) {
            console.error('Error getting blog posts for sitemap:', error);
        }

        return urls;
    }
}