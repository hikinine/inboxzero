import Link from 'next/link';
import { GROUPS } from '@/lib/groups';
import { getFacets } from '@/lib/items';
import { KINDS, LINKS } from '@/lib/site';
import { BrandMark } from './brand-mark';

// Mega footer (estilo shadcnstudio): marca + colunas de links + listas de componentes e blocos.
export async function SiteFooter() {
  const [comp, blocks] = await Promise.all([getFacets('COMPONENT').catch(() => null), getFacets('BLOCK').catch(() => null)]);
  const compCats = (comp?.categories ?? []).filter((c) => c.count > 0);
  const blockCats = (blocks?.categories ?? []).filter((c) => c.count > 0);

  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-10 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-semibold">
              <BrandMark size={22} />
              <span>
                ui<span className="text-muted-foreground">/</span>catalog
              </span>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              Um ecossistema shadcn/ui pessoal: componentes, blocos, páginas e ilustrações animadas para copiar e colar, com preview ao vivo, registry para o CLI e MCP
              para o Claude Code.
            </p>
            <p className="text-xs text-muted-foreground">Projeto independente — não afiliado ao shadcn/ui nem ao shadcnstudio.</p>
          </div>
          <FooterCol title="Catálogo" links={[...KINDS.map((k) => ({ href: `/${k.path}`, label: k.label })), { href: '/collections', label: 'Coleções' }, { href: '/favorites', label: 'Favoritos' }, { href: '/search', label: 'Explorar tudo' }]} />
          <FooterCol title="Blocos" links={GROUPS.BLOCK.map((g) => ({ href: `/blocks#g-${g.slug}`, label: g.name }))} />
          <FooterCol
            title="Usar"
            links={[
              { href: '/docs#cli', label: 'Instalar via CLI' },
              { href: '/docs#mcp', label: 'MCP no Claude Code' },
              { href: '/docs#skills', label: 'Skills' },
              { href: '/docs#api', label: 'API REST' },
              { href: '/r/registry.json', label: 'registry.json' },
              { href: '/changelog', label: 'Changelog' },
              { href: '/new', label: 'Publicar um item' },
            ]}
          />
          <FooterCol
            title="Referências"
            links={[
              { href: LINKS.shadcn, label: 'shadcn/ui ↗' },
              { href: LINKS.shadcnstudio, label: 'shadcnstudio ↗' },
              { href: 'https://base-ui.com', label: 'Base UI ↗' },
              { href: 'https://motion.dev', label: 'Motion ↗' },
              { href: LINKS.claudeCode, label: 'Claude Code ↗' },
            ]}
          />
        </div>

        {compCats.length > 0 && (
          <div className="mt-12 border-t pt-8">
            <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Componentes shadcn</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
              {compCats.map((c) => (
                <Link key={c.slug} href={`/components/${c.slug}`} className="text-foreground/70 hover:text-foreground">
                  {c.name} <span className="text-xs text-muted-foreground">{c.count}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
        {blockCats.length > 0 && (
          <div className="mt-8">
            <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Blocos shadcn</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
              {blockCats.map((c) => (
                <Link key={c.slug} href={`/blocks/${c.slug}`} className="text-foreground/70 hover:text-foreground">
                  {c.name} <span className="text-xs text-muted-foreground">{c.count}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="border-t">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col lg:px-10 gap-2 px-6 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} ui/catalog · feito pelo Paulo com o Claude Code.</span>
          <span className="font-mono">Next.js · Tailwind v4 · shadcn/ui · Base UI · motion</span>
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
          <li key={l.href + l.label}>
            {l.href.startsWith('http') ? (
              <a href={l.href} target="_blank" rel="noreferrer" className="text-foreground/80 hover:text-foreground">
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="text-foreground/80 hover:text-foreground">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
