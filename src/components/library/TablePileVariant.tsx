"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GENRE_LABELS, type Book } from "@/data/books";
import BookCover from "./BookCover";
import Stars from "./Stars";
import { seededRandom } from "./random";
import { useElementWidth } from "./useElementWidth";
import type { LibraryVariantProps } from "./types";

const SCATTER_HEIGHT = 460;
const GAP = 16;

function PileBook({
  book,
  x,
  y,
  rotate,
  width,
  zIndex,
  flipped,
  lifted,
  constraints,
  onGrab,
  onFlip,
}: {
  book: Book;
  x: number;
  y: number;
  rotate: number;
  width: number;
  zIndex: number;
  flipped: boolean;
  lifted: boolean;
  constraints: { left: number; top: number; right: number; bottom: number };
  onGrab: () => void;
  onFlip: () => void;
}) {
  const dragged = useRef(false);
  const pointerType = useRef("mouse");

  return (
    <motion.div
      drag
      dragConstraints={constraints}
      dragElastic={0.1}
      dragTransition={{ power: 0.15, timeConstant: 180 }}
      onPointerDown={(e) => {
        pointerType.current = e.pointerType;
        dragged.current = false;
        onGrab();
      }}
      onDragStart={() => (dragged.current = true)}
      onClick={() => pointerType.current !== "mouse" && !dragged.current && onFlip()}
      onDoubleClick={onFlip}
      initial={{ opacity: 0, scale: 0.6, x, y, rotate }}
      animate={{ opacity: 1, scale: lifted ? 1.12 : 1, x, y, rotate }}
      exit={{ opacity: 0, scale: 0.6 }}
      whileHover={{ scale: lifted ? 1.12 : 1.04 }}
      whileDrag={{ scale: 1.1, rotate: 0, cursor: "grabbing" }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className="absolute left-0 top-0 cursor-grab touch-none"
      style={{ width, height: width * 1.5, zIndex, perspective: 900 }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      >
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <BookCover
            book={book}
            className="w-full h-full rounded-md shadow-[0_10px_24px_-6px_rgba(15,23,42,0.45)] pointer-events-none"
          />
        </div>
        <div
          className="absolute inset-0 rounded-md p-3 flex flex-col [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_10px_24px_-6px_rgba(15,23,42,0.45)] overflow-hidden"
          style={{ background: book.spineColor, color: book.spineText }}
        >
          {book.genre && (
            <span className="text-[9px] uppercase tracking-wider opacity-80">{GENRE_LABELS[book.genre]}</span>
          )}
          <span className="font-[family-name:var(--font-libre-baskerville)] font-bold text-xs leading-tight mt-1">
            {book.title}
          </span>
          {book.rating !== undefined && <Stars rating={book.rating} size={11} className="mt-1" />}
          <span className="text-[11px] leading-snug mt-2 opacity-90 line-clamp-6">{book.note}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TablePileVariant({ books, picked }: LibraryVariantProps) {
  const { ref, width } = useElementWidth<HTMLDivElement>();
  const [tidy, setTidy] = useState(false);
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [order, setOrder] = useState<string[]>([]);
  const [liftedSlug, setLiftedSlug] = useState<string | null>(null);

  const cardW = width < 500 ? 84 : 112;
  const cardH = cardW * 1.5;
  const cols = Math.max(1, Math.floor((width + GAP) / (cardW + GAP)));
  const rows = Math.ceil(books.length / cols);
  const tidyHeight = rows * (cardH + GAP) - GAP;
  const gridOffset = (width - (cols * (cardW + GAP) - GAP)) / 2;
  const scatterHeight = width < 500 ? 520 : SCATTER_HEIGHT;
  const height = tidy ? tidyHeight : scatterHeight;

  const bringToTop = (slug: string) =>
    setOrder((prev) => [...prev.filter((s) => s !== slug), slug]);

  const toggleFlip = (slug: string) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  const [seenPick, setSeenPick] = useState(picked?.nonce);
  if (picked && picked.nonce !== seenPick) {
    setSeenPick(picked.nonce);
    bringToTop(picked.slug);
    setFlipped((prev) => new Set(prev).add(picked.slug));
    setLiftedSlug(picked.slug);
  }

  useEffect(() => {
    if (!liftedSlug) return;
    const timeout = setTimeout(() => setLiftedSlug(null), 1200);
    return () => clearTimeout(timeout);
  }, [liftedSlug]);

  return (
    <div>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setTidy((t) => !t)}
          className="px-4 py-1.5 text-sm font-medium rounded-md bg-white/70 border border-white/80 text-slate-700 hover:bg-white shadow-sm transition-all"
        >
          {tidy ? "Mess it up" : "Tidy up"}
        </button>
      </div>

      <motion.div
        ref={ref}
        initial={false}
        animate={{ height }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className="relative rounded-xl"
      >
        {width > 0 && (
          <AnimatePresence>
            {books.map((book, i) => {
              const rand = seededRandom(book.slug);
              const scatterX = rand() * (width - cardW);
              const scatterY = rand() * (scatterHeight - cardH);
              const scatterRotate = (rand() - 0.5) * 30;
              const col = i % cols;
              const row = Math.floor(i / cols);
              const orderIndex = order.indexOf(book.slug);

              return (
                <PileBook
                  key={book.slug}
                  book={book}
                  width={cardW}
                  x={tidy ? gridOffset + col * (cardW + GAP) : scatterX}
                  y={tidy ? row * (cardH + GAP) : scatterY}
                  rotate={tidy ? 0 : scatterRotate}
                  zIndex={orderIndex === -1 ? i + 1 : books.length + orderIndex + 1}
                  flipped={flipped.has(book.slug)}
                  lifted={liftedSlug === book.slug}
                  constraints={{ left: 0, top: 0, right: width - cardW, bottom: height - cardH }}
                  onGrab={() => bringToTop(book.slug)}
                  onFlip={() => toggleFlip(book.slug)}
                />
              );
            })}
          </AnimatePresence>
        )}
      </motion.div>
      <p className="text-center text-xs text-slate-500 mt-6">
        Drag books around. Double-click (or tap) one to flip it over.
      </p>
    </div>
  );
}
