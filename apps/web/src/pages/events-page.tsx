import { useParams } from 'react-router';
import { useEventsList, useConnectorsList } from '@tasky/sdk';
import { BrandTile } from '../connectors/brand-tile.tsx';
import { Icon } from '../components/icon.tsx';

const STATUS_COLOR: Record<string, string> = {
  PENDING:    'var(--text-faint)',
  PROCESSING: 'var(--accent)',
  PROCESSED:  '#4ADE80',
  IGNORED:    'var(--surface-3)',
  FAILED:     '#F87171',
};

const STATUS_LABEL: Record<string, string> = {
  PENDING:    'pendente',
  PROCESSING: 'processando',
  PROCESSED:  'processado',
  IGNORED:    'ignorado',
  FAILED:     'erro',
};

const TYPE_TO_BRAND: Record<string, string> = {
  GMAIL:           'Gmail',
  SLACK:           'Slack',
  WHATSAPP:        'WhatsApp',
  NUBANK:          'Nubank',
  GITHUB:          'GitHub',
  LINEAR:          'Linear',
  NOTION:          'Notion',
  GOOGLE_CALENDAR: 'Google Agenda',
  TELEGRAM:        'Telegram',
};

export function EventsPage() {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const { data: events = [], isLoading }     = useEventsList(workspaceSlug!);
  const { data: connectors = [] }            = useConnectorsList(workspaceSlug!);

  // Build lookup: connectorId → connector
  const connectorMap = Object.fromEntries(connectors.map((c) => [c.id, c]));

  const pending   = events.filter((e) => e.status === 'PENDING').length;
  const processed = events.filter((e) => e.status === 'PROCESSED').length;

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content tk-wide">
          <div className="tk-head">
            <div>
              <h1 className="tk-greet">Eventos</h1>
              <div className="tk-date">
                {isLoading
                  ? 'Carregando…'
                  : `${events.length} eventos · ${pending} pendente${pending !== 1 ? 's' : ''} · ${processed} processado${processed !== 1 ? 's' : ''}`}
              </div>
            </div>
            <div className="tk-headtools">
              <div className="tk-iconbtn"><Icon name="sliders" size={19} /></div>
            </div>
          </div>

          <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {isLoading && (
              <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-faint)', fontSize: 14 }}>
                Carregando…
              </div>
            )}

            {!isLoading && events.length === 0 && (
              <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-faint)', fontSize: 14 }}>
                Nenhum evento ainda. Execute <code style={{ fontFamily: 'var(--mono)', fontSize: 12, background: 'var(--surface-2)', padding: '2px 6px', borderRadius: 5 }}>pnpm --filter @tasky/agent poll</code> para buscar.
              </div>
            )}

            {events.map((ev) => {
              const connector = connectorMap[ev.connectorId];
              const brand     = connector ? (TYPE_TO_BRAND[connector.type] ?? '') : '';
              const payload   = ev.rawPayload as Record<string, unknown>;
              const evType    = payload['type'] as string | undefined;
              const evAction  = payload['action'] as string | undefined;
              const evData    = payload['data'] as Record<string, unknown> | undefined;
              const title     = evData?.['title'] as string | undefined;

              return (
                <div
                  key={ev.id}
                  style={{
                    display:       'flex',
                    alignItems:    'center',
                    gap:           14,
                    padding:       '11px 16px',
                    borderRadius:  12,
                    background:    'var(--surface)',
                    opacity:       ev.status === 'IGNORED' ? 0.45 : 1,
                  }}
                >
                  {/* Logo */}
                  {brand ? (
                    <BrandTile brand={brand} size={28} radius={8} />
                  ) : (
                    <div style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: 'var(--surface-2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-faint)', flexShrink: 0,
                    }}>
                      <Icon name="plug" size={14} />
                    </div>
                  )}

                  {/* Event info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      {connector && (
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', flexShrink: 0 }}>
                          {connector.name}
                        </span>
                      )}
                      {evType && (
                        <span style={{ fontSize: 12, color: 'var(--text-faint)', fontFamily: 'var(--mono)', flexShrink: 0 }}>
                          {evType}{evAction && evAction !== 'sync' ? ` · ${evAction}` : ''}
                        </span>
                      )}
                    </div>
                    {title && (
                      <div style={{
                        fontSize: 13, color: 'var(--text-dim)', marginTop: 2,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {title}
                      </div>
                    )}
                    {ev.agentNotes && ev.status !== 'PENDING' && (
                      <div style={{
                        fontSize: 11.5, color: 'var(--text-faint)', marginTop: 3,
                        display: 'flex', alignItems: 'center', gap: 5,
                      }}>
                        <Icon name="spark" size={11} />
                        {ev.agentNotes.slice(0, 80)}{ev.agentNotes.length > 80 ? '…' : ''}
                      </div>
                    )}
                  </div>

                  {/* Time */}
                  <span style={{
                    fontSize: 12, color: 'var(--text-faint)',
                    flexShrink: 0, fontVariantNumeric: 'tabular-nums',
                  }}>
                    {new Date(ev.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  {/* Status dot */}
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: STATUS_COLOR[ev.status] ?? 'var(--text-faint)',
                    flexShrink: 0,
                    title: STATUS_LABEL[ev.status],
                  }} title={STATUS_LABEL[ev.status]} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
