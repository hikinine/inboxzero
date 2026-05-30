import { z } from 'zod';

export const ProcessEventItemDto = z.object({
  type:        z.enum(['TASK', 'FOLLOW_UP', 'REMINDER', 'NOTIFICATION', 'DRAFT']),
  title:       z.string().min(1),
  description: z.string().optional(),
  priority:    z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  dueDate:     z.string().datetime().optional(),
  metadata:    z.record(z.unknown()).optional(),
});

export const ProcessEventDto = z.object({
  items:      z.array(ProcessEventItemDto),
  agentNotes: z.string().optional(),
  ignored:    z.boolean().default(false),
});
export type ProcessEventDto = z.infer<typeof ProcessEventDto>;
