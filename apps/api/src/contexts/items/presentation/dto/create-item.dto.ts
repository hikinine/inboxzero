import { z } from 'zod';

export const CreateItemDto = z.object({
  type:        z.enum(['TASK', 'FOLLOW_UP', 'REMINDER', 'NOTIFICATION', 'DRAFT']).default('TASK'),
  title:       z.string().min(1),
  description: z.string().optional(),
  priority:    z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  dueDate:     z.string().datetime().optional(),
  metadata:    z.record(z.unknown()).optional(),
});
export type CreateItemDto = z.infer<typeof CreateItemDto>;
