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

  async create(workspaceId: string, dto: CreateConnectorDto) {
    const connector = await this.prisma.connector.create({
      data: { workspaceId, ...dto, config: dto.config as any },
    });

    // Inject webhookUrl into config so the frontend can display it
    const publicUrl = process.env['PUBLIC_URL'] ?? 'http://localhost:3061';
    const webhookUrl = `${publicUrl}/webhooks/${connector.id}`;
    return this.prisma.connector.update({
      where: { id: connector.id },
      data: { config: { ...(connector.config as object), webhookUrl } },
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

  async validateLinearKey(apiKey: string): Promise<{
    valid: boolean;
    user: { id: string; name: string; email: string } | null;
    error: string | null;
  }> {
    try {
      const res = await fetch('https://api.linear.app/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiKey,
        },
        body: JSON.stringify({ query: '{ viewer { id name email } }' }),
      });

      const json = await res.json() as {
        data?: { viewer?: { id: string; name: string; email: string } };
        errors?: { message: string }[];
      };

      if (json.errors?.length) {
        return { valid: false, user: null, error: json.errors[0]?.message ?? 'API key inválida' };
      }

      const viewer = json.data?.viewer;
      if (!viewer) {
        return { valid: false, user: null, error: 'Resposta inesperada da API do Linear' };
      }

      return { valid: true, user: viewer, error: null };
    } catch (err) {
      return { valid: false, user: null, error: 'Falha ao conectar com a API do Linear' };
    }
  }
}
