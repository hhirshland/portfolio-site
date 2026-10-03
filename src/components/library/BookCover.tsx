"use client";

import { useState } from "react";
import type { Book } from "@/data/books";

interface BookCoverProps {
  book: Book;
  className?: string;
  style?: React.CSSProperties;
}

export default function BookCover({ book, className = "", style }: BookCoverProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col justify-between p-3 font-[family-name:var(--font-libre-baskerville)] ${className}`}
        style={{ background: book.spineColor, color: book.spineText, ...style }}
      >
        <span className="text-sm font-bold leading-tight">{book.title}</span>
        <span className="text-[10px] uppercase tracking-wider opacity-80">{book.author}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={book.cover}
      alt={`${book.title} by ${book.author}`}
      className={`object-cover ${className}`}
      style={style}
      draggable={false}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
