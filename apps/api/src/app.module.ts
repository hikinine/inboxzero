import fp from 'fastify-plugin';
import { ConnectorsModule } from './contexts/connectors/connector.module.js';
import { EventsModule } from './contexts/events/event.module.js';
import { ItemsModule } from './contexts/items/item.module.js';
import { TasksModule } from './contexts/tasks/tasks.module.js';
import { WorkspacesModule } from './contexts/workspaces/workspace.module.js';
import { PrismaPlugin } from './plugins/prisma.plugin.js';

export const AppModule = fp(async (app) => {
  await app.register(PrismaPlugin);

  // Resolve :workspaceId param — aceita slug OU cuid
  // Ex: /pessoal/connectors → resolve "pessoal" para o id real antes de qualquer handler
  app.addHook('preHandler', async (request) => {
    const params = request.params as Record<string, string>;
    const raw = params['workspaceId'];
    if (!raw) return;
    const ws = await app.prisma.workspace.findFirst({
      where: { OR: [{ id: raw }, { slug: raw }] },
      select: { id: true },
    });
    if (ws) params['workspaceId'] = ws.id;
  });

  await app.register(WorkspacesModule, { prefix: '/workspaces' });
  await app.register(ConnectorsModule);
  await app.register(EventsModule);
  await app.register(ItemsModule);
  await app.register(TasksModule, { prefix: '/tasks' });
});
