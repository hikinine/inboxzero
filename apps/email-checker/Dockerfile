# Build de produção do @tasky/email-checker (Next.js standalone + Prisma) num monorepo pnpm.
# Contexto de build = RAIZ do repo. Ex.: docker build -f apps/email-checker/Dockerfile .
# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS base
ENV PNPM_HOME=/pnpm
ENV PATH="/pnpm:$PATH"
ENV CI=1
# openssl é exigido pelo engine do Prisma em runtime.
RUN corepack enable \
  && apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /repo

# ---- build: instala (filtrado ao app) + prisma generate (postinstall) + next build ----
FROM base AS build
ENV NEXT_TELEMETRY_DISABLED=1
COPY . .
# O pnpm já ignora por padrão o preinstall "only-allow bun" do @usex/disposable-email-domains
# (não está no pnpm.onlyBuiltDependencies), então o install roda limpo e o postinstall do app
# (prisma generate) executa normalmente — igual ao catalog.
RUN pnpm install --frozen-lockfile --filter @tasky/email-checker...
RUN pnpm --filter @tasky/email-checker build

# ---- runner: output standalone + prisma CLI p/ db push no start ----
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV HOME=/app
# A lista de domínios fica num caminho absoluto e estável dentro da imagem.
ENV DISPOSABLE_DOMAINS_PATH=/app/apps/email-checker/data/disposable-domains.txt
WORKDIR /app

# prisma CLI (global) para o `prisma db push` do entrypoint.
RUN npm install -g prisma@5.15.0

# Roda como não-root (HOME=/app para o cache do prisma ser gravável).
RUN groupadd -r nodejs && useradd -r -g nodejs -d /app nextjs

# Layout standalone segue o outputFileTracingRoot (raiz do repo): apps/email-checker/server.js
COPY --from=build --chown=nextjs:nodejs /repo/apps/email-checker/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /repo/apps/email-checker/.next/static ./apps/email-checker/.next/static
COPY --from=build --chown=nextjs:nodejs /repo/apps/email-checker/public ./apps/email-checker/public
# Lista de domínios descartáveis (garante presença mesmo se o tracing não incluir).
COPY --from=build --chown=nextjs:nodejs /repo/apps/email-checker/data ./apps/email-checker/data
# Schema + entrypoint (db push antes de subir o server).
COPY --from=build --chown=nextjs:nodejs /repo/apps/email-checker/prisma ./prisma
COPY --chown=nextjs:nodejs apps/email-checker/docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

USER nextjs
EXPOSE 3000
CMD ["./docker-entrypoint.sh"]
