// Gera src/lib/reference.generated.ts a partir de reference/maquete-exemplo.html.
// A maquete de exemplo vai no system prompt como referência de qualidade e de estrutura.
// Rode depois de trocar o exemplo: pnpm --filter @tasky/arquitetura gen-reference
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(path.join(root, 'reference/maquete-exemplo.html'), 'utf8');
writeFileSync(
  path.join(root, 'src/lib/reference.generated.ts'),
  `// Gerado por scripts/gen-reference.mjs a partir de reference/maquete-exemplo.html. Não edite à mão.\nexport const REFERENCE_HTML: string = ${JSON.stringify(html)};\n`,
);
console.log(`reference.generated.ts: ${html.length} chars`);
