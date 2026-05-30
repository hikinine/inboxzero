import { z } from 'zod';

export const ValidateKeyDto = z.object({
  provider: z.enum(['LINEAR']),
  apiKey:   z.string().min(1),
});
export type ValidateKeyDto = z.infer<typeof ValidateKeyDto>;

export const ValidateKeyResponseDto = z.object({
  valid: z.boolean(),
  user: z.object({
    id:    z.string(),
    name:  z.string(),
    email: z.string(),
  }).nullable(),
  error: z.string().nullable(),
});
export type ValidateKeyResponseDto = z.infer<typeof ValidateKeyResponseDto>;
