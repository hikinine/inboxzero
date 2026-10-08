'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useFavorites } from './favorites';

export function FavoriteButton({ slug, className }: { slug: string; className?: string }) {
  const { has, toggle, ready } = useFavorites();
  const on = ready && has(slug);
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-pressed={on}
      aria-label={on ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      title={on ? 'Remover dos favoritos' : 'Favoritar'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      className={className}
    >
      <Heart className={cn('transition', on && 'fill-rose-500 text-rose-500')} />
    </Button>
  );
}
