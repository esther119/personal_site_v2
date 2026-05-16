# personal_site_v2

A redesign-friendly personal site powered by Notion content.

## Content Source

Notion database: https://selflearning.notion.site/46a79c7aceaf46f399dc775ab35e3ebd

Edit pages in Notion (`title`, `publish`, `inMenu`, `inList`, `url`, `description`, etc.) and the site will reflect changes after rebuild/revalidate.

## Local Development

```bash
npm run dev
```

Open http://localhost:3000.

Without a Notion token, the app uses local seed data so you can work on design immediately.

## Notion API Setup

1. Create an integration at https://www.notion.so/my-integrations
2. Copy the secret into `.env.local`:

```env
NOTION_TOKEN=secret_...
NOTION_DATABASE_ID=46a79c7aceaf46f399dc775ab35e3ebd
```

3. Open your Notion database, then add the integration from Connections.

## Project Structure

- `src/lib/notion.ts` fetches pages from Notion and falls back to seed data.
- `src/lib/seed.ts` contains local fallback content.
- `src/components/` contains the editable UI pieces.
- `src/app/globals.css` is the main design surface for future redesigns.

## Deploy

Deploy to Vercel and add `NOTION_TOKEN` plus `NOTION_DATABASE_ID` as environment variables.
