type SiteHeaderProps = {
  title: string;
  tagline?: string;
  icon?: string;
};

export function SiteHeader({ title, tagline, icon }: SiteHeaderProps) {
  return (
    <header className="Header">
      <div className="Header__Cover">
        <div className="Header__CoverBand" />
      </div>
      <div className="Header__Spacer" />
      {icon ? (
        <div className="Header__IconWrap">
          <span className="Header__Icon">{icon}</span>
        </div>
      ) : null}
      <h1 className="Header__Title">{title}</h1>
      {tagline ? (
        <div className="Header__Desc">
          <span className="Header__Quote">&ldquo;</span>
          <span>{tagline}</span>
          <span className="Header__Quote">&rdquo;</span>
        </div>
      ) : null}
    </header>
  );
}
