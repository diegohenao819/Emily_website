"use client";

import { useSyncExternalStore } from "react";

/** One paper flower Emily earned by finishing a game. Saved only on this device. */
export type EarnedFlower = {
  kind: number;
  seed: number;
  from: string;
  at: number;
};

const KEY = "emily-garden-v1";
const EMPTY: EarnedFlower[] = [];
const listeners = new Set<() => void>();
let cache: EarnedFlower[] | null = null;

function read(): EarnedFlower[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as EarnedFlower[]) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next: EarnedFlower[]) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private mode or full storage: the garden still grows for this visit.
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useGarden() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function earnFlower(from: string, kindCount: number): EarnedFlower {
  const flower: EarnedFlower = {
    kind: Math.floor(Math.random() * kindCount),
    seed: Math.floor(Math.random() * 1000) + 1,
    from,
    at: Date.now(),
  };
  write([...read(), flower]);
  return flower;
}

export function clearGarden() {
  write([]);
}
