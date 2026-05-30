import { useParams } from 'react-router';
import { useEventsList } from '@tasky/sdk';
import { Icon } from '../components/icon.tsx';

const STATUS_COLOR: Record<string, string> = {
  PENDING:    'var(--text-faint)',
  PROCESSING: 'var(--accent)',
  PROCESSED:  '#4ADE80',
  IGNORED:    'var(--text-faint)',
  FAILED:     '#F87171',
};

export function EventsPage() {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const { data: events = [], isLoading } = useEventsList(workspaceSlug!);

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content tk-wide">
          <div className="tk-head">
            <div>
              <h1 className="tk-greet">Eventos</h1>
              <div className="tk-date">
                {isLoading ? 'Carregando…' : `${events.length} eventos · log de auditoria`}
              </div>
            </div>
            <div className="tk-headtools">
              <div className="tk-iconbtn"><Icon name="sliders" size={19} /></div>
            </div>
          </div>

          <div style={{ marginTop: 44 }}>
            <div className="tk-cfg-card">
              {isLoading && (
                <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-faint)', fontSize: 14 }}>
                  Carregando…
                </div>
              )}
              {!isLoading && events.length === 0 && (
                <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-faint)', fontSize: 14 }}>
                  Nenhum evento recebido ainda. Os conectores enviarão eventos aqui.
                </div>
              )}
              {events.map((ev) => (
                <div key={ev.id} className="tk-log">
                  <span className="t" style={{ fontSize: 12, flex: '0 0 72px' }}>
                    {new Date(ev.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 12,
                    color: 'var(--text-dim)', flex: 1,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {ev.connectorId}
                  </span>
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                    color: STATUS_COLOR[ev.status] ?? 'var(--text-faint)',
                    flex: '0 0 90px', textAlign: 'right',
                  }}>
                    {ev.status}
                  </span>
                  {ev.agentNotes && (
                    <span style={{
                      fontSize: 11, color: 'var(--text-faint)',
                      marginLeft: 16, flex: '0 0 auto',
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      maxWidth: 240,
                    }}>
                      <Icon name="spark" size={12} />
                      {ev.agentNotes.slice(0, 60)}{ev.agentNotes.length > 60 ? '…' : ''}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
