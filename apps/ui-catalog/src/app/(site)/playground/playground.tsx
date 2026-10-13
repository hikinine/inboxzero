'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Monitor, Moon, RotateCcw, Smartphone, Sun, Tablet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/site/copy-button';
import { useSiteTheme } from '@/components/site/use-site-theme';

const SOURCE = 'ui-catalog';
const VIEWPORTS = [
  { w: 0, label: 'Largura total', icon: Monitor },
  { w: 768, label: 'Tablet', icon: Tablet },
  { w: 375, label: 'Mobile', icon: Smartphone },
] as const;

export function Playground({ initialCode, slug, name, fit }: { initialCode: string; slug: string | null; name: string | null; fit: 'full' | 'center' }) {
  const siteTheme = useSiteTheme();
  const [code, setCode] = useState(initialCode);
  const [theme, setTheme] = useState<'light' | 'dark' | undefined>(undefined);
  const [viewport, setViewport] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const effective = theme ?? siteTheme;

  const send = useCallback((c: string) => {
    iframeRef.current?.contentWindow?.postMessage({ source: SOURCE, type: 'code', code: c }, '*');
  }, []);

  // Debounce do código → iframe.
  useEffect(() => {
    const t = setTimeout(() => {
      setError(null);
      send(code);
    }, 400);
    return () => clearTimeout(t);
  }, [code, send]);

  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage({ source: SOURCE, type: 'theme', theme: effective }, '*');
  }, [effective]);

  useEffect(() => {
    const on = (e: MessageEvent) => {
      if (e.data?.source !== SOURCE || e.source !== iframeRef.current?.contentWindow) return;
      if (e.data.type === 'ready') {
        send(code);
        iframeRef.current?.contentWindow?.postMessage({ source: SOURCE, type: 'theme', theme: effective }, '*');
      }
      if (e.data.type === 'error') setError(String(e.data.message));
    };
    window.addEventListener('message', on);
    return () => window.removeEventListener('message', on);
  }, [code, effective, send]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b px-4 py-2">
        {slug ? (
          <Button variant="ghost" size="sm" nativeButton={false} render={<Link href={`/item/${slug}`} />}>
            <ArrowLeft data-icon="inline-start" /> {name}
          </Button>
        ) : (
          <span className="px-2 text-sm font-medium">Playground</span>
        )}
        <span className="text-xs text-muted-foreground">Edite o TSX à esquerda — o preview recompila sozinho.</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="hidden items-center rounded-lg border p-0.5 sm:flex">
            {VIEWPORTS.map((v) => (
              <Button key={v.w} variant="ghost" size="icon-sm" aria-label={v.label} onClick={() => setViewport(v.w)} className={cn(viewport === v.w && 'bg-muted')}>
                <v.icon />
              </Button>
            ))}
          </div>
          <Button variant="outline" size="icon-sm" aria-label="Alternar tema" onClick={() => setTheme(effective === 'dark' ? 'light' : 'dark')}>
            {effective === 'dark' ? <Sun /> : <Moon />}
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Restaurar código original" onClick={() => setCode(initialCode)}>
            <RotateCcw />
          </Button>
          <CopyButton value={code} label="Copiar código" />
        </div>
      </div>
      <div className="grid min-h-0 flex-1 lg:grid-cols-2">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          wrap="off"
          aria-label="Código TSX"
          className="min-h-[40vh] w-full resize-none overflow-auto whitespace-pre border-b bg-muted/30 p-4 font-mono text-[12.5px] leading-relaxed outline-none lg:border-b-0 lg:border-r"
        />
        <div className="relative flex min-h-[50vh] flex-col overflow-auto bg-muted/20 p-3">
          {error && <div className="mb-2 whitespace-pre-wrap rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 font-mono text-xs text-destructive">{error}</div>}
          <div className="mx-auto h-full w-full transition-[width]" style={{ width: viewport ? viewport : '100%', maxWidth: '100%' }}>
            <iframe
              ref={iframeRef}
              src={`/preview/live?fit=${fit}&theme=${effective}`}
              title="Preview"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              className="h-full min-h-[60vh] w-full rounded-lg border bg-background"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
