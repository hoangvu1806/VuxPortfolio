"use client";

import Image from "next/image";

interface ProjectImageProps {
    src: string;
    alt: string;
    thumbnail?: string;
    className?: string;
    priority?: boolean;
    title?: string;
}

export function ProjectImage({
    src,
    alt,
    className = "",
    priority = false,
}: ProjectImageProps) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover object-center"
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                quality={75}
                unoptimized={false}
            />
        </div>
    );
}