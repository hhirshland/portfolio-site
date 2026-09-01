import ProjectGrid from "@/components/ProjectGrid";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects",
  description:
    "Side projects and AI products built by Henry Hirshland—from an AI command center for investment teams to mobile apps for golf and habit building.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <div className="pt-12">
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
