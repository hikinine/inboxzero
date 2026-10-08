'use client';

import { useState } from 'react';
import { Code2, ExternalLink, Eye, Monitor, Moon, RefreshCw, Smartphone, Sun, Tablet } from 'lucide-react';
import type { ItemKind } from '@prisma/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PreviewDetail } from '@/components/site/preview-frame';
import { cn } from '@/lib/utils';
import { useSiteTheme } from '@/components/site/use-site-theme';

const VIEWPORTS = [
  { id: 0, label: 'Largura total', icon: Monitor },
  { id: 1024, label: 'Desktop (1024px)', icon: Monitor },
  { id: 768, label: 'Tablet (768px)', icon: Tablet },
  { id: 375, label: 'Mobile (375px)', icon: Smartphone },
] as const;

// Abas Preview/Código com toolbar: viewport, tema do preview (independente do site), recarregar, abrir.
export function ItemPreview({ slug, kind, previewHeight, codeBlock }: { slug: string; kind: ItemKind; previewHeight: number | null; codeBlock: React.ReactNode }) {
  const siteTheme = useSiteTheme();
  const [viewport, setViewport] = useState<number>(0);
  const [theme, setTheme] = useState<'light' | 'dark' | undefined>(undefined);
  const [reloadKey, setReloadKey] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const effective = theme ?? siteTheme;

  return (
    <Tabs defaultValue="preview">
      <div className="flex flex-wrap items-center gap-2">
        <TabsList>
          <TabsTrigger value="preview">
            <Eye data-icon="inline-start" /> Preview
          </TabsTrigger>
          <TabsTrigger value="code">
            <Code2 data-icon="inline-start" /> Código
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-1">
          <div className="hidden items-center rounded-lg border p-0.5 sm:flex">
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
          <Button variant="outline" size="icon-sm" aria-label="Alternar tema do preview" onClick={() => setTheme(effective === 'dark' ? 'light' : 'dark')}>
            {effective === 'dark' ? <Sun /> : <Moon />}
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Recarregar preview" onClick={() => { setError(null); setReloadKey((k) => k + 1); }}>
            <RefreshCw />
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Abrir em nova aba" nativeButton={false} render={<a href={`/preview/${slug}?theme=${effective}`} target="_blank" rel="noreferrer" />}>
            <ExternalLink />
          </Button>
        </div>
      </div>

      <TabsContent value="preview" className="pt-3">
        {error && (
          <div className="mb-3 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 font-mono text-xs text-destructive whitespace-pre-wrap">{error}</div>
        )}
        <PreviewDetail slug={slug} kind={kind} theme={effective} viewport={viewport} reloadKey={reloadKey} minHeight={previewHeight} onError={setError} />
      </TabsContent>
      <TabsContent value="code" className="pt-3">
        {codeBlock}
      </TabsContent>
    </Tabs>
  );
}
