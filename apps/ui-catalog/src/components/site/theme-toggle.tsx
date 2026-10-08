'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteTheme } from './use-site-theme';

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const dark = useSiteTheme() === 'dark';
  return (
    <Button variant="ghost" size="icon" aria-label="Alternar tema" onClick={() => setTheme(dark ? 'light' : 'dark')}>
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}
