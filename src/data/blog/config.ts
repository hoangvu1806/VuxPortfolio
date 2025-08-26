export const blogCategories = [
    "AI & IT Trends",
    "AI & ML",
    "Agentic AI",
    "LLMs",
    "MLOps",
    "Natural Language Processing",
    "Mathematics",
    "Computer Science",
    "Generative AI",
    "Physics",
    "Technical News",
    "Research Paper",
    "Cosmology",
    "Philosophy"
] as const;

export const blogTags = [
    // AI & ML Core
    "artificial-intelligence",
    "machine-learning",
    "deep-learning",
    "neural-networks",
    "computer-vision",

    // LLMs & NLP
    "large-language-models",
    "natural-language-processing",
    "transformers",
    "chatgpt",
    "prompt-engineering",
    "fine-tuning",

    // Agentic AI
    "ai-agents",
    "autonomous-systems",
    "multi-agent-systems",
    "reasoning",
    "planning",

    // MLOps & Engineering
    "mlops",
    "model-deployment",
    "data-engineering",
    "model-monitoring",
    "feature-engineering",

    // Generative AI
    "generative-ai",
    "text-generation",
    "image-generation",
    "code-generation",
    "diffusion-models",

    // Technical & Research
    "computer-science",
    "research-paper",
    "algorithms",
    "data-structures",
    "mathematics",
    "statistics",
    "physics",
    "quantum-computing",

    // Industry & Trends
    "tech-trends",
    "industry-news",
    "startup",
    "innovation",
    "future-tech"
] as const;

export type BlogCategory = typeof blogCategories[number];
export type BlogTag = typeof blogTags[number];

export const blogConfig = {
    postsPerPage: 10,
    defaultAuthor: "VU HOANG",
    dateFormat: "MMMM dd, yyyy",
};