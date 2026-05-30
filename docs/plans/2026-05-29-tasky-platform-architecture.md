# Tasky Platform Architecture Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Evoluir o Tasky de um CRUD de tarefas para uma plataforma autônoma de secretária pessoal — multi-workspace, orientada a eventos, processada por um agente LLM via MCP, que transforma sinais digitais em itens acionáveis priorizados.

**Architecture:** Connectors ingestam eventos brutos (webhook/polling) por workspace. O agente do usuário — rodando em loop via Claude + MCP — processa esses eventos a cada 5 min, chama o LLM para classificar, e cria Items (Task, FollowUp, Reminder, Notification, Draft). O frontend exibe os Items processados no Inbox, com o workspace ativo no contexto. O model de Workspace é o primitivo de isolamento multi-tenant.

**Tech Stack:** Fastify 5 · Prisma 5 · Zod · React 19 · TanStack Query v5 · Orval SDK · Zustand (workspace state) · React Router v7 · Claude SDK (@anthropic-ai/sdk) · MCP protocol

---

## Glossário de domínio

| Termo | Definição |
|-------|-----------|
| **Workspace** | Unidade de isolamento. Um usuário pode ter vários (pessoal, empresa A, empresa B). |
| **Connector** | Integração configurada num workspace (Gmail, Slack, Nubank, GitHub…). Pode ser webhook ou polling. |
| **Event** | Payload bruto recebido de um Connector. Nunca exibido diretamente ao usuário — precisa ser processado. |
| **Agent** | Processo Claude que roda em loop (5 min), conectado ao tenant via MCP, processa Events e cria Items. |
| **Item** | Saída do agente. Pode ser: Task, FollowUp, Reminder, Notification ou Draft. Tem `priority` atribuída pela LLM. |
| **SubItem** | Um Event pode gerar múltiplos Items (ex: PR de revisão → Task "revisar" + Reminder "re-notificar em 2h"). |

---

## Visão de fluxo

```
[Connector webhook/poll]
         │
         ▼
    Event (status=PENDING, workspaceId)
         │
         ▼
   Agent MCP loop (5min)
   ┌─────────────────────────────────────────────┐
   │  1. GET /mcp/events/pending                 │
   │  2. Para cada Event:                        │
   │     LLM.classify(event.rawPayload)          │
   │     → [{type, title, priority, dueDate}]    │
   │  3. POST /mcp/events/:id/process            │
   │     body: { items: Item[] }                 │
   └─────────────────────────────────────────────┘
         │
         ▼
   Items criados (Task/FollowUp/Reminder/…)
         │
         ▼
   Frontend Inbox exibe Items por prioridade
```

---

## Modelo de dados alvo

```prisma
// Workspace — unidade de isolamento multi-tenant
model Workspace {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  avatarColor String   @default("#4ADE80")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  members     WorkspaceMember[]
  connectors  Connector[]
  events      Event[]
  items       Item[]

  @@map("workspaces")
}

model WorkspaceMember {
  id          String        @id @default(cuid())
  workspaceId String
  userId      String
  role        WorkspaceRole @default(MEMBER)
  createdAt   DateTime      @default(now())

  workspace   Workspace     @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  user        User          @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([workspaceId, userId])
  @@map("workspace_members")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  avatarUrl String?
  createdAt DateTime @default(now())

  memberships WorkspaceMember[]

  @@map("users")
}

// Connector — integração configurada no workspace
model Connector {
  id          String        @id @default(cuid())
  workspaceId String
  type        ConnectorType
  name        String
  config      Json          // endpoint, tokens, webhookSecret, etc.
  enabled     Boolean       @default(true)
  lastSyncAt  DateTime?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  workspace   Workspace     @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  events      Event[]

  @@map("connectors")
}

// Event — payload bruto de um connector (nunca exibido direto)
model Event {
  id           String      @id @default(cuid())
  workspaceId  String
  connectorId  String
  rawPayload   Json
  status       EventStatus @default(PENDING)
  processedAt  DateTime?
  agentNotes   String?     // reasoning do LLM (opcional)
  createdAt    DateTime    @default(now())

  workspace    Workspace   @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  connector    Connector   @relation(fields: [connectorId], references: [id])
  items        Item[]

  @@map("events")
}

// Item — saída do agente (o que o usuário realmente vê)
model Item {
  id          String     @id @default(cuid())
  workspaceId String
  eventId     String?    // null se criado manualmente
  type        ItemType
  title       String
  description String?
  priority    Priority   @default(MEDIUM)
  status      ItemStatus @default(OPEN)
  dueDate     DateTime?
  snoozedUntil DateTime?
  metadata    Json?      // source URL, PR number, thread ID, etc.
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  workspace   Workspace  @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  event       Event?     @relation(fields: [eventId], references: [id])

  @@map("items")
}

// Enums
enum WorkspaceRole  { OWNER ADMIN MEMBER }
enum ConnectorType  { GMAIL SLACK WHATSAPP NUBANK GITHUB LINEAR NOTION GOOGLE_CALENDAR TELEGRAM CUSTOM }
enum EventStatus    { PENDING PROCESSING PROCESSED IGNORED FAILED }
enum ItemType       { TASK FOLLOW_UP REMINDER NOTIFICATION DRAFT }
enum ItemStatus     { OPEN DONE SNOOZED DISMISSED }
enum Priority       { LOW MEDIUM HIGH URGENT }
```

---

## Arquitetura do frontend

### Roteamento (React Router v7)

```
/                           → redirect → /:workspaceSlug/dashboard
/:workspaceSlug/
  dashboard                 → DashboardScreen
  inbox                     → InboxScreen (Items do agente)
  tasks                     → TasksScreen (type=TASK)
  agenda                    → AgendaScreen
  events                    → EventLogScreen (debug/auditoria)
  connectors                → ConnectorsHubScreen
  connectors/:id            → ConnectorConfigScreen
  connectors/add            → ConnectorsAddScreen (onboarding)
  settings                  → WorkspaceSettingsScreen
```

### Estado global (Zustand)

```ts
interface AppStore {
  // Workspace ativo
  activeWorkspaceId: string | null;
  activeWorkspace:   Workspace | null;
  setActiveWorkspace: (ws: Workspace) => void;

  // Workspaces disponíveis (do usuário)
  workspaces:  Workspace[];
  setWorkspaces: (ws: Workspace[]) => void;

  // Agent status (polling)
  agentStatus: 'idle' | 'running' | 'error';
  lastProcessedAt: Date | null;
  pendingEventCount: number;
}
```

### Workspace switcher no Rail

O rail ganha um switcher no topo que mostra o workspace ativo e permite trocar. Ao trocar, a URL muda para `/:newSlug/dashboard` e todo o TanStack Query é invalidado via `queryClient.resetQueries()`.

### SDK scoping

Todos os hooks gerados pelo Orval recebem `workspaceId` como query param ou path param. A config do Axios intercepta e injeta o header `X-Workspace-Id` para simplificar.

---

## Roadmap de implementação

---

### Task 1: Modelagem — Prisma schema completo

**Files:**
- Modify: `apps/api/prisma/schema.prisma`

**Step 1: Substituir o schema atual pelo novo**

Copiar o modelo de dados acima para o schema, removendo o model `Task` existente.

**Step 2: Criar a migration**

```bash
cd apps/api
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/tasky \
  npx prisma migrate dev --name add-workspace-event-item-models
```

Expected: migration criada em `prisma/migrations/`.

**Step 3: Verificar que o Prisma Client foi gerado**

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/tasky \
  npx prisma generate
```

Expected: sem erros.

**Step 4: Commit**

```bash
git add apps/api/prisma/
git commit -m "feat(api): add workspace, event, item, connector models"
```

---

### Task 2: Contexto `workspaces` — CRUD básico

**Files:**
- Create: `apps/api/src/contexts/workspaces/presentation/dto/create-workspace.dto.ts`
- Create: `apps/api/src/contexts/workspaces/presentation/dto/workspace-response.dto.ts`
- Create: `apps/api/src/contexts/workspaces/application/workspaces.service.ts`
- Create: `apps/api/src/contexts/workspaces/presentation/controller/workspace.controller.ts`
- Create: `apps/api/src/contexts/workspaces/workspace.module.ts`
- Modify: `apps/api/src/app.module.ts`

**Step 1: DTO de criação**

```typescript
// create-workspace.dto.ts
import { z } from 'zod';

export const CreateWorkspaceDto = z.object({
  name:        z.string().min(1),
  slug:        z.string().min(2).regex(/^[a-z0-9-]+$/, 'Apenas letras minúsculas, números e hífens'),
  avatarColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default('#4ADE80'),
});
export type CreateWorkspaceDto = z.infer<typeof CreateWorkspaceDto>;
```

**Step 2: DTO de resposta**

```typescript
// workspace-response.dto.ts
import { z } from 'zod';

const datetimeField = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString() : v),
  z.string().datetime(),
);

export const WorkspaceResponseDto = z.object({
  id:          z.string(),
  name:        z.string(),
  slug:        z.string(),
  avatarColor: z.string(),
  createdAt:   datetimeField,
  updatedAt:   datetimeField,
});
export type WorkspaceResponseDto = z.infer<typeof WorkspaceResponseDto>;
```

**Step 3: Service**

```typescript
// workspaces.service.ts
import type { PrismaClient } from '@prisma/client';
import type { CreateWorkspaceDto } from '../presentation/dto/create-workspace.dto.js';

export class WorkspacesService {
  constructor(private readonly prisma: PrismaClient) {}

  findAll() {
    return this.prisma.workspace.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findBySlug(slug: string) {
    return this.prisma.workspace.findUnique({ where: { slug } });
  }

  create(dto: CreateWorkspaceDto) {
    return this.prisma.workspace.create({ data: dto });
  }

  delete(id: string) {
    return this.prisma.workspace.delete({ where: { id } });
  }
}
```

**Step 4: Controller**

```typescript
// workspace.controller.ts
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { WorkspacesService } from '../../application/workspaces.service.js';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto.js';
import { WorkspaceResponseDto } from '../dto/workspace-response.dto.js';

const SlugParam = z.object({ slug: z.string() });

export const workspaceController: FastifyPluginAsyncZod = async (app) => {
  const svc = new WorkspacesService(app.prisma);

  app.get('/', {
    schema: {
      tags: ['Workspaces'],
      operationId: 'list',
      response: { 200: z.array(WorkspaceResponseDto) },
    },
  }, async () => svc.findAll());

  app.get('/:slug', {
    schema: {
      tags: ['Workspaces'],
      operationId: 'getBySlug',
      params: SlugParam,
      response: { 200: WorkspaceResponseDto.nullable() },
    },
  }, async (req) => svc.findBySlug(req.params.slug));

  app.post('/', {
    schema: {
      tags: ['Workspaces'],
      operationId: 'create',
      body: CreateWorkspaceDto,
      response: { 201: WorkspaceResponseDto },
    },
  }, async (req, reply) => {
    const ws = await svc.create(req.body);
    return reply.status(201).send(ws);
  });

  app.delete('/:slug', {
    schema: {
      tags: ['Workspaces'],
      operationId: 'remove',
      params: SlugParam,
      response: { 200: z.object({ deleted: z.boolean() }) },
    },
  }, async (req) => {
    const ws = await svc.findBySlug(req.params.slug);
    if (!ws) throw { statusCode: 404, message: 'Workspace não encontrado' };
    await app.prisma.workspace.delete({ where: { id: ws.id } });
    return { deleted: true };
  });
};
```

**Step 5: Module**

```typescript
// workspace.module.ts
import type { FastifyPluginAsync } from 'fastify';
import { workspaceController } from './presentation/controller/workspace.controller.js';

export const WorkspacesModule: FastifyPluginAsync = async (app) => {
  app.register(workspaceController);
};
```

**Step 6: Registrar em app.module.ts**

```typescript
// app.module.ts
import fp from 'fastify-plugin';
import { TasksModule } from './contexts/tasks/tasks.module.js';
import { WorkspacesModule } from './contexts/workspaces/workspace.module.js';
import { PrismaPlugin } from './plugins/prisma.plugin.js';

export const AppModule = fp(async (app) => {
  await app.register(PrismaPlugin);
  await app.register(WorkspacesModule, { prefix: '/workspaces' });
  await app.register(TasksModule, { prefix: '/tasks' });
});
```

**Step 7: Testar**

```bash
# Criar workspace
curl -s -X POST http://localhost:3061/workspaces/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Pessoal","slug":"pessoal","avatarColor":"#4ADE80"}' | python3 -m json.tool

# Listar
curl -s http://localhost:3061/workspaces/ | python3 -m json.tool
```

Expected:
```json
{ "id": "...", "name": "Pessoal", "slug": "pessoal", "avatarColor": "#4ADE80", ... }
```

**Step 8: Commit**

```bash
git add apps/api/src/contexts/workspaces/
git commit -m "feat(api): add workspaces context with CRUD"
```

---

### Task 3: Contexto `events` — ingest e processamento

**Files:**
- Create: `apps/api/src/contexts/events/presentation/dto/ingest-event.dto.ts`
- Create: `apps/api/src/contexts/events/presentation/dto/event-response.dto.ts`
- Create: `apps/api/src/contexts/events/presentation/dto/process-event.dto.ts`
- Create: `apps/api/src/contexts/events/application/events.service.ts`
- Create: `apps/api/src/contexts/events/presentation/controller/event.controller.ts`
- Create: `apps/api/src/contexts/events/event.module.ts`
- Modify: `apps/api/src/app.module.ts`

**Step 1: DTOs**

```typescript
// ingest-event.dto.ts
import { z } from 'zod';

export const IngestEventDto = z.object({
  connectorId:  z.string(),
  rawPayload:   z.record(z.unknown()), // JSON livre
});
export type IngestEventDto = z.infer<typeof IngestEventDto>;
```

```typescript
// event-response.dto.ts
import { z } from 'zod';

const datetimeField = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString() : v),
  z.string().datetime(),
);
const nullableDatetime = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString() : v ?? null),
  z.string().datetime().nullable(),
);

export const EventResponseDto = z.object({
  id:           z.string(),
  workspaceId:  z.string(),
  connectorId:  z.string(),
  rawPayload:   z.record(z.unknown()),
  status:       z.enum(['PENDING', 'PROCESSING', 'PROCESSED', 'IGNORED', 'FAILED']),
  processedAt:  nullableDatetime,
  agentNotes:   z.string().nullable(),
  createdAt:    datetimeField,
});
export type EventResponseDto = z.infer<typeof EventResponseDto>;
```

```typescript
// process-event.dto.ts
import { z } from 'zod';

export const ProcessEventItemDto = z.object({
  type:        z.enum(['TASK', 'FOLLOW_UP', 'REMINDER', 'NOTIFICATION', 'DRAFT']),
  title:       z.string().min(1),
  description: z.string().optional(),
  priority:    z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  dueDate:     z.string().datetime().optional(),
  metadata:    z.record(z.unknown()).optional(),
});

export const ProcessEventDto = z.object({
  items:      z.array(ProcessEventItemDto).min(0),
  agentNotes: z.string().optional(),
  ignored:    z.boolean().default(false), // LLM decidiu que não é acionável
});
export type ProcessEventDto = z.infer<typeof ProcessEventDto>;
```

**Step 2: Service**

```typescript
// events.service.ts
import type { PrismaClient } from '@prisma/client';
import type { IngestEventDto } from '../presentation/dto/ingest-event.dto.js';
import type { ProcessEventDto } from '../presentation/dto/process-event.dto.js';

export class EventsService {
  constructor(private readonly prisma: PrismaClient) {}

  findPending(workspaceId: string) {
    return this.prisma.event.findMany({
      where: { workspaceId, status: 'PENDING' },
      orderBy: { createdAt: 'asc' },
      take: 50, // processa em lotes
    });
  }

  findByWorkspace(workspaceId: string) {
    return this.prisma.event.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }

  ingest(workspaceId: string, dto: IngestEventDto) {
    return this.prisma.event.create({
      data: {
        workspaceId,
        connectorId: dto.connectorId,
        rawPayload:  dto.rawPayload,
        status:      'PENDING',
      },
    });
  }

  async process(eventId: string, dto: ProcessEventDto) {
    return this.prisma.$transaction(async (tx) => {
      const event = await tx.event.update({
        where: { id: eventId },
        data: {
          status:      dto.ignored ? 'IGNORED' : 'PROCESSED',
          processedAt: new Date(),
          agentNotes:  dto.agentNotes ?? null,
        },
      });

      if (!dto.ignored && dto.items.length > 0) {
        await tx.item.createMany({
          data: dto.items.map((item) => ({
            workspaceId: event.workspaceId,
            eventId:     event.id,
            type:        item.type,
            title:       item.title,
            description: item.description ?? null,
            priority:    item.priority,
            dueDate:     item.dueDate ? new Date(item.dueDate) : null,
            metadata:    item.metadata ?? null,
            status:      'OPEN',
          })),
        });
      }

      return event;
    });
  }
}
```

**Step 3: Controller**

```typescript
// event.controller.ts
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { EventsService } from '../../application/events.service.js';
import { IngestEventDto } from '../dto/ingest-event.dto.js';
import { ProcessEventDto } from '../dto/process-event.dto.js';
import { EventResponseDto } from '../dto/event-response.dto.js';

const WorkspaceParam = z.object({ workspaceId: z.string() });
const EventParam     = z.object({ workspaceId: z.string(), eventId: z.string() });

export const eventController: FastifyPluginAsyncZod = async (app) => {
  const svc = new EventsService(app.prisma);

  // Listar eventos do workspace
  app.get('/:workspaceId/events', {
    schema: {
      tags: ['Events'],
      operationId: 'list',
      params: WorkspaceParam,
      response: { 200: z.array(EventResponseDto) },
    },
  }, async (req) => svc.findByWorkspace(req.params.workspaceId));

  // Eventos pendentes (usado pelo agente via MCP)
  app.get('/:workspaceId/events/pending', {
    schema: {
      tags: ['Events'],
      operationId: 'listPending',
      params: WorkspaceParam,
      response: { 200: z.array(EventResponseDto) },
    },
  }, async (req) => svc.findPending(req.params.workspaceId));

  // Ingestão de evento (chamado pelos connectors)
  app.post('/:workspaceId/events', {
    schema: {
      tags: ['Events'],
      operationId: 'ingest',
      params: WorkspaceParam,
      body: IngestEventDto,
      response: { 201: EventResponseDto },
    },
  }, async (req, reply) => {
    const event = await svc.ingest(req.params.workspaceId, req.body);
    return reply.status(201).send(event);
  });

  // Processar evento (chamado pelo agente via MCP após LLM classify)
  app.post('/:workspaceId/events/:eventId/process', {
    schema: {
      tags: ['Events'],
      operationId: 'process',
      params: EventParam,
      body: ProcessEventDto,
      response: { 200: EventResponseDto },
    },
  }, async (req) => svc.process(req.params.eventId, req.body));
};
```

**Step 4: Module + registro**

```typescript
// event.module.ts
import type { FastifyPluginAsync } from 'fastify';
import { eventController } from './presentation/controller/event.controller.js';

export const EventsModule: FastifyPluginAsync = async (app) => {
  app.register(eventController);
};
```

Adicionar em `app.module.ts`:
```typescript
await app.register(EventsModule); // sem prefix — as rotas já têm /:workspaceId/
```

**Step 5: Testar ingest → process flow**

```bash
# Criar workspace de teste
WS=$(curl -s -X POST http://localhost:3061/workspaces/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","slug":"teste"}' | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")

# Criar connector mock (antes de ter o context de connectors)
# Por enquanto, criar direto no prisma studio:
# npx prisma studio --port 5555

# Ingerir um evento
curl -s -X POST "http://localhost:3061/$WS/events" \
  -H "Content-Type: application/json" \
  -d '{"connectorId":"CONNECTOR_ID","rawPayload":{"type":"message","from":"marina","body":"confirma jantar 19h?"}}' \
  | python3 -m json.tool
```

**Step 6: Commit**

```bash
git add apps/api/src/contexts/events/
git commit -m "feat(api): add events context with ingest and process endpoints"
```

---

### Task 4: Contexto `items` — o que o usuário vê

**Files:**
- Create: `apps/api/src/contexts/items/presentation/dto/item-response.dto.ts`
- Create: `apps/api/src/contexts/items/presentation/dto/create-item.dto.ts`
- Create: `apps/api/src/contexts/items/presentation/dto/update-item.dto.ts`
- Create: `apps/api/src/contexts/items/application/items.service.ts`
- Create: `apps/api/src/contexts/items/presentation/controller/item.controller.ts`
- Create: `apps/api/src/contexts/items/item.module.ts`

**Step 1: DTOs**

```typescript
// item-response.dto.ts
import { z } from 'zod';

const dt  = z.preprocess((v) => (v instanceof Date ? v.toISOString() : v), z.string().datetime());
const ndt = z.preprocess((v) => (v instanceof Date ? v.toISOString() : v ?? null), z.string().datetime().nullable());

export const ItemResponseDto = z.object({
  id:           z.string(),
  workspaceId:  z.string(),
  eventId:      z.string().nullable(),
  type:         z.enum(['TASK', 'FOLLOW_UP', 'REMINDER', 'NOTIFICATION', 'DRAFT']),
  title:        z.string(),
  description:  z.string().nullable(),
  priority:     z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  status:       z.enum(['OPEN', 'DONE', 'SNOOZED', 'DISMISSED']),
  dueDate:      ndt,
  snoozedUntil: ndt,
  metadata:     z.record(z.unknown()).nullable(),
  createdAt:    dt,
  updatedAt:    dt,
});
export type ItemResponseDto = z.infer<typeof ItemResponseDto>;
```

```typescript
// create-item.dto.ts (criação manual)
import { z } from 'zod';

export const CreateItemDto = z.object({
  type:        z.enum(['TASK', 'FOLLOW_UP', 'REMINDER', 'NOTIFICATION', 'DRAFT']).default('TASK'),
  title:       z.string().min(1),
  description: z.string().optional(),
  priority:    z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  dueDate:     z.string().datetime().optional(),
  metadata:    z.record(z.unknown()).optional(),
});
export type CreateItemDto = z.infer<typeof CreateItemDto>;
```

```typescript
// update-item.dto.ts
import { z } from 'zod';

export const UpdateItemDto = z.object({
  title:        z.string().min(1).optional(),
  description:  z.string().optional(),
  priority:     z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  status:       z.enum(['OPEN', 'DONE', 'SNOOZED', 'DISMISSED']).optional(),
  dueDate:      z.string().datetime().optional(),
  snoozedUntil: z.string().datetime().optional(),
});
export type UpdateItemDto = z.infer<typeof UpdateItemDto>;
```

**Step 2: Service**

```typescript
// items.service.ts
import type { PrismaClient } from '@prisma/client';
import type { CreateItemDto } from '../presentation/dto/create-item.dto.js';
import type { UpdateItemDto } from '../presentation/dto/update-item.dto.js';

export class ItemsService {
  constructor(private readonly prisma: PrismaClient) {}

  findByWorkspace(workspaceId: string, type?: string) {
    return this.prisma.item.findMany({
      where: {
        workspaceId,
        ...(type ? { type: type as any } : {}),
        status: { not: 'DISMISSED' },
      },
      orderBy: [
        { priority: 'desc' },
        { dueDate: 'asc' },
        { createdAt: 'desc' },
      ],
    });
  }

  findById(id: string) {
    return this.prisma.item.findUnique({ where: { id } });
  }

  create(workspaceId: string, dto: CreateItemDto) {
    return this.prisma.item.create({
      data: {
        workspaceId,
        eventId:     null,
        type:        dto.type,
        title:       dto.title,
        description: dto.description ?? null,
        priority:    dto.priority,
        dueDate:     dto.dueDate ? new Date(dto.dueDate) : null,
        metadata:    dto.metadata ?? null,
        status:      'OPEN',
      },
    });
  }

  update(id: string, dto: UpdateItemDto) {
    return this.prisma.item.update({
      where: { id },
      data: {
        ...dto,
        dueDate:      dto.dueDate      ? new Date(dto.dueDate)      : undefined,
        snoozedUntil: dto.snoozedUntil ? new Date(dto.snoozedUntil) : undefined,
      },
    });
  }

  dismiss(id: string) {
    return this.prisma.item.update({
      where: { id },
      data: { status: 'DISMISSED' },
    });
  }
}
```

**Step 3: Controller — rotas aninhadas em /workspaces/:workspaceId/items**

```typescript
// item.controller.ts
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { ItemsService } from '../../application/items.service.js';
import { CreateItemDto } from '../dto/create-item.dto.js';
import { ItemResponseDto } from '../dto/item-response.dto.js';
import { UpdateItemDto } from '../dto/update-item.dto.js';

const WsParam   = z.object({ workspaceId: z.string() });
const ItemParam = z.object({ workspaceId: z.string(), itemId: z.string() });

export const itemController: FastifyPluginAsyncZod = async (app) => {
  const svc = new ItemsService(app.prisma);

  app.get('/:workspaceId/items', {
    schema: {
      tags: ['Items'],
      operationId: 'list',
      params: WsParam,
      querystring: z.object({ type: z.string().optional() }),
      response: { 200: z.array(ItemResponseDto) },
    },
  }, async (req) => svc.findByWorkspace(req.params.workspaceId, req.query.type));

  app.post('/:workspaceId/items', {
    schema: {
      tags: ['Items'],
      operationId: 'create',
      params: WsParam,
      body: CreateItemDto,
      response: { 201: ItemResponseDto },
    },
  }, async (req, reply) => {
    const item = await svc.create(req.params.workspaceId, req.body);
    return reply.status(201).send(item);
  });

  app.patch('/:workspaceId/items/:itemId', {
    schema: {
      tags: ['Items'],
      operationId: 'update',
      params: ItemParam,
      body: UpdateItemDto,
      response: { 200: ItemResponseDto },
    },
  }, async (req) => svc.update(req.params.itemId, req.body));

  app.delete('/:workspaceId/items/:itemId', {
    schema: {
      tags: ['Items'],
      operationId: 'dismiss',
      params: ItemParam,
      response: { 200: z.object({ dismissed: z.boolean() }) },
    },
  }, async (req) => {
    await svc.dismiss(req.params.itemId);
    return { dismissed: true };
  });
};
```

**Step 4: Commit**

```bash
git add apps/api/src/contexts/items/
git commit -m "feat(api): add items context (LLM output: tasks, follow-ups, etc.)"
```

---

### Task 5: Atualizar SDK (Orval) com todos os novos endpoints

**Step 1: Gerar OpenAPI**

```bash
cd ~/dev/tasky
pnpm generate:openapi
```

**Step 2: Rodar Orval**

```bash
pnpm orval
```

**Step 3: Verificar hooks gerados**

```bash
ls sdk/tasky/react-query/
# deve ter: workspaces/, events/, items/, tasks/
grep "export function use" sdk/tasky/react-query/workspaces/workspaces.ts
```

Expected: `useWorkspacesList`, `useWorkspacesCreate`, `useWorkspacesGetBySlug`, etc.

**Step 4: Commit**

```bash
git add sdk/ apps/api/openapi.json
git commit -m "feat(sdk): regenerate hooks for workspaces, events, items"
```

---

### Task 6: Frontend — instalar React Router e Zustand

**Files:**
- Modify: `apps/web/package.json`
- Create: `apps/web/src/store/app.store.ts`
- Create: `apps/web/src/router.tsx`
- Modify: `apps/web/src/main.tsx`

**Step 1: Adicionar dependências**

```bash
cd ~/dev/tasky
pnpm --filter @tasky/web add react-router zustand
```

**Step 2: App store (Zustand)**

```typescript
// apps/web/src/store/app.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WorkspaceInfo {
  id:          string;
  name:        string;
  slug:        string;
  avatarColor: string;
}

interface AppStore {
  workspaces:           WorkspaceInfo[];
  activeWorkspaceSlug:  string | null;
  setWorkspaces:        (ws: WorkspaceInfo[]) => void;
  setActiveWorkspace:   (slug: string) => void;
  activeWorkspace:      () => WorkspaceInfo | null;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      workspaces:          [],
      activeWorkspaceSlug: null,

      setWorkspaces: (ws) => set({
        workspaces: ws,
        activeWorkspaceSlug: get().activeWorkspaceSlug ?? ws[0]?.slug ?? null,
      }),

      setActiveWorkspace: (slug) => set({ activeWorkspaceSlug: slug }),

      activeWorkspace: () => {
        const slug = get().activeWorkspaceSlug;
        return get().workspaces.find((w) => w.slug === slug) ?? null;
      },
    }),
    { name: 'tasky-app-store' },
  ),
);
```

**Step 3: Router**

```typescript
// apps/web/src/router.tsx
import { createBrowserRouter, Navigate } from 'react-router';
import { AppLayout } from './layouts/app-layout.tsx';

// Lazy imports por rota
const DashboardPage   = lazy(() => import('./pages/dashboard.tsx').then(m => ({ default: m.DashboardPage })));
const InboxPage       = lazy(() => import('./pages/inbox.tsx').then(m => ({ default: m.InboxPage })));
const TasksPage       = lazy(() => import('./pages/tasks.tsx').then(m => ({ default: m.TasksPage })));
const AgendaPage      = lazy(() => import('./pages/agenda.tsx').then(m => ({ default: m.AgendaPage })));
const EventsPage      = lazy(() => import('./pages/events.tsx').then(m => ({ default: m.EventsPage })));
const ConnectorsPage  = lazy(() => import('./pages/connectors.tsx').then(m => ({ default: m.ConnectorsPage })));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/pessoal/dashboard" replace />,
  },
  {
    path: '/:workspaceSlug',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard',   element: <Suspense fallback={null}><DashboardPage /></Suspense> },
      { path: 'inbox',       element: <Suspense fallback={null}><InboxPage /></Suspense> },
      { path: 'tasks',       element: <Suspense fallback={null}><TasksPage /></Suspense> },
      { path: 'agenda',      element: <Suspense fallback={null}><AgendaPage /></Suspense> },
      { path: 'events',      element: <Suspense fallback={null}><EventsPage /></Suspense> },
      { path: 'connectors',  element: <Suspense fallback={null}><ConnectorsPage /></Suspense> },
      { path: 'connectors/:connectorId', element: <Suspense fallback={null}><ConnectorsPage /></Suspense> },
    ],
  },
]);
```

**Step 4: Atualizar main.tsx**

```tsx
// main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './router.tsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 1 } },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
```

**Step 5: AppLayout com rail e workspace-scoped queries**

```tsx
// apps/web/src/layouts/app-layout.tsx
import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Rail } from '../components/rail.tsx';
import { useAppStore } from '../store/app.store.ts';
import { useWorkspacesList } from '@tasky/sdk';

export function AppLayout() {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setWorkspaces, setActiveWorkspace, activeWorkspaceSlug } = useAppStore();

  const { data: workspaces = [] } = useWorkspacesList();

  // Sync workspaces to store on load
  useEffect(() => {
    if (workspaces.length > 0) setWorkspaces(workspaces);
  }, [workspaces]);

  // Sync URL slug to store
  useEffect(() => {
    if (workspaceSlug && workspaceSlug !== activeWorkspaceSlug) {
      setActiveWorkspace(workspaceSlug);
      queryClient.resetQueries(); // invalida tudo ao trocar workspace
    }
  }, [workspaceSlug]);

  const handleNavigate = (path: string) => {
    navigate(`/${workspaceSlug}/${path}`);
  };

  return (
    <div className="tk">
      <Rail
        active={/* derive from current route */ 'dashboard'}
        workspaces={workspaces}
        activeSlug={workspaceSlug ?? ''}
        onNavigate={handleNavigate}
        onSwitchWorkspace={(slug) => navigate(`/${slug}/dashboard`)}
      />
      <Outlet />
    </div>
  );
}
```

**Step 6: Commit**

```bash
git add apps/web/src/
git commit -m "feat(web): add React Router + Zustand workspace store"
```

---

### Task 7: Workspace Switcher no Rail

O Rail precisa ganhar:
1. Switcher no topo (nome + avatar colorido + dropdown)
2. Badge de contagem de items pendentes por workspace (futuro)

**Files:**
- Create: `apps/web/src/components/workspace-switcher.tsx`
- Modify: `apps/web/src/components/rail.tsx`

```tsx
// workspace-switcher.tsx
import { useState } from 'react';
import { Icon } from './icon.tsx';
import type { WorkspaceInfo } from '../store/app.store.ts';

interface Props {
  workspaces:    WorkspaceInfo[];
  activeSlug:    string;
  onSwitch:      (slug: string) => void;
  onCreate?:     () => void;
}

export function WorkspaceSwitcher({ workspaces, activeSlug, onSwitch, onCreate }: Props) {
  const [open, setOpen] = useState(false);
  const active = workspaces.find((w) => w.slug === activeSlug);

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          width: 38, height: 38, borderRadius: 11,
          background: active?.avatarColor ?? 'var(--accent)',
          color: '#06281a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 15, cursor: 'pointer',
          marginBottom: 38,
        }}
        onClick={() => setOpen((o) => !o)}
        title={active?.name}
      >
        {active?.name?.[0]?.toUpperCase() ?? 't'}
      </div>

      {open && (
        <>
          {/* backdrop */}
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 49 }}
            onClick={() => setOpen(false)}
          />
          <div style={{
            position: 'absolute', left: 50, top: 0, zIndex: 50,
            background: 'var(--surface)',
            border: '1px solid var(--hairline-2)',
            borderRadius: 14, padding: '8px 0',
            minWidth: 200,
            boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
          }}>
            <div style={{ padding: '6px 14px 10px', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
              Workspaces
            </div>
            {workspaces.map((ws) => (
              <div
                key={ws.slug}
                onClick={() => { onSwitch(ws.slug); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 14px', cursor: 'pointer',
                  background: ws.slug === activeSlug ? 'var(--surface-2)' : 'transparent',
                  transition: 'background 0.15s',
                }}
              >
                <div style={{
                  width: 26, height: 26, borderRadius: 8,
                  background: ws.avatarColor, color: '#06281a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 12, flexShrink: 0,
                }}>
                  {ws.name[0]?.toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{ws.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-faint)' }}>{ws.slug}</div>
                </div>
                {ws.slug === activeSlug && (
                  <div style={{ marginLeft: 'auto', color: 'var(--accent)' }}>
                    <Icon name="check" size={15} stroke={2.4} />
                  </div>
                )}
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--hairline)', margin: '8px 0 0' }} />
            <div
              onClick={() => { onCreate?.(); setOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', cursor: 'pointer', color: 'var(--text-dim)', fontSize: 13.5 }}
            >
              <Icon name="plus" size={16} /> Novo workspace
            </div>
          </div>
        </>
      )}
    </div>
  );
}
```

**Commit:**
```bash
git add apps/web/src/components/workspace-switcher.tsx
git commit -m "feat(web): add workspace switcher component"
```

---

### Task 8: Inbox page — Items priorizados pelo agente

**Files:**
- Create: `apps/web/src/pages/inbox.tsx`

A Inbox exibe Items de todos os tipos (não só TASK), ordenados por prioridade, com origem visível (qual connector gerou o evento que gerou o item).

```tsx
// apps/web/src/pages/inbox.tsx
import { useParams } from 'react-router';
import { useItemsList, useItemsUpdate, useItemsDismiss } from '@tasky/sdk';
import { useQueryClient } from '@tanstack/react-query';
import { Icon } from '../components/icon.tsx';

const PRIORITY_ORDER = { URGENT: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
const PRIORITY_COLOR = {
  URGENT: 'var(--accent)',
  HIGH:   '#F87171',
  MEDIUM: 'var(--text-dim)',
  LOW:    'var(--text-faint)',
};
const TYPE_ICON = {
  TASK:         'checklist',
  FOLLOW_UP:    'repeat',
  REMINDER:     'bell',
  NOTIFICATION: 'dot',
  DRAFT:        'doc',
} as const;

export function InboxPage() {
  const { workspaceSlug } = useParams();
  // hooks gerados pelo orval usam workspaceId como path param
  // ajustar conforme os hooks reais gerados
  const { data: items = [], isLoading } = useItemsList(workspaceSlug!);
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: [`/${workspaceSlug}/items`] });

  const { mutate: updateItem } = useItemsUpdate({ mutation: { onSuccess: invalidate } });
  const { mutate: dismissItem } = useItemsDismiss({ mutation: { onSuccess: invalidate } });

  const sorted = [...items].sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
  );

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content">
          <div className="tk-head">
            <div>
              <h1 className="tk-greet">Inbox</h1>
              <div className="tk-date">
                {isLoading ? 'Carregando…' : `${items.filter(i => i.status === 'OPEN').length} itens abertos`}
              </div>
            </div>
            <div className="tk-headtools">
              <div className="tk-iconbtn"><Icon name="sliders" size={19} /></div>
            </div>
          </div>

          <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sorted.map((item) => (
              <div key={item.id} className="tk-signal" style={{ opacity: item.status !== 'OPEN' ? 0.5 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ color: PRIORITY_COLOR[item.priority] }}>
                    <Icon name={TYPE_ICON[item.type] ?? 'dot'} size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15.5, fontWeight: 500 }}>{item.title}</div>
                    {item.description && (
                      <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 4 }}>{item.description}</div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {item.status === 'OPEN' && (
                      <>
                        <span
                          className="tk-mini-primary"
                          onClick={() => updateItem({ workspaceId: workspaceSlug!, itemId: item.id, data: { status: 'DONE' } })}
                        >
                          Concluir
                        </span>
                        <span
                          className="tk-mini-ghost"
                          onClick={() => dismissItem({ workspaceId: workspaceSlug!, itemId: item.id })}
                        >
                          Ignorar
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: PRIORITY_COLOR[item.priority] }}>
                    {item.priority}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>{item.type.replace('_', ' ')}</span>
                  {item.dueDate && (
                    <span style={{ fontSize: 11, color: 'var(--text-faint)', display: 'inline-flex', gap: 4 }}>
                      <Icon name="clock" size={12} />
                      {new Date(item.dueDate).toLocaleString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Commit:**
```bash
git add apps/web/src/pages/inbox.tsx
git commit -m "feat(web): add inbox page showing LLM-processed items"
```

---

### Task 9: Event log page (auditoria)

**Files:**
- Create: `apps/web/src/pages/events.tsx`

Tela de debug/auditoria que mostra os eventos brutos recebidos, seu status de processamento e os items que geraram.

```tsx
// apps/web/src/pages/events.tsx
import { useParams } from 'react-router';
import { useEventsList } from '@tasky/sdk';
import { Icon } from '../components/icon.tsx';

const STATUS_COLOR = {
  PENDING:    'var(--text-faint)',
  PROCESSING: 'var(--accent)',
  PROCESSED:  '#4ADE80',
  IGNORED:    'var(--text-faint)',
  FAILED:     '#F87171',
};

export function EventsPage() {
  const { workspaceSlug } = useParams();
  const { data: events = [], isLoading } = useEventsList(workspaceSlug!);

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content tk-wide">
          <div className="tk-head">
            <div>
              <h1 className="tk-greet">Eventos</h1>
              <div className="tk-date">
                {isLoading ? 'Carregando…' : `${events.length} eventos · log de auditoria`}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 44 }}>
            <div className="tk-cfg-card">
              {events.map((ev) => (
                <div key={ev.id} className="tk-log">
                  <span className="t" style={{ fontSize: 12, flex: '0 0 120px' }}>
                    {new Date(ev.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-dim)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {ev.connectorId}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: STATUS_COLOR[ev.status], flex: '0 0 100px', textAlign: 'right' }}>
                    {ev.status}
                  </span>
                  {ev.agentNotes && (
                    <span style={{ fontSize: 11, color: 'var(--text-faint)', marginLeft: 16, flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Icon name="spark" size={12} />{ev.agentNotes.slice(0, 60)}
                    </span>
                  )}
                </div>
              ))}
              {!isLoading && events.length === 0 && (
                <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-faint)', fontSize: 14 }}>
                  Nenhum evento recebido ainda.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Commit:**
```bash
git add apps/web/src/pages/events.tsx
git commit -m "feat(web): add event log page (audit trail)"
```

---

### Task 10: Agente MCP — loop de processamento

> ⚠️ Esta task define a arquitetura do agente. A implementação completa depende de uma sessão dedicada.

**Visão geral:**

O agente é um processo Node.js que roda fora da API principal. Usa o `@anthropic-ai/sdk` com tools/MCP para conectar ao tenant do usuário.

**Files:**
- Create: `apps/agent/package.json`
- Create: `apps/agent/src/main.ts`
- Create: `apps/agent/src/tools/tasky-tools.ts`
- Create: `apps/agent/src/agent-loop.ts`

**Estrutura do agente:**

```typescript
// apps/agent/src/agent-loop.ts
import Anthropic from '@anthropic-ai/sdk';
import { getTaskyTools, executeTool } from './tools/tasky-tools.js';

const PROCESS_INTERVAL_MS = 5 * 60 * 1000; // 5 min

export async function startAgentLoop(workspaceId: string) {
  const client = new Anthropic();
  console.log(`[Agent] Iniciando loop para workspace: ${workspaceId}`);

  const loop = async () => {
    try {
      // 1. Busca eventos pendentes
      const pendingRes = await fetch(
        `${process.env.TASKY_API_URL}/${workspaceId}/events/pending`,
      );
      const pending = await pendingRes.json();

      if (pending.length === 0) {
        console.log('[Agent] Nenhum evento pendente.');
        return;
      }

      console.log(`[Agent] Processando ${pending.length} evento(s)...`);

      // 2. Para cada evento, chama o LLM
      for (const event of pending) {
        const systemPrompt = `
Você é o agente pessoal de secretária do usuário.
Analise o evento e decida:
1. É acionável? (requer alguma ação do usuário)
2. Se sim: que tipo de item criar? (TASK, FOLLOW_UP, REMINDER, NOTIFICATION, DRAFT)
3. Qual a prioridade? (LOW, MEDIUM, HIGH, URGENT)
4. Quando vence (se aplicável)?
5. Um título claro e objetivo em português.

Se o evento não requer ação, retorne ignored=true.
Você pode criar múltiplos items por evento (ex: tarefa + lembrete de follow-up).
        `.trim();

        const userPrompt = `
Evento recebido:
Conector: ${event.connectorId}
Payload: ${JSON.stringify(event.rawPayload, null, 2)}
        `.trim();

        const response = await client.messages.create({
          model: 'claude-opus-4-8',
          max_tokens: 1024,
          tools: getTaskyTools(),
          messages: [
            { role: 'user', content: userPrompt },
          ],
          system: systemPrompt,
        });

        // 3. Executa as tool calls do LLM
        const toolUses = response.content.filter((b) => b.type === 'tool_use');
        for (const tool of toolUses) {
          await executeTool(tool.name, tool.input as any, event, workspaceId);
        }

        // 4. Se LLM não chamou nenhuma tool → ignorar evento
        if (toolUses.length === 0) {
          await fetch(
            `${process.env.TASKY_API_URL}/${workspaceId}/events/${event.id}/process`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ items: [], ignored: true }),
            },
          );
        }
      }
    } catch (err) {
      console.error('[Agent] Erro no loop:', err);
    }
  };

  // Primeira execução imediata
  await loop();

  // Loop a cada 5 minutos
  setInterval(loop, PROCESS_INTERVAL_MS);
}
```

```typescript
// apps/agent/src/tools/tasky-tools.ts
export function getTaskyTools(): Anthropic.Tool[] {
  return [
    {
      name: 'create_items',
      description: 'Cria um ou mais items acionáveis a partir de um evento. Cada item pode ser uma tarefa, follow-up, lembrete, notificação ou rascunho.',
      input_schema: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                type:        { type: 'string', enum: ['TASK', 'FOLLOW_UP', 'REMINDER', 'NOTIFICATION', 'DRAFT'] },
                title:       { type: 'string' },
                description: { type: 'string' },
                priority:    { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] },
                dueDate:     { type: 'string', description: 'ISO 8601 datetime. Opcional.' },
                metadata:    { type: 'object', description: 'Dados extras (URL do PR, thread ID, etc.)' },
              },
              required: ['type', 'title', 'priority'],
            },
          },
          agentNotes: { type: 'string', description: 'Raciocínio breve do agente (para auditoria).' },
        },
        required: ['items'],
      },
    },
    {
      name: 'ignore_event',
      description: 'Marca o evento como ignorado — não requer ação do usuário.',
      input_schema: {
        type: 'object',
        properties: {
          reason: { type: 'string', description: 'Motivo pelo qual o evento foi ignorado.' },
        },
        required: ['reason'],
      },
    },
  ];
}

export async function executeTool(
  name: string,
  input: any,
  event: any,
  workspaceId: string,
) {
  const base = `${process.env.TASKY_API_URL}`;

  if (name === 'create_items') {
    await fetch(`${base}/${workspaceId}/events/${event.id}/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items:      input.items,
        agentNotes: input.agentNotes ?? null,
        ignored:    false,
      }),
    });
  }

  if (name === 'ignore_event') {
    await fetch(`${base}/${workspaceId}/events/${event.id}/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items:      [],
        agentNotes: input.reason,
        ignored:    true,
      }),
    });
  }
}
```

**Variáveis de ambiente necessárias:**

```
ANTHROPIC_API_KEY=sk-ant-...
TASKY_API_URL=http://localhost:3061
TASKY_WORKSPACE_ID=workspace-cuid-here
```

**Commit:**
```bash
mkdir -p apps/agent/src/tools
git add apps/agent/
git commit -m "feat(agent): add LLM processing loop with MCP tool calls"
```

---

## Perguntas abertas / decisões futuras

1. **Auth**: ainda não há autenticação. O próximo passo natural é JWT + `userId` nos requests. Por ora, WorkspaceMember pode ser seedado manualmente.

2. **Sub-produto complexo**: Um evento de PR no GitHub pode gerar:
   - Task "revisar PR" com metadata.prUrl
   - Draft com sugestão de review gerada pelo LLM
   - Follow-up agendado para daqui 2h se não revisar
   Todos os três são Items distintos do mesmo Event — o modelo já suporta isso via `eventId` na tabela `items`.

3. **Polling vs webhook**: Connectors que usam polling (ex: checar inbox do Gmail a cada X min) precisam de um worker separado que cria Events periodicamente. Pode usar o mesmo BullMQ que o nserp usa, ou um simples `setInterval` num processo dedicado.

4. **Agent vs MCP server**: A arquitetura atual tem o Agent fazendo HTTP puro para a API. Uma evolução é transformar a API em um MCP Server (expondo tools via stdio/SSE), e o Claude Code pode conectar diretamente via `claude --mcp`. Isso desbloqueia usar o Claude Code CLI como agente sem um processo separado.

5. **Tenant isolation**: Por ora `workspaceId` é passado como param. Com auth, o middleware valida que o usuário tem acesso ao workspace e injeta no contexto da request.

---

## Checklist final

- [ ] Schema Prisma com Workspace, User, WorkspaceMember, Connector, Event, Item
- [ ] API: `/workspaces` CRUD
- [ ] API: `/:workspaceId/events` ingest + process
- [ ] API: `/:workspaceId/items` CRUD
- [ ] SDK regenerado com todos os hooks
- [ ] Frontend: React Router `/:workspaceSlug/*`
- [ ] Frontend: Zustand store com workspace ativo
- [ ] Frontend: Workspace switcher no Rail
- [ ] Frontend: AppLayout com outlet roteado
- [ ] Frontend: InboxPage exibindo Items priorizados
- [ ] Frontend: EventsPage (log de auditoria)
- [ ] Agent: loop de processamento com Claude SDK
- [ ] Agent: tools `create_items` + `ignore_event`
