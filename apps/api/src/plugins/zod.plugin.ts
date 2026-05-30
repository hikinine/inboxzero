import fp from 'fastify-plugin';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { ZodError } from 'zod';

export const ZodValidatorPlugin = fp(async (app) => {
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        statusCode: 400,
        error: 'Validation Error',
        issues: error.errors,
      });
    }
    reply.status(error.statusCode ?? 500).send({
      statusCode: error.statusCode ?? 500,
      error: error.name,
      message: error.message,
    });
  });
});
