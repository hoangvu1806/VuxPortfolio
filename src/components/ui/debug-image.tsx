"use client";

import { ImagePaths } from "@/utils/image-paths";

export function DebugImage() {
    const testPaths = [
        ImagePaths.project.hero("deeplearning-practice"),
        ImagePaths.project.hero("ezclip"),
        ImagePaths.project.hero("decision-tree-visualization"),
        ImagePaths.ui.logo,
        ImagePaths.profile.avatar,
    ];

    return (
        <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-white mb-4">Debug Image Paths:</h3>
            <ul className="text-gray-300 space-y-2">
                {testPaths.map((path, index) => (
                    <li key={index} className="font-mono text-sm">
                        {path}
                    </li>
                ))}
            </ul>
        </div>
    );
}
