import Link from "next/link";

import type { SitePage } from "@/lib/types";

type ArticleListProps = {
  pages: SitePage[];
};

export function ArticleList({ pages }: ArticleListProps) {
  return (
    <section className="ArticleList">
      {pages.map((page) => (
        <article key={page.slug} className="Article">
          <h3 className="Article__Title">
            <span className="Article__Icon">{page.icon}</span>
            <Link href={`/${page.slug}`}>{page.title}</Link>
          </h3>
          <p className="Article__Desc">{page.description}</p>
        </article>
      ))}
    </section>
  );
}
