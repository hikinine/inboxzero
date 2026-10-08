'use client';

import { installCommand } from '@/lib/site';
import { CopyButton } from './copy-button';

// Comando `npx shadcn add <registry url>` com botão de copiar.
export function InstallCommand({ slug, className = '' }: { slug: string; className?: string }) {
  const cmd = installCommand(slug);
  return (
    <div className={`flex items-center gap-2 rounded-lg border bg-muted/40 pl-3 pr-1.5 py-1.5 ${className}`}>
      <span className="text-muted-foreground select-none font-mono text-xs">$</span>
      <code className="min-w-0 flex-1 truncate font-mono text-xs">{cmd}</code>
      <CopyButton value={cmd} iconOnly variant="ghost" />
    </div>
  );
}
