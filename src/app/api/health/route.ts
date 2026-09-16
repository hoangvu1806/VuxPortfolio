import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json(
        {
            status: "ok",
            service: "vux-portfolio",
            timestamp: new Date().toISOString(),
        },
        {
            headers: {
                "Cache-Control": "no-store",
            },
        },
    );
}
