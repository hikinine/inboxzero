'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const QA = [
  ['Isso substitui o shadcn/ui?', 'Não — é uma camada em cima. Os itens usam os primitivos do shadcn (Button, Card, Tabs…) e são instalados pelo próprio CLI do shadcn. O catálogo guarda o que você compõe com eles.'],
  ['Como o preview funciona se o código fica no banco?', 'O iframe compila o TSX no navegador (sucrase), resolve os imports num mapa fixo de módulos e roda o Tailwind v4 em runtime. Nada é pré-buildado: o que está no banco é o que você vê.'],
  ['Funciona em claro e escuro?', 'Sim. Os itens só usam tokens do tema (bg-background, text-muted-foreground…), então herdam o tema de quem instala. Dá pra alternar o preview sem recarregar.'],
  ['O que o MCP permite?', 'Buscar, ler, criar, atualizar e validar itens direto do Claude Code. As skills ui-catalog-create e ui-catalog-use orientam o fluxo: listar módulos suportados, escrever, validar, publicar; ou buscar, instalar e adaptar.'],
  ['Posso usar com Radix em vez de Base UI?', 'Os itens foram escritos no estilo base-nova (Base UI), mas importam só @/components/ui/*. No seu projeto o CLI instala os primitivos no estilo configurado no components.json; diferenças de API (ex.: render em vez de asChild) podem exigir ajuste pontual.'],
  ['E as ilustrações?', 'São componentes React com SVG inline e motion — não arquivos estáticos. Herdam cor, raio e tema; animam ao entrar e em loop. O catálogo de SVGs estáticos continua sendo o catalog.codehall.io.'],
];

export function Faq() {
  return (
    <Accordion className="w-full">
      {QA.map(([q, a]) => (
        <AccordionItem key={q} value={q}>
          <AccordionTrigger>{q}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
