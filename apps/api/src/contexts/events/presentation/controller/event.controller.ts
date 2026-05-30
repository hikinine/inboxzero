import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { EventsService } from '../../application/events.service.js';
import { EventResponseDto } from '../dto/event-response.dto.js';
import { IngestEventDto } from '../dto/ingest-event.dto.js';
import { ProcessEventDto } from '../dto/process-event.dto.js';

const WsParam    = z.object({ workspaceId: z.string() });
const EventParam = z.object({ workspaceId: z.string(), eventId: z.string() });

export const eventController: FastifyPluginAsyncZod = async (app) => {
  const svc = new EventsService(app.prisma);

  app.get('/:workspaceId/events', {
    schema: {
      tags: ['Events'],
      operationId: 'list',
      params: WsParam,
      response: { 200: z.array(EventResponseDto) },
    },
  }, async (req) => svc.findByWorkspace(req.params.workspaceId));

  app.get('/:workspaceId/events/pending', {
    schema: {
      tags: ['Events'],
      operationId: 'listPending',
      params: WsParam,
      response: { 200: z.array(EventResponseDto) },
    },
  }, async (req) => svc.findPending(req.params.workspaceId));

  app.post('/:workspaceId/events', {
    schema: {
      tags: ['Events'],
      operationId: 'ingest',
      params: WsParam,
      body: IngestEventDto,
      response: { 201: EventResponseDto },
    },
  }, async (req, reply) => {
    const event = await svc.ingest(req.params.workspaceId, req.body);
    return reply.status(201).send(event);
  });

  app.post('/:workspaceId/events/:eventId/process', {
    schema: {
      tags: ['Events'],
      operationId: 'process',
      params: EventParam,
      body: ProcessEventDto,
      response: { 200: EventResponseDto },
    },
  }, async (req) => svc.process(req.params.eventId, req.body),
  );
};
