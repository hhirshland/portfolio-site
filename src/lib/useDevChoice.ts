"use client";

import { useCallback, useSyncExternalStore } from "react";

const isDev = process.env.NODE_ENV !== "production";

/**
 * A localStorage-backed choice that only takes effect in development, for comparing design variants.
 * Production always gets `defaultChoice`.
 */
export function useDevChoice<T extends string>(storageKey: string, choices: readonly T[], defaultChoice: T) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      window.addEventListener("storage", onChange);
      window.addEventListener(storageKey, onChange);
      return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener(storageKey, onChange);
      };
    },
    [storageKey]
  );

  const stored = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(storageKey),
    () => null
  );

  const choice = isDev && stored && (choices as readonly string[]).includes(stored) ? (stored as T) : defaultChoice;

  const setChoice = useCallback(
    (next: T) => {
      localStorage.setItem(storageKey, next);
      window.dispatchEvent(new Event(storageKey));
    },
    [storageKey]
  );

  return { choice, setChoice, isDev };
}
