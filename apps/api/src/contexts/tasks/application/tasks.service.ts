import type { PrismaClient } from '@prisma/client';
import type { CreateTaskDto } from '../presentation/dto/create-task.dto.js';
import type { UpdateTaskDto } from '../presentation/dto/update-task.dto.js';

export class TasksService {
  constructor(private readonly prisma: PrismaClient) {}

  findAll() {
    return this.prisma.task.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findById(id: string) {
    return this.prisma.task.findUnique({ where: { id } });
  }

  create(dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...dto,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });
  }

  update(id: string, dto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: {
        ...dto,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });
  }

  delete(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }
}
