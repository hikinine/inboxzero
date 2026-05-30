import { z } from 'zod';

export const CreateConnectorDto = z.object({
  type:   z.enum(['GMAIL','SLACK','WHATSAPP','NUBANK','GITHUB','LINEAR','NOTION','GOOGLE_CALENDAR','TELEGRAM','CUSTOM']),
  name:   z.string().min(1),
  config: z.record(z.unknown()).default({}),
});
export type CreateConnectorDto = z.infer<typeof CreateConnectorDto>;
