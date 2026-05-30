import { useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useItemsList, useItemsUpdate, useItemsDismiss, getItemsListQueryKey } from '@tasky/sdk';
import { Icon } from '../components/icon.tsx';
import type { IconName } from '../components/icon.tsx';

const PRIORITY_ORDER: Record<string, number> = { URGENT: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };

const PRIORITY_COLOR: Record<string, string> = {
  URGENT: 'var(--accent)',
  HIGH:   '#F87171',
  MEDIUM: 'var(--text-dim)',
  LOW:    'var(--text-faint)',
};

const TYPE_ICON: Record<string, IconName> = {
  TASK:         'checklist',
  FOLLOW_UP:    'repeat',
  REMINDER:     'bell',
  NOTIFICATION: 'dot',
  DRAFT:        'doc',
};

const TYPE_LABEL: Record<string, string> = {
  TASK:         'Tarefa',
  FOLLOW_UP:    'Follow-up',
  REMINDER:     'Lembrete',
  NOTIFICATION: 'Notificação',
  DRAFT:        'Rascunho',
};

export function InboxPage() {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const qc = useQueryClient();

  const { data: items = [], isLoading } = useItemsList(workspaceSlug!);

  const invalidate = () => qc.invalidateQueries({ queryKey: getItemsListQueryKey(workspaceSlug!) });

  const { mutate: updateItem } = useItemsUpdate({ mutation: { onSuccess: invalidate } });
  const { mutate: dismissItem } = useItemsDismiss({ mutation: { onSuccess: invalidate } });

  const open = items.filter((i) => i.status === 'OPEN');
  const sorted = [...open].sort(
    (a, b) => (PRIORITY_ORDER[a.priority] ?? 99) - (PRIORITY_ORDER[b.priority] ?? 99),
  );

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content">
          <div className="tk-head">
            <div>
              <h1 className="tk-greet">Inbox</h1>
              <div className="tk-date">
                {isLoading
                  ? 'Carregando…'
                  : `${open.length} ${open.length === 1 ? 'item aberto' : 'itens abertos'}`}
              </div>
            </div>
            <div className="tk-headtools">
              <div className="tk-iconbtn"><Icon name="sliders" size={19} /></div>
            </div>
          </div>

          {!isLoading && sorted.length === 0 && (
            <div style={{ textAlign: 'center', paddingTop: 100, color: 'var(--text-faint)', fontSize: 15 }}>
              Inbox vazio — o agente ainda não processou nenhum evento.
            </div>
          )}

          <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sorted.map((item) => (
              <div key={item.id} className="tk-signal">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  {/* Type icon */}
                  <div style={{
                    width: 36, height: 36, borderRadius: 11,
                    background: 'var(--surface-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: PRIORITY_COLOR[item.priority],
                    flexShrink: 0,
                  }}>
                    <Icon name={TYPE_ICON[item.type] ?? 'dot'} size={18} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15.5, fontWeight: 500, lineHeight: 1.3 }}>{item.title}</div>
                    {item.description && (
                      <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 5, lineHeight: 1.5 }}>
                        {item.description}
                      </div>
                    )}

                    {/* Meta row */}
                    <div style={{ display: 'flex', gap: 14, marginTop: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
                        textTransform: 'uppercase', color: PRIORITY_COLOR[item.priority],
                      }}>
                        {item.priority}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--text-faint)', background: 'var(--surface-2)', padding: '2px 8px', borderRadius: 6 }}>
                        {TYPE_LABEL[item.type] ?? item.type}
                      </span>
                      {item.dueDate && (
                        <span style={{ fontSize: 12, color: 'var(--text-faint)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                          <Icon name="clock" size={13} />
                          {new Date(item.dueDate).toLocaleString('pt-BR', {
                            day: '2-digit', month: 'short',
                            hour: '2-digit', minute: '2-digit',
                          })}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignItems: 'center' }}>
                    <span
                      className="tk-mini-primary"
                      onClick={() => updateItem({
                        workspaceId: workspaceSlug!,
                        itemId: item.id,
                        data: { status: 'DONE' },
                      })}
                    >
                      Concluir
                    </span>
                    <span
                      className="tk-mini-ghost"
                      onClick={() => dismissItem({
                        workspaceId: workspaceSlug!,
                        itemId: item.id,
                      })}
                    >
                      Ignorar
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tk-fab">
        <Icon name="plus" size={24} stroke={2} />
      </div>
    </div>
  );
}
