"use client";

import { useState, useEffect } from "react";

export function useLoading(minLoadingTime: number = 2000) {
    const [isLoading, setIsLoading] = useState(true);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsComplete(true);
        }, minLoadingTime);

        return () => clearTimeout(timer);
    }, [minLoadingTime]);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    return {
        isLoading: isLoading && !isComplete,
        handleLoadingComplete,
    };
}
