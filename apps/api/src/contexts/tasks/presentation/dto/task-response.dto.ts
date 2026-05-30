import { z } from 'zod';

const datetimeField = z.preprocess(
  (val) => (val instanceof Date ? val.toISOString() : val),
  z.string().datetime(),
);

const nullableDatetimeField = z.preprocess(
  (val) => (val instanceof Date ? val.toISOString() : val ?? null),
  z.string().datetime().nullable(),
);

export const TaskResponseDto = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  dueDate: nullableDatetimeField,
  createdAt: datetimeField,
  updatedAt: datetimeField,
});

export type TaskResponseDto = z.infer<typeof TaskResponseDto>;
