import ProjectGrid from "@/components/ProjectGrid";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects | Henry Hirshland",
  description: "A collection of projects I've worked on.",
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
