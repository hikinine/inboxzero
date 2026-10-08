'use client';

// Iframe do sandbox de preview. Dois modos:
//  - card: thumbnail no grid. Blocos/páginas renderizam num viewport desktop (1280px) escalado para
//    caber no card; componentes/ilustrações em tamanho natural, centralizados. Monta só quando
//    entra na viewport (IntersectionObserver). Sem interação (pointer-events: none).
//  - detail: interativo, com largura de viewport escolhida (mobile/tablet/desktop) e altura que
//    acompanha o conteúdo (mensagem `size` do sandbox).
import { useEffect, useRef, useState } from 'react';
import type { ItemKind } from '@prisma/client';
import { kindMeta } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useSiteTheme, type SiteTheme as Theme } from './use-site-theme';

const SOURCE = 'ui-catalog';

// Envia o tema atual ao iframe (ao mudar e quando ele avisa que está pronto).
function useThemeSync(iframeRef: React.RefObject<HTMLIFrameElement | null>, theme: Theme) {
  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage({ source: SOURCE, type: 'theme', theme }, '*');
  }, [iframeRef, theme]);
  useEffect(() => {
    const on = (e: MessageEvent) => {
      if (e.data?.source !== SOURCE || e.data?.type !== 'ready') return;
      if (e.source === iframeRef.current?.contentWindow) {
        iframeRef.current?.contentWindow?.postMessage({ source: SOURCE, type: 'theme', theme }, '*');
      }
    };
    window.addEventListener('message', on);
    return () => window.removeEventListener('message', on);
  }, [iframeRef, theme]);
}

export function PreviewCard({ slug, kind, theme: override, className }: { slug: string; kind: ItemKind; theme?: Theme; className?: string }) {
  const meta = kindMeta(kind);
  const scaled = meta.previewWidth > 0;
  const theme = useSiteTheme(override);
  const ref = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const [loaded, setLoaded] = useState(false);
  // O tema inicial vai na URL; mudanças posteriores vão por postMessage (sem recarregar).
  const [initialTheme] = useState(theme);
  useThemeSync(iframeRef, theme);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    const ro = new ResizeObserver((entries) => setWidth(entries[0]?.contentRect.width ?? 0));
    ro.observe(el);
    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  const scale = scaled && width ? width / meta.previewWidth : 1;
  const src = `/preview/${slug}?theme=${initialTheme}&fit=${scaled ? 'full' : 'center'}`;

  return (
    <div ref={ref} className={cn('relative w-full overflow-hidden bg-background', className)} style={{ aspectRatio: meta.cardAspect }}>
      {(!visible || !loaded) && <Skeleton className="absolute inset-0 rounded-none" />}
      {visible && width > 0 && (
        <iframe
          ref={iframeRef}
          src={src}
          title={slug}
          loading="lazy"
          tabIndex={-1}
          aria-hidden
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setLoaded(true)}
          className="pointer-events-none absolute left-0 top-0 border-0 bg-background"
          style={
            scaled
              ? { width: meta.previewWidth, height: meta.previewWidth / meta.cardAspect, transform: `scale(${scale})`, transformOrigin: 'top left' }
              : { width: '100%', height: '100%' }
          }
        />
      )}
    </div>
  );
}

export function PreviewDetail({
  slug,
  kind,
  theme: override,
  viewport = 0,
  reloadKey = 0,
  minHeight,
  onError,
  className,
}: {
  slug: string;
  kind: ItemKind;
  theme?: Theme;
  viewport?: number; // 0 = 100%
  reloadKey?: number;
  minHeight?: number | null;
  onError?: (message: string) => void;
  className?: string;
}) {
  const fit = kind === 'BLOCK' || kind === 'PAGE' ? 'full' : 'center';
  const theme = useSiteTheme(override);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const base = minHeight ?? (fit === 'center' ? 420 : 560);
  const [height, setHeight] = useState<number>(base);
  const [ready, setReady] = useState(false);
  const [initialTheme] = useState(theme);
  useThemeSync(iframeRef, theme);

  useEffect(() => {
    const on = (e: MessageEvent) => {
      if (e.data?.source !== SOURCE || e.source !== iframeRef.current?.contentWindow) return;
      if (e.data.type === 'ready') setReady(true);
      if (e.data.type === 'size' && fit === 'full') setHeight(Math.max(240, Number(e.data.height) || base));
      if (e.data.type === 'error') onError?.(String(e.data.message));
    };
    window.addEventListener('message', on);
    return () => window.removeEventListener('message', on);
  }, [fit, base, onError]);

  return (
    <div className={cn('w-full overflow-x-auto rounded-xl border bg-muted/30 p-3', className)}>
      <div className="relative mx-auto transition-[width] duration-300" style={{ width: viewport ? `${viewport}px` : '100%', maxWidth: '100%' }}>
        {!ready && <Skeleton className="absolute inset-0" />}
        <iframe
          key={reloadKey}
          ref={iframeRef}
          src={`/preview/${slug}?theme=${initialTheme}&fit=${fit}`}
          title={`Preview de ${slug}`}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          className="block w-full rounded-lg border-0 bg-background shadow-sm"
          style={{ height: fit === 'center' ? base : height, transition: 'height 150ms ease' }}
        />
      </div>
    </div>
  );
}
