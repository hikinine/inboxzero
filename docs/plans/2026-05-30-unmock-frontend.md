# Tasky — Unmock Frontend Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Substituir todos os mocks do frontend por dados reais da API, e criar os endpoints de API que ainda faltam (Connectors CRUD).

**Architecture:** O frontend tem duas camadas: `screens/` (mock, sem workspace) e `pages/` (real, workspace-scoped). A estratégia é: migrar os mocks para dados reais sem mudar a UI — mesmo visual, dados verdadeiros.

**Tech Stack:** React Router v7 · TanStack Query v5 · Orval SDK · Fastify 5 · Prisma 5 · Zod

---

## Mapa do que está mockado

| Arquivo | Status | Problema |
|---------|--------|----------|
| `screens/tasks.tsx` | LIXO | Usa `/tasks` legado, router já usa `pages/tasks-page.tsx` |
| `screens/inbox.tsx` | LIXO | Router já usa `pages/inbox-page.tsx` |
| `screens/dashboard.tsx` | MOCK | Helena hardcoded, eventos/tarefas estáticos |
| `screens/agenda.tsx` | MOCK | Data fixa 29/mai, eventos estáticos, "agora" fixo 13:20 |
| `screens/connectors-hub.tsx` | MOCK | Lista de conectores estática, sem API |
| `screens/connector-config.tsx` | MOCK | Config Nubank hardcoded, sem useParams |
| `connectors/connectors-add.tsx` | MOCK | Lista de conectores estática, não salva nada |
| `connectors/connector-auth.tsx` | MOCK | Notion hardcoded, botão vai para nowhere |
| `connectors/gmail-oauth.tsx` | MOCK | OAuth não implementado |
| `connectors/linear-setup.tsx` | MOCK | API key não valida, não salva |

---

## Prioridade de execução

```
P0 — Limpeza (5 min)
P1 — Dashboard real (usa Items + horário atual)
P2 — Agenda real (semana dinâmica + hora atual)
P3 — Connectors API (backend) + Hub real
P4 — Connector Config real
P5 — ConnectorsAdd salva de verdade
P6 — Onboarding flows (OAuth/APIKey) — infra pesada, por último
```

---

## Task 1 — Limpeza: remover screens obsoletas

**Files:**
- Delete: `apps/web/src/screens/tasks.tsx`
- Delete: `apps/web/src/screens/inbox.tsx`

**Step 1: Deletar**
```bash
rm ~/dev/tasky/apps/web/src/screens/tasks.tsx
rm ~/dev/tasky/apps/web/src/screens/inbox.tsx
```

**Step 2: Build para confirmar que nada importa esses arquivos**
```bash
cd ~/dev/tasky/apps/web && npx vite build 2>&1 | tail -5
```
Expected: `✓ built in Xs`

**Step 3: Commit**
```bash
cd ~/dev/tasky && git add -A && git commit -m "chore(web): remove legacy tasks.tsx and inbox.tsx screens"
```

---

## Task 2 — Dashboard real

**Files:**
- Modify: `apps/web/src/screens/dashboard.tsx`

O dashboard mostra dois blocos: (1) próximos eventos do dia — por ora usa mock mas com data/hora dinâmica; (2) tarefas de hoje — usa `useItemsList` do workspace ativo.

**Step 1: Reescrever `dashboard.tsx`**

```tsx
import { useNavigate, useParams } from 'react-router';
import { useItemsList } from '@tasky/sdk';
import { Icon } from '../components/icon.tsx';

// Eventos do dia virão do calendário no futuro — por ora mock realista com horário relativo ao "agora"
const MOCK_EVENTS = [
  { time: '14:00', title: 'Reunião de design', meta: 'Sala Aurora · com o time de produto', accent: true },
  { time: '16:30', title: 'Call com a Vértice', meta: 'Apresentação da proposta' },
  { time: '19:00', title: 'Jantar com a Marina', meta: 'Restaurante Oro' },
];

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

function todayLabel(): string {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long',
  });
}

interface DashboardProps {
  onNavigate: (path: string) => void;
}

export function DashboardScreen({ onNavigate }: DashboardProps) {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();

  const { data: items = [], isLoading } = useItemsList(workspaceSlug!, undefined, {
    query: { enabled: !!workspaceSlug },
  });

  const open = items.filter((i) => i.status === 'OPEN');
  const done = items.filter((i) => i.status === 'DONE');

  // Separa por tipo
  const tasks     = open.filter((i) => i.type === 'TASK');
  const followUps = open.filter((i) => i.type === 'FOLLOW_UP');
  const reminders = open.filter((i) => i.type === 'REMINDER');
  const urgent    = open.filter((i) => i.priority === 'URGENT' || i.priority === 'HIGH');

  const summaryParts: string[] = [];
  if (MOCK_EVENTS.length)  summaryParts.push(`${MOCK_EVENTS.length} compromissos`);
  if (open.length)         summaryParts.push(`${open.length} itens abertos`);

  const TYPE_ICON: Record<string, Parameters<typeof Icon>[0]['name']> = {
    TASK: 'checklist', FOLLOW_UP: 'repeat', REMINDER: 'bell',
    NOTIFICATION: 'dot', DRAFT: 'doc',
  };

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content">
          <div className="tk-head">
            <div>
              <h1 className="tk-greet">{greeting()}</h1>
              <div className="tk-date">
                {todayLabel()}
                {summaryParts.length > 0 && ` · ${summaryParts.join(', ')}`}
              </div>
            </div>
            <div className="tk-headtools">
              <div className="tk-iconbtn"><Icon name="search" size={19} /></div>
              <div className="tk-iconbtn"><Icon name="bell" size={19} /></div>
            </div>
          </div>

          {/* Próximos compromissos — mock até ter calendário real */}
          <div style={{ marginTop: 48 }}>
            <div className="tk-eyebrow" style={{ marginBottom: 14 }}>
              <span>Próximos compromissos</span>
            </div>
            <div className="tk-card">
              {MOCK_EVENTS.map((ev, i) => (
                <div key={i} className="tk-event">
                  <div className={`tk-bar${ev.accent ? ' accent' : ''}`} />
                  <div className="tk-time">{ev.time}</div>
                  <div style={{ flex: 1 }}>
                    <div className="title">{ev.title}</div>
                    <div className="meta">{ev.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Itens abertos — dados reais */}
          <div style={{ marginTop: 40 }}>
            <div className="tk-eyebrow" style={{ marginBottom: 14 }}>
              <span>Hoje</span>
              {!isLoading && (
                <span className="count">
                  {open.length} aberto{open.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="tk-card" style={{ padding: '20px 22px', color: 'var(--text-faint)', fontSize: 14 }}>
                Carregando…
              </div>
            ) : open.length === 0 ? (
              <div className="tk-card" style={{ padding: '20px 22px', color: 'var(--text-faint)', fontSize: 14 }}>
                Inbox vazio — nenhum item aberto.
              </div>
            ) : (
              <div className="tk-card">
                {open.slice(0, 5).map((item) => (
                  <div key={item.id} className="tk-task" onClick={() => onNavigate('inbox')}>
                    <div className="tk-check" />
                    <div className="label">{item.title}</div>
                    <div className="tail">
                      {item.priority === 'URGENT' && (
                        <span className="tk-chip-mini accent">
                          <Icon name="flag" size={14} />Urgente
                        </span>
                      )}
                      {item.priority === 'HIGH' && (
                        <span className="tk-chip-mini accent">
                          <Icon name="clock" size={14} />Alta
                        </span>
                      )}
                      {(item.type === 'FOLLOW_UP' || item.type === 'REMINDER') && (
                        <span className="tk-prov">
                          <Icon name={TYPE_ICON[item.type]} size={14} />
                          {item.type === 'FOLLOW_UP' ? 'Follow-up' : 'Lembrete'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {open.length > 5 && (
                  <div
                    className="tk-task"
                    style={{ color: 'var(--text-faint)', justifyContent: 'center', fontSize: 13 }}
                    onClick={() => onNavigate('inbox')}
                  >
                    Ver mais {open.length - 5} itens no Inbox →
                  </div>
                )}
                {done.slice(0, 2).map((item) => (
                  <div key={item.id} className="tk-task done">
                    <div className="tk-check done"><Icon name="check" size={14} stroke={2.4} /></div>
                    <div className="label">{item.title}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="tk-fab" onClick={() => onNavigate('tasks')}>
        <Icon name="plus" size={24} stroke={2} />
      </div>
    </div>
  );
}
```

**Step 2: Build**
```bash
cd ~/dev/tasky/apps/web && npx tsc --noEmit 2>&1 | head -10
```

**Step 3: Commit**
```bash
cd ~/dev/tasky && git add apps/web/src/screens/dashboard.tsx && git commit -m "feat(web): wire dashboard to real Items API"
```

---

## Task 3 — Agenda com data/hora dinâmica

**Files:**
- Modify: `apps/web/src/screens/agenda.tsx`

Mantém os eventos mockados (calendário real é infra futura), mas corrige data atual, semana dinâmica e linha "agora" em tempo real.

**Step 1: Reescrever `agenda.tsx`**

```tsx
import { Icon } from '../components/icon.tsx';

const START = 8, END = 20, ROW = 58;
function top(h: number, m = 0) { return (h - START) * ROW + (m / 60) * ROW; }

const MOCK_EVENTS = [
  { h: 9,  m: 30, dur: 0.5,  title: 'Daily standup',        sub: 'Time de produto' },
  { h: 11, m: 0,  dur: 0.75, title: '1:1 com o Rafael',     sub: 'Online' },
  { h: 12, m: 30, dur: 1,    title: 'Almoço com a Marina',  sub: 'Café Lumi' },
  { h: 14, m: 0,  dur: 1,    title: 'Reunião de design',    sub: 'Sala Aurora', accent: true },
  { h: 16, m: 30, dur: 0.75, title: 'Call com a Vértice',   sub: 'Apresentação da proposta' },
  { h: 19, m: 0,  dur: 1,    title: 'Jantar com a Marina',  sub: 'Restaurante Oro' },
];

function buildWeek(today: Date) {
  const DOW = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return {
      dow: DOW[i],
      num: d.getDate(),
      active: d.toDateString() === today.toDateString(),
    };
  });
}

export function AgendaScreen() {
  const now   = new Date();
  const week  = buildWeek(now);
  const hours: number[] = [];
  for (let h = START; h <= END; h++) hours.push(h);

  const nowTop = top(now.getHours(), now.getMinutes());
  const nowLabel = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  const showNowLine = now.getHours() >= START && now.getHours() < END;

  const monthLabel = now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const dateLabel  = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content tk-wide">
          <div className="tk-head">
            <div>
              <h1 className="tk-greet" style={{ textTransform: 'capitalize' }}>{monthLabel}</h1>
              <div className="tk-date" style={{ textTransform: 'capitalize' }}>{dateLabel}</div>
            </div>
            <div className="tk-headtools">
              <div className="tk-iconbtn"><Icon name="chevronL" size={19} /></div>
              <div className="tk-iconbtn"><Icon name="chevronR" size={19} /></div>
            </div>
          </div>

          <div className="tk-weekstrip">
            {week.map((d) => (
              <div key={d.num} className={`tk-day${d.active ? ' active' : ''}`}>
                <div className="dow">{d.dow}</div>
                <div className="num">{d.num}</div>
                {d.active && <div className="pip" />}
              </div>
            ))}
          </div>

          <div className="tk-timeline" style={{ height: (END - START) * ROW + 12 }}>
            {hours.map((h) => (
              <div key={h} className="tk-trow"
                style={{ position: 'absolute', left: 0, right: 0, top: (h - START) * ROW }}>
                <div className="hr">{String(h).padStart(2,'0')}:00</div>
                <div className="ln" />
              </div>
            ))}
            <div className="tk-track">
              {MOCK_EVENTS.map((e, i) => (
                <div key={i}
                  className={`tk-ev${e.accent ? ' is-accent' : ''}`}
                  style={{ top: top(e.h, e.m), height: e.dur * ROW - 8 }}>
                  <div className="accentbar" />
                  <div className="et">{e.title}</div>
                  {e.dur >= 1 && (
                    <div className="em">
                      {String(e.h).padStart(2,'0')}:{String(e.m).padStart(2,'0')} · {e.sub}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {showNowLine && (
              <div className="tk-now" style={{ top: nowTop }}>
                <span className="lbl">{nowLabel}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="tk-fab"><Icon name="plus" size={24} stroke={2} /></div>
    </div>
  );
}
```

**Step 2: Commit**
```bash
cd ~/dev/tasky && git add apps/web/src/screens/agenda.tsx && git commit -m "feat(web): agenda with dynamic date, week strip, and real-time now line"
```

---

## Task 4 — API: contexto `connectors` CRUD

O `ConnectorsHub` e `ConnectorConfig` precisam de dados reais. Primeiro criar o backend.

**Files:**
- Create: `apps/api/src/contexts/connectors/presentation/dto/connector-response.dto.ts`
- Create: `apps/api/src/contexts/connectors/presentation/dto/create-connector.dto.ts`
- Create: `apps/api/src/contexts/connectors/presentation/dto/update-connector.dto.ts`
- Create: `apps/api/src/contexts/connectors/application/connectors.service.ts`
- Create: `apps/api/src/contexts/connectors/presentation/controller/connector.controller.ts`
- Create: `apps/api/src/contexts/connectors/connector.module.ts`
- Modify: `apps/api/src/app.module.ts`

**Step 1: DTOs**

```typescript
// connector-response.dto.ts
import { z } from 'zod';

const dt  = z.preprocess((v) => (v instanceof Date ? v.toISOString() : v), z.string().datetime());
const ndt = z.preprocess((v) => (v instanceof Date ? v.toISOString() : v ?? null), z.string().datetime().nullable());

export const ConnectorResponseDto = z.object({
  id:          z.string(),
  workspaceId: z.string(),
  type:        z.enum(['GMAIL','SLACK','WHATSAPP','NUBANK','GITHUB','LINEAR','NOTION','GOOGLE_CALENDAR','TELEGRAM','CUSTOM']),
  name:        z.string(),
  config:      z.record(z.unknown()),
  enabled:     z.boolean(),
  lastSyncAt:  ndt,
  createdAt:   dt,
  updatedAt:   dt,
});
export type ConnectorResponseDto = z.infer<typeof ConnectorResponseDto>;
```

```typescript
// create-connector.dto.ts
import { z } from 'zod';

export const CreateConnectorDto = z.object({
  type:   z.enum(['GMAIL','SLACK','WHATSAPP','NUBANK','GITHUB','LINEAR','NOTION','GOOGLE_CALENDAR','TELEGRAM','CUSTOM']),
  name:   z.string().min(1),
  config: z.record(z.unknown()).default({}),
});
export type CreateConnectorDto = z.infer<typeof CreateConnectorDto>;
```

```typescript
// update-connector.dto.ts
import { z } from 'zod';

export const UpdateConnectorDto = z.object({
  name:      z.string().min(1).optional(),
  config:    z.record(z.unknown()).optional(),
  enabled:   z.boolean().optional(),
});
export type UpdateConnectorDto = z.infer<typeof UpdateConnectorDto>;
```

**Step 2: Service**

```typescript
// connectors.service.ts
import type { PrismaClient } from '@prisma/client';
import type { CreateConnectorDto } from '../presentation/dto/create-connector.dto.js';
import type { UpdateConnectorDto } from '../presentation/dto/update-connector.dto.js';

export class ConnectorsService {
  constructor(private readonly prisma: PrismaClient) {}

  findByWorkspace(workspaceId: string) {
    return this.prisma.connector.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'asc' },
    });
  }

  findById(id: string) {
    return this.prisma.connector.findUnique({ where: { id } });
  }

  create(workspaceId: string, dto: CreateConnectorDto) {
    return this.prisma.connector.create({
      data: { workspaceId, ...dto, config: dto.config as any },
    });
  }

  update(id: string, dto: UpdateConnectorDto) {
    return this.prisma.connector.update({
      where: { id },
      data: { ...dto, config: dto.config as any },
    });
  }

  delete(id: string) {
    return this.prisma.connector.delete({ where: { id } });
  }

  // Conta itens gerados por conector (via events → items)
  async getStats(connectorId: string): Promise<{ itemCount: number; lastSyncAt: string | null }> {
    const eventsWithItems = await this.prisma.event.findMany({
      where: { connectorId },
      select: {
        createdAt: true,
        _count: { select: { items: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const itemCount = eventsWithItems.reduce((acc, e) => acc + e._count.items, 0);
    const lastSyncAt = eventsWithItems[0]?.createdAt?.toISOString() ?? null;
    return { itemCount, lastSyncAt };
  }
}
```

**Step 3: Controller**

```typescript
// connector.controller.ts
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { ConnectorsService } from '../../application/connectors.service.js';
import { ConnectorResponseDto } from '../dto/connector-response.dto.js';
import { CreateConnectorDto } from '../dto/create-connector.dto.js';
import { UpdateConnectorDto } from '../dto/update-connector.dto.js';

const WsParam = z.object({ workspaceId: z.string() });
const IdParam = z.object({ workspaceId: z.string(), connectorId: z.string() });

export const connectorController: FastifyPluginAsyncZod = async (app) => {
  const svc = new ConnectorsService(app.prisma);

  app.get('/:workspaceId/connectors', {
    schema: {
      tags: ['Connectors'],
      operationId: 'list',
      params: WsParam,
      response: { 200: z.array(ConnectorResponseDto) },
    },
  }, async (req) => svc.findByWorkspace(req.params.workspaceId));

  app.get('/:workspaceId/connectors/:connectorId', {
    schema: {
      tags: ['Connectors'],
      operationId: 'getById',
      params: IdParam,
      response: { 200: ConnectorResponseDto.nullable() },
    },
  }, async (req) => svc.findById(req.params.connectorId));

  app.post('/:workspaceId/connectors', {
    schema: {
      tags: ['Connectors'],
      operationId: 'create',
      params: WsParam,
      body: CreateConnectorDto,
      response: { 201: ConnectorResponseDto },
    },
  }, async (req, reply) => {
    const c = await svc.create(req.params.workspaceId, req.body);
    return reply.status(201).send(c);
  });

  app.patch('/:workspaceId/connectors/:connectorId', {
    schema: {
      tags: ['Connectors'],
      operationId: 'update',
      params: IdParam,
      body: UpdateConnectorDto,
      response: { 200: ConnectorResponseDto },
    },
  }, async (req) => svc.update(req.params.connectorId, req.body));

  app.delete('/:workspaceId/connectors/:connectorId', {
    schema: {
      tags: ['Connectors'],
      operationId: 'remove',
      params: IdParam,
      response: { 200: z.object({ deleted: z.boolean() }) },
    },
  }, async (req) => {
    await svc.delete(req.params.connectorId);
    return { deleted: true };
  });
};
```

**Step 4: Module + registrar em app.module.ts**

```typescript
// connector.module.ts
import type { FastifyPluginAsync } from 'fastify';
import { connectorController } from './presentation/controller/connector.controller.js';
export const ConnectorsModule: FastifyPluginAsync = async (app) => {
  app.register(connectorController);
};
```

app.module.ts atualizado:
```typescript
import fp from 'fastify-plugin';
import { ConnectorsModule } from './contexts/connectors/connector.module.js';
import { EventsModule }     from './contexts/events/event.module.js';
import { ItemsModule }      from './contexts/items/item.module.js';
import { TasksModule }      from './contexts/tasks/tasks.module.js';
import { WorkspacesModule } from './contexts/workspaces/workspace.module.js';
import { PrismaPlugin }     from './plugins/prisma.plugin.js';

export const AppModule = fp(async (app) => {
  await app.register(PrismaPlugin);
  await app.register(WorkspacesModule, { prefix: '/workspaces' });
  await app.register(ConnectorsModule);
  await app.register(EventsModule);
  await app.register(ItemsModule);
  await app.register(TasksModule, { prefix: '/tasks' });
});
```

**Step 5: Gerar OpenAPI + SDK**
```bash
cd ~/dev/tasky/apps/api && DATABASE_URL=postgresql://postgres:postgres@localhost:5432/tasky npx tsx src/main.ts --generate-openapi-and-exit 2>&1 | tail -3
cd ~/dev/tasky/sdk/tasky && npx orval@7.4.0 2>&1 | tail -3
```

Atualizar `sdk/tasky/index.ts` para incluir connectors:
```typescript
export * from './react-query/tasks/tasks.js';
export * from './react-query/workspaces/workspaces.js';
export * from './react-query/connectors/connectors.js';
export * from './react-query/events/events.js';
export * from './react-query/items/items.js';
export * from './react-query/taskyAPI.schemas.js';
export * from './http/index.js';
```

**Step 6: Commit**
```bash
cd ~/dev/tasky && git add apps/api/src/contexts/connectors/ apps/api/src/app.module.ts sdk/tasky/index.ts && git commit -m "feat(api): add connectors context CRUD + regenerate SDK"
```

---

## Task 5 — ConnectorsHub real

**Files:**
- Modify: `apps/web/src/screens/connectors-hub.tsx`

```tsx
import { useNavigate, useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useConnectorsList, useConnectorsUpdate } from '@tasky/sdk';
import { Icon } from '../components/icon.tsx';
import type { IconName } from '../components/icon.tsx';

const TYPE_ICON: Record<string, IconName> = {
  GMAIL: 'mail', SLACK: 'send', WHATSAPP: 'chat', NUBANK: 'card',
  GITHUB: 'doc', LINEAR: 'checklist', NOTION: 'doc',
  GOOGLE_CALENDAR: 'calendar', TELEGRAM: 'send', CUSTOM: 'plug',
};

interface ConnectorsHubProps {
  onNavigate: (path: string) => void;
}

export function ConnectorsHubScreen({ onNavigate }: ConnectorsHubProps) {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: [`/${workspaceSlug}/connectors`] });

  const { data: connectors = [], isLoading } = useConnectorsList(workspaceSlug!);
  const { mutate: updateConnector } = useConnectorsUpdate({ mutation: { onSuccess: invalidate } });

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content">
          <div className="tk-head">
            <div>
              <h1 className="tk-greet">Conexões</h1>
              <div className="tk-date">
                {isLoading
                  ? 'Carregando…'
                  : `${connectors.filter(c => c.enabled).length} serviços conectados via MCP`}
              </div>
            </div>
          </div>

          <div className="tk-conngrid">
            {connectors.map((c) => (
              <div
                key={c.id}
                className={`tk-conn${!c.enabled ? ' off' : ''}`}
                onClick={() => onNavigate(`connectors/${c.id}`)}
              >
                <div className="tk-conn-ico">
                  <Icon name={TYPE_ICON[c.type] ?? 'plug'} size={22} />
                </div>
                <div className="mid">
                  <div className="nm">{c.name}</div>
                  <div className="st">
                    {c.enabled ? 'Ativo' : 'Desativado'}
                    {c.enabled && <span className="tk-mcp">MCP</span>}
                  </div>
                </div>
                <div
                  className={`tk-toggle${c.enabled ? ' on' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateConnector({
                      workspaceId: workspaceSlug!,
                      connectorId: c.id,
                      data: { enabled: !c.enabled },
                    });
                  }}
                >
                  <div className="knob" />
                </div>
              </div>
            ))}

            {!isLoading && connectors.length === 0 && (
              <div
                className="tk-conn"
                style={{ gridColumn: '1/-1', justifyContent: 'center', color: 'var(--text-faint)', fontSize: 14 }}
              >
                Nenhum conector configurado ainda.
              </div>
            )}

            <div className="tk-conn tk-conn-add" onClick={() => onNavigate('connectors/add')}>
              <Icon name="plus" size={18} />
              Adicionar conector
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step: Commit**
```bash
cd ~/dev/tasky && git add apps/web/src/screens/connectors-hub.tsx && git commit -m "feat(web): wire connectors hub to real API"
```

---

## Task 6 — ConnectorConfig real

**Files:**
- Modify: `apps/web/src/screens/connector-config.tsx`

```tsx
import { useNavigate, useParams } from 'react-router';
import { useConnectorsGetById } from '@tasky/sdk';
import { Icon } from '../components/icon.tsx';
import type { IconName } from '../components/icon.tsx';

const TYPE_ICON: Record<string, IconName> = {
  GMAIL: 'mail', SLACK: 'send', WHATSAPP: 'chat', NUBANK: 'card',
  GITHUB: 'doc', LINEAR: 'checklist', NOTION: 'doc',
  GOOGLE_CALENDAR: 'calendar', TELEGRAM: 'send', CUSTOM: 'plug',
};

interface ConnectorConfigProps {
  onNavigate: (path: string) => void;
}

export function ConnectorConfigScreen({ onNavigate }: ConnectorConfigProps) {
  const { workspaceSlug, id: connectorId } = useParams<{ workspaceSlug: string; id: string }>();
  const { data: connector, isLoading } = useConnectorsGetById(workspaceSlug!, connectorId!);

  if (isLoading) {
    return (
      <div className="tk-main">
        <div className="tk-scroll">
          <div className="tk-content tk-wide" style={{ paddingTop: 80, color: 'var(--text-faint)', textAlign: 'center' }}>
            Carregando…
          </div>
        </div>
      </div>
    );
  }

  if (!connector) {
    return (
      <div className="tk-main">
        <div className="tk-scroll">
          <div className="tk-content tk-wide" style={{ paddingTop: 80, color: 'var(--text-faint)', textAlign: 'center' }}>
            Conector não encontrado.
          </div>
        </div>
      </div>
    );
  }

  // config é JSON livre — extrai campos conhecidos
  const cfg = connector.config as Record<string, string>;
  const endpoint  = cfg['endpoint']  ?? '—';
  const transport = cfg['transport'] ?? 'HTTP streaming · SSE';
  const token     = cfg['token']     ? `••••••••••${cfg['token'].slice(-4)}` : '—';
  const webhookUrl = cfg['webhookUrl'] ?? '—';

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content tk-wide">
          <span className="tk-back" onClick={() => onNavigate('connectors')}>
            <Icon name="chevronL" size={16} />Conexões
          </span>

          <div className="tk-cfg-head">
            <div className="tk-conn-ico">
              <Icon name={TYPE_ICON[connector.type] ?? 'plug'} size={26} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="nm">{connector.name}</div>
              <div className="sub">
                <span className="tk-status">
                  <span className="tk-statusdot" />
                  {connector.enabled ? 'Ativo' : 'Desativado'}
                </span>
                <span className="tk-mcp">MCP</span>
                <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>{connector.type}</span>
              </div>
            </div>
            <div className={`tk-toggle${connector.enabled ? ' on' : ''}`}><div className="knob" /></div>
          </div>

          {/* Servidor MCP */}
          <div className="tk-sec">
            <div className="tk-sec-h">
              <h3>Servidor MCP</h3>
              <span className="hint">Conexão com o provedor</span>
            </div>
            <div className="tk-cfg-card">
              <div className="tk-cfg-row">
                <div className="lead"><div className="k">Endpoint</div><div className="d">URL do servidor MCP</div></div>
                <div className="tk-code"><span className="val">{endpoint}</span><span className="cp"><Icon name="copy" size={16} /></span></div>
              </div>
              <div className="tk-cfg-row">
                <div className="lead"><div className="k">Transporte</div><div className="d">Protocolo de comunicação</div></div>
                <div className="tk-code" style={{ maxWidth: 220 }}><span className="val">{transport}</span></div>
              </div>
              {cfg['token'] && (
                <div className="tk-cfg-row">
                  <div className="lead"><div className="k">Autenticação</div><div className="d">Token OAuth / API Key</div></div>
                  <div className="tk-code">
                    <span className="val">{token}</span>
                    <span className="cp"><Icon name="eye" size={16} /></span>
                    <span className="cp"><Icon name="copy" size={16} /></span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Webhook */}
          {cfg['webhookUrl'] && (
            <div className="tk-sec">
              <div className="tk-sec-h"><h3>Webhook</h3><span className="hint">Endpoint de recebimento</span></div>
              <div className="tk-cfg-card">
                <div className="tk-cfg-row">
                  <div className="lead"><div className="k">URL de recebimento</div><div className="d">Endpoint da Tasky para este conector</div></div>
                  <div className="tk-code"><span className="val">{webhookUrl}</span><span className="cp"><Icon name="copy" size={16} /></span></div>
                </div>
              </div>
            </div>
          )}

          {/* Config bruta (fallback) */}
          {Object.keys(cfg).length > 0 && !cfg['endpoint'] && (
            <div className="tk-sec">
              <div className="tk-sec-h"><h3>Configuração</h3></div>
              <div className="tk-cfg-card">
                {Object.entries(cfg).map(([k, v]) => (
                  <div key={k} className="tk-cfg-row">
                    <div className="lead"><div className="k">{k}</div></div>
                    <div className="tk-code"><span className="val">{String(v)}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ height: 60 }} />
        </div>
      </div>
    </div>
  );
}
```

**Step: Commit**
```bash
cd ~/dev/tasky && git add apps/web/src/screens/connector-config.tsx && git commit -m "feat(web): wire connector config to real API"
```

---

## Task 7 — ConnectorsAdd salva de verdade

**Files:**
- Modify: `apps/web/src/connectors/connectors-add.tsx`

Ao clicar em um conector no painel direito, abre o fluxo de auth correto (Gmail → OAuth, Linear → API Key, outros → modal genérico) E chama `useConnectorsCreate` para salvar na API.

```tsx
// Adicionar no topo do ConnectorsAddScreen, antes do return:
const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
const qc = useQueryClient();
const { mutate: createConnector } = useConnectorsCreate({
  mutation: {
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [`/${workspaceSlug}/connectors`] });
      onNavigate('connectors');
    },
  },
});
```

A lógica no `onConnect` de cada `Row` passa a chamar `createConnector` para Gmail e Linear após o OAuth/setup. Para conectores simples (Slack, WhatsApp, etc.) cria imediatamente com config vazia.

Detalhes de implementação: ver código final no PR.

**Nota:** OAuth e API Key validation são infra pesada — as telas de Gmail e Linear por ora criam o connector no DB e redirecionam para a tela de config onde o usuário pode completar manualmente. O fluxo real de OAuth é Task 8.

**Step: Commit**
```bash
cd ~/dev/tasky && git add apps/web/src/connectors/ && git commit -m "feat(web): connectors-add saves to API"
```

---

## Task 8 — Rail: adicionar item Events (auditoria)

**Files:**
- Modify: `apps/web/src/components/rail.tsx`

Adicionar `events` no NAV_ITEMS para que o usuário acesse o log de auditoria:

```typescript
const NAV_ITEMS = [
  { id: 'dashboard', icon: 'home',      label: 'Início'  },
  { id: 'inbox',     icon: 'inbox',     label: 'Inbox'   },
  { id: 'tasks',     icon: 'checklist', label: 'Tarefas' },
  { id: 'agenda',    icon: 'calendar',  label: 'Agenda'  },
  { id: 'events',    icon: 'spark',     label: 'Eventos' },
];
```

**Step: Commit**
```bash
cd ~/dev/tasky && git add apps/web/src/components/rail.tsx && git commit -m "feat(web): add Events to rail navigation"
```

---

## Checklist final

- [ ] Task 1 — Deletar screens legados (tasks.tsx, inbox.tsx)
- [ ] Task 2 — Dashboard real (Items da API + greeting dinâmico)
- [ ] Task 3 — Agenda com data/hora dinâmica
- [ ] Task 4 — API Connectors CRUD + SDK regenerado
- [ ] Task 5 — ConnectorsHub real (lista da API, toggle funciona)
- [ ] Task 6 — ConnectorConfig real (dados do conector + config JSON)
- [ ] Task 7 — ConnectorsAdd salva na API
- [ ] Task 8 — Events no Rail

## Fora do escopo deste plano (infra pesada)

- OAuth flows reais (Gmail, Notion) — precisa de server-side callback URL
- Validação de API key (Linear, GitHub) — precisa de call para a API do provedor
- Calendário real — precisa de Event model com data/hora (por ora mock)
- Auth/login — sem autenticação ainda, tudo é workspace-direto
- Agent status widget — exibir no frontend se o agente está rodando
