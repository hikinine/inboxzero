'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ItemKind, ItemStatus } from '@prisma/client';
import { createItem } from '@/lib/mcp/tools';

export type NewItemState = { error?: string };

const list = (v: FormDataEntryValue | null) =>
  String(v ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

export async function createItemAction(_prev: NewItemState, formData: FormData): Promise<NewItemState> {
  const name = String(formData.get('name') ?? '').trim();
  const code = String(formData.get('code') ?? '');
  const kindRaw = String(formData.get('kind') ?? 'BLOCK');
  const statusRaw = String(formData.get('status') ?? 'PUBLISHED');
  const kind = (Object.values(ItemKind) as string[]).includes(kindRaw) ? (kindRaw as ItemKind) : ItemKind.BLOCK;
  const status = (Object.values(ItemStatus) as string[]).includes(statusRaw) ? (statusRaw as ItemStatus) : ItemStatus.PUBLISHED;

  if (!name) return { error: 'Nome é obrigatório.' };
  if (!code.trim()) return { error: 'Cole o código TSX.' };

  let slug: string;
  try {
    const item = await createItem(
      {
        name,
        code,
        kind,
        status,
        category: String(formData.get('category') ?? '').trim() || undefined,
        description: String(formData.get('description') ?? '').trim() || undefined,
        collection: String(formData.get('collection') ?? '').trim() || undefined,
        tags: list(formData.get('tags')),
        dependencies: formData.get('dependencies') ? list(formData.get('dependencies')) : undefined,
        registryDependencies: formData.get('registryDependencies') ? list(formData.get('registryDependencies')) : undefined,
        featured: formData.get('featured') === 'on',
      },
      'manual',
    );
    slug = item.slug;
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Falha ao criar item.' };
  }

  revalidatePath('/');
  redirect(`/item/${slug}`);
}
