export interface ProcessItemInput {
  type:        'TASK' | 'FOLLOW_UP' | 'REMINDER' | 'NOTIFICATION' | 'DRAFT';
  title:       string;
  description?: string;
  priority:    'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate?:    string;
  metadata?:   Record<string, unknown>;
}

export interface CreateItemsInput {
  items:       ProcessItemInput[];
  agentNotes?: string;
}

export interface IgnoreEventInput {
  reason: string;
}

export function getTaskyTools(): object[] {
  return [
    {
      name: 'create_items',
      description:
        'Cria um ou mais itens acionáveis a partir do evento. Use para tarefas, follow-ups, lembretes, notificações ou rascunhos que o usuário precisa ver.',
      input_schema: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            description: 'Lista de itens a criar. Pode ser vazia se não houver ação necessária.',
            items: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['TASK', 'FOLLOW_UP', 'REMINDER', 'NOTIFICATION', 'DRAFT'],
                  description: 'TASK=algo a fazer, FOLLOW_UP=acompanhar depois, REMINDER=lembrar no horário, NOTIFICATION=informativo, DRAFT=rascunho a revisar',
                },
                title:       { type: 'string', description: 'Título claro e objetivo em português, máx 80 chars' },
                description: { type: 'string', description: 'Contexto adicional opcional' },
                priority: {
                  type: 'string',
                  enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
                  description: 'URGENT=requer ação imediata, HIGH=hoje, MEDIUM=esta semana, LOW=quando possível',
                },
                dueDate:  { type: 'string', description: 'ISO 8601 datetime se houver prazo. Opcional.' },
                metadata: { type: 'object', description: 'Dados extras: URL, ID do PR, thread ID, etc.' },
              },
              required: ['type', 'title', 'priority'],
            },
          },
          agentNotes: {
            type: 'string',
            description: 'Raciocínio breve (1-2 frases) de por que criou esses itens. Fica visível no log de auditoria.',
          },
        },
        required: ['items'],
      },
    },
    {
      name: 'ignore_event',
      description:
        'Marca o evento como ignorado. Use quando o evento é informativo e não requer ação do usuário.',
      input_schema: {
        type: 'object',
        properties: {
          reason: { type: 'string', description: 'Motivo em português (ex: "Confirmação automática de sistema, sem ação necessária")' },
        },
        required: ['reason'],
      },
    },
  ];
}
