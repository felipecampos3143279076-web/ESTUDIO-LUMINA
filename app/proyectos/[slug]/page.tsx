import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InnerPage from "@/components/layout/InnerPage";
import ProjectDetail from "@/components/projects-page/ProjectDetail";
import { PROJECTS } from "@/components/projects-page/projects";

// Las cinco páginas se generan en el build a partir de projects.ts.
export function generateStaticParams() {
  return PROJECTS.map(({ slug }) => ({ slug }));
}

const findProject = (slug: string) => PROJECTS.find((project) => project.slug === slug);

export async function generateMetadata({
  params,
}: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const project = findProject((await params).slug);
  return { title: project ? `${project.name} · Estudio Lúmina` : "Proyecto · Estudio Lúmina" };
}

export default async function ProjectPage({ params }: PageProps<"/proyectos/[slug]">) {
  const project = findProject((await params).slug);
  if (!project) notFound();

  return (
    <InnerPage>
      <ProjectDetail project={project} />
    </InnerPage>
  );
}
