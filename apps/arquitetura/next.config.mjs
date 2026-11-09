import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build enxuto para Docker: server.js + node_modules mínimo.
  output: 'standalone',
  serverExternalPackages: ['@prisma/client', '.prisma/client'],
  // Monorepo pnpm: a raiz de tracing é a raiz do repo (dois níveis acima de apps/arquitetura).
  outputFileTracingRoot: path.join(__dirname, '../..'),
};

export default nextConfig;
