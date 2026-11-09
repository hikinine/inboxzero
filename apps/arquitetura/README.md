# Arquitetura

Chat que monta maquetes 3D de casas a partir de croqui, fotos, medidas e matrícula. Em produção em
https://arquitetura.codehall.io (Dokploy pessoal, projeto Codehall).

## Como funciona

- Cada **projeto** é uma conversa. Fotos e PDFs anexados ficam no Postgres (`Attachment`).
- O chat chama o Claude (`claude-opus-5-5`, pensamento adaptativo, esforço `high`) em streaming. O system prompt
  (`src/lib/prompt.ts`) traz as regras de conversa, as regras técnicas da maquete e uma maquete de exemplo inteira
  (`reference/maquete-exemplo.html`) como referência. Ele é estável para o cache de prompt pegar.
- Quando a resposta traz um bloco ```` ```html ````, o servidor guarda o documento como nova **versão** (`Mockup`) e
  a mensagem do assistente guarda só a referência à versão. A versão atual entra no contexto uma única vez, na
  mensagem seguinte do usuário (histórico só de acréscimo).
- A maquete abre em `/m/<slug>` (link público), servida com CSP `sandbox` e rede liberada só para os CDNs do three.js.
- Acesso por senha única (`APP_PASSWORD`); o cookie é um hash da senha com `AUTH_SECRET`.

## Rodar local

```bash
cp apps/arquitetura/.env.example apps/arquitetura/.env   # preencha
pnpm --filter @tasky/arquitetura db-push
pnpm --filter @tasky/arquitetura dev                     # http://localhost:3074
```

Trocou a maquete de exemplo? `pnpm --filter @tasky/arquitetura gen-reference`.

## Deploy

Push na `main` que mexa em `apps/arquitetura/**` → `.github/workflows/arquitetura.yml` builda no runner, publica
`ghcr.io/hikinine/arquitetura:production` e chama o webhook do app no Dokploy (`DOKPLOY_ARQUITETURA_WEBHOOK`).

Envs no Dokploy (vault provider `arquitetura` → Infisical Pessoal/prod `/arquitetura`):
`ARQUITETURA_DATABASE_URL`, `APP_PASSWORD`, `AUTH_SECRET`, `ANTHROPIC_API_KEY`. Opcionais: `ANTHROPIC_MODEL`,
`ANTHROPIC_FALLBACKS=off`.
