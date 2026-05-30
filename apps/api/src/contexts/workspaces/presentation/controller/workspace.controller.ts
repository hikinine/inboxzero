import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { WorkspacesService } from '../../application/workspaces.service.js';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto.js';
import { WorkspaceResponseDto } from '../dto/workspace-response.dto.js';

const SlugParam = z.object({ slug: z.string() });

export const workspaceController: FastifyPluginAsyncZod = async (app) => {
  const svc = new WorkspacesService(app.prisma);

  app.get('/', {
    schema: {
      tags: ['Workspaces'],
      operationId: 'list',
      response: { 200: z.array(WorkspaceResponseDto) },
    },
  }, async () => svc.findAll());

  app.get('/:slug', {
    schema: {
      tags: ['Workspaces'],
      operationId: 'getBySlug',
      params: SlugParam,
      response: { 200: WorkspaceResponseDto.nullable() },
    },
  }, async (req) => svc.findBySlug(req.params.slug));

  app.post('/', {
    schema: {
      tags: ['Workspaces'],
      operationId: 'create',
      body: CreateWorkspaceDto,
      response: { 201: WorkspaceResponseDto },
    },
  }, async (req, reply) => {
    const ws = await svc.create(req.body);
    return reply.status(201).send(ws);
  });

  app.delete('/:slug', {
    schema: {
      tags: ['Workspaces'],
      operationId: 'remove',
      params: SlugParam,
      response: { 200: z.object({ deleted: z.boolean() }) },
    },
  }, async (req, reply) => {
    const ws = await svc.findBySlug(req.params.slug);
    if (!ws) return reply.status(404).send({ statusCode: 404, error: 'Not Found', message: 'Workspace não encontrado' });
    await svc.delete(ws.id);
    return { deleted: true };
  });
};
