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

  ingest(workspaceId: string, dto: IngestEventDto) {
    return this.prisma.event.create({
      data: {
        workspaceId,
        connectorId: dto.connectorId,
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
