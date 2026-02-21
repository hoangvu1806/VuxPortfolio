// Project type definitions

export interface BaseProject {
    title: string;
    type?: string;
    description: string;
    details?: string[];
    image?: string;
    thumbnail?: string;
    images?: string[];
    featured?: boolean;
    status?: "Completed" | "In Development" | "In Planning";
    demoUrl?: string | null;
    githubUrl?: string | null;
    techStack?: string[];
    highlights?: string[];
    [key: string]: any; // Allow additional properties
}

export interface MainProject extends BaseProject {
    featured?: boolean;
    image?: string;
    thumbnail?: string;
}

export interface PersonalProject extends BaseProject {
    githubUrl?: string;
}

export type Project = BaseProject;

// Type guard functions
export function hasDemo(project: Project): project is Project & { demoUrl: string } {
    return !!(project.demoUrl && project.demoUrl !== null);
}

export function hasGithub(project: Project): project is Project & { githubUrl: string } {
    return !!(project.githubUrl && project.githubUrl !== null);
}

export function isFeatured(project: Project): project is Project & { featured: true } {
    return !!project.featured;
}