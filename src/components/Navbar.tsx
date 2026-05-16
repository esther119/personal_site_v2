import Link from "next/link";

import type { SitePage } from "@/lib/types";

type NavbarProps = {
  pages: SitePage[];
};

export function Navbar({ pages }: NavbarProps) {
  return (
    <nav className="Navbar">
      <Link href="/" className="Navbar__Home">
        <span className="Navbar__Icon">🏠</span>
        <span>Home</span>
      </Link>
      {pages.map((page) => (
        <span key={page.slug} className="Navbar__Group">
          <span className="Navbar__Delim" aria-hidden="true">
            ·
          </span>
          <Link href={`/${page.slug}`} className="Navbar__Link">
            <span className="Navbar__Icon">{page.icon}</span>
            <span>{page.title}</span>
          </Link>
        </span>
      ))}
    </nav>
  );
}
