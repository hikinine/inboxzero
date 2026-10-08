import { ItemKind, ItemStatus, Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { slugify, shortId } from '@/lib/slug';
import { buildWhere, findItem, metaSelect, toMeta } from '@/lib/items';
import { checkCode, deriveDeps, SUPPORTED_MODULES } from '@/lib/code';
import { KINDS, SITE_URL, installCommand } from '@/lib/site';
import { AUTHORING_RULES, LIB_MODULE_NAMES } from '@/sandbox/module-list';
import { UI_MODULE_NAMES } from '@/sandbox/generated/ui-module-names';

const KIND_DESC = 'COMPONENT (peça pequena) | BLOCK (seção de página) | PAGE (página inteira) | ILLUSTRATION (ilustração animada)';

// ── Definições expostas no tools/list ────────────────────────────────────────
export const TOOLS = [
  {
    name: 'search_items',
    description:
      'Busca itens do catálogo (componentes, blocos, páginas, ilustrações) por texto, tipo, categoria, coleção, tag ou status. Retorna só metadados (sem o código) para economizar tokens. Use get_item para o código completo.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Texto a buscar em nome, descrição, slug, tags e categoria (case-insensitive)' },
        kind: { type: 'string', enum: ['COMPONENT', 'BLOCK', 'PAGE', 'ILLUSTRATION'], description: KIND_DESC },
        category: { type: 'string', description: 'Slug da categoria (ex.: hero, pricing, beam)' },
        collection: { type: 'string', description: 'Slug de uma coleção' },
        tag: { type: 'string', description: 'Slug de uma tag' },
        status: { type: 'string', enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'] },
        featured: { type: 'boolean' },
        limit: { type: 'number', description: '1..100 (default 30)' },
      },
    },
  },
  {
    name: 'get_item',
    description: 'Retorna um item completo (incluindo o código TSX, dependências e o comando de instalação) pelo id ou slug.',
    inputSchema: { type: 'object', required: ['idOrSlug'], properties: { idOrSlug: { type: 'string' } } },
  },
  {
    name: 'add_item',
    description:
      'Adiciona um item ao catálogo. O código é validado (sintaxe + imports suportados + export default) antes de salvar — erros voltam na resposta. Cria categoria, coleção e tags se não existirem. Dependências (npm e registry) são derivadas dos imports quando omitidas.',
    inputSchema: {
      type: 'object',
      required: ['name', 'code'],
      properties: {
        name: { type: 'string', description: 'Nome do item (ex.: "Hero centralizado com badge")' },
        code: { type: 'string', description: 'Arquivo TSX completo, auto-contido, com export default do componente' },
        kind: { type: 'string', enum: ['COMPONENT', 'BLOCK', 'PAGE', 'ILLUSTRATION'], description: `${KIND_DESC}. Default BLOCK` },
        category: { type: 'string', description: 'Nome da categoria dentro do tipo (ex.: Hero, Pricing, Beam). Criada se não existir.' },
        categoryDescription: { type: 'string', description: 'Descrição da categoria (só usada se a categoria for criada agora)' },
        description: { type: 'string' },
        collection: { type: 'string', description: 'Nome da coleção (agrupamento transversal). Criada se não existir.' },
        tags: { type: 'array', items: { type: 'string' } },
        dependencies: { type: 'array', items: { type: 'string' }, description: 'Pacotes npm extras (derivado dos imports se omitido)' },
        registryDependencies: { type: 'array', items: { type: 'string' }, description: 'Itens do registry shadcn (derivado dos imports se omitido)' },
        previewHeight: { type: 'number', description: 'Altura sugerida do preview em px (opcional)' },
        featured: { type: 'boolean', description: 'Destaque na home/topo das listagens' },
        status: { type: 'string', enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], description: 'default PUBLISHED' },
      },
    },
  },
  {
    name: 'update_item',
    description:
      'Atualiza um item existente (pelo id ou slug). Só os campos enviados mudam. tags substitui o conjunto inteiro; collection/category vazios desvinculam. Se code mudar, é validado de novo.',
    inputSchema: {
      type: 'object',
      required: ['idOrSlug'],
      properties: {
        idOrSlug: { type: 'string' },
        name: { type: 'string' },
        code: { type: 'string' },
        kind: { type: 'string', enum: ['COMPONENT', 'BLOCK', 'PAGE', 'ILLUSTRATION'] },
        category: { type: 'string', description: 'Nome da categoria. Vazio desvincula.' },
        description: { type: 'string' },
        collection: { type: 'string', description: 'Nome da coleção. Vazio desvincula.' },
        tags: { type: 'array', items: { type: 'string' }, description: 'Substitui todas as tags.' },
        dependencies: { type: 'array', items: { type: 'string' } },
        registryDependencies: { type: 'array', items: { type: 'string' } },
        previewHeight: { type: 'number' },
        featured: { type: 'boolean' },
        status: { type: 'string', enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'] },
      },
    },
  },
  {
    name: 'delete_item',
    description: 'Remove um item do catálogo (pelo id ou slug). Ação irreversível.',
    inputSchema: { type: 'object', required: ['idOrSlug'], properties: { idOrSlug: { type: 'string' } } },
  },
  {
    name: 'check_code',
    description:
      'Valida um TSX sem salvar: compila, lista os imports, aponta módulos não suportados no preview e confere o export default. Use antes de add_item quando estiver inseguro.',
    inputSchema: { type: 'object', required: ['code'], properties: { code: { type: 'string' } } },
  },
  {
    name: 'list_supported_modules',
    description:
      'Lista o que pode ser importado num item (módulos @/components/ui/* disponíveis, bibliotecas) e as regras de autoria do catálogo. Chame antes de escrever código.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'list_categories',
    description: 'Lista as categorias (opcionalmente de um tipo) com a contagem de itens.',
    inputSchema: {
      type: 'object',
      properties: { kind: { type: 'string', enum: ['COMPONENT', 'BLOCK', 'PAGE', 'ILLUSTRATION'] } },
    },
  },
  {
    name: 'upsert_category',
    description: 'Cria ou atualiza uma categoria (nome, descrição exibida na seção, ordem). Útil para dar descrição às seções do catálogo.',
    inputSchema: {
      type: 'object',
      required: ['kind', 'name'],
      properties: {
        kind: { type: 'string', enum: ['COMPONENT', 'BLOCK', 'PAGE', 'ILLUSTRATION'] },
        name: { type: 'string' },
        description: { type: 'string' },
        order: { type: 'number', description: 'Ordem de exibição (menor primeiro, default 100)' },
      },
    },
  },
  {
    name: 'list_collections',
    description: 'Lista as coleções do catálogo com a contagem de itens.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'list_tags',
    description: 'Lista as tags do catálogo com a contagem de itens.',
    inputSchema: { type: 'object', properties: {} },
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

const kindSchema = z.nativeEnum(ItemKind);
const statusSchema = z.nativeEnum(ItemStatus);
const strList = z.array(z.string()).optional();

// ── Helpers de relacionamento ────────────────────────────────────────────────
async function upsertCategoryByName(kind: ItemKind, name: string, description?: string) {
  const slug = slugify(name);
  return prisma.category.upsert({
    where: { kind_slug: { kind, slug } },
    create: { kind, slug, name: name.trim(), description: description?.trim() || null },
    update: {},
  });
}

async function upsertCollectionByName(name: string) {
  const slug = slugify(name);
  return prisma.collection.upsert({ where: { slug }, create: { slug, name: name.trim() }, update: {} });
}

async function tagIdsFor(names: string[]): Promise<string[]> {
  const ids: string[] = [];
  for (const raw of [...new Set(names.map((t) => t.trim()).filter(Boolean))]) {
    const slug = slugify(raw);
    const tag = await prisma.tag.upsert({ where: { slug }, create: { slug, name: raw }, update: {} });
    ids.push(tag.id);
  }
  return ids;
}

const dedupe = (xs: string[]) => [...new Set(xs.map((x) => x.trim()).filter(Boolean))];

// ── Create ───────────────────────────────────────────────────────────────────
const addSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  kind: kindSchema.optional(),
  category: z.string().optional(),
  categoryDescription: z.string().optional(),
  description: z.string().optional(),
  collection: z.string().optional(),
  tags: strList,
  dependencies: strList,
  registryDependencies: strList,
  previewHeight: z.number().int().positive().optional(),
  featured: z.boolean().optional(),
  status: statusSchema.optional(),
});
export type AddItemInput = z.infer<typeof addSchema>;

// Cria o item. Reutilizável pelo MCP, pela API e pelo seed.
export async function createItem(input: AddItemInput, source = 'mcp') {
  const data = addSchema.parse(input);
  const check = checkCode(data.code);
  if (!check.ok) throw new Error(check.errors.join('\n'));

  const kind = data.kind ?? ItemKind.BLOCK;

  const base = slugify(data.name);
  let slug = base;
  if (await prisma.item.findUnique({ where: { slug } })) slug = `${base}-${shortId()}`;

  const categoryId = data.category?.trim() ? (await upsertCategoryByName(kind, data.category, data.categoryDescription)).id : undefined;
  const collectionId = data.collection?.trim() ? (await upsertCollectionByName(data.collection)).id : undefined;
  const tagIds = await tagIdsFor(data.tags ?? []);
  const derived = deriveDeps(data.code);

  return prisma.item.create({
    data: {
      slug,
      name: data.name.trim(),
      description: data.description?.trim() || null,
      kind,
      code: data.code,
      dependencies: data.dependencies ? dedupe(data.dependencies) : derived.dependencies,
      registryDependencies: data.registryDependencies ? dedupe(data.registryDependencies) : derived.registryDependencies,
      previewHeight: data.previewHeight ?? null,
      featured: data.featured ?? false,
      status: data.status ?? ItemStatus.PUBLISHED,
      source,
      categoryId,
      collectionId,
      tags: { create: tagIds.map((tagId) => ({ tagId })) },
    },
  });
}

// ── Update ───────────────────────────────────────────────────────────────────
const updateSchema = z.object({
  name: z.string().min(1).optional(),
  code: z.string().min(1).optional(),
  kind: kindSchema.optional(),
  category: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  collection: z.string().nullable().optional(),
  tags: strList,
  dependencies: strList,
  registryDependencies: strList,
  previewHeight: z.number().int().positive().nullable().optional(),
  featured: z.boolean().optional(),
  status: statusSchema.optional(),
});
export type UpdateItemInput = z.infer<typeof updateSchema>;

export async function updateItemById(idOrSlug: string, input: unknown) {
  const existing = await prisma.item.findFirst({ where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] } });
  if (!existing) throw new Error('Item não encontrado');
  const data = updateSchema.parse(input);

  const patch: Prisma.ItemUpdateInput = {};
  if (data.name !== undefined) patch.name = data.name.trim();
  if (data.description !== undefined) patch.description = data.description?.trim() || null;
  if (data.status !== undefined) patch.status = data.status;
  if (data.featured !== undefined) patch.featured = data.featured;
  if (data.previewHeight !== undefined) patch.previewHeight = data.previewHeight;
  if (data.kind !== undefined) patch.kind = data.kind;

  if (data.code !== undefined) {
    const check = checkCode(data.code);
    if (!check.ok) throw new Error(check.errors.join('\n'));
    patch.code = data.code;
    const derived = deriveDeps(data.code);
    patch.dependencies = data.dependencies ? dedupe(data.dependencies) : derived.dependencies;
    patch.registryDependencies = data.registryDependencies ? dedupe(data.registryDependencies) : derived.registryDependencies;
  } else {
    if (data.dependencies !== undefined) patch.dependencies = dedupe(data.dependencies);
    if (data.registryDependencies !== undefined) patch.registryDependencies = dedupe(data.registryDependencies);
  }

  const kind = data.kind ?? existing.kind;
  if (data.category !== undefined) {
    patch.category = data.category?.trim() ? { connect: { id: (await upsertCategoryByName(kind, data.category)).id } } : { disconnect: true };
  } else if (data.kind !== undefined && data.kind !== existing.kind && existing.categoryId) {
    // Mudou de tipo: a categoria antiga pertence ao tipo antigo — desvincula (categoria é por tipo).
    patch.category = { disconnect: true };
  }

  if (data.collection !== undefined) {
    patch.collection = data.collection?.trim() ? { connect: { id: (await upsertCollectionByName(data.collection)).id } } : { disconnect: true };
  }

  if (data.tags !== undefined) {
    const tagIds = await tagIdsFor(data.tags);
    await prisma.itemTag.deleteMany({ where: { itemId: existing.id } });
    patch.tags = { create: tagIds.map((tagId) => ({ tagId })) };
  }

  return prisma.item.update({ where: { id: existing.id }, data: patch });
}

export async function deleteItemById(idOrSlug: string) {
  const existing = await prisma.item.findFirst({ where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] } });
  if (!existing) throw new Error('Item não encontrado');
  await prisma.item.delete({ where: { id: existing.id } });
  return { id: existing.id, slug: existing.slug };
}

export async function upsertCategory(input: { kind: ItemKind; name: string; description?: string | null; order?: number }) {
  const slug = slugify(input.name);
  const update: Prisma.CategoryUpdateInput = { name: input.name.trim() };
  if (input.description !== undefined) update.description = input.description?.trim() || null;
  if (input.order !== undefined) update.order = input.order;
  return prisma.category.upsert({
    where: { kind_slug: { kind: input.kind, slug } },
    create: { kind: input.kind, slug, name: input.name.trim(), description: input.description?.trim() || null, order: input.order ?? 100 },
    update,
  });
}

// ── Tools ────────────────────────────────────────────────────────────────────
const searchSchema = z.object({
  query: z.string().optional(),
  kind: kindSchema.optional(),
  category: z.string().optional(),
  collection: z.string().optional(),
  tag: z.string().optional(),
  status: statusSchema.optional(),
  featured: z.boolean().optional(),
  limit: z.number().int().positive().max(100).optional(),
});

async function searchItems(args: unknown): Promise<ToolResult> {
  const p = searchSchema.safeParse(args ?? {});
  if (!p.success) return fail(`Entrada inválida: ${p.error.message}`);
  const { query, limit, ...rest } = p.data;
  const rows = await prisma.item.findMany({
    where: buildWhere({ q: query, ...rest }),
    take: limit ?? 30,
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    select: metaSelect,
  });
  return ok({
    count: rows.length,
    items: rows.map((r) => {
      const m = toMeta(r);
      return { ...m, url: `${SITE_URL}/item/${m.slug}` };
    }),
  });
}

async function getItem(args: unknown): Promise<ToolResult> {
  const idOrSlug = (args as { idOrSlug?: string })?.idOrSlug;
  if (!idOrSlug) return fail('idOrSlug é obrigatório');
  const s = await findItem(idOrSlug);
  if (!s) return fail('Item não encontrado');
  return ok({
    id: s.id,
    slug: s.slug,
    name: s.name,
    description: s.description,
    kind: s.kind,
    status: s.status,
    source: s.source,
    featured: s.featured,
    previewHeight: s.previewHeight,
    category: s.category ? { slug: s.category.slug, name: s.category.name } : null,
    collection: s.collection?.slug ?? null,
    tags: s.tags.map((t) => t.tag.slug),
    dependencies: s.dependencies,
    registryDependencies: s.registryDependencies,
    code: s.code,
    url: `${SITE_URL}/item/${s.slug}`,
    previewUrl: `${SITE_URL}/preview/${s.slug}`,
    registryUrl: `${SITE_URL}/r/${s.slug}.json`,
    install: installCommand(s.slug),
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
  });
}

function summarize(s: { id: string; slug: string; name: string; kind: ItemKind; status: ItemStatus }) {
  return { id: s.id, slug: s.slug, name: s.name, kind: s.kind, status: s.status, url: `${SITE_URL}/item/${s.slug}`, install: installCommand(s.slug) };
}

async function addItem(args: unknown): Promise<ToolResult> {
  const p = addSchema.safeParse(args ?? {});
  if (!p.success) return fail(`Entrada inválida: ${p.error.message}`);
  try {
    const s = await createItem(p.data, 'mcp');
    return ok(summarize(s));
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Falha ao criar item');
  }
}

async function updateItem(args: unknown): Promise<ToolResult> {
  const idOrSlug = (args as { idOrSlug?: string })?.idOrSlug;
  if (!idOrSlug) return fail('idOrSlug é obrigatório');
  const p = updateSchema.safeParse(args ?? {});
  if (!p.success) return fail(`Entrada inválida: ${p.error.message}`);
  try {
    const s = await updateItemById(idOrSlug, p.data);
    return ok(summarize(s));
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Falha ao atualizar item');
  }
}

async function deleteItem(args: unknown): Promise<ToolResult> {
  const idOrSlug = (args as { idOrSlug?: string })?.idOrSlug;
  if (!idOrSlug) return fail('idOrSlug é obrigatório');
  try {
    return ok({ deleted: true, ...(await deleteItemById(idOrSlug)) });
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Falha ao deletar item');
  }
}

async function checkCodeTool(args: unknown): Promise<ToolResult> {
  const code = (args as { code?: string })?.code;
  if (!code) return fail('code é obrigatório');
  return ok(checkCode(code));
}

async function listSupportedModules(): Promise<ToolResult> {
  const cats = await prisma.category.findMany({ orderBy: [{ kind: 'asc' }, { order: 'asc' }], select: { kind: true, slug: true, name: true } });
  return ok({
    ui: UI_MODULE_NAMES,
    libs: LIB_MODULE_NAMES,
    all: SUPPORTED_MODULES,
    rules: AUTHORING_RULES,
    kinds: KINDS.map((k) => ({ kind: k.kind, label: k.label, description: k.description })),
    categories: cats,
    siteUrl: SITE_URL,
  });
}

async function listCategories(args: unknown): Promise<ToolResult> {
  const p = z.object({ kind: kindSchema.optional() }).safeParse(args ?? {});
  if (!p.success) return fail(`Entrada inválida: ${p.error.message}`);
  const rows = await prisma.category.findMany({
    where: p.data.kind ? { kind: p.data.kind } : {},
    orderBy: [{ kind: 'asc' }, { order: 'asc' }, { name: 'asc' }],
    include: { _count: { select: { items: true } } },
  });
  return ok({
    count: rows.length,
    categories: rows.map((c) => ({ kind: c.kind, slug: c.slug, name: c.name, description: c.description, order: c.order, items: c._count.items })),
  });
}

async function upsertCategoryTool(args: unknown): Promise<ToolResult> {
  const p = z
    .object({ kind: kindSchema, name: z.string().min(1), description: z.string().optional(), order: z.number().int().optional() })
    .safeParse(args ?? {});
  if (!p.success) return fail(`Entrada inválida: ${p.error.message}`);
  const c = await upsertCategory(p.data);
  return ok({ kind: c.kind, slug: c.slug, name: c.name, description: c.description, order: c.order });
}

async function listCollections(): Promise<ToolResult> {
  const rows = await prisma.collection.findMany({ orderBy: { name: 'asc' }, include: { _count: { select: { items: true } } } });
  return ok({ count: rows.length, collections: rows.map((c) => ({ slug: c.slug, name: c.name, description: c.description, items: c._count.items })) });
}

async function listTags(): Promise<ToolResult> {
  const rows = await prisma.tag.findMany({ orderBy: { name: 'asc' }, include: { _count: { select: { items: true } } } });
  return ok({ count: rows.length, tags: rows.map((t) => ({ slug: t.slug, name: t.name, items: t._count.items })) });
}

// ── Dispatch ─────────────────────────────────────────────────────────────────
export async function callTool(name: string, args: unknown): Promise<ToolResult> {
  switch (name) {
    case 'search_items':
      return searchItems(args);
    case 'get_item':
      return getItem(args);
    case 'add_item':
      return addItem(args);
    case 'update_item':
      return updateItem(args);
    case 'delete_item':
      return deleteItem(args);
    case 'check_code':
      return checkCodeTool(args);
    case 'list_supported_modules':
      return listSupportedModules();
    case 'list_categories':
      return listCategories(args);
    case 'upsert_category':
      return upsertCategoryTool(args);
    case 'list_collections':
      return listCollections();
    case 'list_tags':
      return listTags();
    default:
      return fail(`Tool desconhecida: ${name}`);
  }
}
