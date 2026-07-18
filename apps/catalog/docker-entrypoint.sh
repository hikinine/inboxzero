#!/bin/sh
# Sincroniza o schema (prisma db push) antes de subir o servidor.
# Idempotente: em deploys seguintes, no-op se nada mudou; aplica mudanças aditivas.
set -e

echo "[entrypoint] prisma db push (sync do schema)..."
n=0
until prisma db push --schema=/app/prisma/schema.prisma --skip-generate; do
  n=$((n + 1))
  if [ "$n" -ge 6 ]; then
    echo "[entrypoint] db push falhou após $n tentativas — abortando"
    exit 1
  fi
  echo "[entrypoint] banco indisponível? retry $n em 3s..."
  sleep 3
done

echo "[entrypoint] iniciando Next server"
exec node apps/catalog/server.js
