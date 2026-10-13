'use client';

// Painel de instalação com abas CLI · Prompt · MCP · Manual (estilo do widget do shadcnstudio).
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, FlaskConical } from 'lucide-react';
import { SITE_URL } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CopyButton } from './copy-button';

const PMS = ['pnpm', 'npm', 'yarn', 'bun'] as const;
type PM = (typeof PMS)[number];
const KEY = 'ui-catalog:pm';
const RUNNER: Record<PM, string> = { pnpm: 'pnpm dlx', npm: 'npx', yarn: 'yarn dlx', bun: 'bunx --bun' };
const ADD: Record<PM, string> = { pnpm: 'pnpm add', npm: 'npm i', yarn: 'yarn add', bun: 'bun add' };

function usePm(): [PM, (p: PM) => void] {
  const [pm, setPm] = useState<PM>('pnpm');
  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY) as PM | null;
      if (v && PMS.includes(v)) setPm(v);
    } catch {}
  }, []);
  return [
    pm,
    (p) => {
      setPm(p);
      try {
        localStorage.setItem(KEY, p);
      } catch {}
    },
  ];
}

function Line({ value }: { value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border bg-muted/40 py-1.5 pl-3 pr-1.5">
      <span className="select-none font-mono text-xs text-muted-foreground">$</span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-xs">{value}</code>
      <CopyButton value={value} iconOnly variant="ghost" />
    </div>
  );
}

export function InstallPanel({
  slug,
  prompt,
  deps = [],
  regDeps = [],
  v0,
  className,
}: {
  slug: string;
  prompt: string;
  deps?: string[];
  regDeps?: string[];
  v0?: string;
  className?: string;
}) {
  const [pm, setPm] = usePm();
  const url = `${SITE_URL}/r/${slug}.json`;
  const pmPicker = (
    <div className="flex gap-0.5 rounded-md border p-0.5 text-[11px]">
      {PMS.map((p) => (
        <button key={p} type="button" onClick={() => setPm(p)} className={cn('rounded px-1.5 py-0.5', pm === p ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground')}>
          {p}
        </button>
      ))}
    </div>
  );

  return (
    <Tabs defaultValue="cli" className={className}>
      <TabsList className="w-full">
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="prompt">Prompt</TabsTrigger>
        <TabsTrigger value="mcp">MCP</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>

      <TabsContent value="cli" className="space-y-2 pt-2">
        <div className="flex justify-end">{pmPicker}</div>
        <Line value={`${RUNNER[pm]} shadcn@latest add ${url}`} />
        <p className="text-xs text-muted-foreground">Copia o arquivo e instala primitivos e pacotes do registry.</p>
      </TabsContent>

      <TabsContent value="prompt" className="space-y-2 pt-2">
        <pre className="max-h-48 overflow-auto whitespace-pre-wrap rounded-lg border bg-muted/40 p-3 font-mono text-[11px] leading-relaxed">{prompt}</pre>
        <div className="flex flex-wrap gap-1.5">
          <CopyButton value={prompt} label="Copiar prompt" />
          {v0 && (
            <Button variant="outline" size="sm" nativeButton={false} render={<a href={v0} target="_blank" rel="noreferrer" />}>
              <ExternalLink data-icon="inline-start" /> Abrir no v0
            </Button>
          )}
          <Button variant="outline" size="sm" nativeButton={false} render={<Link href={`/playground?slug=${slug}`} />}>
            <FlaskConical data-icon="inline-start" /> Playground
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="mcp" className="space-y-2 pt-2">
        <Line value={`get_item "${slug}"`} />
        <p className="text-xs text-muted-foreground">
          Com o MCP do UI Catalog configurado, peça ao agente: “instala o {slug} do UI Catalog”.{' '}
          <Link href="/docs#mcp" className="underline">
            Configurar MCP
          </Link>
        </p>
      </TabsContent>

      <TabsContent value="manual" className="space-y-2 pt-2">
        <div className="flex justify-end">{pmPicker}</div>
        <ol className="space-y-2 text-xs text-muted-foreground">
          {deps.length > 0 && (
            <li className="space-y-1">
              <span>1. Pacotes npm</span>
              <Line value={`${ADD[pm]} ${deps.join(' ')}`} />
            </li>
          )}
          {regDeps.length > 0 && (
            <li className="space-y-1">
              <span>{deps.length ? 2 : 1}. Primitivos shadcn</span>
              <Line value={`${RUNNER[pm]} shadcn@latest add ${regDeps.join(' ')}`} />
            </li>
          )}
          <li>
            {(deps.length ? 1 : 0) + (regDeps.length ? 1 : 0) + 1}. Cole o código em <code className="rounded bg-muted px-1">components/{slug}.tsx</code> (aba Código ou{' '}
            <a href={`/api/items/${slug}/code?download=1`} className="underline">
              baixar .tsx
            </a>
            ).
          </li>
        </ol>
      </TabsContent>
    </Tabs>
  );
}
