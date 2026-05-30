import { z } from 'zod';

export const IngestEventDto = z.object({
  connectorId: z.string(),
  rawPayload:  z.record(z.unknown()),
});
export type IngestEventDto = z.infer<typeof IngestEventDto>;
