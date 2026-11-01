import type { Metadata } from "next";
import InformationPageClient from "./page-client";
import { profile } from "@/data/profile";
import { buildMetadata } from "@/lib/seo";

// The page is prerendered: refresh daily so the age follows the calendar year.
export const revalidate = 86400;

// Landing page for the NFC card: reached by tapping, so it stays out of search and navigation.
export const metadata: Metadata = {
    ...buildMetadata({
        title: "Do Hoang Vu | AI Engineer",
        description: "Save the contact of Do Hoang Vu, AI Engineer, and connect in one tap.",
        path: "/information",
    }),
    robots: { index: false, follow: false },
};

export default function InformationPage() {
    return <InformationPageClient age={new Date().getFullYear() - profile.birthYear} />;
}
