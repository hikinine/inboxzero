import { Prisma, ScreenStatus } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { slugify, shortId } from '@/lib/slug';
import { extractDims, looksLikeSvg } from '@/lib/svg';
import { buildWhere } from '@/lib/screens';

// ── Definições expostas no tools/list ────────────────────────────────────────
export const TOOLS = [
  {
    name: 'search_screens',
    description:
      'Busca telas no catálogo por texto (nome/descrição), tag, coleção ou status. Retorna só metadados (sem o SVG) para economizar tokens. Use get_screen para o SVG completo.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Texto a buscar em nome e descrição (case-insensitive)' },
        tag: { type: 'string', description: 'Slug de uma tag' },
        collection: { type: 'string', description: 'Slug de uma coleção' },
        status: { type: 'string', enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'] },
        limit: { type: 'number', description: '1..100 (default 30)' },
      },
    },
  },
  {
    name: 'get_screen',
    description: 'Retorna uma tela completa (incluindo o markup SVG) pelo id ou slug.',
    inputSchema: {
      type: 'object',
      required: ['idOrSlug'],
      properties: { idOrSlug: { type: 'string' } },
    },
  },
  {
    name: 'add_screen',
    description:
      'Adiciona uma nova tela ao catálogo. Cria coleção e tags automaticamente se não existirem. Extrai width/height do SVG quando possível.',
    inputSchema: {
      type: 'object',
      required: ['name', 'svg'],
      properties: {
        name: { type: 'string', description: 'Nome da tela' },
        svg: { type: 'string', description: 'Markup SVG completo (deve conter <svg>…</svg>)' },
        description: { type: 'string' },
        collection: { type: 'string', description: 'Nome da coleção (agrupamento). Criada se não existir.' },
        tags: { type: 'array', items: { type: 'string' }, description: 'Lista de tags (nomes). Criadas se não existirem.' },
        status: { type: 'string', enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], description: 'default PUBLISHED' },
        width: { type: 'number' },
        height: { type: 'number' },
      },
    },
  },
  {
    name: 'list_collections',
    description: 'Lista as coleções do catálogo com a contagem de telas.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'list_tags',
    description: 'Lista as tags do catálogo com a contagem de telas.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'update_screen',
    description:
      'Atualiza uma tela existente (pelo id ou slug). Só os campos enviados mudam. tags substitui o conjunto inteiro; collection vazia/null desvincula. Se svg mudar, as dimensões são reextraídas.',
    inputSchema: {
      type: 'object',
      required: ['idOrSlug'],
      properties: {
        idOrSlug: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        collection: { type: 'string', description: 'Nome da coleção. Vazio desvincula.' },
        tags: { type: 'array', items: { type: 'string' }, description: 'Substitui todas as tags.' },
        status: { type: 'string', enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'] },
        svg: { type: 'string' },
        width: { type: 'number' },
        height: { type: 'number' },
      },
    },
  },
  {
    name: 'delete_screen',
    description: 'Remove uma tela do catálogo (pelo id ou slug). Ação irreversível.',
    inputSchema: {
      type: 'object',
      required: ['idOrSlug'],
      properties: { idOrSlug: { type: 'string' } },
    },
  },
] as const;

// ── Resultado no formato MCP ─────────────────────────────────────────────────
type ToolResult = { content: Array<{ type: 'text'; text: string }>; isError?: boolean };

function ok(data: unknown): ToolResult {
  return { content: [{ type: 'text', text: JSON.stringify(data) }] };
}
function fail(message: string): ToolResult {
  return { content: [{ type: 'text', text: message }], isError: true };
}

// ── Implementações ───────────────────────────────────────────────────────────
const searchSchema = z.object({
  query: z.string().optional(),
  tag: z.string().optional(),
  collection: z.string().optional(),
  status: z.nativeEnum(ScreenStatus).optional(),
  limit: z.number().int().positive().max(100).optional(),
});

async function searchScreens(args: unknown): Promise<ToolResult> {
  const p = searchSchema.safeParse(args ?? {});
  if (!p.success) return fail(`Entrada inválida: ${p.error.message}`);
  const { query, tag, collection, status, limit } = p.data;
  const where = buildWhere({ q: query, tag, collection, status });

  const rows = await prisma.screen.findMany({
    where,
    take: limit ?? 30,
    orderBy: { createdAt: 'desc' },
    include: { collection: true, tags: { include: { tag: true } } },
  });

  return ok({
    count: rows.length,
    screens: rows.map((s) => ({
      id: s.id,
      slug: s.slug,
      name: s.name,
      description: s.description,
      status: s.status,
      width: s.width,
      height: s.height,
      collection: s.collection?.slug ?? null,
      tags: s.tags.map((t) => t.tag.slug),
      createdAt: s.createdAt,
    })),
  });
}

async function getScreen(args: unknown): Promise<ToolResult> {
  const idOrSlug = (args as { idOrSlug?: string })?.idOrSlug;
  if (!idOrSlug) return fail('idOrSlug é obrigatório');

  const s = await prisma.screen.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
    include: { collection: true, tags: { include: { tag: true } } },
  });
  if (!s) return fail('Tela não encontrada');

  return ok({
    id: s.id,
    slug: s.slug,
    name: s.name,
    description: s.description,
    status: s.status,
    width: s.width,
    height: s.height,
    source: s.source,
    collection: s.collection?.slug ?? null,
    tags: s.tags.map((t) => t.tag.slug),
    svg: s.svg,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
  });
}

const addSchema = z.object({
  name: z.string().min(1),
  svg: z.string().min(1),
  description: z.string().optional(),
  collection: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.nativeEnum(ScreenStatus).optional(),
  width: z.number().int().optional(),
  height: z.number().int().optional(),
});

// Cria a tela. Reutilizável tanto pelo MCP quanto pela UI (server action).
export async function createScreen(input: z.infer<typeof addSchema>, source = 'mcp') {
  const data = addSchema.parse(input);
  if (!looksLikeSvg(data.svg)) {
    throw new Error('O conteúdo não parece um SVG válido (precisa conter <svg>…</svg>).');
  }

  // Slug único.
  const base = slugify(data.name);
  let slug = base;
  if (await prisma.screen.findUnique({ where: { slug } })) slug = `${base}-${shortId()}`;

  // Coleção (upsert por slug).
  let collectionId: string | undefined;
  if (data.collection?.trim()) {
    const cslug = slugify(data.collection);
    const col = await prisma.collection.upsert({
      where: { slug: cslug },
      create: { slug: cslug, name: data.collection.trim() },
      update: {},
    });
    collectionId = col.id;
  }

  // Tags (upsert por slug).
  const tagSlugs = [...new Set((data.tags ?? []).map((t) => t.trim()).filter(Boolean))];
  const tagIds: string[] = [];
  for (const t of tagSlugs) {
    const tslug = slugify(t);
    const tag = await prisma.tag.upsert({
      where: { slug: tslug },
      create: { slug: tslug, name: t },
      update: {},
    });
    tagIds.push(tag.id);
  }

  const dims = extractDims(data.svg);
  const screen = await prisma.screen.create({
    data: {
      slug,
      name: data.name.trim(),
      description: data.description?.trim() || null,
      svg: data.svg,
      width: data.width ?? dims.width,
      height: data.height ?? dims.height,
      status: data.status ?? ScreenStatus.PUBLISHED,
      source,
      collectionId,
      tags: { create: tagIds.map((tagId) => ({ tagId })) },
    },
  });
  return screen;
}

async function addScreen(args: unknown): Promise<ToolResult> {
  const p = addSchema.safeParse(args ?? {});
  if (!p.success) return fail(`Entrada inválida: ${p.error.message}`);
  try {
    const s = await createScreen(p.data, 'mcp');
    return ok({ id: s.id, slug: s.slug, name: s.name, status: s.status, width: s.width, height: s.height });
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Falha ao criar tela');
  }
}

async function listCollections(): Promise<ToolResult> {
  const rows = await prisma.collection.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { screens: true } } },
  });
  return ok({
    count: rows.length,
    collections: rows.map((c) => ({ slug: c.slug, name: c.name, screens: c._count.screens })),
  });
}

async function listTags(): Promise<ToolResult> {
  const rows = await prisma.tag.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { screens: true } } },
  });
  return ok({
    count: rows.length,
    tags: rows.map((t) => ({ slug: t.slug, name: t.name, screens: t._count.screens })),
  });
}

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  collection: z.string().nullable().optional(), // vazio/null desvincula
  tags: z.array(z.string()).optional(), // substitui o conjunto inteiro
  status: z.nativeEnum(ScreenStatus).optional(),
  svg: z.string().optional(),
  width: z.number().int().optional(),
  height: z.number().int().optional(),
});

// Atualiza uma tela. Reutilizável (MCP e UI). Só aplica os campos presentes.
export async function updateScreenById(idOrSlug: string, input: unknown) {
  const existing = await prisma.screen.findFirst({ where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] } });
  if (!existing) throw new Error('Tela não encontrada');
  const data = updateSchema.parse(input);

  const patch: Prisma.ScreenUpdateInput = {};
  if (data.name !== undefined) patch.name = data.name.trim();
  if (data.description !== undefined) patch.description = data.description?.trim() || null;
  if (data.status !== undefined) patch.status = data.status;

  if (data.svg !== undefined) {
    if (!looksLikeSvg(data.svg)) throw new Error('O conteúdo não parece um SVG válido.');
    patch.svg = data.svg;
    const dims = extractDims(data.svg);
    patch.width = data.width ?? dims.width;
    patch.height = data.height ?? dims.height;
  } else {
    if (data.width !== undefined) patch.width = data.width;
    if (data.height !== undefined) patch.height = data.height;
  }

  if (data.collection !== undefined) {
    if (data.collection?.trim()) {
      const cslug = slugify(data.collection);
      const col = await prisma.collection.upsert({
        where: { slug: cslug },
        create: { slug: cslug, name: data.collection.trim() },
        update: {},
      });
      patch.collection = { connect: { id: col.id } };
    } else {
      patch.collection = { disconnect: true };
    }
  }

  if (data.tags !== undefined) {
    const tagSlugs = [...new Set(data.tags.map((t) => t.trim()).filter(Boolean))];
    const tagIds: string[] = [];
    for (const t of tagSlugs) {
      const tslug = slugify(t);
      const tag = await prisma.tag.upsert({ where: { slug: tslug }, create: { slug: tslug, name: t }, update: {} });
      tagIds.push(tag.id);
    }
    await prisma.screenTag.deleteMany({ where: { screenId: existing.id } });
    patch.tags = { create: tagIds.map((tagId) => ({ tagId })) };
  }

  return prisma.screen.update({ where: { id: existing.id }, data: patch });
}

// Remove uma tela (ScreenTag cai por cascata).
export async function deleteScreenById(idOrSlug: string) {
  const existing = await prisma.screen.findFirst({ where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] } });
  if (!existing) throw new Error('Tela não encontrada');
  await prisma.screen.delete({ where: { id: existing.id } });
  return { id: existing.id, slug: existing.slug };
}

async function updateScreen(args: unknown): Promise<ToolResult> {
  const idOrSlug = (args as { idOrSlug?: string })?.idOrSlug;
  if (!idOrSlug) return fail('idOrSlug é obrigatório');
  const p = updateSchema.safeParse(args ?? {});
  if (!p.success) return fail(`Entrada inválida: ${p.error.message}`);
  try {
    const s = await updateScreenById(idOrSlug, p.data);
    return ok({ id: s.id, slug: s.slug, name: s.name, status: s.status, width: s.width, height: s.height });
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Falha ao atualizar tela');
  }
}

async function deleteScreen(args: unknown): Promise<ToolResult> {
  const idOrSlug = (args as { idOrSlug?: string })?.idOrSlug;
  if (!idOrSlug) return fail('idOrSlug é obrigatório');
  try {
    const r = await deleteScreenById(idOrSlug);
    return ok({ deleted: true, ...r });
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Falha ao deletar tela');
  }
}

// ── Dispatch ─────────────────────────────────────────────────────────────────
export async function callTool(name: string, args: unknown): Promise<ToolResult> {
  switch (name) {
    case 'search_screens':
      return searchScreens(args);
    case 'get_screen':
      return getScreen(args);
    case 'add_screen':
      return addScreen(args);
    case 'update_screen':
      return updateScreen(args);
    case 'delete_screen':
      return deleteScreen(args);
    case 'list_collections':
      return listCollections();
    case 'list_tags':
      return listTags();
    default:
      return fail(`Tool desconhecida: ${name}`);
  }
}
