'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export type SiteTheme = 'light' | 'dark';

// Tema resolvido do site, SEM mismatch de hidratação: no servidor e no primeiro render do cliente
// devolve 'dark' (o default), e só depois de montar passa a refletir o next-themes.
export function useSiteTheme(override?: SiteTheme): SiteTheme {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (override) return override;
  if (!mounted) return 'dark';
  return resolvedTheme === 'light' ? 'light' : 'dark';
}
