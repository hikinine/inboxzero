import fp from 'fastify-plugin';

export const OnExceptions = fp(async () => {
  process.on('unhandledRejection', (error) => {
    console.error('Unhandled rejection:', error);
  });

  process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
  });
});
