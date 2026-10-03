export type Genre =
  | "sci-fi"
  | "fantasy"
  | "fiction"
  | "business"
  | "biography"
  | "self-help"
  | "nonfiction";

export interface Book {
  slug: string;
  title: string;
  subtitle?: string;
  series?: string;
  author: string;
  genre?: Genre;
  cover: string;
  pages: number;
  spineColor: string;
  spineText: string;
  note: string;
  rating?: number;
  url?: string;
}

export const GENRES: { id: Genre | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "sci-fi", label: "Sci-fi" },
  { id: "fantasy", label: "Fantasy" },
  { id: "fiction", label: "Fiction" },
  { id: "business", label: "Business" },
  { id: "biography", label: "Biography" },
  { id: "self-help", label: "Self-Help" },
  { id: "nonfiction", label: "Nonfiction" },
];

export const GENRE_LABELS: Record<Genre, string> = {
  "sci-fi": "Sci-fi",
  fantasy: "Fantasy",
  fiction: "Fiction",
  business: "Business",
  biography: "Biography",
  "self-help": "Self-Help",
  nonfiction: "Nonfiction",
};

export const GOODREADS_USER_ID = "169833024";
export const FAVORITE_MIN_RATING = 4;

/** Books without a rating (the static fallback list) count as favorites. */
export function isFavorite(book: Book): boolean {
  return book.rating === undefined || book.rating >= FAVORITE_MIN_RATING;
}

export const SPINE_PALETTE: { spineColor: string; spineText: string }[] = [
  { spineColor: "#1f3a5f", spineText: "#f3e3b5" },
  { spineColor: "#2f5d50", spineText: "#f4ecd8" },
  { spineColor: "#7a2e3a", spineText: "#f6e7c8" },
  { spineColor: "#b7832f", spineText: "#1f1a14" },
  { spineColor: "#4a5568", spineText: "#f4ecd8" },
  { spineColor: "#2c6e7a", spineText: "#f6efd9" },
  { spineColor: "#a4502f", spineText: "#fbeee0" },
  { spineColor: "#5b3a5e", spineText: "#f2dfb4" },
  { spineColor: "#6b6a3a", spineText: "#f7f1dc" },
  { spineColor: "#2b2b2b", spineText: "#e8c46a" },
  { spineColor: "#5b7fa6", spineText: "#101b2b" },
  { spineColor: "#7d9a7e", spineText: "#13241a" },
];

type BookOverride = Partial<Pick<Book, "genre" | "spineColor" | "spineText" | "note">>;

function fromFallback(slug: string): BookOverride {
  const book = fallbackBooks.find((b) => b.slug === slug);
  if (!book) return {};
  const { genre, spineColor, spineText, note } = book;
  return { genre, spineColor, spineText, note };
}

/** Per-book tweaks for Goodreads books, keyed by Goodreads book ID. */
export function getBookOverride(goodreadsId: string): BookOverride {
  const slug = FALLBACK_SLUGS_BY_GOODREADS_ID[goodreadsId];
  if (slug) return fromFallback(slug);
  const genre = GENRES_BY_GOODREADS_ID[goodreadsId];
  return genre ? { genre } : {};
}

const FALLBACK_SLUGS_BY_GOODREADS_ID: Record<string, string> = {
  "54493401": "project-hail-mary",
  "44767458": "dune",
  "58784475": "tomorrow",
  "122765395": "elon-musk",
  "50489315": "super-pumped",
  "40651883": "snow-crash",
  "20518872": "three-body",
  "29579": "foundation",
  "60321447": "chip-war",
  "18007564": "the-martian",
  "123224254": "mistborn",
  "56965384": "better-to-be-feared",
  "50358103": "money",
  "27220736": "shoe-dog",
  "50175330": "infinite-machine",
};

const GENRES_BY_GOODREADS_ID: Record<string, Genre> = {
  "149105520": "business",
  "21856367": "business",
  "24724602": "business",
  "178628338": "business",
  "12329637": "business",
  "25733657": "business",
  "123276708": "business",
  "205307264": "business",
  "43889703": "business",
  "39286958": "business",
  "52283963": "business",
  "56753443": "business",
  "944652": "business",
  "25897674": "self-help",
  "52838315": "biography",
  "41941223": "sci-fi",
  "19819475": "sci-fi",
  "40658136": "sci-fi",
  "40514364": "sci-fi",
  "66562105": "sci-fi",
  "34928122": "sci-fi",
  "25812667": "sci-fi",
  "34501338": "sci-fi",
  "123224266": "fantasy",
  "123224262": "fantasy",
  "6411961": "fiction",
  "59317275": "fiction",
  "49977581": "fiction",
  "18144590": "fiction",
  "11084145": "biography",
  "40121378": "self-help",
  "54898389": "self-help",
  "61153739": "self-help",
  "23692271": "nonfiction",
  "102146148": "nonfiction",
};

/** Shown if the Goodreads feed can't be reached. */
export const fallbackBooks: Book[] = [
  {
    slug: "project-hail-mary",
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "sci-fi",
    cover: "/books/project-hail-mary.jpg",
    pages: 496,
    spineColor: "#0f2a3d",
    spineText: "#f5c84c",
    note: "A lone astronaut, a dying sun, and the best friendship in sci-fi. Pure joy.",
  },
  {
    slug: "dune",
    title: "Dune",
    author: "Frank Herbert",
    genre: "sci-fi",
    cover: "/books/dune.jpg",
    pages: 608,
    spineColor: "#c2692a",
    spineText: "#fff4e0",
    note: "Politics, ecology, religion, and spice. The blueprint for everything that came after.",
  },
  {
    slug: "tomorrow",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    genre: "fiction",
    cover: "/books/tomorrow.jpg",
    pages: 416,
    spineColor: "#f2ece0",
    spineText: "#1f3a5f",
    note: "Friendship, creativity, and making games together over thirty years.",
  },
  {
    slug: "elon-musk",
    title: "Elon Musk",
    author: "Walter Isaacson",
    genre: "biography",
    cover: "/books/elon-musk.jpg",
    pages: 688,
    spineColor: "#1a1a1a",
    spineText: "#f5f5f5",
    note: "An unfiltered look at demon mode, the algorithm, and building at absurd speed.",
  },
  {
    slug: "super-pumped",
    title: "Super Pumped",
    author: "Mike Isaac",
    genre: "business",
    cover: "/books/super-pumped.jpg",
    pages: 400,
    spineColor: "#d4231f",
    spineText: "#111111",
    note: "The rise and chaos of Uber. A masterclass in what growth at all costs looks like.",
  },
  {
    slug: "snow-crash",
    title: "Snow Crash",
    author: "Neal Stephenson",
    genre: "sci-fi",
    cover: "/books/snow-crash.jpg",
    pages: 460,
    spineColor: "#2b3a8c",
    spineText: "#f3d36b",
    note: "Pizza-delivering hackers and the original metaverse. Wildly fun.",
  },
  {
    slug: "three-body",
    title: "The Three-Body Problem",
    author: "Cixin Liu",
    genre: "sci-fi",
    cover: "/books/three-body.jpg",
    pages: 400,
    spineColor: "#1d4e6e",
    spineText: "#d8e85a",
    note: "Hard sci-fi with ideas so big they rearrange how you think about the universe.",
  },
  {
    slug: "foundation",
    title: "Foundation",
    author: "Isaac Asimov",
    genre: "sci-fi",
    cover: "/books/foundation.jpg",
    pages: 240,
    spineColor: "#16233b",
    spineText: "#f0c419",
    note: "Psychohistory and the long game. Still the gold standard for big-picture sci-fi.",
  },
  {
    slug: "chip-war",
    title: "Chip War",
    author: "Chris Miller",
    genre: "business",
    cover: "/books/chip-war.jpg",
    pages: 464,
    spineColor: "#0c0c0c",
    spineText: "#e8b923",
    note: "How semiconductors became the most important resource on the planet.",
  },
  {
    slug: "the-martian",
    title: "The Martian",
    author: "Andy Weir",
    genre: "sci-fi",
    cover: "/books/the-martian.jpg",
    pages: 384,
    spineColor: "#b5462a",
    spineText: "#fbe7d0",
    note: "Science the heck out of it. Problem solving as page-turner.",
  },
  {
    slug: "mistborn",
    title: "Mistborn",
    author: "Brandon Sanderson",
    genre: "fantasy",
    cover: "/books/mistborn.jpg",
    pages: 672,
    spineColor: "#5a5f66",
    spineText: "#7fd3e6",
    note: "The best magic system in fantasy, and a heist story to boot.",
  },
  {
    slug: "better-to-be-feared",
    title: "It's Better to Be Feared",
    author: "Seth Wickersham",
    genre: "biography",
    cover: "/books/better-to-be-feared.jpg",
    pages: 528,
    spineColor: "#0b2545",
    spineText: "#c8102e",
    note: "Inside the Patriots dynasty. Belichick, Brady, and twenty years of winning.",
  },
  {
    slug: "money",
    title: "Money",
    author: "Jacob Goldstein",
    genre: "business",
    cover: "/books/money.jpg",
    pages: 272,
    spineColor: "#2e7d4f",
    spineText: "#f7f3e3",
    note: "The true story of a made-up thing. A breezy, fascinating history of money.",
  },
  {
    slug: "shoe-dog",
    title: "Shoe Dog",
    author: "Phil Knight",
    genre: "biography",
    cover: "/books/shoe-dog.jpg",
    pages: 400,
    spineColor: "#e85d1f",
    spineText: "#ffffff",
    note: "The most honest founder memoir out there. Nike was almost never Nike.",
  },
  {
    slug: "infinite-machine",
    title: "The Infinite Machine",
    author: "Camila Russo",
    genre: "business",
    cover: "/books/infinite-machine.jpg",
    pages: 352,
    spineColor: "#6aa8e8",
    spineText: "#1c1c1c",
    note: "The messy, brilliant early days of Ethereum and the people who built it.",
  },
];

export function goodreadsUrl(book: Book): string {
  return book.url ?? `https://www.goodreads.com/search?q=${encodeURIComponent(`${book.title} ${book.author}`)}`;
}
