"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { GENRE_LABELS } from "@/data/books";
import BookCover from "./BookCover";
import Stars from "./Stars";
import { useElementWidth } from "./useElementWidth";
import type { LibraryVariantProps } from "./types";

export default function CoverFlowVariant({ books, picked }: LibraryVariantProps) {
  const [index, setIndex] = useState(Math.floor(books.length / 2));
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const justDragged = useRef(false);
  const { ref, width } = useElementWidth<HTMLDivElement>(800);

  const coverW = width < 500 ? 130 : 180;
  const coverH = coverW * 1.5;
  const sideGap = coverW * 0.8;
  const stackGap = coverW * 0.3;

  const lastIndex = Math.max(0, books.length - 1);
  const current = Math.min(index, lastIndex);
  const position = current + dragOffset;
  const book = books[current];

  const [seenPick, setSeenPick] = useState(picked?.nonce);
  if (picked && picked.nonce !== seenPick) {
    setSeenPick(picked.nonce);
    const target = books.findIndex((b) => b.slug === picked.slug);
    if (target !== -1) setIndex(target);
  }

  const go = (next: number) => setIndex(Math.max(0, Math.min(lastIndex, next)));

  const onPan = (_: PointerEvent, info: PanInfo) => {
    setIsDragging(true);
    setDragOffset(-info.offset.x / sideGap);
  };

  const onPanEnd = (_: PointerEvent, info: PanInfo) => {
    const projected = position - info.velocity.x / (sideGap * 4);
    setIsDragging(false);
    setDragOffset(0);
    go(Math.round(projected));
    justDragged.current = true;
    setTimeout(() => (justDragged.current = false), 50);
  };

  return (
    <div>
      <motion.div
        ref={ref}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(current - 1);
          if (e.key === "ArrowRight") go(current + 1);
        }}
        onPan={onPan}
        onPanEnd={onPanEnd}
        className="relative overflow-hidden select-none outline-none cursor-grab active:cursor-grabbing rounded-xl focus-visible:ring-2 focus-visible:ring-emerald-500/60"
        style={{ height: coverH * 1.45, perspective: 1100, touchAction: "pan-y" }}
      >
        {books.map((b, i) => {
          const d = i - position;
          const abs = Math.abs(d);
          const sign = Math.sign(d);
          const x = sign * (abs < 1 ? abs * sideGap : sideGap + (abs - 1) * stackGap);
          const rotateY = -sign * Math.min(abs, 1) * 58;
          const z = -Math.min(abs, 1) * 140 - abs * 8;

          return (
            <motion.button
              key={b.slug}
              onClick={() => !justDragged.current && go(i)}
              aria-label={`${b.title} by ${b.author}`}
              className="absolute top-6 left-1/2"
              style={{
                width: coverW,
                height: coverH,
                marginLeft: -coverW / 2,
                zIndex: 100 - Math.round(abs * 10),
                transformStyle: "preserve-3d",
              }}
              initial={false}
              animate={{ x, rotateY, z, opacity: abs > 6 ? 0 : 1 }}
              transition={isDragging ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30 }}
            >
              <BookCover
                book={b}
                className="w-full h-full rounded-md shadow-xl shadow-slate-900/25"
                style={{
                  WebkitBoxReflect:
                    "below 6px linear-gradient(transparent 62%, rgba(255,255,255,0.35))",
                }}
              />
            </motion.button>
          );
        })}
      </motion.div>

      <div className="flex items-center justify-center gap-4 mt-2">
        <button
          onClick={() => go(current - 1)}
          disabled={current === 0}
          aria-label="Previous book"
          className="w-9 h-9 rounded-full bg-white/70 border border-white/80 text-slate-600 hover:bg-white hover:text-slate-800 disabled:opacity-40 transition-all"
        >
          &larr;
        </button>
        <span className="text-xs text-slate-500 tabular-nums w-14 text-center">
          {books.length ? current + 1 : 0} / {books.length}
        </span>
        <button
          onClick={() => go(current + 1)}
          disabled={current === lastIndex}
          aria-label="Next book"
          className="w-9 h-9 rounded-full bg-white/70 border border-white/80 text-slate-600 hover:bg-white hover:text-slate-800 disabled:opacity-40 transition-all"
        >
          &rarr;
        </button>
      </div>

      <div className="min-h-[120px] mt-6 text-center">
        <AnimatePresence mode="wait">
          {book && (
            <motion.div
              key={book.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {book.genre && (
                <span className="text-xs uppercase tracking-wider text-emerald-600 font-semibold">
                  {GENRE_LABELS[book.genre]}
                </span>
              )}
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{book.title}</h3>
              <p className="text-slate-500">{book.author}</p>
              {book.rating !== undefined && <Stars rating={book.rating} className="mt-2" />}
              <p className="text-slate-600 mt-3 max-w-md mx-auto leading-relaxed">{book.note}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
