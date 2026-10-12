'use client';

// Vitrine de um item na página de categoria (estilo shadcnstudio): toolbar com nome, viewport, tema,
// abas Preview/Código, copiar código/CLI, favorito e link — e o preview interativo em largura total.
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Code2, Eye, Monitor, Moon, RefreshCw, Smartphone, Sun, Tablet, Terminal } from 'lucide-react';
import type { ItemMeta } from '@/lib/items';
import { installCommand, isNew } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PreviewDetail } from './preview-frame';
import { CopyButton } from './copy-button';
import { FavoriteButton } from './favorite-button';
import { useSiteTheme } from './use-site-theme';

const VIEWPORTS = [
  { id: 0, label: 'Largura total', icon: Monitor },
  { id: 768, label: 'Tablet (768px)', icon: Tablet },
  { id: 375, label: 'Mobile (375px)', icon: Smartphone },
] as const;

export function ItemShowcase({ item, code, codeBlock, index }: { item: ItemMeta; code: string; codeBlock: React.ReactNode; index?: number }) {
  const siteTheme = useSiteTheme();
  const [viewport, setViewport] = useState<number>(0);
  const [theme, setTheme] = useState<'light' | 'dark' | undefined>(undefined);
  const [reloadKey, setReloadKey] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const effective = theme ?? siteTheme;
  const href = `/item/${item.slug}`;
  const scaled = item.kind === 'BLOCK' || item.kind === 'PAGE';

  return (
    <article id={item.slug} className="scroll-mt-28">
      <Tabs defaultValue="preview">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {typeof index === 'number' && <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>}
              <h2 className="text-lg font-semibold tracking-tight">
                <Link href={href} className="hover:underline">
                  {item.name}
                </Link>
              </h2>
              {isNew(item.createdAt) && <Badge className="bg-brand text-brand-foreground">Novo</Badge>}
              {item.featured && <Badge variant="secondary">Hot</Badge>}
            </div>
            {item.description && <p className="mt-0.5 max-w-2xl text-sm text-muted-foreground">{item.description}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <TabsList>
              <TabsTrigger value="preview">
                <Eye data-icon="inline-start" /> Preview
              </TabsTrigger>
              <TabsTrigger value="code">
                <Code2 data-icon="inline-start" /> Código
              </TabsTrigger>
            </TabsList>
            {scaled && (
              <div className="hidden items-center rounded-lg border p-0.5 md:flex">
                {VIEWPORTS.map((v) => (
                  <Tooltip key={v.id}>
                    <TooltipTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={v.label}
                          onClick={() => setViewport(v.id)}
                          className={cn(viewport === v.id && 'bg-muted text-foreground')}
                        />
                      }
                    >
                      <v.icon />
                    </TooltipTrigger>
                    <TooltipContent>{v.label}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            )}
            <Button variant="outline" size="icon-sm" aria-label="Alternar tema do preview" onClick={() => setTheme(effective === 'dark' ? 'light' : 'dark')}>
              {effective === 'dark' ? <Sun /> : <Moon />}
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Recarregar preview"
              onClick={() => {
                setError(null);
                setReloadKey((k) => k + 1);
              }}
            >
              <RefreshCw />
            </Button>
            <CopyButton value={installCommand(item.slug)} label="CLI" variant="outline" className="h-7 text-xs" />
            <CopyButton value={code} label="Código" variant="outline" className="h-7 text-xs" />
            <FavoriteButton slug={item.slug} />
            <Button variant="ghost" size="icon-sm" aria-label="Abrir página do item" nativeButton={false} render={<Link href={href} />}>
              <ArrowUpRight />
            </Button>
          </div>
        </div>

        <TabsContent value="preview" className="pt-3">
          {error && <div className="mb-3 whitespace-pre-wrap rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 font-mono text-xs text-destructive">{error}</div>}
          <PreviewDetail slug={item.slug} kind={item.kind} theme={effective} viewport={viewport} reloadKey={reloadKey} minHeight={item.previewHeight} onError={setError} lazy />
        </TabsContent>
        <TabsContent value="code" className="pt-3">
          <div className="mb-2 flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 font-mono text-xs text-muted-foreground">
            <Terminal className="size-3.5" />
            <span className="truncate">{installCommand(item.slug)}</span>
          </div>
          {codeBlock}
        </TabsContent>
      </Tabs>
    </article>
  );
}
