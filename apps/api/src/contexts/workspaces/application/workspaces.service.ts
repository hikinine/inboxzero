import type { PrismaClient } from '@prisma/client';
import type { CreateWorkspaceDto } from '../presentation/dto/create-workspace.dto.js';

export class WorkspacesService {
  constructor(private readonly prisma: PrismaClient) {}

  findAll() {
    return this.prisma.workspace.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findBySlug(slug: string) {
    return this.prisma.workspace.findUnique({ where: { slug } });
  }

  create(dto: CreateWorkspaceDto) {
    return this.prisma.workspace.create({ data: dto });
  }

  async delete(id: string) {
    return this.prisma.workspace.delete({ where: { id } });
  }
}
