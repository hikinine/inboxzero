import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build enxuto para Docker: server.js + node_modules mínimo.
  output: 'standalone',
  // Prisma não deve ser empacotado pelo bundler dos server components. (shiki fica bundlado de propósito:
  // assim o output standalone não depende dos arquivos de gramática fora do trace.)
  serverExternalPackages: ['@prisma/client', '.prisma/client'],
  // Monorepo pnpm: a raiz de tracing é a raiz do repo (dois níveis acima de apps/ui-catalog).
  outputFileTracingRoot: path.join(__dirname, '../..'),
};

export default nextConfig;
