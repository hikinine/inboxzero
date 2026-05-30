import type { FastifyPluginAsync } from 'fastify';

export const WebhookController: FastifyPluginAsync = async (app) => {
  // Public endpoint — no workspace auth, connector ID is the secret
  app.post<{ Params: { connectorId: string }; Body: unknown }>(
    '/:connectorId',
    { schema: { tags: ['Webhooks'] } },
    async (request, reply) => {
      const { connectorId } = request.params;

      const connector = await app.prisma.connector.findUnique({
        where: { id: connectorId },
      });

      if (!connector || !connector.enabled) {
        return reply.status(404).send({ error: 'Connector not found or disabled' });
      }

      await app.prisma.event.create({
        data: {
          workspaceId: connector.workspaceId,
          connectorId: connector.id,
          rawPayload:  request.body as any,
          status:      'PENDING',
        },
      });

      // Linear expects 200 OK immediately
      return reply.status(200).send({ received: true });
    },
  );
};
