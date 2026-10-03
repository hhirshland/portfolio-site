"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { GENRE_LABELS, goodreadsUrl, type Book } from "@/data/books";
import BookCover from "./BookCover";
import Stars from "./Stars";
import type { LibraryVariantProps } from "./types";

function GridCard({
  book,
  picked,
  ref: forwardedRef,
}: {
  book: Book;
  picked: number | null;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const setRefs = (node: HTMLDivElement | null) => {
    ref.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };
  const [flipped, setFlipped] = useState(false);
  const [glow, setGlow] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [12, -12]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-12, 12]), { stiffness: 300, damping: 20 });
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.45), transparent 55%)`;

  const [seenPick, setSeenPick] = useState(picked);
  if (picked !== null && picked !== seenPick) {
    setSeenPick(picked);
    setFlipped(true);
    setGlow(true);
  }

  useEffect(() => {
    if (!glow) return;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    const timeout = setTimeout(() => setGlow(false), 1600);
    return () => clearTimeout(timeout);
  }, [glow]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const onMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={setRefs}
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      style={{ perspective: 800 }}
      className="aspect-[2/3]"
    >
      <motion.div
        role="button"
        tabIndex={0}
        aria-label={`${book.title} by ${book.author}`}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setFlipped((f) => !f)}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative w-full h-full cursor-pointer rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-shadow duration-500 ${
          glow ? "ring-4 ring-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.55)]" : ""
        }`}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
        >
          <div className="absolute inset-0 rounded-lg overflow-hidden shadow-lg shadow-slate-900/20 [backface-visibility:hidden]">
            <BookCover book={book} className="w-full h-full" />
            <motion.div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{ background: glare }} />
          </div>
          <div className="absolute inset-0 rounded-lg p-3 md:p-4 flex flex-col bg-white/95 border border-white shadow-lg shadow-slate-900/20 [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden">
            {book.genre && (
              <span className="self-start text-[10px] uppercase tracking-wider font-semibold text-emerald-700 bg-emerald-50 rounded-full px-2 py-0.5">
                {GENRE_LABELS[book.genre]}
              </span>
            )}
            <h3 className="text-sm md:text-base font-bold text-slate-800 leading-tight mt-2">{book.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{book.author}</p>
            {book.rating !== undefined && <Stars rating={book.rating} size={12} className="mt-1" />}
            <p className="text-xs text-slate-600 leading-snug mt-2 line-clamp-4">{book.note}</p>
            <a
              href={goodreadsUrl(book)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-auto text-xs font-medium text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
            >
              Goodreads
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function FlipGridVariant({ books, picked }: LibraryVariantProps) {
  return (
    <div>
      <motion.div layout className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
        <AnimatePresence mode="popLayout">
          {books.map((book) => (
            <GridCard
              key={book.slug}
              book={book}
              picked={picked?.slug === book.slug ? picked.nonce : null}
            />
          ))}
        </AnimatePresence>
      </motion.div>
      <p className="text-center text-xs text-slate-500 mt-6">Click a cover to flip it.</p>
    </div>
  );
}
