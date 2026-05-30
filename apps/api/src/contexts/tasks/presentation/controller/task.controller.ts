import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { TasksService } from '../../application/tasks.service.js';
import { CreateTaskDto } from '../dto/create-task.dto.js';
import { TaskResponseDto } from '../dto/task-response.dto.js';
import { UpdateTaskDto } from '../dto/update-task.dto.js';

const IdParam = z.object({ id: z.string() });

export const taskController: FastifyPluginAsyncZod = async (app) => {
  const service = new TasksService(app.prisma);

  app.get('/', {
    schema: {
      tags: ['Tasks'],
      operationId: 'list',
      response: { 200: z.array(TaskResponseDto) },
    },
  }, async () => service.findAll());

  app.get('/:id', {
    schema: {
      tags: ['Tasks'],
      operationId: 'getById',
      params: IdParam,
      response: { 200: TaskResponseDto.nullable() },
    },
  }, async (request) => service.findById(request.params.id));

  app.post('/', {
    schema: {
      tags: ['Tasks'],
      operationId: 'create',
      body: CreateTaskDto,
      response: { 201: TaskResponseDto },
    },
  }, async (request, reply) => {
    const task = await service.create(request.body);
    return reply.status(201).send(task);
  });

  app.patch('/:id', {
    schema: {
      tags: ['Tasks'],
      operationId: 'update',
      params: IdParam,
      body: UpdateTaskDto,
      response: { 200: TaskResponseDto },
    },
  }, async (request) => service.update(request.params.id, request.body));

  app.delete('/:id', {
    schema: {
      tags: ['Tasks'],
      operationId: 'remove',
      params: IdParam,
      response: { 200: z.object({ deleted: z.boolean() }) },
    },
  }, async (request) => {
    await service.delete(request.params.id);
    return { deleted: true };
  });
};
