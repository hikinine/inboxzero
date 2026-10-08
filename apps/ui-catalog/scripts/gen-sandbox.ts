// Gera os arquivos derivados do sandbox de preview:
//  - src/sandbox/generated/ui-module-names.ts   → nomes dos módulos @/components/ui/* (servidor + cliente)
//  - src/sandbox/generated/ui-module-loaders.ts → import() dinâmico por módulo (cliente; chunk por componente)
//  - src/sandbox/generated/theme-css.ts         → CSS do tema (globals.css + tw-animate + shadcn) para o
//                                                 runtime do Tailwind no iframe, com os @import inlinados
//                                                 (o runtime só resolve "tailwindcss").
// Roda em predev/prebuild. Idempotente.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname ?? path.dirname(new URL(import.meta.url).pathname), '..');
const uiDir = path.join(root, 'src/components/ui');
const outDir = path.join(root, 'src/sandbox/generated');
fs.mkdirSync(outDir, { recursive: true });

const header = '// ARQUIVO GERADO por scripts/gen-sandbox.ts — não edite à mão.\n';

// 1) módulos de UI
const names = fs
  .readdirSync(uiDir)
  .filter((f) => f.endsWith('.tsx'))
  .map((f) => f.replace(/\.tsx$/, ''))
  .sort();

fs.writeFileSync(
  path.join(outDir, 'ui-module-names.ts'),
  `${header}export const UI_MODULE_NAMES: readonly string[] = [\n${names.map((n) => `  '@/components/ui/${n}',`).join('\n')}\n];\n`,
);

fs.writeFileSync(
  path.join(outDir, 'ui-module-loaders.ts'),
  `${header}export const UI_MODULE_LOADERS: Record<string, () => Promise<unknown>> = {\n${names
    .map((n) => `  '@/components/ui/${n}': () => import('@/components/ui/${n}'),`)
    .join('\n')}\n};\n`,
);

// 2) CSS do tema
const globals = fs.readFileSync(path.join(root, 'src/app/globals.css'), 'utf8');
// Esses pacotes não expõem o .css no "exports" (só a condição `style`), então resolvemos pelo
// diretório do pacote em node_modules (symlink do pnpm dentro do app).
const nm = path.join(root, 'node_modules');
const twAnimate = fs.readFileSync(path.join(nm, 'tw-animate-css/dist/tw-animate.css'), 'utf8');
const shadcnCss = fs.readFileSync(path.join(nm, 'shadcn/dist/tailwind.css'), 'utf8');

const stripImports = (css: string) => css.replace(/^\s*@import\s+[^;]+;\s*$/gm, '');
// Sem `@import "tailwindcss"` explícito: o runtime do browser injeta esse import sozinho quando o
// CSS não tem nenhum @import — e assim, se o <style> for recriado na hidratação (conteúdo antes do
// `type`), o browser não dispara um fetch de "tailwindcss" relativo à página.
const css = [
  '/* tw-animate-css */',
  stripImports(twAnimate),
  '/* shadcn/tailwind.css */',
  stripImports(shadcnCss),
  '/* globals.css */',
  stripImports(globals),
].join('\n');

fs.writeFileSync(
  path.join(outDir, 'theme-css.ts'),
  `${header}export const SANDBOX_CSS = ${JSON.stringify(css)};\n`,
);

console.log(`gen-sandbox: ${names.length} módulos de UI, CSS ${(css.length / 1024).toFixed(1)}KB`);
