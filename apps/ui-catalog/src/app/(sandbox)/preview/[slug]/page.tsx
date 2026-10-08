import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Sandbox } from '@/sandbox/Sandbox';

export const dynamic = 'force-dynamic';

// /preview/<slug>?theme=dark|light&fit=center|full — renderizado dentro de um <iframe sandbox>.
export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ fit?: string }>;
}) {
  const [{ slug }, { fit }] = await Promise.all([params, searchParams]);
  const item = await prisma.item.findUnique({ where: { slug }, select: { slug: true, kind: true, code: true } });
  if (!item) notFound();

  const fitMode =
    fit === 'center' || fit === 'full' ? fit : item.kind === 'BLOCK' || item.kind === 'PAGE' ? 'full' : 'center';

  return <Sandbox code={item.code} slug={item.slug} fit={fitMode} />;
}
