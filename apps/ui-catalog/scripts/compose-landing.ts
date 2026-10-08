// Compõe uma página inteira a partir de blocos do catálogo (cada bloco = arquivo auto-contido).
// Mescla imports, remove 'use client'/export default de cada bloco e exporta um componente que
// empilha as seções. Uso: tsx scripts/compose-landing.ts (chamado pelo seed/publish via manifest).
import fs from 'node:fs';
import path from 'node:path';

export interface Composition {
  out: string; // relativo a src/content
  name: string; // nome do componente exportado
  blocks: string[]; // arquivos relativos a src/content, na ordem
  wrapperClass?: string;
}

export function compose(root: string, c: Composition) {
  const imports = new Map<string, { named: Set<string>; default?: string }>();
  const bodies: string[] = [];
  const components: string[] = [];
  for (const file of c.blocks) {
    let src = fs.readFileSync(path.join(root, file), 'utf8');
    src = src.replace(/^['"]use client['"]\s*;?\s*$/m, '');
    src = src.replace(/^import\s+(.+?)\s+from\s+['"](.+?)['"]\s*;?\s*$/gm, (_m, what: string, mod: string) => {
      const entry = imports.get(mod) ?? { named: new Set<string>() };
      const named = what.match(/\{([^}]*)\}/)?.[1];
      if (named) for (const n of named.split(',').map((s) => s.trim()).filter(Boolean)) entry.named.add(n);
      const def = what.replace(/\{[^}]*\}/, '').replace(/,/g, '').trim();
      if (def) entry.default = def;
      imports.set(mod, entry);
      return '';
    });
    src = src.replace(/export default function (\w+)/, (_m, name: string) => {
      components.push(name);
      return `function ${name}`;
    });
    bodies.push(src.trim());
  }
  const importLines = [...imports.entries()].map(([mod, e]) => {
    const parts: string[] = [];
    if (e.default) parts.push(e.default);
    if (e.named.size) parts.push(`{ ${[...e.named].sort().join(', ')} }`);
    return `import ${parts.join(', ')} from '${mod}'`;
  });
  const out = [
    `'use client'`,
    '',
    `// GERADO por scripts/compose-landing.ts a partir de: ${c.blocks.join(', ')}`,
    ...importLines,
    '',
    ...bodies,
    '',
    `export default function ${c.name}() {`,
    `  return (`,
    `    <div className="${c.wrapperClass ?? 'w-full bg-background text-foreground'}">`,
    ...components.map((n) => `      <${n} />`),
    `    </div>`,
    `  )`,
    `}`,
    '',
  ].join('\n');
  fs.writeFileSync(path.join(root, c.out), out);
  return c.out;
}

export const COMPOSITIONS: Composition[] = [
  {
    out: 'pages/landing/codehall-landing.tsx',
    name: 'CodehallLanding',
    blocks: [
      'blocks/navbar/codehall-navbar.tsx',
      'blocks/hero/codehall-hero.tsx',
      'blocks/features/codehall-areas.tsx',
      'blocks/features/codehall-capacidades.tsx',
      'blocks/processo/codehall-processo.tsx',
      'blocks/pricing/codehall-contratacao.tsx',
      'blocks/features/codehall-principios.tsx',
      'blocks/faq/codehall-faq.tsx',
      'blocks/cta/codehall-cta.tsx',
      'blocks/footer/codehall-footer.tsx',
    ],
  },
];

if (require.main === module) {
  const root = path.resolve(__dirname, '../src/content');
  for (const c of COMPOSITIONS) console.log('composed', compose(root, c));
}
