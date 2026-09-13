"use client";

import Script from "next/script";

interface GoogleAnalyticsProps {
    measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
    // Only load in production and when measurement ID is provided
    if (process.env.NODE_ENV !== "production" || !measurementId) {
        return null;
    }

    return (
        <>
            {/* Google Analytics Script */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                strategy="lazyOnload"
            />
            <Script
                id="google-analytics"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${measurementId}', {
                            page_title: document.title,
                            page_location: window.location.href,
                        });
                    `,
                }}
            />
        </>
    );
}