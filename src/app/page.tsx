import { ArticleList } from "@/components/ArticleList";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteShell } from "@/components/SiteShell";
import {
  getListPages,
  getMenuPages,
  getSiteConfig,
} from "@/lib/notion";

export const revalidate = 60;

export default async function HomePage() {
  const site = await getSiteConfig();
  const menuPages = await getMenuPages();
  const listPages = await getListPages();

  return (
    <SiteShell menuPages={menuPages}>
      <SiteHeader
        title={site.title}
        tagline={site.tagline}
        icon="✨"
      />
      <ArticleList pages={listPages} />
    </SiteShell>
  );
}
