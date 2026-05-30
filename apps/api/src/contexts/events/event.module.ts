import type { FastifyPluginAsync } from 'fastify';
import { eventController } from './presentation/controller/event.controller.js';

export const EventsModule: FastifyPluginAsync = async (app) => {
  app.register(eventController);
};
