import { NextResponse } from 'next/server';
import { getStats } from '@/lib/items';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await getStats());
}
