import { notFound } from "next/navigation";

import { PageContent } from "@/components/PageContent";
import { SiteShell } from "@/components/SiteShell";
import {
  getAllSlugs,
  getMenuPages,
  getPageBySlug,
} from "@/lib/notion";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return { title: "Not Found" };
  }

  return {
    title: `${page.title} | Esther Yang`,
    description: page.description,
  };
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  const menuPages = await getMenuPages();

  if (!page) {
    notFound();
  }

  return (
    <SiteShell menuPages={menuPages}>
      <PageContent
        title={page.title}
        icon={page.icon}
        description={page.description}
        body={page.body}
      />
    </SiteShell>
  );
}
