import { useState } from 'react';
import { useParams } from 'react-router';
import { useEventsList, useConnectorsList } from '@tasky/sdk';
import { BrandTile } from '../connectors/brand-tile.tsx';
import { Icon } from '../components/icon.tsx';

const TYPE_TO_BRAND: Record<string, string> = {
  GMAIL: 'Gmail', SLACK: 'Slack', WHATSAPP: 'WhatsApp',
  NUBANK: 'Nubank', GITHUB: 'GitHub', LINEAR: 'Linear',
  NOTION: 'Notion', GOOGLE_CALENDAR: 'Google Agenda', TELEGRAM: 'Telegram',
};

const PRIO_COLOR: Record<string, string> = {
  URGENT:  '#ef4444',
  HIGH:    '#f97316',
  MEDIUM:  '#f59e0b',
  LOW:     'var(--accent)',
  PENDING: 'var(--surface-3)',
  IGNORED: 'var(--surface-3)',
};

const SOURCE_LABELS = ['Tudo', 'Linear', 'Slack', 'GitHub', 'Gmail', 'WhatsApp', 'Nubank'];

const BRAND_DOT_COLOR: Record<string, string> = {
  Linear: '#5E6AD2', Slack: '#6B2C84', GitHub: '#8A8A9F',
  Gmail: '#E5453A', WhatsApp: '#1FAE5A', Nubank: '#820AD1',
  Notion: '#ECECEC', 'Google Agenda': '#2F6BE5', Telegram: '#229ED9',
};

interface EventRow {
  id: string;
  brand: string;
  connectorName: string;
  evType: string;
  action: string;
  title: string | null;
  firstMeta: string | null;
  time: string;
  status: string;
}

function groupByDay(rows: EventRow[]): { date: string; items: EventRow[] }[] {
  const groups = new Map<string, EventRow[]>();
  for (const row of rows) {
    const d = new Date(row.time);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    let label: string;
    if (d.toDateString() === today.toDateString()) {
      label = `Hoje · ${d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}`;
    } else if (d.toDateString() === yesterday.toDateString()) {
      label = `Ontem · ${d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}`;
    } else {
      label = d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'short' });
    }
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label)!.push(row);
  }
  return Array.from(groups.entries()).map(([date, items]) => ({ date, items }));
}

export function EventsPage() {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const [activeSource, setActiveSource] = useState('Tudo');
  const [activeStatus, setActiveStatus] = useState('Todos');

  const { data: events = [], isLoading }   = useEventsList(workspaceSlug!);
  const { data: connectors = [] }          = useConnectorsList(workspaceSlug!);

  const connectorMap = Object.fromEntries(connectors.map((c) => [c.id, c]));

  const rows: EventRow[] = events.map((ev) => {
    const connector  = connectorMap[ev.connectorId];
    const brand      = connector ? (TYPE_TO_BRAND[connector.type] ?? connector.name) : '';
    const payload    = ev.rawPayload as Record<string, unknown>;
    const evData     = payload['data'] as Record<string, unknown> | undefined;
    const evType     = (payload['type'] as string | undefined) ?? '';
    const evAction   = (payload['action'] as string | undefined) ?? '';
    const title      = (evData?.['title'] as string | undefined) ?? null;
    const firstMeta  = evData?.['state']
      ? (evData['state'] as Record<string, unknown>)['name'] as string
      : null;

    return {
      id:           ev.id,
      brand,
      connectorName: connector?.name ?? '',
      evType,
      action:       evAction,
      title,
      firstMeta,
      time:         ev.createdAt,
      status:       ev.status,
    };
  });

  // Filter by source
  const filtered = rows.filter((r) => {
    if (activeSource !== 'Tudo' && r.brand !== activeSource) return false;
    if (activeStatus === 'Processados' && r.status !== 'PROCESSED') return false;
    if (activeStatus === 'Pendentes'   && r.status !== 'PENDING')   return false;
    return true;
  });

  const groups = groupByDay(filtered);

  const pending   = events.filter((e) => e.status === 'PENDING').length;
  const processed = events.filter((e) => e.status === 'PROCESSED').length;

  // Suppress unused variable warnings for PRIO_COLOR
  void PRIO_COLOR;

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div style={{ padding: '52px 44px 72px', maxWidth: 860, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom: 26 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <h1 style={{ fontSize: 26, fontWeight: 600, margin: 0, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                  Connector Events
                </h1>
                <p style={{ fontSize: 13.5, color: 'var(--text-dim)', margin: '6px 0 0', lineHeight: 1.5, fontFamily: 'var(--font)' }}>
                  Log bruto de todos os eventos recebidos dos conectores, em ordem cronológica.
                </p>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0, marginTop: 4,
                background: 'var(--surface)', padding: '8px 13px', borderRadius: 10,
                border: '1px solid var(--hairline)', fontSize: 13, color: 'var(--text-dim)', cursor: 'pointer',
              }}>
                <Icon name="clock" size={14} />Últimas 48h
                <Icon name="chevronR" size={13} style={{ transform: 'rotate(90deg)', color: 'var(--text-faint)' }} />
              </div>
            </div>

            {/* Stats strip */}
            <div style={{
              display: 'flex', marginTop: 18,
              background: 'var(--surface)', borderRadius: 12,
              border: '1px solid var(--hairline)', overflow: 'hidden',
            }}>
              {[
                { val: isLoading ? '…' : `${events.length} eventos` },
                { val: isLoading ? '…' : `${processed} processados`, accent: true },
                { val: isLoading ? '…' : `${pending} pendentes`,     faint: true },
                { val: `${connectors.length} conectores ativos` },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '10px 16px', borderLeft: i > 0 ? '1px solid var(--hairline)' : 'none',
                  display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5,
                  color: item.accent ? 'var(--accent)' : item.faint ? 'var(--text-faint)' : 'var(--text-dim)',
                }}>
                  {item.accent && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />}
                  <span style={{ fontWeight: item.accent ? 500 : 400 }}>{item.val}</span>
                </div>
              ))}
            </div>

            {/* Source filter tabs + status filter */}
            <div style={{ display: 'flex', gap: 4, marginTop: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              {SOURCE_LABELS.map((label) => {
                const active = activeSource === label;
                const dotColor = BRAND_DOT_COLOR[label];
                return (
                  <div
                    key={label}
                    onClick={() => setActiveSource(label)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '6px 12px', borderRadius: 9, cursor: 'pointer',
                      background: active ? 'var(--surface-3)' : 'transparent',
                      color: active ? 'var(--text)' : 'var(--text-faint)',
                      fontSize: 13, fontWeight: active ? 500 : 400,
                      transition: 'background 0.15s, color 0.15s',
                    }}
                  >
                    {dotColor && label !== 'Tudo' && (
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: dotColor, flexShrink: 0 }} />
                    )}
                    {label}
                  </div>
                );
              })}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
                {['Todos', 'Processados', 'Pendentes'].map((s) => (
                  <span
                    key={s}
                    onClick={() => setActiveStatus(s)}
                    style={{
                      fontSize: 12, padding: '5px 10px', borderRadius: 7, cursor: 'pointer',
                      background: activeStatus === s ? 'var(--surface-3)' : 'transparent',
                      color: activeStatus === s ? 'var(--text)' : 'var(--text-faint)',
                      fontWeight: activeStatus === s ? 500 : 400,
                    }}
                  >{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Empty state */}
          {!isLoading && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-faint)', fontSize: 14 }}>
              {events.length === 0
                ? <>Nenhum evento ainda. Execute <code style={{ fontFamily: 'var(--mono)', fontSize: 12, background: 'var(--surface-2)', padding: '2px 6px', borderRadius: 5 }}>pnpm --filter @tasky/agent poll</code></>
                : 'Nenhum evento encontrado para este filtro.'
              }
            </div>
          )}

          {/* Compact timeline */}
          {groups.map((group) => (
            <div key={group.date} style={{ marginBottom: 18 }}>
              {/* Day header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <span style={{
                  fontSize: 10.5, fontWeight: 600, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'var(--text-faint)', whiteSpace: 'nowrap',
                  fontFamily: 'var(--font)',
                }}>{group.date}</span>
                <div style={{ flex: 1, height: 1, background: 'var(--hairline)' }} />
                <span style={{ fontSize: 12, color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>
                  {group.items.length} evento{group.items.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Card with rows */}
              <div style={{
                background: 'var(--surface)', borderRadius: 14,
                border: '1px solid var(--hairline)', overflow: 'hidden',
              }}>
                {group.items.map((row, i) => {
                  const prioColor = row.status === 'PENDING'
                    ? 'var(--text-faint)'
                    : row.status === 'PROCESSED'
                      ? 'var(--accent)'
                      : row.status === 'FAILED'
                        ? '#ef4444'
                        : 'var(--text-faint)';

                  const dimDot = row.status === 'PENDING' || row.status === 'IGNORED';

                  // Build inline text
                  const parts: string[] = [];
                  if (row.evType) parts.push(row.evType);
                  if (row.title)  parts.push(row.title);
                  const lineText = parts.join('  ·  ');

                  const timeStr = new Date(row.time).toLocaleTimeString('pt-BR', {
                    hour: '2-digit', minute: '2-digit',
                  });

                  return (
                    <div
                      key={row.id}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 0,
                        height: 50, padding: '0 20px',
                        borderTop: i === 0 ? 'none' : '1px solid var(--hairline)',
                      }}
                    >
                      {/* Brand tile */}
                      <div style={{ marginRight: 12, flexShrink: 0 }}>
                        {row.brand ? (
                          <BrandTile brand={row.brand} size={28} radius={8} />
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
                      </div>

                      {/* Brand name — fixed column */}
                      <div style={{ width: 80, flexShrink: 0, marginRight: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>
                          {row.brand || row.connectorName || '—'}
                        </span>
                      </div>

                      {/* Event info — truncated */}
                      <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                        <span style={{
                          fontSize: 13, color: 'var(--text-dim)',
                          display: 'block', overflow: 'hidden',
                          textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {lineText || '—'}
                        </span>
                      </div>

                      {/* First meta */}
                      {row.firstMeta && (
                        <div style={{ flexShrink: 0, marginLeft: 12 }}>
                          <span style={{
                            fontSize: 11, color: 'var(--text-faint)',
                            background: 'var(--surface-2)', padding: '2px 7px', borderRadius: 5,
                            whiteSpace: 'nowrap',
                          }}>{row.firstMeta}</span>
                        </div>
                      )}

                      {/* Time */}
                      <div style={{
                        width: 42, flexShrink: 0, textAlign: 'right', marginLeft: 14,
                        fontSize: 12, fontFamily: 'ui-monospace,Menlo,monospace',
                        color: 'var(--text-faint)', fontVariantNumeric: 'tabular-nums',
                      }}>{timeStr}</div>

                      {/* Status dot */}
                      <div style={{ width: 18, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                          width: 7, height: 7, borderRadius: '50%',
                          background: prioColor, opacity: dimDot ? 0.3 : 1,
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
