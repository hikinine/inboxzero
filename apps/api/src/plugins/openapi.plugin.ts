import { writeFileSync } from 'node:fs';
import fastifySwagger from '@fastify/swagger';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export const OpenApiPlugin = fp(async (app) => {
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Tasky API',
        description: 'Task management API',
        version: '1.0.0',
      },
    },
    transform: ({ route, schema, url }) => {
      const [tag] = route.schema?.tags ?? [];
      const handlerName = schema.operationId ?? route.handler.name;
      const capitalized =
        handlerName.charAt(0).toUpperCase() + handlerName.slice(1);

      if (tag && handlerName) {
        schema.operationId = `${tag}${capitalized}`;
      }

      return jsonSchemaTransform({ schema, url });
    },
  });
});

export function generateOpenApi(app: FastifyInstance) {
  console.log('📝 Gerando openapi.json...');
  writeFileSync('openapi.json', JSON.stringify(app.swagger(), null, 2));
  console.log('✅ openapi.json gerado');
}
