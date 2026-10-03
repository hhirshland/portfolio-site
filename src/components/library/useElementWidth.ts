"use client";

import { useCallback, useState } from "react";

export function useElementWidth<T extends HTMLElement>(initialWidth = 0) {
  const [width, setWidth] = useState(initialWidth);

  const ref = useCallback((node: T | null) => {
    if (!node) return;
    setWidth(node.getBoundingClientRect().width);
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
}
