import { z } from 'zod';

export const UpdateConnectorDto = z.object({
  name:    z.string().min(1).optional(),
  config:  z.record(z.unknown()).optional(),
  enabled: z.boolean().optional(),
});
export type UpdateConnectorDto = z.infer<typeof UpdateConnectorDto>;
