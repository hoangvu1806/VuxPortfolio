# Image Organization System

This directory contains all images for the portfolio website, organized in a structured and scalable way.

## Directory Structure

```
images/
├── projects/           # Project-related images
│   ├── {project-slug}/
│   │   ├── hero.jpg           # Main project image (1920x1080)
│   │   ├── thumbnail.jpg      # Thumbnail for cards (400x300)
│   │   ├── demo-{n}.jpg       # Demo screenshots
│   │   ├── architecture.png   # Architecture diagrams
│   │   ├── interface.png      # UI screenshots
│   │   └── results.jpg        # Results/output images
│   └── ...
├── profile/            # Personal profile images
│   ├── avatar.jpg             # Profile avatar (400x400)
│   ├── profile.jpg            # Full profile image (800x600)
│   ├── hero-bg.jpg            # Hero section background
│   └── about-bg.jpg           # About page background
├── tech/               # Technology-related images
│   ├── logos/                 # Technology logos
│   │   ├── {tech-name}.svg    # Monochrome logos
│   │   └── {tech-name}-colored.svg # Colored logos
│   └── stacks/                # Tech stack illustrations
│       ├── ai-stack.png
│       ├── web-stack.png
│       └── tools-stack.png
├── certificates/       # Certificate images
│   ├── {cert-slug}.jpg        # Full certificate images
│   └── thumbnails/            # Certificate thumbnails
│       └── {cert-slug}-thumb.jpg
└── ui/                 # UI elements and assets
    ├── icons/                 # Various icons
    ├── logo.png              # Main logo
    ├── favicon.ico           # Favicon
    ├── project-placeholder.svg # Fallback for missing project images
    └── backgrounds/          # Background patterns
        ├── hero-pattern.svg
        ├── grid-pattern.svg
        └── particles.svg
```

## Naming Conventions

### Project Slugs

Project titles are converted to slugs using the `titleToSlug()` function:

-   "Enterprise AI Chatbot Platform" → "enterprise-ai-chatbot-platform"
-   "Decision Tree Visualization" → "decision-tree-visualization"
-   "EzClip" → "ezclip"

### Image Types

-   **hero.jpg**: Main project image, high resolution (1920x1080 recommended)
-   **thumbnail.jpg**: Smaller version for cards and previews (400x300 recommended)
-   **demo-{n}.jpg**: Sequential demo images (demo-1.jpg, demo-2.jpg, etc.)
-   **architecture.png**: System architecture diagrams
-   **interface.png**: User interface screenshots
-   **results.jpg**: Output or results images

### File Formats

-   **Photos/Screenshots**: Use `.jpg` for better compression
-   **Logos/Icons**: Use `.svg` for scalability, `.png` for complex graphics
-   **Diagrams**: Use `.png` or `.svg` depending on complexity

## Usage in Code

### Using ImagePaths Utility

```typescript
import { ImagePaths, titleToSlug } from "@/utils/image-paths";

// Get project images
const projectSlug = titleToSlug("My Project Title");
const heroImage = ImagePaths.project.hero(projectSlug);
const thumbnail = ImagePaths.project.thumbnail(projectSlug);

// Get profile images
const avatar = ImagePaths.profile.avatar;
const profileImage = ImagePaths.profile.profile;

// Get tech logos
const pythonLogo = ImagePaths.tech.logo("python");
const coloredLogo = ImagePaths.tech.logoColored("pytorch");
```

### Using ProjectImage Component

```typescript
import { ProjectImage } from "@/components/ui/project-image";

<ProjectImage
    src={heroImage}
    alt="Project description"
    thumbnail={thumbnail}
    className="w-full h-64"
    priority={true}
/>;
```

## Adding New Images

1. **For new projects**: Create a folder under `projects/` with the project slug name
2. **Add required images**: At minimum, add `hero.jpg` and `thumbnail.jpg`
3. **Update data**: The `profile.ts` file will automatically use the correct paths via `ImagePaths` utility
4. **Optimize images**: Compress images appropriately for web use

## Image Optimization

-   **Hero images**: Max 1920x1080, optimized for web (80-90% quality)
-   **Thumbnails**: Max 400x300, optimized for fast loading
-   **Logos**: Use SVG when possible for crisp scaling
-   **Screenshots**: Compress to balance quality and file size

## Fallbacks

The system includes automatic fallbacks:

-   Missing project images fall back to `project-placeholder.svg`
-   The `ProjectImage` component handles loading states and errors
-   All images are lazy-loaded except those marked with `priority={true}`
