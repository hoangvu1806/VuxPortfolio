import { MainLayout } from "@/components/layout/main-layout";
import { BlogService } from "@/lib/blog";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { FiCalendar, FiUser, FiArrowLeft } from "react-icons/fi";
import { GiscusComments } from "@/components/ui/giscus-comments";
import { GiscusFallback } from "@/components/ui/giscus-fallback";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await BlogService.getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found",
            description: "The requested blog post could not be found."
        };
    }

    return {
        title: `${post.title} | VU HOANG Blog`,
        description: post.description,
        keywords: post.tags.join(", "),
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
            images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [post.image],
        }
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await BlogService.getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const allPosts = await BlogService.getAllPosts();
    const relatedPosts = BlogService.getRelatedPosts(post, allPosts, 4); // Increase to 4
    const otherPosts = allPosts.filter(p => p.slug !== post.slug && !relatedPosts.some(rp => rp.slug === p.slug));

    return (
        <MainLayout>
            <article className="min-h-screen">
                {/* Header Section with improved spacing and design */}
                <div className="relative bg-gradient-to-b from-gray-900/50 via-gray-900/20 to-transparent">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl -z-10"></div>

                    <div className="container px-4 md:px-6 mx-auto relative z-10">
                        {/* Back Link - Fixed spacing to avoid header overlap */}
                        <div className="pt-24 md:pt-20 pb-6">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-all duration-300 hover:gap-3 group"
                            >
                                <FiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
                                <span className="font-medium">Back to Blog</span>
                            </Link>
                        </div>

                        {/* Content */}
                        <div className="max-w-4xl mx-auto pb-16">
                            <div className="mb-6">
                                <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary rounded-full text-sm font-semibold border border-primary/30 backdrop-blur-sm shadow-lg">
                                    <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
                                    {post.category}
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary leading-tight break-words">
                                {post.title}
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-8 leading-relaxed text-justify">
                                {post.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-gray-400 mb-6 md:mb-8 p-3 sm:p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 backdrop-blur-sm">
                                <div className="flex items-center gap-2 hover:text-primary transition-colors text-sm sm:text-base">
                                    <FiUser size={14} className="text-primary sm:w-4 sm:h-4" />
                                    <span className="font-medium">{post.author}</span>
                                </div>
                                <div className="flex items-center gap-2 hover:text-secondary transition-colors text-sm sm:text-base">
                                    <FiCalendar size={14} className="text-secondary sm:w-4 sm:h-4" />
                                    <span>{new Date(post.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {post.tags.map((tag, index) => (
                                    <span
                                        key={tag}
                                        className="px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-r from-gray-800/60 to-gray-700/60 text-gray-300 rounded-full text-xs sm:text-sm border border-gray-600/50 hover:border-secondary/50 hover:text-secondary hover:scale-105 transition-all duration-300 backdrop-blur-sm shadow-md cursor-pointer break-words"
                                        style={{
                                            animationDelay: `${index * 0.1}s`
                                        }}
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                {post.image && (
                    <div className="container px-4 md:px-6 mx-auto mb-12">
                        <div className="max-w-4xl mx-auto">
                            <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-700/50">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="container px-4 md:px-6 mx-auto pb-16">
                    <div className="max-w-4xl mx-auto">
                        <div
                            className="blog-content prose prose-lg md:prose-xl prose-invert max-w-none overflow-hidden
                                prose-headings:text-gray-100 prose-headings:font-bold
                                prose-h1:text-3xl md:prose-h1:text-5xl prose-h1:mb-6 md:prose-h1:mb-8 prose-h1:bg-clip-text prose-h1:text-transparent prose-h1:bg-gradient-to-r prose-h1:from-primary prose-h1:to-secondary prose-h1:leading-tight
                                prose-h2:text-2xl md:prose-h2:text-4xl prose-h2:mb-4 md:prose-h2:mb-6 prose-h2:text-primary prose-h2:border-b prose-h2:border-gray-700/30 prose-h2:pb-3 prose-h2:leading-tight
                                prose-h3:text-xl md:prose-h3:text-3xl prose-h3:mb-3 md:prose-h3:mb-4 prose-h3:text-secondary prose-h3:leading-tight
                                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4 md:prose-p:mb-6 prose-p:text-base md:prose-p:text-lg prose-p:text-justify
                                prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary-light prose-a:break-words
                                prose-strong:text-gray-100 prose-strong:font-semibold
                                prose-code:text-accent prose-code:bg-gray-800/60 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:break-words
                                prose-pre:bg-gray-900/80 prose-pre:border prose-pre:border-gray-700/50 prose-pre:rounded-xl prose-pre:p-3 md:prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:text-sm
                                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-800/40 prose-blockquote:p-4 md:prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:my-4 md:prose-blockquote:my-6 prose-blockquote:text-justify
                                prose-ul:text-gray-300 prose-ol:text-gray-300 prose-ul:pl-4 md:prose-ul:pl-6 prose-ul:list-disc prose-ul:marker:text-primary prose-ul:marker:font-semibold
                                prose-ol:pl-4 md:prose-ol:pl-6 prose-ol:list-decimal prose-ol:marker:text-secondary prose-ol:marker:font-semibold
                                prose-li:mb-1 md:prose-li:mb-2 prose-li:leading-relaxed prose-li:text-sm md:prose-li:text-base prose-li:text-left
                                prose-img:rounded-xl prose-img:border prose-img:border-gray-700/50 prose-img:mx-auto prose-img:max-w-full prose-img:h-auto
                                prose-table:text-sm prose-table:overflow-x-auto prose-table:block prose-table:whitespace-nowrap md:prose-table:whitespace-normal md:prose-table:table
                                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol_li]:text-gray-300 [&_ol_li::marker]:text-secondary [&_ol_li::marker]:font-bold
                                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul_li]:text-gray-300 [&_ul_li::marker]:text-primary [&_ul_li::marker]:font-bold
                                [&_ol_ol]:list-decimal [&_ol_ol]:pl-8 [&_ol_ol]:mt-2 [&_ol_ol]:mb-2
                                [&_ul_ul]:list-disc [&_ul_ul]:pl-8 [&_ul_ul]:mt-2 [&_ul_ul]:mb-2
                                [&_ol_ul]:list-disc [&_ol_ul]:pl-8 [&_ol_ul]:mt-2 [&_ol_ul]:mb-2
                                [&_ul_ol]:list-decimal [&_ul_ol]:pl-8 [&_ul_ol]:mt-2 [&_ul_ol]:mb-2
                                [&_ol_ol_ol]:list-decimal [&_ol_ol_ol]:pl-10 [&_ul_ul_ul]:list-disc [&_ul_ul_ul]:pl-10
                                [&_li_ol]:mt-2 [&_li_ul]:mt-2 [&_li_p]:mb-2"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </div>

                {/* Related Posts Section - Enhanced */}
                <section className="container px-4 md:px-6 mx-auto pb-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="border-t border-gray-700/50 pt-16">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                    {relatedPosts.length > 0 ? 'Related Articles' : 'More Articles'}
                                </h2>
                                <p className="text-gray-400 max-w-2xl mx-auto">
                                    {relatedPosts.length > 0
                                        ? 'Discover more articles related to this topic'
                                        : 'Explore our latest articles and insights'
                                    }
                                </p>
                            </div>

                            {/* Display related posts if available, otherwise show other posts */}
                            {(relatedPosts.length > 0 ? relatedPosts : otherPosts.slice(0, 4)).length > 0 && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                        {(relatedPosts.length > 0 ? relatedPosts : otherPosts.slice(0, 4)).map((relatedPost, index) => (
                                            <Link
                                                key={relatedPost.slug}
                                                href={`/blog/${relatedPost.slug}`}
                                                className="group"
                                                style={{
                                                    animationDelay: `${index * 0.1}s`
                                                }}
                                            >
                                                <article className="h-full flex flex-col backdrop-blur-sm bg-gray-900/30 rounded-xl border border-gray-700/50 overflow-hidden hover:border-primary/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                                                    {relatedPost.image && (
                                                        <div className="aspect-video overflow-hidden flex-shrink-0 relative">
                                                            <img
                                                                src={relatedPost.image}
                                                                alt={relatedPost.title}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                        </div>
                                                    )}
                                                    <div className="p-4 flex flex-col flex-grow">
                                                        <div className="mb-3">
                                                            <span className="px-2 py-1 bg-secondary/20 text-secondary rounded text-xs font-medium border border-secondary/30">
                                                                {relatedPost.category}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-base font-semibold mb-2 text-gray-100 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                                            {relatedPost.title}
                                                        </h3>
                                                        <p className="text-gray-400 text-sm line-clamp-3 flex-grow leading-relaxed">
                                                            {relatedPost.description}
                                                        </p>
                                                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700/30">
                                                            <span className="text-xs text-gray-500">
                                                                {new Date(relatedPost.date).toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric'
                                                                })}
                                                            </span>
                                                            <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                Read more →
                                                            </span>
                                                        </div>
                                                    </div>
                                                </article>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* View All Posts Button */}
                                    <div className="text-center">
                                        <Link
                                            href="/blog"
                                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 rounded-xl font-semibold hover:from-primary/30 hover:to-secondary/30 hover:border-primary/50 hover:scale-105 transition-all duration-300 backdrop-blur-sm shadow-lg group"
                                        >
                                            <span>View All Articles</span>
                                            <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
                                        </Link>
                                        <p className="text-gray-500 text-sm mt-3">
                                            Discover all {allPosts.length} articles in our blog
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Giscus Comments Section */}
                <section className="container px-4 md:px-6 mx-auto pb-20">
                    <div className="max-w-4xl mx-auto">
                        {process.env.NEXT_PUBLIC_GISCUS_REPO_ID && process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ? (
                            <GiscusComments
                                slug={slug}
                                title={post.title}
                            />
                        ) : (
                            <GiscusFallback
                                slug={slug}
                                title={post.title}
                            />
                        )}
                    </div>
                </section>
            </article>
        </MainLayout>
    );
}