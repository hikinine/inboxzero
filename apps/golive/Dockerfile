# golive: servidor Node sem dependências (página + sinalização WebRTC).
# Contexto de build = RAIZ do repo. Ex.: docker build -f apps/golive/Dockerfile .
FROM node:22-alpine
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
WORKDIR /app
COPY apps/golive/server.mjs ./
COPY apps/golive/public ./public
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:3000/health || exit 1
CMD ["node", "server.mjs"]
