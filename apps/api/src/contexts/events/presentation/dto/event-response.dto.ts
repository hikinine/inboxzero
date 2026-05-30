import { z } from 'zod';

const datetimeField = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString() : v),
  z.string().datetime(),
);
const nullableDatetime = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString() : v ?? null),
  z.string().datetime().nullable(),
);

export const EventResponseDto = z.object({
  id:          z.string(),
  workspaceId: z.string(),
  connectorId: z.string(),
  rawPayload:  z.record(z.unknown()),
  status:      z.enum(['PENDING', 'PROCESSING', 'PROCESSED', 'IGNORED', 'FAILED']),
  processedAt: nullableDatetime,
  agentNotes:  z.string().nullable(),
  createdAt:   datetimeField,
});
export type EventResponseDto = z.infer<typeof EventResponseDto>;
