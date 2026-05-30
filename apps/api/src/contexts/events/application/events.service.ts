import type { PrismaClient } from '@prisma/client';
import type { IngestEventDto } from '../presentation/dto/ingest-event.dto.js';
import type { ProcessEventDto } from '../presentation/dto/process-event.dto.js';

export class EventsService {
  constructor(private readonly prisma: PrismaClient) {}

  findPending(workspaceId: string) {
    return this.prisma.event.findMany({
      where: { workspaceId, status: 'PENDING' },
      orderBy: { createdAt: 'asc' },
      take: 50,
    });
  }

  findByWorkspace(workspaceId: string) {
    return this.prisma.event.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }

  async ingest(workspaceId: string, dto: IngestEventDto) {
    // Sem externalId: webhook ou ingest manual — cria sempre
    if (!dto.externalId) {
      return this.prisma.event.create({
        data: {
          workspaceId,
          connectorId: dto.connectorId,
          rawPayload:  dto.rawPayload as any,
          status:      'PENDING',
        },
      });
    }

    // Com externalId (polling): idempotente
    // - PENDING existente → atualiza payload (item mudou, re-avalia)
    // - PROCESSED/IGNORED existente → cria novo evento (mudança após processamento)
    // - Não existe → cria
    const existing = await this.prisma.event.findFirst({
      where: { connectorId: dto.connectorId, externalId: dto.externalId },
      orderBy: { createdAt: 'desc' },
    });

    if (existing?.status === 'PENDING' || existing?.status === 'PROCESSING') {
      // Já está na fila — atualiza o payload com dados mais recentes
      return this.prisma.event.update({
        where: { id: existing.id },
        data:  { rawPayload: dto.rawPayload as any },
      });
    }

    // Não existe ou já foi processado — cria novo
    return this.prisma.event.create({
      data: {
        workspaceId,
        connectorId: dto.connectorId,
        externalId:  dto.externalId,
        rawPayload:  dto.rawPayload as any,
        status:      'PENDING',
      },
    });
  }

  async process(eventId: string, dto: ProcessEventDto) {
    return this.prisma.$transaction(async (tx) => {
      const event = await tx.event.update({
        where: { id: eventId },
        data: {
          status:      dto.ignored ? 'IGNORED' : 'PROCESSED',
          processedAt: new Date(),
          agentNotes:  dto.agentNotes ?? null,
        },
      });

      if (!dto.ignored && dto.items.length > 0) {
        await tx.item.createMany({
          data: dto.items.map((item) => ({
            workspaceId: event.workspaceId,
            eventId:     event.id,
            type:        item.type,
            title:       item.title,
            description: item.description ?? null,
            priority:    item.priority,
            dueDate:     item.dueDate ? new Date(item.dueDate) : null,
            metadata:    (item.metadata ?? null) as any,
            status:      'OPEN' as const,
          })),
        });
      }

      return event;
    });
  }
}
