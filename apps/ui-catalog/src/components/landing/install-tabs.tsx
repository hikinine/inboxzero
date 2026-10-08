'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Abas CLI / MCP / Prompt (os blocos de código chegam já destacados do servidor).
export function InstallTabs({ cli, mcp, prompt }: { cli: React.ReactNode; mcp: React.ReactNode; prompt: React.ReactNode }) {
  return (
    <Tabs defaultValue="cli">
      <TabsList>
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="mcp">MCP</TabsTrigger>
        <TabsTrigger value="prompt">Prompt</TabsTrigger>
      </TabsList>
      <TabsContent value="cli" className="pt-3">
        {cli}
      </TabsContent>
      <TabsContent value="mcp" className="pt-3">
        {mcp}
      </TabsContent>
      <TabsContent value="prompt" className="pt-3">
        {prompt}
      </TabsContent>
    </Tabs>
  );
}
