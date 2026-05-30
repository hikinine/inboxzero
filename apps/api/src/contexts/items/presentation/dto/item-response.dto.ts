import { z } from 'zod';

const dt  = z.preprocess((v) => (v instanceof Date ? v.toISOString() : v), z.string().datetime());
const ndt = z.preprocess((v) => (v instanceof Date ? v.toISOString() : v ?? null), z.string().datetime().nullable());

export const ItemResponseDto = z.object({
  id:           z.string(),
  workspaceId:  z.string(),
  eventId:      z.string().nullable(),
  type:         z.enum(['TASK', 'FOLLOW_UP', 'REMINDER', 'NOTIFICATION', 'DRAFT']),
  title:        z.string(),
  description:  z.string().nullable(),
  priority:     z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  status:       z.enum(['OPEN', 'DONE', 'SNOOZED', 'DISMISSED']),
  dueDate:      ndt,
  snoozedUntil: ndt,
  metadata:     z.record(z.unknown()).nullable(),
  createdAt:    dt,
  updatedAt:    dt,
});
export type ItemResponseDto = z.infer<typeof ItemResponseDto>;
