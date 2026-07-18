'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ScreenStatus } from '@prisma/client';
import { createScreen } from '@/lib/mcp/tools';

export type NewScreenState = { error?: string };

export async function createScreenAction(_prev: NewScreenState, formData: FormData): Promise<NewScreenState> {
  const name = String(formData.get('name') ?? '').trim();
  const svg = String(formData.get('svg') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const collection = String(formData.get('collection') ?? '').trim();
  const tagsRaw = String(formData.get('tags') ?? '').trim();
  const statusRaw = String(formData.get('status') ?? 'PUBLISHED');

  if (!name) return { error: 'Nome é obrigatório.' };
  if (!svg) return { error: 'Cole o markup do SVG.' };

  const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : undefined;
  const status = (Object.values(ScreenStatus) as string[]).includes(statusRaw)
    ? (statusRaw as ScreenStatus)
    : ScreenStatus.PUBLISHED;

  let slug: string;
  try {
    const screen = await createScreen(
      { name, svg, description: description || undefined, collection: collection || undefined, tags, status },
      'manual',
    );
    slug = screen.slug;
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Falha ao criar tela.' };
  }

  revalidatePath('/');
  redirect(`/screens/${slug}`);
}
