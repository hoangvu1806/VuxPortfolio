import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"]);

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
        return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const projectDir = path.join(process.cwd(), "public", "images", "projects", slug);

    if (!fs.existsSync(projectDir)) {
        return NextResponse.json({ images: [] });
    }

    const files = fs.readdirSync(projectDir);

    const IMAGE_ORDER = ["hero", "thumbnail"];

    const images = files
        .filter((file) => {
            const ext = path.extname(file).toLowerCase();
            return SUPPORTED_EXTENSIONS.has(ext);
        })
        .sort((a, b) => {
            const nameA = path.basename(a, path.extname(a));
            const nameB = path.basename(b, path.extname(b));
            const indexA = IMAGE_ORDER.indexOf(nameA);
            const indexB = IMAGE_ORDER.indexOf(nameB);
            // Known order first, then alphabetical
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return nameA.localeCompare(nameB);
        })
        .map((file) => `/images/projects/${slug}/${file}`);

    return NextResponse.json({ images });
}
