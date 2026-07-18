// Atualiza a lista vendorizada de domínios descartáveis a partir da fonte (fork do hikinine).
// Uso: pnpm --filter @tasky/email-checker update-domains
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'data', 'disposable-domains.txt');
const SOURCES = [
  'https://raw.githubusercontent.com/hikinine/disposable-email-domains/master/data/domains.txt',
  'https://raw.githubusercontent.com/ali-master/disposable-email-domains/master/data/domains.txt',
];

for (const url of SOURCES) {
  try {
    process.stdout.write(`baixando ${url} … `);
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`falhou (HTTP ${res.status})`);
      continue;
    }
    const text = await res.text();
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length < 1000) {
      console.log(`suspeito (${lines.length} linhas) — pulando`);
      continue;
    }
    fs.writeFileSync(OUT, lines.join('\n') + '\n');
    console.log(`ok → ${lines.length} domínios em ${path.relative(process.cwd(), OUT)}`);
    process.exit(0);
  } catch (e) {
    console.log('erro:', e.message);
  }
}
console.error('Nenhuma fonte disponível.');
process.exit(1);
