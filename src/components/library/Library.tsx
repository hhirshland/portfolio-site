"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GENRES, isFavorite, type Book, type Genre } from "@/data/books";
import type { PickedBook } from "./types";
import BookshelfVariant from "./BookshelfVariant";
import CoverFlowVariant from "./CoverFlowVariant";
import TablePileVariant from "./TablePileVariant";
import FlipGridVariant from "./FlipGridVariant";

const VARIANTS = {
  shelf: { label: "Bookshelf", component: BookshelfVariant },
  coverflow: { label: "Cover Flow", component: CoverFlowVariant },
  pile: { label: "Table Pile", component: TablePileVariant },
  grid: { label: "Flip Grid", component: FlipGridVariant },
} as const;

type VariantId = keyof typeof VARIANTS;

const VARIANT: VariantId = "shelf";

export default function Library({ books }: { books: Book[] }) {
  const [genre, setGenre] = useState<Genre | "all">("all");
  const [showAll, setShowAll] = useState(false);
  const [picked, setPicked] = useState<PickedBook | null>(null);

  const favorites = useMemo(() => books.filter(isFavorite), [books]);
  const visible = showAll ? books : favorites;
  const genres = useMemo(
    () => GENRES.filter((g) => g.id === "all" || visible.some((b) => b.genre === g.id)),
    [visible]
  );
  const activeGenre = genres.some((g) => g.id === genre) ? genre : "all";
  const filtered = useMemo(
    () => (activeGenre === "all" ? visible : visible.filter((b) => b.genre === activeGenre)),
    [visible, activeGenre]
  );

  const toggleShowAll = () => {
    setShowAll((all) => !all);
    setPicked(null);
  };

  const pickRandom = () => {
    const others = filtered.filter((b) => b.slug !== picked?.slug);
    const pool = others.length ? others : filtered;
    const choice = pool[Math.floor(Math.random() * pool.length)];
    if (choice) setPicked({ slug: choice.slug, nonce: Date.now() });
  };

  const Variant = VARIANTS[VARIANT].component;

  return (
    <section id="library" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 md:p-12 border border-white/50 shadow-lg shadow-emerald-900/5"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 text-center">
            My Bookshelf
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-center mb-8">
            {showAll ? "Everything I've read." : "Some of my favorite reads."}
            {favorites.length < books.length && (
              <>
                {" "}
                <button
                  onClick={toggleShowAll}
                  className="font-medium text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
                >
                  {showAll ? "Just the favorites" : "See all"}
                </button>
              </>
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {genres.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  setGenre(g.id);
                  setPicked(null);
                }}
                className={`px-3 py-1 text-sm rounded-full border transition-all ${
                  activeGenre === g.id
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                    : "bg-white/60 text-slate-600 border-white/70 hover:bg-white hover:text-slate-800"
                }`}
              >
                {g.label}
              </button>
            ))}
            <button
              onClick={pickRandom}
              className="ml-1 px-3 py-1 text-sm rounded-full border border-emerald-500/40 text-emerald-700 bg-emerald-50/70 hover:bg-emerald-100 transition-all"
            >
              Pick one for me
            </button>
          </div>

          <Variant key={VARIANT} books={filtered} picked={picked} />

          <p className="text-center mt-6">
            <a
              href="https://www.goodreads.com/user/show/169833024"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-emerald-700 transition-colors"
            >
              Find me on Goodreads
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
