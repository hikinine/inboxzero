# Plugin `ui-catalog`

Duas skills para trabalhar com o catálogo de UI shadcn (**https://ui.codehall.io**):

| Skill | Para quê |
|---|---|
| `ui-catalog-create` | Autorar componentes/blocos/páginas/ilustrações (regras, imports suportados, validação) e publicar via MCP |
| `ui-catalog-use` | Buscar, escolher, instalar (`npx shadcn add`) e adaptar itens que já existem |

## Instalar

Dentro do Claude Code (funciona a partir de **qualquer** projeto):

```
/plugin marketplace add hikinine/inboxzero
/plugin install ui-catalog@clickmax
```

## Pré-requisito: acesso ao catálogo

As skills usam as tools `mcp__ui-catalog__*`. Configure o servidor MCP no `.mcp.json`:

```json
{
  "mcpServers": {
    "ui-catalog": {
      "type": "http",
      "url": "https://ui.codehall.io/api/mcp",
      "headers": { "Authorization": "Bearer ${UI_CATALOG_MCP_TOKEN}" }
    }
  }
}
```

Peça o token para o time e exporte como `UI_CATALOG_MCP_TOKEN`. Reinicie o Claude Code depois.

## Desenvolver / testar local

```bash
claude --plugin-dir ./plugins/ui-catalog
```
