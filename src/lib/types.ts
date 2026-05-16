export type SitePage = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  template: "post" | "page";
  publish: boolean;
  inMenu: boolean;
  inList: boolean;
  tags: string[];
  date: string | null;
  body: string;
};

export type SiteConfig = {
  title: string;
  tagline: string;
  pages: SitePage[];
};
