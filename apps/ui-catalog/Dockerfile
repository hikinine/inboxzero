# Build de produção do @tasky/ui-catalog (Next.js standalone + Prisma) num monorepo pnpm.
# Contexto de build = RAIZ do repo. Ex.: docker build -f apps/ui-catalog/Dockerfile .
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

# ---- build: instala (filtrado ao app) + prisma generate (postinstall) + gen-sandbox (prebuild) + next build ----
FROM base AS build
ENV NEXT_TELEMETRY_DISABLED=1
# NEXT_PUBLIC_* é inlinado no build pelo Next — precisa existir aqui, não só no runtime.
ARG NEXT_PUBLIC_SITE_URL=https://ui.codehall.io
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
COPY . .
# --no-frozen-lockfile: o pnpm-lock.yaml é do monorepo inteiro e às vezes fica fora de
# sincronia com outros apps; as versões do ui-catalog seguem as do lock.
RUN pnpm install --no-frozen-lockfile --filter @tasky/ui-catalog...
RUN pnpm --filter @tasky/ui-catalog build

# ---- runner: output standalone + prisma CLI p/ db push no start ----
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV HOME=/app
WORKDIR /app

# prisma CLI (global) para o `prisma db push` do entrypoint.
RUN npm install -g prisma@5.15.0

# Roda como não-root (HOME=/app para o cache do prisma ser gravável).
RUN groupadd -r nodejs && useradd -r -g nodejs -d /app nextjs

# Layout standalone segue o outputFileTracingRoot (raiz do repo): apps/ui-catalog/server.js
COPY --from=build --chown=nextjs:nodejs /repo/apps/ui-catalog/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /repo/apps/ui-catalog/.next/static ./apps/ui-catalog/.next/static
COPY --from=build --chown=nextjs:nodejs /repo/apps/ui-catalog/public ./apps/ui-catalog/public
# Schema + entrypoint (db push antes de subir o server).
COPY --from=build --chown=nextjs:nodejs /repo/apps/ui-catalog/prisma ./prisma
COPY --chown=nextjs:nodejs apps/ui-catalog/docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

USER nextjs
EXPOSE 3000
CMD ["./docker-entrypoint.sh"]
