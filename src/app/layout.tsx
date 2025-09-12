import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { ChatbotPopup } from "@/components/chatbot";
import { ChatbotContextProvider } from "@/contexts/ChatbotContext";
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
    title: "VU HOANG | AI-DEAS FOR BRIGHT MINDS",
    description:
        "Personal portfolio of VU HOANG, an AI Engineer specializing in Generative AI, NLP, and Computer Vision",
    keywords: [
        "AI Engineer",
        "Machine Learning",
        "Deep Learning",
        "Portfolio",
        "NextJS",
        "React",
    ],
    icons: {
        icon: "/images/ui/logo.png",
        shortcut: "/images/ui/logo.png",
        apple: "/images/ui/logo.png",
    },
    manifest: "/manifest.json",
    themeColor: "#030712",
    appleWebApp: {
        title: "VU HOANG",
        statusBarStyle: "black-translucent",
    },
    verification: {
        google: "tfgD0FvL07cU0iBXmkkQfDzPEE7HzHq1m7mR93N-Hpg",
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
