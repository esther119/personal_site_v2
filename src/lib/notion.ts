import { Client, isFullPage } from "@notionhq/client";
import type {
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { seedSite } from "./seed";
import type { SiteConfig, SitePage } from "./types";

const DATABASE_ID =
  process.env.NOTION_DATABASE_ID ?? "46a79c7aceaf46f399dc775ab35e3ebd";

function formatDatabaseId(id: string): string {
  const clean = id.replace(/-/g, "");
  if (clean.length !== 32) return id;
  return `${clean.slice(0, 8)}-${clean.slice(8, 12)}-${clean.slice(12, 16)}-${clean.slice(16, 20)}-${clean.slice(20)}`;
}

function richTextToPlain(items: RichTextItemResponse[] | undefined): string {
  return (items ?? []).map((item) => item.plain_text).join("").trim();
}

function getCheckbox(
  properties: PageObjectResponse["properties"],
  name: string,
): boolean {
  const prop = properties[name];
  return prop?.type === "checkbox" ? prop.checkbox : false;
}

function getTitle(
  properties: PageObjectResponse["properties"],
  name: string,
): string {
  const prop = properties[name];
  if (prop?.type === "title") {
    return richTextToPlain(prop.title);
  }
  return "";
}

function getRichText(
  properties: PageObjectResponse["properties"],
  name: string,
): string {
  const prop = properties[name];
  if (prop?.type === "rich_text") {
    return richTextToPlain(prop.rich_text);
  }
  return "";
}

function getSelect(
  properties: PageObjectResponse["properties"],
  name: string,
): string {
  const prop = properties[name];
  if (prop?.type === "select") {
    return prop.select?.name ?? "";
  }
  return "";
}

function getMultiSelect(
  properties: PageObjectResponse["properties"],
  name: string,
): string[] {
  const prop = properties[name];
  if (prop?.type === "multi_select") {
    return prop.multi_select.map((item) => item.name);
  }
  return [];
}

function getDate(
  properties: PageObjectResponse["properties"],
  name: string,
): string | null {
  const prop = properties[name];
  if (prop?.type === "date" && prop.date?.start) {
    return prop.date.start;
  }
  return null;
}

function pageIcon(page: PageObjectResponse): string {
  const icon = page.icon;
  if (icon?.type === "emoji") return icon.emoji;
  return "📄";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function fetchPageBody(
  notion: Client,
  pageId: string,
): Promise<string> {
  const blocks = await notion.blocks.children.list({ block_id: pageId });
  const parts: string[] = [];

  for (const block of blocks.results) {
    if (!("type" in block)) continue;

    switch (block.type) {
      case "paragraph": {
        const text = richTextToPlain(block.paragraph.rich_text);
        if (text) parts.push(`<p>${escapeHtml(text)}</p>`);
        break;
      }
      case "heading_1": {
        const text = richTextToPlain(block.heading_1.rich_text);
        if (text) parts.push(`<h2>${escapeHtml(text)}</h2>`);
        break;
      }
      case "heading_2": {
        const text = richTextToPlain(block.heading_2.rich_text);
        if (text) parts.push(`<h3>${escapeHtml(text)}</h3>`);
        break;
      }
      case "heading_3": {
        const text = richTextToPlain(block.heading_3.rich_text);
        if (text) parts.push(`<h4>${escapeHtml(text)}</h4>`);
        break;
      }
      case "bulleted_list_item": {
        const text = richTextToPlain(block.bulleted_list_item.rich_text);
        if (text) parts.push(`<li>${escapeHtml(text)}</li>`);
        break;
      }
      case "numbered_list_item": {
        const text = richTextToPlain(block.numbered_list_item.rich_text);
        if (text) parts.push(`<li>${escapeHtml(text)}</li>`);
        break;
      }
      case "quote": {
        const text = richTextToPlain(block.quote.rich_text);
        if (text) parts.push(`<blockquote>${escapeHtml(text)}</blockquote>`);
        break;
      }
      case "divider":
        parts.push("<hr />");
        break;
      default:
        break;
    }
  }

  return parts.join("\n");
}

function mapNotionPage(
  page: PageObjectResponse,
  body: string,
): SitePage {
  const slug = getRichText(page.properties, "url") || page.id.replace(/-/g, "");
  const template = getSelect(page.properties, "template");

  return {
    id: page.id,
    title: getTitle(page.properties, "title"),
    slug,
    description: getRichText(page.properties, "description"),
    icon: pageIcon(page),
    template: template === "page" ? "page" : "post",
    publish: getCheckbox(page.properties, "publish"),
    inMenu: getCheckbox(page.properties, "inMenu"),
    inList: getCheckbox(page.properties, "inList"),
    tags: getMultiSelect(page.properties, "tags"),
    date: getDate(page.properties, "date"),
    body,
  };
}

async function fetchFromNotion(): Promise<SiteConfig | null> {
  const token = process.env.NOTION_TOKEN;
  if (!token) return null;

  const notion = new Client({ auth: token });
  const databaseId = formatDatabaseId(DATABASE_ID);

  const response = await notion.dataSources.query({
    data_source_id: databaseId,
    filter: {
      property: "publish",
      checkbox: { equals: true },
    },
  });

  const pages: SitePage[] = [];

  for (const result of response.results) {
    if (!isFullPage(result)) continue;

    const body = await fetchPageBody(notion, result.id);
    pages.push(mapNotionPage(result, body));
  }

  return {
    title: seedSite.title,
    tagline: seedSite.tagline,
    pages,
  };
}

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const live = await fetchFromNotion();
    if (live && live.pages.length > 0) return live;
  } catch (error) {
    console.warn("[notion] Falling back to seed data:", error);
  }

  return seedSite;
}

export async function getPageBySlug(slug: string): Promise<SitePage | null> {
  const site = await getSiteConfig();
  return site.pages.find((page) => page.slug === slug) ?? null;
}

export async function getMenuPages(): Promise<SitePage[]> {
  const site = await getSiteConfig();
  return site.pages.filter((page) => page.publish && page.inMenu);
}

export async function getListPages(): Promise<SitePage[]> {
  const site = await getSiteConfig();
  return site.pages.filter((page) => page.publish && page.inList);
}

export async function getAllSlugs(): Promise<string[]> {
  const site = await getSiteConfig();
  return site.pages.filter((page) => page.publish).map((page) => page.slug);
}
