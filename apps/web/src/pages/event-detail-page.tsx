import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useConnectorsList, useItemsCreate } from '@tasky/sdk';
import { BrandTile } from '../connectors/brand-tile.tsx';
import { Icon } from '../components/icon.tsx';

const API_URL = import.meta.env['VITE_API_URL'] ?? 'http://localhost:3061';

const TYPE_TO_BRAND: Record<string, string> = {
  GMAIL: 'Gmail', SLACK: 'Slack', WHATSAPP: 'WhatsApp',
  NUBANK: 'Nubank', GITHUB: 'GitHub', LINEAR: 'Linear',
  NOTION: 'Notion', GOOGLE_CALENDAR: 'Google Agenda', TELEGRAM: 'Telegram',
};

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  PENDING:    { label: 'Pendente',     color: 'var(--text-faint)' },
  PROCESSING: { label: 'Processando',  color: 'var(--accent)' },
  PROCESSED:  { label: 'Processado',   color: '#4ADE80' },
  IGNORED:    { label: 'Ignorado',     color: 'var(--text-faint)' },
  FAILED:     { label: 'Erro',         color: '#F87171' },
};

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 32 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</h3>
        {hint && <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'var(--surface)', borderRadius: 14,
      border: '1px solid var(--hairline)', padding: '4px 20px',
      ...style,
    }}>
      {children}
    </div>
  );
}

function MetaRow({ label, value, mono, copyable }: { label: string; value: string; mono?: boolean; copyable?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '13px 0', borderBottom: '1px solid var(--hairline)',
    }}>
      <div style={{ flex: '0 0 140px', fontSize: 13, color: 'var(--text-dim)' }}>{label}</div>
      <div style={{ flex: 1, fontSize: 13, color: 'var(--text)', fontFamily: mono ? 'var(--mono)' : 'inherit', display: 'flex', alignItems: 'center', gap: 8 }}>
        {value}
        {copyable && (
          <span
            style={{ color: 'var(--text-faint)', cursor: 'pointer', flexShrink: 0 }}
            onClick={() => navigator.clipboard.writeText(value)}
          >
            <Icon name="copy" size={13} />
          </span>
        )}
      </div>
    </div>
  );
}

export function EventDetailPage() {
  const { workspaceSlug, eventId } = useParams<{ workspaceSlug: string; eventId: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { data: connectors = [] } = useConnectorsList(workspaceSlug!);
  const connectorMap = Object.fromEntries(connectors.map((c) => [c.id, c]));

  const { mutate: createItem, isPending: isCreating } = useItemsCreate({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: [`/${workspaceSlug}/items`] });
      },
    },
  });

  useEffect(() => {
    if (!workspaceSlug || !eventId) return;
    fetch(`${API_URL}/${workspaceSlug}/events/${eventId}`)
      .then((r) => r.json())
      .then((data) => { setEvent(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [workspaceSlug, eventId]);

  if (loading) {
    return (
      <div className="tk-main">
        <div className="tk-scroll">
          <div style={{ padding: '80px 44px', textAlign: 'center', color: 'var(--text-faint)', fontSize: 14 }}>
            Carregando…
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="tk-main">
        <div className="tk-scroll">
          <div style={{ padding: '80px 44px', textAlign: 'center', color: 'var(--text-faint)', fontSize: 14 }}>
            Evento não encontrado.{' '}
            <span style={{ color: 'var(--accent)', cursor: 'pointer' }} onClick={() => navigate(-1)}>Voltar</span>
          </div>
        </div>
      </div>
    );
  }

  const connector  = connectorMap[event.connectorId];
  const brand      = connector ? (TYPE_TO_BRAND[connector.type] ?? connector.name) : '';
  const payload    = event.rawPayload as Record<string, unknown>;
  const evData     = (payload['data'] as Record<string, unknown> | undefined) ?? {};
  const evType     = (payload['type'] as string | undefined) ?? 'Event';
  const evSource   = (payload['source'] as string | undefined) ?? '';
  const title      = evData['title'] as string | undefined;
  const body       = evData['body'] as string | undefined;
  const state      = (evData['state'] as Record<string, unknown> | undefined)?.['name'] as string | undefined;
  const team       = (evData['team'] as Record<string, unknown> | undefined)?.['name'] as string | undefined;
  const assignee   = (evData['assignee'] as Record<string, unknown> | undefined)?.['name'] as string | undefined;
  const url        = evData['url'] as string | undefined;
  const statusInfo = STATUS_LABEL[event.status] ?? STATUS_LABEL['PENDING']!;

  const createdAt  = new Date(event.createdAt);
  const shortDate  = createdAt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  const shortTime  = createdAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const externalId = event.externalId as string | null;
  const shortId    = eventId?.slice(-8).toUpperCase();

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '52px 44px 80px' }}>

          {/* Back */}
          <span
            className="tk-back"
            onClick={() => navigate(`/${workspaceSlug}/events`)}
            style={{ marginBottom: 28, display: 'inline-flex', alignItems: 'center', gap: 7 }}
          >
            <Icon name="chevronL" size={15} />Eventos
          </span>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 4 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--text-faint)',
                  background: 'var(--surface-2)', padding: '3px 8px', borderRadius: 6,
                }}>
                  EVT-{shortId}
                </span>
                <span style={{
                  fontSize: 11.5, fontWeight: 600,
                  color: statusInfo.color,
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusInfo.color, display: 'inline-block' }} />
                  {statusInfo.label}
                </span>
              </div>
              <h1 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 6px', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                {title ?? evType}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-dim)', fontSize: 13.5 }}>
                {brand && <BrandTile brand={brand} size={22} radius={6} />}
                <span style={{ fontWeight: 500 }}>{connector?.name ?? brand}</span>
                {evType && <><span style={{ color: 'var(--hairline-2)' }}>·</span><span style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>{evType}</span></>}
                <span style={{ color: 'var(--hairline-2)' }}>·</span>
                <span>{shortDate} às {shortTime}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 9, flexShrink: 0, marginTop: 4 }}>
              <button
                style={{
                  background: 'var(--surface-2)', border: '1px solid var(--hairline)',
                  color: 'var(--text-dim)', fontSize: 13.5, fontWeight: 500,
                  padding: '9px 16px', borderRadius: 11, cursor: 'pointer', fontFamily: 'var(--font)',
                }}
              >
                Ignorar
              </button>
              <button
                onClick={() => createItem({
                  workspaceId: workspaceSlug!,
                  data: {
                    type: 'TASK',
                    title: title ?? evType,
                    description: body ?? undefined,
                    priority: 'MEDIUM',
                  },
                })}
                disabled={isCreating}
                style={{
                  background: 'var(--accent)', border: 'none',
                  color: 'var(--accent-dark)', fontSize: 13.5, fontWeight: 600,
                  padding: '9px 16px', borderRadius: 11, cursor: 'pointer', fontFamily: 'var(--font)',
                  opacity: isCreating ? 0.6 : 1,
                  display: 'flex', alignItems: 'center', gap: 7,
                }}
              >
                <Icon name="plus" size={15} stroke={2} />
                {isCreating ? 'Criando…' : 'Criar tarefa'}
              </button>
            </div>
          </div>

          {/* Message / Content */}
          {(title || body) && (
            <Section title="Conteúdo">
              <div style={{
                background: 'var(--surface)', borderRadius: 14,
                border: '1px solid var(--hairline)', padding: '18px 20px',
              }}>
                {title && (
                  <div style={{ fontSize: 15.5, fontWeight: 500, marginBottom: body ? 10 : 0 }}>{title}</div>
                )}
                {body && (
                  <div style={{
                    fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6,
                    paddingLeft: 12, borderLeft: '2px solid var(--hairline-2)',
                    fontStyle: 'normal',
                  }}>
                    "{body}"
                  </div>
                )}
                {(state || team || assignee) && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                    {state && (
                      <span style={{ fontSize: 12, background: 'var(--surface-2)', padding: '3px 9px', borderRadius: 6, color: 'var(--text-dim)' }}>
                        {state}
                      </span>
                    )}
                    {team && (
                      <span style={{ fontSize: 12, background: 'var(--surface-2)', padding: '3px 9px', borderRadius: 6, color: 'var(--text-dim)' }}>
                        {team}
                      </span>
                    )}
                    {assignee && (
                      <span style={{ fontSize: 12, background: 'var(--surface-2)', padding: '3px 9px', borderRadius: 6, color: 'var(--text-dim)' }}>
                        @{assignee}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Section>
          )}

          {/* Agent notes */}
          {event.agentNotes && (
            <Section title="Análise do modelo" hint="claude-opus-4-8">
              <div style={{
                background: 'var(--surface)', borderRadius: 14,
                border: '1px solid var(--accent-line)', padding: '16px 20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <Icon name="spark" size={15} style={{ color: 'var(--accent)' }} />
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--accent)' }}>Raciocínio do agente</span>
                </div>
                <div style={{ fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.6 }}>
                  {event.agentNotes}
                </div>
              </div>
            </Section>
          )}

          {/* Metadata */}
          <Section title="Metadados">
            <Card>
              <MetaRow label="Event ID"   value={eventId ?? ''}    mono copyable />
              <MetaRow label="Recebido"   value={`${shortDate} ${shortTime}`} />
              {event.processedAt && (
                <MetaRow
                  label="Processado"
                  value={new Date(event.processedAt).toLocaleString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                />
              )}
              <MetaRow label="Conector"   value={connector ? `${connector.name} · ${connector.type}` : event.connectorId} />
              <MetaRow label="Status"     value={statusInfo.label} />
              {externalId && <MetaRow label="External ID" value={externalId} mono copyable />}
              {evSource    && <MetaRow label="Source"     value={evSource} mono />}
              {evType      && <MetaRow label="Tipo"       value={evType} mono />}
              {url && (
                <div style={{ padding: '13px 0', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ flex: '0 0 140px', fontSize: 13, color: 'var(--text-dim)' }}>URL</div>
                  <a href={url} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontFamily: 'var(--mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {url}
                  </a>
                </div>
              )}
            </Card>
          </Section>

          {/* Raw payload */}
          <Section title="Raw payload · MCP">
            <div style={{
              background: '#0A0A0D', borderRadius: 12,
              border: '1px solid var(--hairline)', padding: '16px 18px',
              position: 'relative',
            }}>
              <button
                onClick={() => navigator.clipboard.writeText(JSON.stringify(event.rawPayload, null, 2))}
                style={{
                  position: 'absolute', top: 12, right: 12,
                  background: 'var(--surface-2)', border: 'none',
                  color: 'var(--text-faint)', padding: '5px 10px', borderRadius: 7,
                  cursor: 'pointer', fontSize: 12, fontFamily: 'var(--font)',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}
              >
                <Icon name="copy" size={13} />Copiar
              </button>
              <pre style={{
                margin: 0, fontSize: 12, lineHeight: 1.6,
                fontFamily: 'var(--mono)', color: 'var(--text-dim)',
                overflow: 'auto', maxHeight: 400,
                whiteSpace: 'pre-wrap', wordBreak: 'break-all',
              }}>
                {JSON.stringify(event.rawPayload, null, 2)}
              </pre>
            </div>
          </Section>

          <div style={{ height: 40 }} />
        </div>
      </div>
    </div>
  );
}
