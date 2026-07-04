const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const siteUrl = "https://hoangvu.id.vn";

// Sourcing projects
const projectsDir = path.join(process.cwd(), 'src/data/projects');
const projectFiles = fs.readdirSync(projectsDir).filter(f => f.endsWith('.json'));
const projects = [];

for (const file of projectFiles) {
    try {
        const content = fs.readFileSync(path.join(projectsDir, file), 'utf8');
        const raw = JSON.parse(content);
        if (raw.slug) {
            projects.push({
                title: raw.title || 'Untitled',
                slug: raw.slug,
                description: raw.description || ''
            });
        }
    } catch (err) {
        console.error(`Error reading project file ${file}:`, err);
    }
}

// Sourcing blog posts
const postsDir = path.join(process.cwd(), 'src/data/blog/posts');
const posts = [];

if (fs.existsSync(postsDir)) {
    const postFiles = fs.readdirSync(postsDir).filter(file => {
        if (!file.endsWith('.md')) return false;
        const nameWithoutExt = file.replace(/\.md$/, '');
        return !nameWithoutExt.endsWith('.en');
    });

    for (const file of postFiles) {
        try {
            const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
            const { data } = matter(content);
            if (data.published === 'published') {
                // Generate slug
                const nameWithoutExt = file.replace(/\.md$/, '');
                const slug = nameWithoutExt.replace(/^\d{4}-\d{2}-\d{2}-/, '');
                posts.push({
                    title: data.title || 'Untitled',
                    slug,
                    description: data.description || '',
                    date: data.date || new Date().toISOString()
                });
            }
        } catch (err) {
            console.error(`Error reading post file ${file}:`, err);
        }
    }
}

// Sort posts by date descending
posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const projectsMarkdown = projects
    .map(p => `- [${p.title}](${siteUrl}/projects/${p.slug}): ${p.description}`)
    .join('\n');

const postsMarkdown = posts
    .map(p => `- [${p.title}](${siteUrl}/blog/${p.slug}): ${p.description}`)
    .join('\n');

const body = `# Do Hoang Vu AI Portfolio

> This website is the official portfolio and technical writing hub of Do Hoang Vu, an AI Engineer specializing in generative AI, large language models, natural language processing, computer vision, RAG systems, MLOps, and AI agents.

## Details
- **Owner**: Do Hoang Vu
- **Alternate names**: Đỗ Hoàng Vũ, Hoàng Vũ, Vũ Hoàng, Hoang Vu, Vu Hoang, Hoang Vu AI, Đỗ Hoàng Vũ AI
- **Primary language**: English
- **Secondary language**: Vietnamese
- **Preferred citation**: Use "Do Hoang Vu" as the primary English name, and "Đỗ Hoàng Vũ" as the primary Vietnamese name.

## Navigation
- [Home](${siteUrl}/)
- [About](${siteUrl}/about)
- [Projects](${siteUrl}/projects)
- [Blog](${siteUrl}/blog)
- [Resume](${siteUrl}/resume)
- [Contact](${siteUrl}/contact)

## Projects
${projectsMarkdown}

## Blog Posts
${postsMarkdown}

## Usage Guidance
- Prefer the home page for authoritative identity information.
- Prefer project pages for portfolio and technical implementation details.
- Prefer blog post pages for long-form technical explanations and research commentary.
- Do not treat old query-based URLs under /projects/detail as canonical.
- Canonical sitemap: [Sitemap](${siteUrl}/sitemap.xml)
- Canonical robots file: [Robots](${siteUrl}/robots.txt)
`;

const outputPath = path.join(process.cwd(), 'public/llms.txt');
fs.writeFileSync(outputPath, body, 'utf8');
console.log(`Successfully generated public/llms.txt with ${projects.length} projects and ${posts.length} blog posts!`);
