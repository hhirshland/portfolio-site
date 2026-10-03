"use client";

import { motion } from "framer-motion";

const STAR_PATH =
  "M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z";

interface StarsProps {
  rating: number;
  size?: number;
  animate?: boolean;
  className?: string;
}

export default function Stars({ rating, size = 16, animate = false, className = "" }: StarsProps) {
  if (rating === 0) {
    return <span className={`text-xs italic opacity-70 ${className}`}>Not rated</span>;
  }

  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < rating;
        return (
          <motion.svg
            key={i}
            viewBox="0 0 20 20"
            width={size}
            height={size}
            initial={animate ? { scale: 0, rotate: -40, opacity: 0 } : false}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ delay: animate ? 0.25 + i * 0.07 : 0, type: "spring", stiffness: 420, damping: 16 }}
            aria-hidden
          >
            <path
              d={STAR_PATH}
              fill={filled ? "#f2b632" : "none"}
              stroke={filled ? "#d99a17" : "#cbd5e1"}
              strokeWidth={1.2}
              strokeLinejoin="round"
            />
          </motion.svg>
        );
      })}
    </span>
  );
}
