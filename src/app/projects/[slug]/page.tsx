import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    FiArrowLeft,
    FiAward,
    FiBriefcase,
    FiCalendar,
    FiExternalLink,
    FiGithub,
    FiLayers,
    FiTag,
    FiUser,
} from "react-icons/fi";
import { MainLayout } from "@/components/layout/main-layout";
import { JsonLd } from "@/components/seo/json-ld";
import {
    getAllProjects,
    getProjectBySlug,
    getProjectKeywords,
    getProjectUrl,
} from "@/lib/projects";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return getAllProjects()
        .filter((project) => project.slug)
        .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
    params,
}: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return buildMetadata({
            title: "Project Not Found",
            description: "The requested project page could not be found.",
            path: `/projects/${slug}`,
            noIndex: true,
        });
    }

    return buildMetadata({
        title: `${project.title} | AI Project by Do Hoang Vu`,
        description: project.description,
        path: `/projects/${slug}`,
        keywords: getProjectKeywords(project),
        images: [project.image || "/images/ui/project-placeholder.svg"],
    });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const projectUrl = getProjectUrl(slug);
    const projectSchema = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: projectUrl,
        image: project.image ? absoluteUrl(project.image) : undefined,
        author: {
            "@type": "Person",
            name: "Do Hoang Vu",
            url: absoluteUrl("/"),
        },
        keywords: getProjectKeywords(project),
        about: project.type,
    };

    return (
        <MainLayout>
            <JsonLd data={projectSchema} />
            <article className="min-h-screen pb-20">
                <div className="relative overflow-hidden bg-gradient-to-b from-gray-900/60 to-transparent pt-28 pb-12">
                    <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
                    <div className="container mx-auto px-4 md:px-6 relative">
                        <Link
                            href="/projects"
                            className="mb-8 inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-primary"
                        >
                            <FiArrowLeft />
                            Back to Projects
                        </Link>

                        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
                            <div>
                                <div className="mb-5 flex flex-wrap gap-3">
                                    {project.type && (
                                        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                                            <FiTag className="mr-2" />
                                            {project.type}
                                        </span>
                                    )}
                                    {project.status && (
                                        <span className="inline-flex items-center rounded-full border border-gray-700 bg-gray-800/70 px-4 py-2 text-sm font-medium text-gray-200">
                                            {project.status}
                                        </span>
                                    )}
                                </div>

                                <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">
                                    {project.title}
                                </h1>
                                <p className="max-w-4xl text-lg leading-8 text-gray-300">
                                    {project.description}
                                </p>
                            </div>

                            <aside className="rounded-2xl border border-gray-700/50 bg-gray-900/40 p-6 backdrop-blur-sm">
                                <h2 className="mb-6 text-xl font-semibold text-white">
                                    Project Snapshot
                                </h2>
                                <div className="space-y-4 text-sm text-gray-300">
                                    {project.role && (
                                        <div className="flex items-start gap-3">
                                            <FiUser className="mt-0.5 text-primary" />
                                            <div>
                                                <div className="text-gray-500">Role</div>
                                                <div>{project.role}</div>
                                            </div>
                                        </div>
                                    )}
                                    {project.projectType && (
                                        <div className="flex items-start gap-3">
                                            <FiBriefcase className="mt-0.5 text-primary" />
                                            <div>
                                                <div className="text-gray-500">Project Type</div>
                                                <div className="capitalize">{project.projectType}</div>
                                            </div>
                                        </div>
                                    )}
                                    {(project.startDate || project.endDate) && (
                                        <div className="flex items-start gap-3">
                                            <FiCalendar className="mt-0.5 text-primary" />
                                            <div>
                                                <div className="text-gray-500">Timeline</div>
                                                <div>
                                                    {project.startDate ?? "—"}
                                                    {project.endDate
                                                        ? ` → ${project.endDate}`
                                                        : " → Present"}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {project.achievement && (
                                        <div className="flex items-start gap-3">
                                            <FiAward className="mt-0.5 text-primary" />
                                            <div>
                                                <div className="text-gray-500">Achievement</div>
                                                <div>{project.achievement}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 flex flex-col gap-3">
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 font-medium text-gray-100 transition-colors hover:bg-gray-700"
                                        >
                                            <FiGithub className="mr-2" />
                                            View GitHub
                                        </a>
                                    )}
                                    {project.demoUrl && (
                                        <a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-3 font-medium text-white transition-opacity hover:opacity-90"
                                        >
                                            <FiExternalLink className="mr-2" />
                                            Open Demo
                                        </a>
                                    )}
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-6">
                    {project.image && (
                        <div className="mb-12 overflow-hidden rounded-2xl border border-gray-700/50">
                            <div className="relative aspect-video">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                    priority
                                />
                            </div>
                        </div>
                    )}

                    <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
                        <div className="space-y-12">
                            {project.details && project.details.length > 0 && (
                                <section>
                                    <h2 className="mb-6 text-2xl font-semibold text-white">
                                        Key Details
                                    </h2>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {project.details.map((detail) => (
                                            <div
                                                key={detail}
                                                className="rounded-xl border border-gray-700/40 bg-gray-900/30 p-5 text-gray-300"
                                            >
                                                {detail}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {project.highlights && project.highlights.length > 0 && (
                                <section>
                                    <h2 className="mb-6 text-2xl font-semibold text-white">
                                        Highlights
                                    </h2>
                                    <ul className="space-y-3 text-gray-300">
                                        {project.highlights.map((highlight) => (
                                            <li
                                                key={highlight}
                                                className="flex rounded-xl border border-gray-700/40 bg-gray-900/20 p-4"
                                            >
                                                <span className="mr-3 text-primary">•</span>
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>

                        <div>
                            {project.techStack && project.techStack.length > 0 && (
                                <section className="rounded-2xl border border-gray-700/50 bg-gray-900/30 p-6">
                                    <h2 className="mb-5 flex items-center text-xl font-semibold text-white">
                                        <FiLayers className="mr-2 text-primary" />
                                        Technologies
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-full border border-gray-700 bg-gray-800 px-3 py-1.5 text-sm text-gray-200"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </MainLayout>
    );
}
