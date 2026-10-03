"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GENRE_LABELS, goodreadsUrl, type Book } from "@/data/books";
import BookCover from "./BookCover";
import Stars from "./Stars";
import { hashString } from "./random";
import type { LibraryVariantProps } from "./types";
import { useElementWidth } from "./useElementWidth";

const WATERCOLOR_FILTER = "url(#library-watercolor)";
const SPINE_GAP = 3;

const PAPER_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\"), " +
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.035' numOctaves='2' seed='7'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 -0.05'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23w)'/%3E%3C/svg%3E\")";

function softenedColor(color: string) {
  return `color-mix(in oklab, ${color} 74%, #eef4fb)`;
}

function spineSize(book: Book) {
  const width = Math.min(56, Math.max(30, Math.round(book.pages / 11)));
  const height = 168 + (hashString(book.slug) % 6) * 8;
  return { width, height };
}

/** Splits books into shelf rows of roughly equal width. Narrow screens cap at 3 rows and scroll sideways. */
function splitIntoRows(books: Book[], containerWidth: number): Book[][] {
  const available = Math.max(240, containerWidth - 40);
  const widths = books.map((b) => spineSize(b).width + SPINE_GAP);
  const total = widths.reduce((sum, w) => sum + w, 0);
  const needed = Math.max(1, Math.ceil(total / available));
  const rowCount = containerWidth < 500 ? Math.min(3, needed) : needed;
  const target = total / rowCount;

  const rows: Book[][] = [[]];
  let filled = 0;
  books.forEach((book, i) => {
    const boundary = target * rows.length;
    if (rows.length < rowCount && rows[rows.length - 1].length > 0 && filled + widths[i] / 2 > boundary) {
      rows.push([]);
    }
    rows[rows.length - 1].push(book);
    filled += widths[i];
  });
  return rows;
}

function WatercolorFilter() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <filter id="library-watercolor" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4" />
        <feDisplacementMap in="SourceGraphic" scale="4" />
      </filter>
    </svg>
  );
}

function Spine({
  book,
  highlighted,
  onOpen,
  ref,
}: {
  book: Book;
  highlighted: boolean;
  onOpen: () => void;
  ref?: React.Ref<HTMLButtonElement>;
}) {
  const { width, height } = spineSize(book);

  return (
    <motion.button
      ref={ref}
      layoutId={`spine-${book.slug}`}
      onClick={onOpen}
      aria-label={`${book.title} by ${book.author}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: highlighted ? -18 : 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -16, rotate: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="relative flex-shrink-0 cursor-pointer origin-bottom outline-none rounded-[4px] drop-shadow-[0_5px_6px_rgba(40,70,100,0.22)] focus-visible:ring-2 focus-visible:ring-sky-300"
      style={{ width, height, color: book.spineText }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-[4px] overflow-hidden"
        style={{ background: softenedColor(book.spineColor), filter: WATERCOLOR_FILTER }}
      >
        <span
          className="absolute inset-0 mix-blend-multiply opacity-70"
          style={{ backgroundImage: PAPER_TEXTURE, backgroundSize: "160px, 240px" }}
        />
        <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.35)_0%,transparent_28%,transparent_70%,rgba(30,50,80,0.18)_100%)]" />
        <span className="absolute inset-0 shadow-[inset_0_0_6px_rgba(30,45,70,0.25)] rounded-[4px]" />
      </span>
      <span className="absolute inset-x-1.5 top-4 h-px opacity-40" style={{ background: book.spineText }} />
      <span className="absolute inset-x-1.5 bottom-3 h-px opacity-40" style={{ background: book.spineText }} />
      <span className="absolute inset-x-0 top-7 bottom-6 flex items-center justify-center overflow-hidden font-[family-name:var(--font-libre-baskerville)] text-[11px] font-bold tracking-wide">
        <span className="block max-h-full overflow-hidden text-ellipsis whitespace-nowrap [writing-mode:vertical-rl]">
          {book.title}
        </span>
      </span>
      {highlighted && (
        <motion.span
          layoutId="shelf-sweep"
          className="absolute -inset-1 rounded-md ring-2 ring-white shadow-[0_0_20px_rgba(255,236,190,0.95)]"
        />
      )}
    </motion.button>
  );
}

function Shelf() {
  return (
    <div aria-hidden className="relative z-10 -mt-1.5 mx-1">
      <div className="relative h-5 rounded-[3px] overflow-hidden" style={{ filter: WATERCOLOR_FILTER }}>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#a87652_0%,#8a5b3c_55%,#6e4630_100%)]" />
        <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_38px,rgba(60,35,20,0.5)_39px,transparent_41px)]" />
        <div
          className="absolute inset-0 mix-blend-multiply opacity-70"
          style={{ backgroundImage: PAPER_TEXTURE, backgroundSize: "160px, 240px" }}
        />
      </div>
      <div className="absolute top-full mt-1 inset-x-6 h-4 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(90,130,170,0.25),transparent_70%)]" />
    </div>
  );
}

function BookDetail({ book, onClose }: { book: Book; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const eyebrow = [book.genre && GENRE_LABELS[book.genre], book.series].filter(Boolean).join(" · ");

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-sky-950/25 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        layoutId={`spine-${book.slug}`}
        className="relative w-full max-w-lg rounded-2xl shadow-2xl shadow-sky-950/30"
        style={{ background: softenedColor(book.spineColor) }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.15 } }}
          exit={{ opacity: 0, transition: { duration: 0.05 } }}
          className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-white/90 max-h-[85vh] overflow-y-auto"
        >
          <BookCover book={book} className="w-32 sm:w-36 aspect-[2/3] rounded-md shadow-lg self-center sm:self-start flex-shrink-0" />
          <div className="flex flex-col">
            {eyebrow && (
              <span className="text-xs uppercase tracking-wider text-sky-700/80 font-semibold mb-2">{eyebrow}</span>
            )}
            <h3 className="text-2xl font-bold text-slate-800 leading-tight">{book.title}</h3>
            {book.subtitle && <p className="text-sm text-slate-500 mt-1 leading-snug">{book.subtitle}</p>}
            <p className="text-slate-500 mt-1">{book.author}</p>
            {book.rating !== undefined && (
              <div className="mt-3 flex items-center gap-2">
                <Stars rating={book.rating} size={18} animate />
                {book.rating > 0 && <span className="text-xs text-slate-500">my rating</span>}
              </div>
            )}
            <p className="text-slate-700 mt-4 leading-relaxed">{book.note}</p>
            <div className="mt-auto pt-6 flex items-center gap-4">
              <a
                href={goodreadsUrl(book)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
              >
                View on Goodreads
              </a>
              <button onClick={onClose} className="ml-auto text-sm text-slate-500 hover:text-slate-800">
                Put it back
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function BookshelfVariant({ books, picked }: LibraryVariantProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [sweepIndex, setSweepIndex] = useState<number | null>(null);
  const { ref, width } = useElementWidth<HTMLDivElement>(800);

  const rows = useMemo(() => splitIntoRows(books, width), [books, width]);
  const indexBySlug = useMemo(() => new Map(books.map((b, i) => [b.slug, i])), [books]);

  useEffect(() => {
    if (!picked) return;
    const target = books.findIndex((b) => b.slug === picked.slug);
    if (target === -1) return;

    setOpenSlug(null);
    const totalSteps = books.length + target;
    const stepMs = Math.max(18, Math.min(55, 2400 / totalSteps));
    let step = 0;
    const interval = setInterval(() => {
      if (step > totalSteps) {
        clearInterval(interval);
        setTimeout(() => {
          setSweepIndex(null);
          setOpenSlug(picked.slug);
        }, 350);
        return;
      }
      setSweepIndex(step % books.length);
      step++;
    }, stepMs);
    return () => clearInterval(interval);
  }, [picked, books]);

  const openBook = books.find((b) => b.slug === openSlug);

  return (
    <div ref={ref}>
      <WatercolorFilter />
      <div className="flex flex-col">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="relative overflow-x-auto scrollbar-hide pt-8 pb-6 -mx-2 px-2">
            <div className="w-max min-w-full">
              <div className="flex items-end justify-center px-2 h-[226px]" style={{ gap: SPINE_GAP }}>
                <AnimatePresence mode="popLayout">
                  {row.map((book) =>
                    book.slug === openSlug ? (
                      <div key={book.slug} style={{ width: spineSize(book).width }} className="flex-shrink-0" />
                    ) : (
                      <Spine
                        key={book.slug}
                        book={book}
                        highlighted={sweepIndex === indexBySlug.get(book.slug)}
                        onOpen={() => setOpenSlug(book.slug)}
                      />
                    )
                  )}
                </AnimatePresence>
              </div>
              <Shelf />
            </div>
          </div>
        ))}
      </div>
      {typeof document !== "undefined" && (
        <AnimatePresence>
          {openBook && <BookDetail key={openBook.slug} book={openBook} onClose={() => setOpenSlug(null)} />}
        </AnimatePresence>
      )}
    </div>
  );
}
