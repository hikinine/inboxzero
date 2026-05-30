import type { PrismaClient } from '@prisma/client';
import type { CreateItemDto } from '../presentation/dto/create-item.dto.js';
import type { UpdateItemDto } from '../presentation/dto/update-item.dto.js';

export class ItemsService {
  constructor(private readonly prisma: PrismaClient) {}

  findByWorkspace(workspaceId: string, type?: string) {
    return this.prisma.item.findMany({
      where: {
        workspaceId,
        ...(type ? { type: type as any } : {}),
        status: { not: 'DISMISSED' },
      },
      orderBy: [
        { priority: 'desc' },
        { dueDate: 'asc' },
        { createdAt: 'desc' },
      ],
    });
  }

  findById(id: string) {
    return this.prisma.item.findUnique({ where: { id } });
  }

  create(workspaceId: string, dto: CreateItemDto) {
    return this.prisma.item.create({
      data: {
        workspaceId,
        eventId:     null,
        type:        dto.type,
        title:       dto.title,
        description: dto.description ?? null,
        priority:    dto.priority,
        dueDate:     dto.dueDate ? new Date(dto.dueDate) : null,
        metadata:    (dto.metadata ?? null) as any,
        status:      'OPEN',
      },
    });
  }

  update(id: string, dto: UpdateItemDto) {
    return this.prisma.item.update({
      where: { id },
      data: {
        ...dto,
        dueDate:      dto.dueDate      ? new Date(dto.dueDate)      : undefined,
        snoozedUntil: dto.snoozedUntil ? new Date(dto.snoozedUntil) : undefined,
      },
    });
  }

  dismiss(id: string) {
    return this.prisma.item.update({
      where: { id },
      data: { status: 'DISMISSED' },
    });
  }
}
