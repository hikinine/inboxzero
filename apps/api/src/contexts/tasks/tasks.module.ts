import type { FastifyPluginAsync } from 'fastify';
import { taskController } from './presentation/controller/task.controller.js';

export const TasksModule: FastifyPluginAsync = async (app) => {
  app.register(taskController);
};
