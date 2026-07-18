import { prisma } from './prisma';

type AuditInput = {
  userId?: string | null;
  apiKeyId?: string | null;
  action: string;
  detail?: Record<string, unknown>;
  ip?: string | null;
  userAgent?: string | null;
};

// Grava um evento na trilha de auditoria. Best-effort: nunca deve derrubar a requisição principal.
export async function audit(input: AuditInput): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: input.userId ?? null,
        apiKeyId: input.apiKeyId ?? null,
        action: input.action,
        detail: (input.detail ?? undefined) as any,
        ip: input.ip ?? null,
        userAgent: input.userAgent ?? null,
      },
    });
  } catch {
    // silencioso por design
  }
}
