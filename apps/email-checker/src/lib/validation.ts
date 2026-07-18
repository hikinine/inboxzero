import { z } from 'zod';
import { MAX_BATCH_SIZE } from './env';

export const registerSchema = z.object({
  email: z.string().email().max(320),
  password: z.string().min(8).max(200),
  name: z.string().max(120).optional(),
});

export const loginSchema = z.object({
  email: z.string().email().max(320),
  password: z.string().min(1).max(200),
});

export const createKeySchema = z.object({
  name: z.string().min(1).max(80),
});

// Verificação: aceita { email } (single) ou { emails: [...] } (batch), com flag opcional mx.
export const verifySchema = z
  .object({
    email: z.string().max(320).optional(),
    emails: z.array(z.string().max(320)).max(MAX_BATCH_SIZE).optional(),
    mx: z.boolean().optional(),
    smtp: z.boolean().optional(),
  })
  .refine((d) => Boolean(d.email) || (Array.isArray(d.emails) && d.emails.length > 0), {
    message: 'Informe "email" (string) ou "emails" (array não vazio).',
  });

export type VerifyInput = z.infer<typeof verifySchema>;
