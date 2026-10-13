import { SITE_URL, installCommand, kindMeta } from '@/lib/site';
import type { ItemKind } from '@prisma/client';

export interface PromptInput {
  slug: string;
  name: string;
  kind: ItemKind;
  description?: string | null;
  dependencies?: string[];
  registryDependencies?: string[];
}

// Prompt pronto para colar no Claude Code / Cursor / v0 / Bolt / Lovable.
export function buildItemPrompt(it: PromptInput): string {
  const meta = kindMeta(it.kind);
  const lines = [
    `Adicione ao projeto o ${meta.singular.toLowerCase()} "${it.name}" do UI Catalog (${SITE_URL}/item/${it.slug}).`,
    it.description ? `O que é: ${it.description}` : null,
    '',
    `1. Instale pelo shadcn CLI: ${installCommand(it.slug)}`,
    `   (ou pegue o código cru em ${SITE_URL}/api/items/${it.slug}/code — via MCP: get_item "${it.slug}")`,
    it.registryDependencies?.length ? `2. Primitivos shadcn necessários: ${it.registryDependencies.join(', ')}` : null,
    it.dependencies?.length ? `3. Pacotes npm: ${it.dependencies.join(' ')}` : null,
    '',
    'Regras ao adaptar:',
    '- Troque os textos de exemplo pelo domínio do projeto (mantenha pt-BR se o projeto for em português).',
    '- Mantenha só tokens semânticos do tema (bg-background, text-muted-foreground, border-border, bg-primary…); não introduza cores fixas.',
    '- O código usa shadcn no estilo base-nova (Base UI: prop `render` em vez de `asChild`). Se o projeto usa Radix, ajuste só essas props.',
    '- Preserve acessibilidade (rótulos, aria-label em botões só-ícone) e o comportamento responsivo.',
  ];
  return lines.filter((l) => l !== null).join('\n');
}

// Abrir o item no v0 a partir do registry público (mesmo padrão do botão "Open in v0" do shadcn).
export function v0Url(slug: string): string {
  return `https://v0.dev/chat/api/open?url=${encodeURIComponent(`${SITE_URL}/r/${slug}.json`)}`;
}
