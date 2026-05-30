import type { FastifyPluginAsync } from 'fastify';
import { workspaceController } from './presentation/controller/workspace.controller.js';

export const WorkspacesModule: FastifyPluginAsync = async (app) => {
  app.register(workspaceController);
};
