import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { ItemsService } from '../../application/items.service.js';
import { CreateItemDto } from '../dto/create-item.dto.js';
import { ItemResponseDto } from '../dto/item-response.dto.js';
import { UpdateItemDto } from '../dto/update-item.dto.js';

const WsParam   = z.object({ workspaceId: z.string() });
const ItemParam = z.object({ workspaceId: z.string(), itemId: z.string() });

export const itemController: FastifyPluginAsyncZod = async (app) => {
  const svc = new ItemsService(app.prisma);

  app.get('/:workspaceId/items', {
    schema: {
      tags: ['Items'],
      operationId: 'list',
      params: WsParam,
      querystring: z.object({ type: z.string().optional() }),
      response: { 200: z.array(ItemResponseDto) },
    },
  }, async (req) => svc.findByWorkspace(req.params.workspaceId, req.query.type));

  app.post('/:workspaceId/items', {
    schema: {
      tags: ['Items'],
      operationId: 'create',
      params: WsParam,
      body: CreateItemDto,
      response: { 201: ItemResponseDto },
    },
  }, async (req, reply) => {
    const item = await svc.create(req.params.workspaceId, req.body);
    return reply.status(201).send(item);
  });

  app.patch('/:workspaceId/items/:itemId', {
    schema: {
      tags: ['Items'],
      operationId: 'update',
      params: ItemParam,
      body: UpdateItemDto,
      response: { 200: ItemResponseDto },
    },
  }, async (req) => svc.update(req.params.itemId, req.body));

  app.delete('/:workspaceId/items/:itemId', {
    schema: {
      tags: ['Items'],
      operationId: 'dismiss',
      params: ItemParam,
      response: { 200: z.object({ dismissed: z.boolean() }) },
    },
  }, async (req) => {
    await svc.dismiss(req.params.itemId);
    return { dismissed: true };
  });
};
