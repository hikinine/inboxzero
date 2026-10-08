import { NextRequest, NextResponse } from 'next/server';
import { checkCode, deriveDeps } from '@/lib/code';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/check { code } → validação estática (mesma do MCP check_code) + deps derivadas.
export async function POST(req: NextRequest) {
  let code = '';
  try {
    code = String((await req.json())?.code ?? '');
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }
  return NextResponse.json({ ...checkCode(code), derived: deriveDeps(code) });
}
