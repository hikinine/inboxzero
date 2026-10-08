import type { Metadata } from 'next';
import { FavoritesBrowser } from './favorites-browser';

export const metadata: Metadata = { title: 'Favoritos' };

export default function FavoritesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Favoritos</h1>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">Salvos neste navegador (localStorage). Selecione vários para copiar um prompt ou baixar um .zip.</p>
      <FavoritesBrowser />
    </div>
  );
}
