import { notFound } from "next/navigation";

import { WorkProjectPage } from "@/components/WorkProject";
import { WORK_PROJECTS, getProject } from "@/lib/work-projects";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return WORK_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.title} — Esther Yang`,
    description: project.purpose,
  };
}

export default async function WorkSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <WorkProjectPage project={project} />;
}
