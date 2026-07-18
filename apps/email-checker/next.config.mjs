import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build enxuto para Docker: server.js + node_modules mínimo.
  output: 'standalone',
  // Prisma e o SDK de e-mail leem arquivos / usam node:dns — não podem ser empacotados.
  serverExternalPackages: ['@prisma/client', '.prisma/client', '@usex/disposable-email-domains'],
  // Monorepo pnpm: a raiz de tracing é a raiz do repo (dois níveis acima de apps/email-checker).
  outputFileTracingRoot: path.join(__dirname, '../..'),
  // Garante que a lista de domínios descartáveis (2MB) entre no bundle standalone.
  outputFileTracingIncludes: {
    '/api/v1/verify': ['./data/disposable-domains.txt'],
    '/api/playground': ['./data/disposable-domains.txt'],
  },
};

export default nextConfig;
