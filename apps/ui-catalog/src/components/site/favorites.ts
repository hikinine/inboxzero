'use client';

import { useCallback, useEffect, useState } from 'react';

// Favoritos por navegador (localStorage) — sem conta, igual ao shadcnstudio.
const KEY = 'ui-catalog:favorites';
const EVT = 'ui-catalog:favorites-change';

export function readFavorites(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function writeFavorites(slugs: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(slugs));
  } catch {
    /* storage indisponível */
  }
  window.dispatchEvent(new Event(EVT));
}

export function useFavorites() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setSlugs(readFavorites());
    sync();
    setReady(true);
    window.addEventListener(EVT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const toggle = useCallback((slug: string) => {
    const cur = readFavorites();
    writeFavorites(cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]);
  }, []);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  return { slugs, has, toggle, count: slugs.length, ready };
}
