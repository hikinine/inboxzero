import { fastify } from 'fastify';
import { AppModule } from './app.module.js';
import { OnExceptions } from './hooks/on-exceptions.js';
import { CorsPlugin } from './plugins/cors.plugin.js';
import { OpenApiPlugin, generateOpenApi } from './plugins/openapi.plugin.js';
import { ScalarPlugin } from './plugins/scalar.plugin.js';
import { ZodValidatorPlugin } from './plugins/zod.plugin.js';

export interface BootstrapOptions {
  listenHttp?: boolean;
  generateOpenApiAndExit?: boolean;
  generateScalar?: boolean;
}

export async function bootstrapApplication({
  listenHttp = false,
  generateOpenApiAndExit = false,
  generateScalar = false,
}: BootstrapOptions) {
  const app = fastify({ logger: true });

  await app.register(CorsPlugin);
  await app.register(OnExceptions);
  await app.register(ZodValidatorPlugin);
  await app.register(OpenApiPlugin);
  if (generateScalar) await app.register(ScalarPlugin);
  await app.register(AppModule);
  await app.ready();

  generateOpenApi(app);
  if (generateOpenApiAndExit) process.exit(0);

  if (listenHttp) {
    const port = Number(process.env['PORT'] ?? 4000);
    await app.listen({ port, host: '0.0.0.0' });
  }

  return app;
}
