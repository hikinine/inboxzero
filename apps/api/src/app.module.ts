import fp from 'fastify-plugin';
import { TasksModule } from './contexts/tasks/tasks.module.js';
import { PrismaPlugin } from './plugins/prisma.plugin.js';

export const AppModule = fp(async (app) => {
  await app.register(PrismaPlugin);
  await app.register(TasksModule, { prefix: '/tasks' });
});
