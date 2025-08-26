"use client";
import { useEffect, useState } from "react";

export default function CommentCount({ slug }: { slug: string }) {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        fetch(`/api/comment-count?slug=${slug}`)
            .then(res => res.json())
            .then(data => setCount(data.count))
            .catch(() => setCount(0));
    }, [slug]);

    return <span>{count === null ? "…" : count} comments</span>;
}
