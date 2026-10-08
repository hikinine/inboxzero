import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-6 py-32 text-center">
      <p className="font-mono text-xs text-muted-foreground">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">Isso não está no catálogo</h1>
      <p className="text-sm text-muted-foreground">O item ou página que você procura não existe (ou foi removido).</p>
      <Button nativeButton={false} render={<Link href="/" />}>Voltar ao início</Button>
    </div>
  );
}
