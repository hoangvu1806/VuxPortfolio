// Utility functions for managing image paths

export const ImagePaths = {
    // Project images
    project: {
        hero: (slug: string) => `/images/projects/${slug}/hero.jpg`,
        thumbnail: (slug: string) => `/images/projects/${slug}/thumbnail.jpg`,
        demo: (slug: string, index: number) =>
            `/images/projects/${slug}/demo-${index}.jpg`,
        architecture: (slug: string) =>
            `/images/projects/${slug}/architecture.png`,
        interface: (slug: string) => `/images/projects/${slug}/interface.png`,
        results: (slug: string) => `/images/projects/${slug}/results.jpg`,
    },

    // Profile images
    profile: {
        avatar: "/images/profile/avatar.jpg",
        profile: "/images/profile/profile.jpg",
        heroBg: "/images/profile/hero-bg.jpg",
        aboutBg: "/images/profile/about-bg.jpg",
    },

    // Tech stack images
    tech: {
        logo: (name: string) => `/images/tech/logos/${name.toLowerCase()}.svg`,
        logoColored: (name: string) =>
            `/images/tech/logos/${name.toLowerCase()}-colored.svg`,
        stack: (type: string) => `/images/tech/stacks/${type}-stack.png`,
    },

    // Certificate images
    certificates: {
        full: (slug: string) => `/images/certificates/${slug}.jpg`,
        thumbnail: (slug: string) =>
            `/images/certificates/thumbnails/${slug}-thumb.jpg`,
    },

    // Blog images
    blog: {
        cover: (slug: string) => `/images/blog/covers/${slug}.jpg`,
        content: (slug: string, imageName: string) => `/images/blog/content/${slug}/${imageName}`,
        placeholder: "/images/blog/covers/placeholder.svg",
        author: (authorSlug: string) => `/images/blog/authors/${authorSlug}.jpg`,
    },

    // UI elements
    ui: {
        logo: "/images/ui/logo.png",
        favicon: "/images/ui/favicon.ico",
        socialPreview: "/images/ui/social-preview.jpg",
        placeholder: "/images/ui/project-placeholder.svg",
        background: {
            heroPattern: "/images/ui/backgrounds/hero-pattern.svg",
            gridPattern: "/images/ui/backgrounds/grid-pattern.svg",
            particles: "/images/ui/backgrounds/particles.svg",
        },
    },
};

// Helper function to convert project title to slug
export function titleToSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single
        .trim();
}

// Helper function to check if image exists (client-side)
export async function checkImageExists(src: string): Promise<boolean> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
    });
}

// Get optimized image path based on device
export function getOptimizedImagePath(
    basePath: string,
    size: "sm" | "md" | "lg" | "xl" = "md"
): string {
    const sizeMap = {
        sm: "400w",
        md: "800w",
        lg: "1200w",
        xl: "1920w",
    };

    // For now, return base path. In future, can implement responsive images
    return basePath;
}
