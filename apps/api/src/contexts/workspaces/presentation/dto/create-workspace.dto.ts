import { z } from 'zod';

export const CreateWorkspaceDto = z.object({
  name:        z.string().min(1),
  slug:        z.string().min(2).regex(/^[a-z0-9-]+$/, 'Apenas letras minúsculas, números e hífens'),
  avatarColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default('#4ADE80'),
});
export type CreateWorkspaceDto = z.infer<typeof CreateWorkspaceDto>;
