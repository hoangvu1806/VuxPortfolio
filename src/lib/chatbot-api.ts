"use client";

import type { Message } from "@/components/chatbot";

export interface ChatbotPayload {
    session_id: string;
    message: string;
    ask?: string;
    conversation: ConversationMessage[];
    metadata: ChatbotMetadata;
}

export interface ConversationMessage {
    id: number;
    role: "user" | "assistant";
    content: string;
    timestamp: string;
}

export interface ChatbotMetadata {
    url: string;
    timestamp: string;
    user_agent?: string;
    page_title?: string;
}

export class ChatbotAPI {
    private static instance: ChatbotAPI;
    private sessionId: string;

    private constructor() {
        this.sessionId = this.generateSessionId();
    }

    public static getInstance(): ChatbotAPI {
        if (!ChatbotAPI.instance) {
            ChatbotAPI.instance = new ChatbotAPI();
        }
        return ChatbotAPI.instance;
    }

    private generateSessionId(): string {
        return `session_${Date.now()}_${Math.random()
            .toString(36)
            .substr(2, 9)}`;
    }

    private formatConversation(messages: Message[]): ConversationMessage[] {
        return messages.map((msg, index) => ({
            id: index + 1,
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp.toISOString(),
        }));
    }

    private getMetadata(): ChatbotMetadata {
        return {
            url: typeof window !== "undefined" ? window.location.href : "",
            timestamp: new Date().toISOString(),
            user_agent:
                typeof window !== "undefined" ? navigator.userAgent : "",
            page_title: typeof window !== "undefined" ? document.title : "",
        };
    }

    public async sendMessage(
        message: string,
        conversation: Message[],
        ask?: string,
        abortSignal?: AbortSignal
    ): Promise<AsyncIterable<string>> {
        const payload: ChatbotPayload = {
            session_id: this.sessionId,
            message: message.trim(),
            ask: ask || undefined,
            conversation: this.formatConversation(conversation),
            metadata: this.getMetadata(),
        };

        try {
            const apiUrl = "/api/chat/stream";
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "text/event-stream",
                },
                body: JSON.stringify(payload),
                signal: abortSignal,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (!response.body) {
                throw new Error("No response body");
            }

            return this.parseStreamingResponse(response.body);
        } catch (error) {
            console.error("Chatbot API error:", error);
            throw error;
        }
    }

    private async *parseStreamingResponse(
        body: ReadableStream<Uint8Array>
    ): AsyncIterable<string> {
        const reader = body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        try {
            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                buffer += chunk;

                const lines = buffer.split("\n");
                buffer = lines.pop() || "";

                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (trimmedLine) {

                        if (trimmedLine.startsWith("data: ")) {
                            const data = trimmedLine.slice(6);
                            if (data === "[DONE]") {
                                return;
                            }
                            if (data) {
                                yield data;
                            }
                        } else if (!trimmedLine.startsWith("event:") && !trimmedLine.startsWith("id:")) {
                            // Handle raw text (not SSE metadata)
                            yield trimmedLine;
                        }
                    }
                }
            }
            if (buffer.trim()) {
                const trimmed = buffer.trim();
                if (trimmed.startsWith("data: ")) {
                    const data = trimmed.slice(6);
                    if (data && data !== "[DONE]") {
                        yield data;
                    }
                } else if (!trimmed.startsWith("event:") && !trimmed.startsWith("id:")) {
                    yield trimmed;
                }
            }
        } finally {
            reader.releaseLock();
        }
    }

    public getSessionId(): string {
        return this.sessionId;
    }

    public resetSession(): void {
        this.sessionId = this.generateSessionId();
    }
}
