'use client';

// Renderiza os filhos só depois de montar no cliente — evita mismatch de hidratação em peças que
// calculam estilos no cliente (ilustrações com motion) quando usadas fora do iframe de preview.
import { useEffect, useState } from 'react';

export function ClientOnly({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <>{mounted ? children : fallback}</>;
}
