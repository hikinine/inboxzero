import { z } from 'zod';

export const IngestEventDto = z.object({
  connectorId: z.string(),
  externalId:  z.string().optional(), // ex: "linear:Issue:abc123" — idempotência no polling
  rawPayload:  z.record(z.unknown()),
});
export type IngestEventDto = z.infer<typeof IngestEventDto>;
