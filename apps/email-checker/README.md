# @tasky/email-checker

SaaS de **validação de e-mail por API key**. Detecta e-mails inválidos (formato) e **domínios descartáveis/temporários**
usando a lista do [`disposable-email-domains`](https://github.com/hikinine/disposable-email-domains) (fork do hikinine),
consumida 100% offline. Créditos por conta, suporte a **batch** e **trilha de auditoria** completa.

- Next.js 15 (App Router) + Prisma + Postgres dedicado
- Motor de validação: `@usex/disposable-email-domains` (lista vendorizada em `data/disposable-domains.txt`)
- Porta dev: **3072** · Banco dev: **postgresql://…@localhost:5435/email_checker**

## Como funciona

1. Usuário cria conta (`/register`) e ganha créditos de teste (`SIGNUP_BONUS_CREDITS`, default 500).
2. Cria uma **API key** no dashboard (mostrada uma única vez).
3. Consome a API `POST /api/v1/verify` — 1 crédito por e-mail (single ou batch).
4. Tudo é auditável: cada e-mail + resultado fica em `email_checks`, cada débito em `credit_ledger`,
   e cada evento (login, key, checagem) em `audit_logs`.

## Rodando localmente

```bash
# 1) sobe o Postgres dedicado (porta 5435)
docker compose -f infra/docker-compose.yml up -d email-checker-postgres

# 2) instala + gera o Prisma Client (na raiz do monorepo)
pnpm install

# 3) cria as tabelas
pnpm --filter @tasky/email-checker db-push

# 4) sobe o app (ou use `pnpm dev` na raiz → mprocs)
pnpm --filter @tasky/email-checker dev
# → http://localhost:3072
```

## Endpoints principais

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/api/v1/verify` | API key | Valida `{email}` ou `{emails:[]}` (+`mx?`) |
| GET | `/api/v1/me` | API key | Saldo/consumo da conta |
| POST | `/api/auth/{register,login,logout}` | sessão | Autenticação do dashboard |
| GET/POST | `/api/keys`, POST `/api/keys/:id/revoke` | sessão | Gerência de chaves |
| GET | `/api/checks`, `/api/audit`, `/api/stats` | sessão | Histórico e auditoria |

Veja `/docs` na aplicação para exemplos completos (curl + respostas).

## Modelo de dados (Prisma)

`User` (créditos) · `ApiKey` (hash SHA-256) · `EmailCheck` (retenção de todo e-mail + resultado) ·
`CheckBatch` (lotes) · `CreditLedger` (razão de créditos, auditável) · `AuditLog` (eventos).

## Atualizar a lista de domínios

```bash
pnpm --filter @tasky/email-checker update-domains
```

## Variáveis de ambiente

Veja `.env.example`. Em produção defina `AUTH_SECRET` (obrigatório) e, na imagem Docker,
`DISPOSABLE_DOMAINS_PATH` já aponta para o caminho absoluto da lista.

## Deploy (Docker)

Imagem standalone multi-stage. O `docker-entrypoint.sh` roda `prisma db push` (idempotente) antes de subir o server.

```bash
docker build -f apps/email-checker/Dockerfile -t email-checker:latest .
```
