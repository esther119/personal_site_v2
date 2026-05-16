import { Navbar } from "@/components/Navbar";
import type { SitePage } from "@/lib/types";

type SiteShellProps = {
  menuPages: SitePage[];
  children: React.ReactNode;
};

export function SiteShell({ menuPages, children }: SiteShellProps) {
  return (
    <div className="SiteShell">
      <Navbar pages={menuPages} />
      <main className="SiteMain">{children}</main>
    </div>
  );
}
