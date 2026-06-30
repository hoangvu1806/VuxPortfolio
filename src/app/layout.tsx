import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { ChatbotPopup } from "@/components/chatbot";
import { ChatbotContextProvider } from "@/contexts/ChatbotContext";
import { absoluteUrl, siteDescription, siteTitle, siteUrl } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const robotoMono = Roboto_Mono({
    variable: "--font-roboto-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: siteTitle,
        template: "%s | Do Hoang Vu",
    },
    description: siteDescription,
    keywords: [
        "Do Hoang Vu",
        "Đỗ Hoàng Vũ",
        "Hoàng Vũ AI",
        "AI Engineer",
        "Generative AI",
        "LLM Engineer",
        "Machine Learning Engineer",
        "Computer Vision Engineer",
        "NLP Engineer",
        "RAG Engineer",
    ],
    authors: [{ name: "Do Hoang Vu", url: absoluteUrl("/") }],
    creator: "Do Hoang Vu",
    publisher: "Do Hoang Vu",
    applicationName: "Do Hoang Vu Portfolio",
    alternates: {
        canonical: absoluteUrl("/"),
    },
    openGraph: {
        type: "website",
        url: absoluteUrl("/"),
        title: siteTitle,
        description: siteDescription,
        siteName: "Do Hoang Vu",
        locale: "en_US",
        images: [
            {
                url: absoluteUrl("/images/profile/profile.jpg"),
                width: 1200,
                height: 630,
                alt: "Do Hoang Vu AI Engineer Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteTitle,
        description: siteDescription,
        images: [absoluteUrl("/images/profile/profile.jpg")],
    },
    icons: {
        icon: "/images/ui/logo.png",
        shortcut: "/images/ui/logo.png",
        apple: "/images/ui/logo.png",
    },
    manifest: "/manifest.json",
    appleWebApp: {
        title: "VU HOANG",
        statusBarStyle: "black-translucent",
    },
    verification: {
        google: "tfgD0FvL07cU0iBXmkkQfDzPEE7HzHq1m7mR93N-Hpg",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
};

export const viewport: Viewport = {
    themeColor: "#030712",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${robotoMono.variable} font-sans antialiased`}
            >
                <GoogleAnalytics
                    measurementId={
                        process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""
                    }
                />
                <ChatbotContextProvider>
                    {children}
                    <ChatbotPopup />
                </ChatbotContextProvider>
            </body>
        </html>
    );
}
