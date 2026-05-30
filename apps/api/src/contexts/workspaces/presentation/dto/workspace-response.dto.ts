import { z } from 'zod';

const datetimeField = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString() : v),
  z.string().datetime(),
);

export const WorkspaceResponseDto = z.object({
  id:          z.string(),
  name:        z.string(),
  slug:        z.string(),
  avatarColor: z.string(),
  createdAt:   datetimeField,
  updatedAt:   datetimeField,
});
export type WorkspaceResponseDto = z.infer<typeof WorkspaceResponseDto>;
