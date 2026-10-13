'use client';

// /illustrations: "Escolha uma seção para vê-la refeita com ilustrações" (como no shadcnstudio).
// Cada aba mostra um bloco real do catálogo que aplica ilustrações animadas.
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { installCommand } from '@/lib/site';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PreviewDetail } from './preview-frame';
import { CopyButton } from './copy-button';

export const ILLUSTRATION_SHOWCASE = [
  { id: 'hero', label: 'Hero', block: 'hero-portfolio-com-pilha-de-cards', text: 'Pilha de cards animada contando a história de um portfólio.' },
  { id: 'bento', label: 'Bento', block: 'bento-com-ilustracoes-animadas-de-ia', text: 'Células do bento ganham feixes, órbitas e chat em movimento.' },
  { id: 'features', label: 'Features', block: 'features-de-ia-com-fluxo-de-agente', text: 'O fluxo de um agente de IA explicado passo a passo, animado.' },
  { id: 'stats', label: 'Stats e prova social', block: 'stats-com-prova-social-animada', text: 'Números que contam e avaliações que entram na tela.' },
  { id: 'integracoes', label: 'Integrações', block: 'integracoes-em-orbita', text: 'Logos orbitando o produto em dois anéis.' },
  { id: 'ia', label: 'Produto de IA', block: 'hero-de-produto-ia-com-chat-animado', text: 'Hero com uma conversa de IA que se escreve sozinha.' },
  { id: 'pricing', label: 'Pricing e checkout', block: 'pricing-com-checkout-animado', text: 'Escolha de plano levando a um checkout animado.' },
] as const;

export function IllustrationShowcase() {
  return (
    <section className="border-b pb-14">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Na prática</div>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Escolha uma seção para vê-la refeita com ilustrações</h2>
        <p className="mt-2 text-muted-foreground">Blocos reais do catálogo usando as ilustrações animadas — herdam o tema e instalam com uma linha.</p>
      </div>
      <Tabs defaultValue="hero" className="mt-8">
        <div className="no-scrollbar flex justify-start overflow-x-auto sm:justify-center">
          <TabsList>
            {ILLUSTRATION_SHOWCASE.map((s) => (
              <TabsTrigger key={s.id} value={s.id}>
                {s.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {ILLUSTRATION_SHOWCASE.map((s) => (
          <TabsContent key={s.id} value={s.id} className="pt-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground">{s.text}</p>
              <div className="flex gap-2">
                <CopyButton value={installCommand(s.block)} label="Copiar CLI" />
                <Button variant="outline" size="sm" nativeButton={false} render={<Link href={`/item/${s.block}`} />}>
                  Ver bloco <ArrowRight data-icon="inline-end" />
                </Button>
              </div>
            </div>
            <PreviewDetail slug={s.block} kind="BLOCK" lazy />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
