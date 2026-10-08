'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface McpClient {
  id: string;
  label: string;
  icon: React.ReactNode;
  where: string; // arquivo/caminho onde a config vai
  note?: React.ReactNode;
  code: React.ReactNode; // CodeBlocks renderizados no servidor
}

// Barra de abas com o logo de cada cliente MCP; cada painel mostra a config daquele cliente.
export function McpClientTabs({ clients }: { clients: McpClient[] }) {
  return (
    <Tabs defaultValue={clients[0]?.id}>
      <div>
        <TabsList variant="line" className="h-auto! flex-wrap justify-start">
          {clients.map((c) => (
            <TabsTrigger key={c.id} value={c.id} className="gap-2 px-2.5">
              <span className="[&>svg]:size-4">{c.icon}</span>
              {c.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {clients.map((c) => (
        <TabsContent key={c.id} value={c.id} className="space-y-3 pt-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="text-muted-foreground">Onde:</span>
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{c.where}</code>
          </div>
          {c.code}
          {c.note && <p className="text-xs text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono">{c.note}</p>}
        </TabsContent>
      ))}
    </Tabs>
  );
}
