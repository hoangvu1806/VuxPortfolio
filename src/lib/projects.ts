import { projects } from "@/data/projects";
import type { Project } from "@/types/project";
import { absoluteUrl } from "@/lib/seo";

export function getAllProjects(): Project[] {
    return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug);
}

export function getProjectByTitle(title: string): Project | undefined {
    return projects.find(
        (project) => project.title.toLowerCase() === title.toLowerCase(),
    );
}

export function getProjectUrl(slug: string): string {
    return absoluteUrl(`/projects/${slug}`);
}

export function getProjectKeywords(project: Project): string[] {
    return [
        project.title,
        project.slug || "",
        project.type || "",
        project.role || "",
        project.projectType || "",
        ...(project.techStack || []),
        ...(project.highlights || []),
        ...(project.details || []),
    ].filter(Boolean);
}
