import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const slug = new URL(request.url).searchParams.get("slug");
    const repo = process.env.NEXT_PUBLIC_GISCUS_REPO
    const githubToken = process.env.GITHUB_TOKEN
    const res = await fetch(`https://api.github.com/repos/${repo}/discussions?q=title:${slug}`, {
        headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github+json",
        },
        cache: "no-store",
    });

    const discussions = await res.json();
    const target = discussions.find((d: any) => d.title === `/blog/${slug}`);
    if (!target) {
        console.log("Discussions: ", slug);
    }
    return NextResponse.json({ count: target?.comments ?? 0 });
}