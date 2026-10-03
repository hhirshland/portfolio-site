import {
  Book,
  GOODREADS_USER_ID,
  SPINE_PALETTE,
  fallbackBooks,
  getBookOverride,
} from "@/data/books";
import { hashString } from "@/components/library/random";

const REVALIDATE_SECONDS = 60 * 60;
const PER_PAGE = 100;
const MAX_PAGES = 5;

function feedUrl(page: number) {
  return `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=read&per_page=${PER_PAGE}&page=${page}`;
}

function decodeEntities(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function field(item: string, tag: string): string {
  const match = item.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  if (!match) return "";
  const raw = match[1].replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, "$1");
  return decodeEntities(raw).trim();
}

function stripHtml(value: string): string {
  return decodeEntities(value.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
}

/** First sentence or two of the publisher blurb, capped near `max` characters. */
function blurb(description: string, max = 180): string {
  const text = stripHtml(description);
  if (text.length <= max) return text;
  const sentences = text.match(/[^.!?]+[.!?]+["”’]?/g) ?? [];
  let out = "";
  for (const sentence of sentences) {
    if ((out + sentence).length > max) break;
    out += sentence;
  }
  return out.trim() || `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

function splitTitle(raw: string) {
  const seriesMatch = raw.match(/\s*\(([^)]*#[^)]*)\)\s*$/);
  const withoutSeries = seriesMatch ? raw.slice(0, seriesMatch.index).trim() : raw;
  const colon = withoutSeries.indexOf(":");
  const title = colon > 0 ? withoutSeries.slice(0, colon).trim() : withoutSeries;
  const subtitle = colon > 0 ? withoutSeries.slice(colon + 1).trim() : undefined;
  return { title, subtitle, series: seriesMatch?.[1].trim() };
}

function toBook(item: string): Book | null {
  const id = field(item, "book_id");
  if (!id) return null;
  const rating = Number(field(item, "user_rating")) || 0;

  const { title, subtitle, series } = splitTitle(field(item, "title"));
  const override = getBookOverride(id);
  const palette = SPINE_PALETTE[hashString(id) % SPINE_PALETTE.length];
  const review = stripHtml(field(item, "user_review"));

  return {
    slug: `gr-${id}`,
    title,
    subtitle,
    series,
    author: field(item, "author_name").replace(/\s+/g, " "),
    genre: override.genre,
    cover: field(item, "book_large_image_url") || field(item, "book_image_url"),
    pages: Number(field(item, "num_pages")) || 300,
    spineColor: override.spineColor ?? palette.spineColor,
    spineText: override.spineText ?? palette.spineText,
    note: review || override.note || blurb(field(item, "book_description")),
    rating,
    url: `https://www.goodreads.com/book/show/${id}`,
  };
}

async function fetchPage(page: number): Promise<string[]> {
  const res = await fetch(feedUrl(page), { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) throw new Error(`Goodreads feed responded ${res.status}`);
  const xml = await res.text();
  return xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
}

/** Every book on the Goodreads "read" shelf, best-rated first. Unrated books have a rating of 0. */
export async function getLibraryBooks(): Promise<Book[]> {
  try {
    const items: string[] = [];
    for (let page = 1; page <= MAX_PAGES; page++) {
      const pageItems = await fetchPage(page);
      items.push(...pageItems);
      if (pageItems.length < PER_PAGE) break;
    }
    const books = items.map(toBook).filter((book): book is Book => book !== null);
    if (books.length === 0) return fallbackBooks;
    return books
      .map((book, index) => ({ book, index }))
      .sort((a, b) => (b.book.rating ?? 0) - (a.book.rating ?? 0) || a.index - b.index)
      .map(({ book }) => book);
  } catch (error) {
    console.error("Failed to load Goodreads library", error);
    return fallbackBooks;
  }
}
