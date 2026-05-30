import type { FastifyPluginAsync } from 'fastify';
import { itemController } from './presentation/controller/item.controller.js';

export const ItemsModule: FastifyPluginAsync = async (app) => {
  app.register(itemController);
};
