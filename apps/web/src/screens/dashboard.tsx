import { useParams } from 'react-router';
import { useItemsList } from '@tasky/sdk';
import { Icon } from '../components/icon.tsx';

const MOCK_EVENTS = [
  { time: '14:00', title: 'Reunião de design',  meta: 'Sala Aurora · com o time de produto', accent: true },
  { time: '16:30', title: 'Call com a Vértice', meta: 'Apresentação da proposta' },
  { time: '19:00', title: 'Jantar com a Marina',meta: 'Restaurante Oro' },
];

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

function todayLabel(): string {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long',
  });
}

interface DashboardProps {
  onNavigate: (path: string) => void;
}

export function DashboardScreen({ onNavigate }: DashboardProps) {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();

  const { data: items = [], isLoading } = useItemsList(workspaceSlug!, undefined, {
    query: { enabled: !!workspaceSlug },
  });

  const open = items.filter((i) => i.status === 'OPEN');
  const done = items.filter((i) => i.status === 'DONE');

  const summaryParts: string[] = [];
  if (MOCK_EVENTS.length) summaryParts.push(`${MOCK_EVENTS.length} compromissos`);
  if (open.length)        summaryParts.push(`${open.length} item${open.length !== 1 ? 's' : ''} aberto${open.length !== 1 ? 's' : ''}`);

  type IconName = Parameters<typeof Icon>[0]['name'];
  const TYPE_ICON: Record<string, IconName> = {
    TASK: 'checklist', FOLLOW_UP: 'repeat', REMINDER: 'bell',
    NOTIFICATION: 'dot', DRAFT: 'doc',
  };

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content">
          <div className="tk-head">
            <div>
              <h1 className="tk-greet">{greeting()}</h1>
              <div className="tk-date" style={{ textTransform: 'capitalize' }}>
                {todayLabel()}
                {summaryParts.length > 0 && ` · ${summaryParts.join(', ')}`}
              </div>
            </div>
            <div className="tk-headtools">
              <div className="tk-iconbtn"><Icon name="search" size={19} /></div>
              <div className="tk-iconbtn"><Icon name="bell" size={19} /></div>
            </div>
          </div>

          {/* Próximos compromissos — mock até ter calendário real */}
          <div style={{ marginTop: 48 }}>
            <div className="tk-eyebrow" style={{ marginBottom: 14 }}>
              <span>Próximos compromissos</span>
            </div>
            <div className="tk-card">
              {MOCK_EVENTS.map((ev, i) => (
                <div key={i} className="tk-event">
                  <div className={`tk-bar${ev.accent ? ' accent' : ''}`} />
                  <div className="tk-time">{ev.time}</div>
                  <div style={{ flex: 1 }}>
                    <div className="title">{ev.title}</div>
                    <div className="meta">{ev.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Itens abertos — dados reais */}
          <div style={{ marginTop: 40 }}>
            <div className="tk-eyebrow" style={{ marginBottom: 14 }}>
              <span>Hoje</span>
              {!isLoading && open.length > 0 && (
                <span className="count">
                  {open.length} aberto{open.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="tk-card" style={{ padding: '20px 22px', color: 'var(--text-faint)', fontSize: 14 }}>
                Carregando…
              </div>
            ) : open.length === 0 && done.length === 0 ? (
              <div className="tk-card" style={{ padding: '20px 22px', color: 'var(--text-faint)', fontSize: 14 }}>
                Inbox vazio — nenhum item aberto.
              </div>
            ) : (
              <div className="tk-card">
                {open.slice(0, 5).map((item) => (
                  <div key={item.id} className="tk-task" onClick={() => onNavigate('inbox')}>
                    <div className="tk-check" />
                    <div className="label">{item.title}</div>
                    <div className="tail">
                      {item.priority === 'URGENT' && (
                        <span className="tk-chip-mini accent">
                          <Icon name="flag" size={14} />Urgente
                        </span>
                      )}
                      {item.priority === 'HIGH' && item.priority !== 'URGENT' && (
                        <span className="tk-chip-mini accent">
                          <Icon name="clock" size={14} />Alta
                        </span>
                      )}
                      {(item.type === 'FOLLOW_UP' || item.type === 'REMINDER') && (
                        <span className="tk-prov">
                          <Icon name={TYPE_ICON[item.type] ?? 'dot'} size={14} />
                          {item.type === 'FOLLOW_UP' ? 'Follow-up' : 'Lembrete'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {open.length > 5 && (
                  <div
                    className="tk-task"
                    style={{ color: 'var(--text-faint)', justifyContent: 'center', fontSize: 13 }}
                    onClick={() => onNavigate('inbox')}
                  >
                    Ver mais {open.length - 5} item{open.length - 5 !== 1 ? 's' : ''} no Inbox →
                  </div>
                )}
                {done.slice(0, 2).map((item) => (
                  <div key={item.id} className="tk-task done">
                    <div className="tk-check done"><Icon name="check" size={14} stroke={2.4} /></div>
                    <div className="label">{item.title}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="tk-fab" onClick={() => onNavigate('tasks')}>
        <Icon name="plus" size={24} stroke={2} />
      </div>
    </div>
  );
}
