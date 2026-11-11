import type { Metadata } from "next";
import InnerPage from "@/components/layout/InnerPage";
import ProjectsGrid from "@/components/projects-page/ProjectsGrid";

export const metadata: Metadata = {
  title: "Proyectos · Estudio Lúmina",
};

export default function ProjectsPage() {
  return (
    <InnerPage>
      <ProjectsGrid />
    </InnerPage>
  );
}
