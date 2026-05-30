import type { PrismaClient } from '@prisma/client';
import type { CreateConnectorDto } from '../presentation/dto/create-connector.dto.js';
import type { UpdateConnectorDto } from '../presentation/dto/update-connector.dto.js';

export class ConnectorsService {
  constructor(private readonly prisma: PrismaClient) {}

  findByWorkspace(workspaceId: string) {
    return this.prisma.connector.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'asc' },
    });
  }

  findById(id: string) {
    return this.prisma.connector.findUnique({ where: { id } });
  }

  create(workspaceId: string, dto: CreateConnectorDto) {
    return this.prisma.connector.create({
      data: { workspaceId, ...dto, config: dto.config as any },
    });
  }

  update(id: string, dto: UpdateConnectorDto) {
    return this.prisma.connector.update({
      where: { id },
      data: { ...dto, config: dto.config as any },
    });
  }

  delete(id: string) {
    return this.prisma.connector.delete({ where: { id } });
  }
}
