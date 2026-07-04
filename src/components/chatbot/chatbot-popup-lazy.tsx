"use client";

import dynamic from "next/dynamic";

export const ChatbotPopupLazy = dynamic(
    () => import("./chatbot-popup").then((mod) => mod.ChatbotPopup),
    { ssr: false }
);
