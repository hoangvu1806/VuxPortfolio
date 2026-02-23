import { ImagePaths } from "@/utils/image-paths";
import { Project } from "@/types/project";

// --- Raw JSON imports (one file per project) ---
import acaread from "./projects/acaread.json";
import twinself from "./projects/twinself.json";
import faceAttendance from "./projects/face-attendance.json";
import ready4rag from "./projects/ready4rag.json";
import deeplearningPractice from "./projects/deeplearning-practice.json";
import ezclip from "./projects/ezclip.json";
import decisionTree from "./projects/decision-tree-visualization.json";
import tarsSOICT25 from "./projects/tars-soict25.json";
import viettelAIRace from "./projects/viettel-ai-race-2025.json";
import aic25 from "./projects/aic25-competition.json";
import zaloAI2023 from "./projects/zalo-ai-challenge-2023.json";
import aic24 from "./projects/aic24-competition.json";
import vizquest from "./projects/vizquest.json";

// Injects hero, thumbnail, and images array from the project's slug field.
// Projects without a slug (no dedicated image folder) are returned as-is.
function withImages(raw: Record<string, unknown>): Project {
    const slug = raw.slug as string | undefined;

    if (!slug) return raw as Project;

    return {
        ...raw,
        image: ImagePaths.project.hero(slug),
        thumbnail: ImagePaths.project.thumbnail(slug),
        images: [
            ImagePaths.project.hero(slug),
            ImagePaths.project.thumbnail(slug),
        ],
    } as Project;
}

// Ordered list — order determines display order on the projects page.
export const projects: Project[] = [
    withImages(acaread),
    withImages(twinself),
    withImages(faceAttendance),
    withImages(ready4rag),
    withImages(deeplearningPractice),
    withImages(ezclip),
    withImages(decisionTree),
    withImages(tarsSOICT25),
    withImages(viettelAIRace),
    withImages(aic25),
    withImages(zaloAI2023),
    withImages(aic24),
    withImages(vizquest),
];
