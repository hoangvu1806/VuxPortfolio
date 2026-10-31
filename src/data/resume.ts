// Resume content. Source of truth: the PDF CV (public/DOHOANGVU_CV.pdf).

export interface Metric {
    value: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    label: string;
}

export const resume = {
    objective:
        "Seeking an AI Engineer role where I can turn applied AI research into reliable products, while deepening my expertise in agentic AI, foundation models, and high-performance ML systems.",

    experience: [
        {
            id: "imespro",
            org: "IMESPRO Co., Ltd.",
            role: "AI Engineer",
            period: "Jun 2026 — Present",
            metrics: [
                { value: 96.7, decimals: 1, suffix: "%", label: "iAUC" },
                { value: 80.2, decimals: 1, suffix: "%", label: "sPRO" },
                { value: 35, prefix: "<", suffix: "ms", label: "Latency" },
                { value: 99.7, decimals: 1, suffix: "%", label: "STT accuracy" },
            ] as Metric[],
            points: [
                "Researched and developed visual anomaly detection models for logical and structural defects on industrial assembly lines, reaching **96.7% iAUC** and **80.2% sPRO** at **<35 ms** latency.",
                "Built a specialized STT engine for an automated visual-acuity kiosk in eye hospitals: **99.7% accuracy** on Sloan letter recognition across Northern, Central and Southern Vietnamese accents.",
                "Designed a multimodal AI workflow that analyzes raw video footage to sequence and edit marketing reels and generate promotional graphics for real estate.",
            ],
        },
        {
            id: "hoabinh",
            org: "Hoa Binh Corporation",
            role: "AI Engineer Intern",
            period: "Feb 2025 — Jun 2025",
            metrics: [
                { value: 30, prefix: "~", suffix: "%", label: "Faster document lookup" },
            ] as Metric[],
            points: [
                "Integrated RAG and MCP-based tool orchestration into an internal support system, improving answer accuracy and knowledge accessibility for employees.",
                "Cut average document lookup time by **~30%** by optimizing vector retrieval and query routing; shipped services with Docker and GitHub Actions.",
            ],
        },
    ],

    projects: [
        {
            id: "meetrack",
            name: "MeeTrack",
            subtitle: "Local-first meeting intelligence & management",
            kind: "Personal project",
            role: "Lead Developer",
            period: "06/2026 — 08/2026",
            text: "Local-first platform for smart note-taking, discussion summaries and action-item tracking, powered by on-device speech separation and speaker diarization.",
            metrics: [] as Metric[],
            url: "https://github.com/hoangvu1806/MeeTrack",
        },
        {
            id: "hestia",
            name: "Hestia",
            subtitle: "Multimodal food chemistry & safety assistant",
            kind: "Team project",
            role: "Technical Lead",
            period: "04/2026 — 07/2026",
            text: "Food-safety assistant built on Google ADK: image-based ingredient detection, cooking-hazard screening and verified citation tagging across FooDB and EFSA toxicological entries.",
            metrics: [{ value: 70000, label: "FooDB & EFSA entries" }] as Metric[],
            url: "https://github.com/hoangvu1806/Hestia",
        },
        {
            id: "ready4rag",
            name: "Ready4RAG",
            subtitle: "High-precision dual-layer RAG pipeline",
            kind: "Personal project",
            role: "Lead Developer",
            period: "01/2026 — 02/2026",
            text: "Dual-layer retrieval that combines four types of vector search (Qdrant) with a knowledge graph to improve factual accuracy on technical documents.",
            metrics: [] as Metric[],
            url: "https://github.com/hoangvu1806/Ready4RAG",
        },
        {
            id: "face",
            name: "Face Attendance",
            subtitle: "Kiosk-based recognition & anti-spoofing",
            kind: "Personal project",
            role: "AI / Vision Engineer",
            period: "11/2025 — 12/2025",
            text: "Production-grade biometric kiosk using 2D similarity-transform face alignment and MiniFASNet liveness detection, with real-time spoof prevention.",
            metrics: [{ value: 93.75, decimals: 2, suffix: "%", label: "Recognition accuracy" }] as Metric[],
            url: "https://github.com/hoangvu1806/FaceAttendance",
        },
        {
            id: "acaread",
            name: "AcaRead",
            subtitle: "AI academic assessment system",
            kind: "Team project",
            role: "Technical Lead",
            period: "03/2025 — 12/2025",
            text: "Educational platform that uses an LLM and Docling to generate IELTS-standard exams from academic research papers.",
            metrics: [] as Metric[],
            url: "https://github.com/hoangvu1806/AcaRead",
        },
    ],

    papers: [
        {
            name: "TARS",
            role: "First author",
            venue: "SOICT, Springer",
            url: "https://link.springer.com/chapter/10.1007/978-981-92-2584-2_30",
        },
        {
            name: "VizQuest",
            role: "Co-author",
            venue: "SOICT, Springer",
            url: "https://link.springer.com/chapter/10.1007/978-981-96-4291-5_13",
        },
    ],

    competitions: ["Viettel AI Race 2025", "AI Challenge 2024–2025", "Zalo AI Challenge 2023"],

    skills: [
        { group: "AI / ML", items: ["Deep Learning", "Multimodal AI", "Retrieval Systems", "Agentic AI", "Model Evaluation"] },
        { group: "Programming", items: ["Python (Agentic AI & ML)", "Rust (High-Performance Systems & Inference)"] },
        { group: "Frameworks", items: ["PyTorch", "Hugging Face", "OpenCV", "LangChain", "Google ADK"] },
        { group: "Data & Retrieval", items: ["Qdrant", "Milvus", "FalkorDB", "PostgreSQL", "Redis"] },
        { group: "Backend & MLOps", items: ["FastAPI", "Node.js", "S3 API", "Docker", "MLflow", "DeepEval", "GitHub Actions"] },
    ],

    interests: ["Large Language Models", "Speech & Audio AI", "Model Optimization"],
    softSkills: [
        "Research communication & scientific writing",
        "Experiment design and evaluation",
        "Critical problem solving & analytical thinking",
        "Technical documentation & knowledge sharing",
    ],
    languages: [
        { name: "English", level: "Working proficiency" },
        { name: "Vietnamese", level: "Native" },
    ],

    education: {
        school: "The Saigon International University",
        degree: "Bachelor of Artificial Intelligence",
        graduation: "Expected 2027",
        gpa: "3.65 / 4.00",
    },
};
