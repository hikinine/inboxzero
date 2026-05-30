import 'dotenv/config';
import { startAgentLoop } from './agent-loop.js';

const WORKSPACE_ID = process.env['TASKY_WORKSPACE_ID'];
const API_URL      = process.env['TASKY_API_URL'] ?? 'http://localhost:3061';

if (!WORKSPACE_ID) {
  console.error('Error: TASKY_WORKSPACE_ID env var is required');
  process.exit(1);
}

if (!process.env['ANTHROPIC_API_KEY']) {
  console.error('Error: ANTHROPIC_API_KEY env var is required');
  process.exit(1);
}

console.log(`[Tasky Agent] Starting...`);
console.log(`  API: ${API_URL}`);
console.log(`  Workspace: ${WORKSPACE_ID}`);
console.log(`  Model: claude-opus-4-8`);
console.log(`  Interval: 5 min`);

startAgentLoop(WORKSPACE_ID, API_URL).catch((err) => {
  console.error('[Agent] Fatal error:', err);
  process.exit(1);
});
