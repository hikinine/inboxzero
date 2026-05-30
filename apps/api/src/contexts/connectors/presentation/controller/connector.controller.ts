import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { ConnectorsService } from '../../application/connectors.service.js';
import { ConnectorResponseDto } from '../dto/connector-response.dto.js';
import { CreateConnectorDto } from '../dto/create-connector.dto.js';
import { UpdateConnectorDto } from '../dto/update-connector.dto.js';
import { ValidateKeyDto, ValidateKeyResponseDto } from '../dto/validate-key.dto.js';

const WsParam = z.object({ workspaceId: z.string() });
const IdParam = z.object({ workspaceId: z.string(), connectorId: z.string() });

export const connectorController: FastifyPluginAsyncZod = async (app) => {
  const svc = new ConnectorsService(app.prisma);

  app.post('/:workspaceId/connectors/validate-key', {
    schema: {
      tags: ['Connectors'],
      operationId: 'validateKey',
      params: WsParam,
      body: ValidateKeyDto,
      response: { 200: ValidateKeyResponseDto },
    },
  }, async (req) => {
    if (req.body.provider === 'LINEAR') {
      return svc.validateLinearKey(req.body.apiKey);
    }
    return { valid: false, user: null, error: 'Provider não suportado' };
  });

  app.get('/:workspaceId/connectors', {
    schema: {
      tags: ['Connectors'],
      operationId: 'list',
      params: WsParam,
      response: { 200: z.array(ConnectorResponseDto) },
    },
  }, async (req) => svc.findByWorkspace(req.params.workspaceId));

  app.get('/:workspaceId/connectors/:connectorId', {
    schema: {
      tags: ['Connectors'],
      operationId: 'getById',
      params: IdParam,
      response: { 200: ConnectorResponseDto.nullable() },
    },
  }, async (req) => svc.findById(req.params.connectorId));

  app.post('/:workspaceId/connectors', {
    schema: {
      tags: ['Connectors'],
      operationId: 'create',
      params: WsParam,
      body: CreateConnectorDto,
      response: { 201: ConnectorResponseDto },
    },
  }, async (req, reply) => {
    const c = await svc.create(req.params.workspaceId, req.body);
    return reply.status(201).send(c);
  });

  app.patch('/:workspaceId/connectors/:connectorId', {
    schema: {
      tags: ['Connectors'],
      operationId: 'update',
      params: IdParam,
      body: UpdateConnectorDto,
      response: { 200: ConnectorResponseDto },
    },
  }, async (req) => svc.update(req.params.connectorId, req.body));

  app.delete('/:workspaceId/connectors/:connectorId', {
    schema: {
      tags: ['Connectors'],
      operationId: 'remove',
      params: IdParam,
      response: { 200: z.object({ deleted: z.boolean() }) },
    },
  }, async (req) => {
    await svc.delete(req.params.connectorId);
    return { deleted: true };
  });
};
