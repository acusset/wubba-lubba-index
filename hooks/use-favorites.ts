"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "rickandmorty:favorites";
const FAVORITES_EVENT = "rickandmorty:favorites-changed";
const SERVER_SNAPSHOT: number[] = [];

function readFavorites(): number[] {
  if (typeof window === "undefined") return SERVER_SNAPSHOT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

let cachedIds = readFavorites();

function writeFavorites(ids: number[]) {
  cachedIds = ids;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent(FAVORITES_EVENT));
}

function subscribe(callback: () => void) {
  const handleChange = () => {
    cachedIds = readFavorites();
    callback();
  };
  window.addEventListener(FAVORITES_EVENT, handleChange);
  window.addEventListener("storage", handleChange);
  return () => {
    window.removeEventListener(FAVORITES_EVENT, handleChange);
    window.removeEventListener("storage", handleChange);
  };
}

function getSnapshot() {
  return cachedIds;
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

/** Client-only favorites state, backed by localStorage and shared across components. */
export function useFavorites() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isFavorite = useCallback((id: number) => ids.includes(id), [ids]);

  const toggleFavorite = useCallback((id: number) => {
    const current = readFavorites();
    const next = current.includes(id)
      ? current.filter((existing) => existing !== id)
      : [...current, id];
    writeFavorites(next);
  }, []);

  return { ids, isFavorite, toggleFavorite };
}
