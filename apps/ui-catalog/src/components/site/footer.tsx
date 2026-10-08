import Link from 'next/link';
import { KINDS } from '@/lib/site';
import { BrandMark } from './brand-mark';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-semibold">
            <BrandMark size={20} /> UI Catalog
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Catálogo vivo de componentes, blocos, páginas e ilustrações shadcn/ui. Preview real, registry para o CLI e MCP para o Claude Code.
          </p>
        </div>
        <FooterCol title="Catálogo" links={KINDS.map((k) => ({ href: `/${k.path}`, label: k.label }))} />
        <FooterCol
          title="Usar"
          links={[
            { href: '/docs#cli', label: 'Instalar via CLI' },
            { href: '/docs#mcp', label: 'MCP no Claude Code' },
            { href: '/docs#api', label: 'API REST' },
            { href: '/r/registry.json', label: 'registry.json' },
          ]}
        />
        <FooterCol
          title="Mais"
          links={[
            { href: '/collections', label: 'Coleções' },
            { href: '/favorites', label: 'Favoritos' },
            { href: '/new', label: 'Novo item' },
            { href: 'https://ui.shadcn.com', label: 'shadcn/ui ↗' },
          ]}
        />
      </div>
      <div className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>Projeto independente — não afiliado ao shadcn/ui.</span>
          <span className="font-mono">Next.js · Tailwind v4 · Base UI · motion</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: Array<{ href: string; label: string }> }) {
  return (
    <div>
      <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</div>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-foreground/80 hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
