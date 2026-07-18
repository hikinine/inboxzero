# Plugin `svg-catalog`

Duas skills para trabalhar com o catálogo de ilustrações SVG da Clickmax
(**https://hiki9.inboxzero.space**):

| Skill | Para quê |
|---|---|
| `svg-catalog-create` | Criar ilustrações no padrão CX/Clickmax (regras de autoria, marca, tokens, render-check) e publicar no catálogo via MCP |
| `svg-catalog-use` | Buscar, escolher e usar peças que já existem (busca por keyword/tag/coleção, como embutir, como recolorir) |

## Instalar

Dois comandos, dentro do Claude Code (funciona a partir de **qualquer** projeto):

```
/plugin marketplace add hikinine/inboxzero
/plugin install svg-catalog@clickmax
```

Depois é só pedir normalmente: *"cria uns svgs de funil pro catálogo"* ou
*"pega uma ilustração de dashboard da collection CX"* — as skills disparam sozinhas.

Para conferir o que está instalado: `/plugin` (aba **Installed**).

## Pré-requisito: acesso ao catálogo

As skills usam as tools `mcp__catalog__*`. Configure o servidor MCP no `.mcp.json`
do seu projeto (ou no global):

```json
{
  "mcpServers": {
    "catalog": {
      "type": "http",
      "url": "https://hiki9.inboxzero.space/api/mcp",
      "headers": { "Authorization": "Bearer ${CATALOG_MCP_TOKEN}" }
    }
  }
}
```

Peça o token para o time e exporte como `CATALOG_MCP_TOKEN` (ou cole direto — o
`.mcp.json` costuma ser gitignored). Sem isso, as skills ainda orientam a autoria,
mas não conseguem ler nem publicar no catálogo.

> Reinicie o Claude Code depois de mexer no `.mcp.json` — servidores MCP só
> carregam no início da sessão.

## Atualizar

O plugin acompanha o repo `hikinine/inboxzero`. Para puxar mudanças:

```
/plugin marketplace update clickmax
```

## Desenvolver / testar local

```bash
claude --plugin-dir ./plugins/svg-catalog
```
