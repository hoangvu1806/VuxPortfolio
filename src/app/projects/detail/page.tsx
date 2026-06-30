import { redirect } from "next/navigation";
import { getProjectByTitle } from "@/lib/projects";

interface LegacyProjectDetailPageProps {
    searchParams: Promise<{
        project?: string;
    }>;
}

export default async function LegacyProjectDetailPage({
    searchParams,
}: LegacyProjectDetailPageProps) {
    const { project } = await searchParams;

    if (!project) {
        redirect("/projects");
    }

    const matchedProject = getProjectByTitle(project);

    if (!matchedProject?.slug) {
        redirect("/projects");
    }

    redirect(`/projects/${matchedProject.slug}`);
}
