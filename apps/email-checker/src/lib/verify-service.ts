import type { CheckSource } from '@prisma/client';
import { audit } from './audit';
import { verifyEmails } from './checker';
import { prisma } from './prisma';

export class InsufficientCreditsError extends Error {
  constructor(
    public balance: number,
    public required: number,
  ) {
    super('Créditos insuficientes');
    this.name = 'InsufficientCreditsError';
  }
}

export type VerifySummary = {
  total: number;
  valid: number;
  invalid: number;
  disposable: number;
  creditsCharged: number;
  creditsRemaining: number;
  batchId: string | null;
  durationMs: number;
};

type RunInput = {
  userId: string;
  apiKeyId: string | null;
  source: CheckSource;
  emails: string[];
  mx?: boolean;
  smtp?: boolean;
  ip?: string | null;
  userAgent?: string | null;
};

// Débito atômico de créditos: só desconta se o saldo cobrir o custo (evita saldo negativo em concorrência).
async function debitCredits(userId: string, cost: number): Promise<number> {
  const res = await prisma.user.updateMany({
    where: { id: userId, credits: { gte: cost } },
    data: { credits: { decrement: cost } },
  });
  if (res.count === 0) {
    const u = await prisma.user.findUnique({ where: { id: userId }, select: { credits: true } });
    throw new InsufficientCreditsError(u?.credits ?? 0, cost);
  }
  const u = await prisma.user.findUnique({ where: { id: userId }, select: { credits: true } });
  return u?.credits ?? 0;
}

async function refundCredits(userId: string, amount: number): Promise<void> {
  await prisma.user.update({ where: { id: userId }, data: { credits: { increment: amount } } });
}

export async function runVerification(input: RunInput): Promise<{ results: any[]; summary: VerifySummary }> {
  const emails = input.emails.map((e) => e.trim()).filter(Boolean);
  const isBatch = emails.length > 1;
  const cost = emails.length;

  if (cost === 0) throw new Error('Nenhum e-mail informado');

  // 1) Debita antes de processar (garante que não gastamos além do saldo).
  const balanceAfter = await debitCredits(input.userId, cost);

  try {
    const t0 = Date.now();
    const outcomes = await verifyEmails(emails, { mx: input.mx, smtp: input.smtp });
    const durationMs = Date.now() - t0;

    const validCount = outcomes.filter((o) => o.isValid).length;
    const disposableCount = outcomes.filter((o) => o.isDisposable).length;
    const invalidCount = outcomes.length - validCount;

    // 2) Persiste tudo numa transação: batch (se >1) + checks + ledger.
    const batchId = await prisma.$transaction(async (tx) => {
      let bId: string | null = null;
      if (isBatch) {
        const batch = await tx.checkBatch.create({
          data: {
            userId: input.userId,
            apiKeyId: input.apiKeyId,
            source: input.source,
            total: outcomes.length,
            validCount,
            invalidCount,
            disposableCount,
            creditsCharged: cost,
            durationMs,
          },
          select: { id: true },
        });
        bId = batch.id;
      }

      await tx.emailCheck.createMany({
        data: outcomes.map((o) => ({
          userId: input.userId,
          apiKeyId: input.apiKeyId,
          batchId: bId,
          source: input.source,
          email: o.email,
          domain: o.domain,
          isValid: o.isValid,
          isDisposable: o.isDisposable,
          confidence: o.confidence,
          reason: o.reason,
          mxChecked: o.mxChecked,
          hasMx: o.hasMx,
          durationMs: o.durationMs,
        })),
      });

      await tx.creditLedger.create({
        data: {
          userId: input.userId,
          delta: -cost,
          balanceAfter,
          reason: isBatch ? 'batch' : 'check',
          refType: isBatch ? 'check_batch' : 'email_check',
          refId: bId,
        },
      });

      return bId;
    });

    await audit({
      userId: input.userId,
      apiKeyId: input.apiKeyId,
      action: isBatch ? 'check.batch' : 'check.single',
      detail: { total: outcomes.length, valid: validCount, disposable: disposableCount, creditsCharged: cost, source: input.source },
      ip: input.ip,
      userAgent: input.userAgent,
    });

    return {
      results: outcomes,
      summary: {
        total: outcomes.length,
        valid: validCount,
        invalid: invalidCount,
        disposable: disposableCount,
        creditsCharged: cost,
        creditsRemaining: balanceAfter,
        batchId,
        durationMs,
      },
    };
  } catch (err) {
    // Falhou depois de debitar → estorna para não cobrar por trabalho não entregue.
    await refundCredits(input.userId, cost).catch(() => {});
    throw err;
  }
}
