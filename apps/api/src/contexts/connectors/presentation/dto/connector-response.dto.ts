import { z } from 'zod';

const dt  = z.preprocess((v) => (v instanceof Date ? v.toISOString() : v), z.string().datetime());
const ndt = z.preprocess((v) => (v instanceof Date ? v.toISOString() : v ?? null), z.string().datetime().nullable());

export const ConnectorResponseDto = z.object({
  id:          z.string(),
  workspaceId: z.string(),
  type:        z.enum(['GMAIL','SLACK','WHATSAPP','NUBANK','GITHUB','LINEAR','NOTION','GOOGLE_CALENDAR','TELEGRAM','CUSTOM']),
  name:        z.string(),
  config:      z.record(z.unknown()),
  enabled:     z.boolean(),
  lastSyncAt:  ndt,
  createdAt:   dt,
  updatedAt:   dt,
});
export type ConnectorResponseDto = z.infer<typeof ConnectorResponseDto>;
