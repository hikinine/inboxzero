import type { Metadata } from 'next';
import { FavoritesBrowser } from './favorites-browser';

// Dinâmica: depende do banco (sidebar de componentes, aviso do topo); no build do CI não há banco.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = { title: 'Favoritos' };

export default function FavoritesPage() {
  return (
    <div className="w-full px-6 lg:px-10 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Favoritos</h1>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">Salvos neste navegador (localStorage). Selecione vários para copiar um prompt ou baixar um .zip.</p>
      <FavoritesBrowser />
    </div>
  );
}
