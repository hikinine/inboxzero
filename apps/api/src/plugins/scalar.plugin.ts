import Scalar from '@scalar/fastify-api-reference';
import fp from 'fastify-plugin';

export const ScalarPlugin = fp(async (app) => {
  await app.register(Scalar, {
    routePrefix: '/reference',
    configuration: {
      title: 'Tasky API Reference',
      spec: { url: '/documentation/json' },
    },
  });
});
