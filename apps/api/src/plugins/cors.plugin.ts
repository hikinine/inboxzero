import fastifyCors from '@fastify/cors';
import fp from 'fastify-plugin';

export const CorsPlugin = fp(async (app) => {
  await app.register(fastifyCors, {
    origin: (_, cb) => cb(null, true),
    credentials: true,
    hook: 'onRequest',
  });
});
