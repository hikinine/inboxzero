'use client';

// Barra de anúncio no topo (estilo shadcnstudio): texto + link, dispensável (lembra no localStorage por mensagem).
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';

const KEY = 'ui-catalog:announcement-dismissed';

export function AnnouncementBar({ id, emoji = '🎉', text, href, cta = 'Ver novidades' }: { id: string; emoji?: string; text: string; href: string; cta?: string }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === id) setHidden(true);
    } catch {}
  }, [id]);
  if (hidden) return null;
  return (
    <div className="relative z-50 border-b bg-muted/60 text-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-2 px-10 py-1.5 text-center">
        <span aria-hidden>{emoji}</span>
        <span>
          <strong className="font-medium">Novo:</strong> {text}
        </span>
        <Link href={href} className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-0.5 text-xs font-medium hover:bg-muted">
          {cta} <ArrowRight className="size-3" />
        </Link>
      </div>
      <button
        type="button"
        aria-label="Fechar aviso"
        onClick={() => {
          try {
            localStorage.setItem(KEY, id);
          } catch {}
          setHidden(true);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
