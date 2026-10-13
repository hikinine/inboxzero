import { DocsSidebar } from '@/components/site/docs-sidebar';

// Dinâmica: depende do banco (sidebar de componentes, aviso do topo); no build do CI não há banco.
export const dynamic = 'force-dynamic';

// Layout das docs (estilo shadcnstudio): sidebar fixa à esquerda em lg ("Começando" + componentes);
// abaixo de lg a sidebar vira uma lista recolhível no topo. A TOC da direita é de cada página.
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid w-full max-w-screen-2xl gap-x-10 px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-10">
      <aside className="pt-6 lg:sticky lg:top-14 lg:h-[calc(100svh-3.5rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain lg:border-r lg:py-10 lg:pr-4 [scrollbar-width:thin]">
        <DocsSidebar />
      </aside>
      <div className="min-w-0 py-8 lg:py-10">{children}</div>
    </div>
  );
}
