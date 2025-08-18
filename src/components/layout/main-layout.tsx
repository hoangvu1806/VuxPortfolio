"use client";

import { Header } from "./header";
import { Footer } from "./footer";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { useLoading } from "@/hooks/use-loading";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [showLoading, setShowLoading] = useState(false);
    const { isLoading, handleLoadingComplete } = useLoading(2500);

    // Show loading only on initial page load or major route changes
    useEffect(() => {
        // Check if this is the first load
        const hasLoaded = sessionStorage.getItem("hasLoaded");

        if (!hasLoaded) {
            setShowLoading(true);
            sessionStorage.setItem("hasLoaded", "true");
        }
    }, []);

    const shouldShowLoading = showLoading && isLoading;

    return (
        <>
            <LoadingScreen
                isLoading={shouldShowLoading}
                onComplete={handleLoadingComplete}
            />

            <div className="flex min-h-screen flex-col">
                <Header />
                <AnimatePresence mode="wait">
                    <motion.main
                        key={pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="flex-grow"
                    >
                        {children}
                    </motion.main>
                </AnimatePresence>
                <Footer />
            </div>
        </>
    );
}
