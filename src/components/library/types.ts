import type { Book } from "@/data/books";

export interface PickedBook {
  slug: string;
  nonce: number;
}

export interface LibraryVariantProps {
  books: Book[];
  picked: PickedBook | null;
}
