<div align="center">
  <img src="public/images/ui/logo.png" alt="Logo" width="96" />
  <h1>Do Hoang Vu — AI Engineer Portfolio</h1>
  <p>Polished, animated portfolio showcasing AI projects, research, and engineering craft.</p>
  <p>
    <a href="https://nextjs.org"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs&logoColor=white" /></a>
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
    <img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
    <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
  </p>
</div>

---

## ⚙️ Tech Overview
- **Framework**: Next.js 15 (App Router, React 19)
- **Language**: TypeScript (strict typing across UI and data models)
- **Styling**: Tailwind CSS with custom utilities and gradients
- **Animation**: Framer Motion (page and component transitions)
- **Icons**: react-icons (Feather icon set)
- **Images**: Next/Image + custom `ProjectImage` with zoom
- **Content**:
  - Data-driven profile and projects in `src/data/profile.ts`
  - Blog posts as Markdown in `src/data/blog/posts/*` with LaTeX/KaTeX support
- **Build**: Next.js standalone output for containerized deployment

## 🗺️ Pages & Routes (App Router)
- `/` — Home: hero, quick facts (education, certifications, languages), skills, featured projects
- `/about` — About: background, education, interests, tech stack
- `/projects` — Projects: filterable/searchable grid, featured and other projects, details CTA
- `/projects/detail?project=<title>` — Project Detail: long description, features, challenges, results, tech list
- `/blog` — Blog index: Markdown posts with math/KaTeX support
- `/blog/[slug]` — Blog article: server-rendered Markdown with syntax and math rendering
- `/contact` — Contact links
- `/resume` — Embedded PDF resume

## 🧩 UI Architecture
- `src/components/layout/*`
  - `MainLayout`: shared page chrome (navigation, footer, containers)
- `src/components/ui/*`
  - `ProjectImage`: optimized image with optional zoom and graceful fallback
  - `dynamic-background`: animated background accents
  - `typing-animation`: typed intro lines on the Home page
- Motion patterns: section reveal, card entrance, subtle hover/tap feedback

## 🗂 Data Model
All profile and project content is centralized in `src/data/profile.ts` to keep the UI logic clean and reusable.

- `profile.projects: Project[]`
  - `title`, `type`, `description`, `details?`, `image?`, `thumbnail?`, `githubUrl?`, `demoUrl?`, `featured?`, `status?`, `techStack?`, `highlights?`
- Project types and helpers live in `src/types/project.ts` (`BaseProject`, `hasDemo`, `hasGithub`, etc.)

## ✨ Key Features
- **Data-driven projects** with strong typing and helpers (only render buttons when `demoUrl`/`githubUrl` exist)
- **Project Detail builder**: derives long description, features, challenge/result narratives by title
- **Responsive design**: grid layouts adapt across breakpoints, line clamping for summaries
- **Rich visuals**: gradients, neon accents, glass-morphism cards, animated hero
- **Markdown blog** with LaTeX/KaTeX math rendering (inline and display equations)

## 🚀 Highlighted Projects
- **SciHorizone — IELTS Exam Generator**
  - Next.js + FastAPI + Google Gemini AI, PDF ingestion, automated grading, interactive exam UI
  - Tech: Next.js, FastAPI, Python, TypeScript, Tailwind CSS, Docker
- **Deeplearning-Practice**
  - From-scratch implementations across CV/NLP/ML with clean documentation
  - Tech: Python, PyTorch, Weights & Biases
- **EzClip**
  - Electron desktop app to download videos from multiple platforms using `yt-dlp`
  - Tech: JavaScript, Electron, Node.js
- **Decision Tree Visualization**
  - Build/visualize decision trees from CSV with tunable parameters and metrics
  - Tech: Python, FastAPI, scikit-learn, TailwindCSS
- **PlugAgentX — Adaptive Plugin-Based LLM Agent Framework**
  - Plugin system, context management, adaptive behavior; in development
  - Tech: Python, LLM tooling
- **Research & Competitions**
  - SOICT24 paper on spatio-temporal attention + hierarchical fusion for video event retrieval
  - ZALO AI Challenge 2023, AIC24 Competition (completed)

## 🖼️ Project Gallery Functionality
- Featured projects appear first with hero imagery, badges, details list, tech stack chips, highlights
- Filters: by category (AI & ML, Web App, Research) and by text search
- Detail links route to `/projects/detail?project=...` where theme sections (Overview, Key Features, Challenges, Results, Technologies) are auto-assembled

## 📰 Blog Content
- Markdown posts in `src/data/blog/posts/*`
- Math support (inline and block) for technical writing
- Posts are statically rendered with optimized HTML output

## 📦 Structure
```
src/
  app/                 # Pages (App Router)
  components/
    layout/            # Layout primitives
    ui/                # Reusable UI widgets
  data/
    blog/posts/        # Markdown articles
    profile.ts         # Centralized profile & projects
  types/               # Shared TypeScript types & helpers
public/                # Static assets (images, pdf, etc.)
```

## ✍️ Extending Content
- Add or update projects in `src/data/profile.ts` (`profile.projects`)
- Provide hero/thumbnail images under `public/images/projects/<slug>/`
- For blog posts, add a Markdown file to `src/data/blog/posts/`

## 📄 License
MIT
