import 'dotenv/config';
import { bootstrapApplication } from './bootstrap.js';

const args = process.argv.slice(2);
const generateOpenApiAndExit = args.includes('--generate-openapi-and-exit');
const generateScalar = args.includes('--generate-scalar');

bootstrapApplication({
  listenHttp: !generateOpenApiAndExit,
  generateOpenApiAndExit,
  generateScalar,
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
