type PageContentProps = {
  title: string;
  icon: string;
  description: string;
  body: string;
};

export function PageContent({
  title,
  icon,
  description,
  body,
}: PageContentProps) {
  return (
    <article className="Page">
      <header className="Page__Header">
        <span className="Page__Icon">{icon}</span>
        <h1 className="Page__Title">{title}</h1>
        {description ? <p className="Page__Lead">{description}</p> : null}
      </header>
      {body ? (
        <div
          className="Page__Body"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      ) : (
        <p className="Page__Placeholder">
          Page body will load from Notion once{" "}
          <code>NOTION_TOKEN</code> is configured. Edit content in your Notion
          database and it will appear here automatically.
        </p>
      )}
    </article>
  );
}
