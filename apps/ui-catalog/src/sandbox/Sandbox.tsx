'use client';

// Renderizador do preview. Vive dentro do iframe (/preview/*), isolado do site:
//  - carrega o runtime do Tailwind v4 no browser (classes arbitrárias do item são compiladas on-the-fly)
//  - compila + avalia o TSX (runtime.ts)
//  - reporta tamanho/erros ao pai via postMessage e aceita troca de tema/código (modo live)
import * as React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { evaluate } from './runtime';

export const SANDBOX_SOURCE = 'ui-catalog';

export type ParentMessage =
  | { source: typeof SANDBOX_SOURCE; type: 'theme'; theme: 'light' | 'dark' }
  | { source: typeof SANDBOX_SOURCE; type: 'code'; code: string };

export type ChildMessage =
  | { source: typeof SANDBOX_SOURCE; type: 'ready'; slug?: string }
  | { source: typeof SANDBOX_SOURCE; type: 'size'; slug?: string; height: number }
  | { source: typeof SANDBOX_SOURCE; type: 'error'; slug?: string; message: string };

let tailwindLoaded: Promise<unknown> | null = null;
function ensureTailwind() {
  // O pacote é um IIFE que se inicializa ao executar: lê <style type="text/tailwindcss"> e observa o DOM.
  tailwindLoaded ??= import('@tailwindcss/browser');
  return tailwindLoaded;
}

function post(msg: ChildMessage) {
  if (window.parent && window.parent !== window) window.parent.postMessage(msg, '*');
}

function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
}

class Boundary extends React.Component<
  { onError: (m: string) => void; resetKey: unknown; children: React.ReactNode },
  { error: string | null }
> {
  state = { error: null as string | null };
  static getDerivedStateFromError(e: unknown) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
  componentDidCatch(e: unknown) {
    this.props.onError(e instanceof Error ? e.message : String(e));
  }
  componentDidUpdate(prev: { resetKey: unknown }) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null });
  }
  render() {
    if (this.state.error) return <ErrorPanel message={this.state.error} />;
    return this.props.children;
  }
}

function ErrorPanel({ message }: { message: string }) {
  return (
    <div className="m-4 rounded-lg border border-destructive/40 bg-destructive/10 p-4 font-mono text-xs text-destructive whitespace-pre-wrap">
      {message}
    </div>
  );
}

function Loading() {
  return (
    <div className="flex min-h-40 items-center justify-center text-muted-foreground">
      <svg className="size-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function Sandbox({
  code,
  slug,
  fit,
  live = false,
}: {
  code?: string;
  slug?: string;
  // center: conteúdo centralizado no viewport (componentes/ilustrações); full: fluxo normal (blocos/páginas).
  fit: 'center' | 'full';
  live?: boolean;
}) {
  const [source, setSource] = React.useState<string | undefined>(code);
  const [state, setState] = React.useState<{ status: 'idle' | 'loading' | 'ready' | 'error'; Component?: React.ComponentType; error?: string }>({
    status: code ? 'loading' : 'idle',
  });
  const [version, setVersion] = React.useState(0);

  // Tema inicial (query) + mensagens do pai.
  React.useEffect(() => {
    const t = new URLSearchParams(location.search).get('theme');
    if (t === 'dark' || t === 'light') applyTheme(t);
    const onMessage = (e: MessageEvent<ParentMessage>) => {
      const m = e.data;
      if (!m || m.source !== SANDBOX_SOURCE) return;
      if (m.type === 'theme') applyTheme(m.theme);
      if (m.type === 'code' && live) setSource(m.code);
    };
    window.addEventListener('message', onMessage);
    post({ source: SANDBOX_SOURCE, type: 'ready', slug });
    return () => window.removeEventListener('message', onMessage);
  }, [live, slug]);

  // Compila e avalia sempre que o código muda.
  React.useEffect(() => {
    if (source === undefined) return;
    let cancelled = false;
    setState((s) => (s.status === 'ready' ? s : { status: 'loading' }));
    (async () => {
      try {
        await ensureTailwind();
        const { Component } = await evaluate(source);
        if (cancelled) return;
        setState({ status: 'ready', Component });
        setVersion((v) => v + 1);
      } catch (e) {
        if (cancelled) return;
        const message = e instanceof Error ? e.message : String(e);
        setState({ status: 'error', error: message });
        post({ source: SANDBOX_SOURCE, type: 'error', slug, message });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [source, slug]);

  // Reporta a altura do conteúdo (o pai usa no modo "full" para dimensionar o iframe).
  React.useEffect(() => {
    let raf = 0;
    const report = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = Math.ceil(document.documentElement.scrollHeight);
        post({ source: SANDBOX_SOURCE, type: 'size', slug, height: h });
      });
    };
    const ro = new ResizeObserver(report);
    ro.observe(document.body);
    report();
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [slug, state.status]);

  const onError = React.useCallback((message: string) => post({ source: SANDBOX_SOURCE, type: 'error', slug, message }), [slug]);

  const wrapper = fit === 'center' ? 'flex min-h-screen w-full items-center justify-center p-8' : 'min-h-screen w-full';

  return (
    <div className={wrapper} data-sandbox-root>
      {state.status === 'idle' && <div className="text-sm text-muted-foreground">Aguardando código…</div>}
      {state.status === 'loading' && <Loading />}
      {state.status === 'error' && <ErrorPanel message={state.error!} />}
      {state.status === 'ready' && state.Component && (
        <TooltipProvider>
          <Boundary onError={onError} resetKey={version}>
            <div className={fit === 'center' ? 'w-full max-w-full [&>*]:mx-auto' : 'w-full'} data-sandbox-content>
              <state.Component />
            </div>
          </Boundary>
        </TooltipProvider>
      )}
    </div>
  );
}
