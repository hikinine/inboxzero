import { NextRequest } from 'next/server';
import { TOOLS, callTool } from '@/lib/mcp/tools';

// Endpoint MCP over Streamable HTTP, stateless. Responde JSON-RPC 2.0 em application/json.
// Auth: Bearer <CATALOG_MCP_TOKEN>. Sem sessão (sem Mcp-Session-Id).

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DEFAULT_PROTOCOL = '2025-06-18';

type JsonRpcId = string | number | null;

function result(id: JsonRpcId, res: unknown) {
  return Response.json({ jsonrpc: '2.0', id, result: res });
}
function error(id: JsonRpcId, code: number, message: string) {
  return Response.json({ jsonrpc: '2.0', id, error: { code, message } });
}

export async function POST(req: NextRequest) {
  // Auth.
  const expected = process.env.CATALOG_MCP_TOKEN;
  const auth = req.headers.get('authorization') ?? '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!expected || token !== expected) {
    return new Response(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32001, message: 'Unauthorized' } }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return error(null, -32700, 'Parse error');
  }

  // Não tratamos batch (Claude envia mensagens únicas); rejeita array explicitamente.
  if (Array.isArray(body)) return error(null, -32600, 'Batch não suportado');

  const id: JsonRpcId = body?.id ?? null;
  const method: string = body?.method ?? '';
  const params = body?.params ?? {};

  // Notificações (sem id) — apenas 202, sem corpo.
  if (method.startsWith('notifications/')) {
    return new Response(null, { status: 202 });
  }

  switch (method) {
    case 'initialize':
      return result(id, {
        protocolVersion: typeof params?.protocolVersion === 'string' ? params.protocolVersion : DEFAULT_PROTOCOL,
        capabilities: { tools: {} },
        serverInfo: { name: 'catalog', version: '0.1.0' },
      });

    case 'ping':
      return result(id, {});

    case 'tools/list':
      return result(id, { tools: TOOLS });

    case 'tools/call': {
      const name = params?.name as string | undefined;
      if (!name) return error(id, -32602, 'params.name é obrigatório');
      try {
        const res = await callTool(name, params?.arguments ?? {});
        return result(id, res);
      } catch (e) {
        return result(id, {
          content: [{ type: 'text', text: `Erro: ${e instanceof Error ? e.message : String(e)}` }],
          isError: true,
        });
      }
    }

    default:
      return error(id, -32601, `Method not found: ${method}`);
  }
}

export function GET() {
  return new Response('Catalog MCP endpoint. Use POST (Streamable HTTP, JSON-RPC 2.0).', {
    status: 405,
    headers: { allow: 'POST' },
  });
}
