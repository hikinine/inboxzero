import { z } from 'zod';

export const UpdateItemDto = z.object({
  title:        z.string().min(1).optional(),
  description:  z.string().optional(),
  priority:     z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  status:       z.enum(['OPEN', 'DONE', 'SNOOZED', 'DISMISSED']).optional(),
  dueDate:      z.string().datetime().optional(),
  snoozedUntil: z.string().datetime().optional(),
});
export type UpdateItemDto = z.infer<typeof UpdateItemDto>;
