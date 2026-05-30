import type { FastifyPluginAsync } from 'fastify';
import { connectorController } from './presentation/controller/connector.controller.js';

export const ConnectorsModule: FastifyPluginAsync = async (app) => {
  app.register(connectorController);
};
