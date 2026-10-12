# Imagem de runtime do @tasky/ui-catalog. NÃO builda nada: o `next build` roda no runner do CI
# (.github/workflows/ui-catalog.yml, com cache do pnpm e do .next/cache) e esta imagem só copia o
# output standalone. Contexto = apps/ui-catalog (allowlist no .dockerignore).
# Build manual: pnpm --filter @tasky/ui-catalog build && docker build apps/ui-catalog
# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV HOME=/app
WORKDIR /app

# openssl é exigido pelo engine do Prisma em runtime (binaryTarget debian-openssl-3.0.x);
# prisma CLI (global) para o `prisma db push` do entrypoint. Camadas estáveis → cache.
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && npm install -g prisma@5.15.0 \
  && groupadd -r nodejs && useradd -r -g nodejs -d /app nextjs

# Layout standalone segue o outputFileTracingRoot (raiz do repo): apps/ui-catalog/server.js
COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs .next/static ./apps/ui-catalog/.next/static
COPY --chown=nextjs:nodejs public ./apps/ui-catalog/public
# Schema + entrypoint (db push antes de subir o server).
COPY --chown=nextjs:nodejs prisma ./prisma
COPY --chown=nextjs:nodejs --chmod=755 docker-entrypoint.sh ./docker-entrypoint.sh

USER nextjs
EXPOSE 3000
CMD ["./docker-entrypoint.sh"]
