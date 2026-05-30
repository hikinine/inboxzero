import fp from 'fastify-plugin';
import { EventsModule } from './contexts/events/event.module.js';
import { TasksModule } from './contexts/tasks/tasks.module.js';
import { WorkspacesModule } from './contexts/workspaces/workspace.module.js';
import { PrismaPlugin } from './plugins/prisma.plugin.js';

export const AppModule = fp(async (app) => {
  await app.register(PrismaPlugin);
  await app.register(WorkspacesModule, { prefix: '/workspaces' });
  await app.register(EventsModule);
  await app.register(TasksModule, { prefix: '/tasks' });
});
