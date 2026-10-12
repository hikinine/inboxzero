import Link from 'next/link';
import { Search } from 'lucide-react';
import { KINDS } from '@/lib/site';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NotFound() {
  return (
    <div className="relative mx-auto flex max-w-xl flex-col items-center gap-5 px-6 py-28 text-center">
      <div className="bg-grid absolute inset-x-0 top-0 -z-10 h-80" />
      <p className="font-mono text-7xl font-semibold tracking-tighter text-muted-foreground/40">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">Isso não está no catálogo</h1>
      <p className="text-sm text-muted-foreground">O item ou página que você procura não existe, mudou de categoria ou foi removido. Tente buscar:</p>
      <form action="/search" className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input name="q" placeholder="hero, pricing, kanban, beam…" className="h-10 pl-9" aria-label="Buscar no catálogo" />
      </form>
      <div className="flex flex-wrap justify-center gap-2">
        {KINDS.map((k) => (
          <Button key={k.kind} variant="outline" size="sm" nativeButton={false} render={<Link href={`/${k.path}`} />}>
            {k.label}
          </Button>
        ))}
        <Button size="sm" nativeButton={false} render={<Link href="/" />}>
          Voltar ao início
        </Button>
      </div>
    </div>
  );
}
