import { Suspense } from "react";
import { LanguageSwitcher } from "./language-switcher";

interface LanguageSwitcherWrapperProps {
    currentSlug: string;
    className?: string;
}

export function LanguageSwitcherWrapper({
    currentSlug,
    className,
}: LanguageSwitcherWrapperProps) {
    return (
        <Suspense
            fallback={
                <div
                    className={`${className} px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 rounded-xl font-medium opacity-50`}
                >
                    <span className="text-sm font-medium uppercase">VI</span>
                </div>
            }
        >
            <LanguageSwitcher currentSlug={currentSlug} className={className} />
        </Suspense>
    );
}
