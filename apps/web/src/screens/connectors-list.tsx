import { useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useConnectorsList, useConnectorsCreate } from '@tasky/sdk';
import { BrandTile } from '../connectors/brand-tile.tsx';
import { Icon } from '../components/icon.tsx';
import { ROWS } from '../connectors/brands.ts';

const TYPE_TO_BRAND: Record<string, string> = {
  GMAIL: 'Gmail', SLACK: 'Slack', WHATSAPP: 'WhatsApp',
  NUBANK: 'Nubank', GITHUB: 'GitHub', LINEAR: 'Linear',
  NOTION: 'Notion', GOOGLE_CALENDAR: 'Google Agenda', TELEGRAM: 'Telegram', CUSTOM: '',
};

function ConnPill({ connected, onClick }: { connected: boolean; onClick?: () => void }) {
  if (connected) {
    return (
      <div
        onClick={onClick}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'var(--surface-2)', padding: '8px 13px', borderRadius: 10,
          border: '1px solid var(--hairline)', flexShrink: 0, cursor: onClick ? 'pointer' : 'default',
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-dim)' }}>Conectado</span>
        <Icon name="chevronR" size={14} style={{ color: 'var(--text-faint)' }} />
      </div>
    );
  }
  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: 'var(--surface-3)', padding: '8px 13px', borderRadius: 10,
        flexShrink: 0, cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-dim)' }}>Conectar</span>
      <Icon name="arrowR" size={14} style={{ color: 'var(--text-faint)' }} />
    </div>
  );
}

interface ConnectorsListProps {
  onNavigate: (path: string) => void;
}

export function ConnectorsListScreen({ onNavigate }: ConnectorsListProps) {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const qc = useQueryClient();

  const { data: connectors = [], isLoading } = useConnectorsList(workspaceSlug!);
  const { mutate: createConnector } = useConnectorsCreate({
    mutation: {
      onSuccess: (created) => {
        qc.invalidateQueries({ queryKey: [`/${workspaceSlug}/connectors`] });
        onNavigate(`connectors/${created.id}`);
      },
    },
  });

  const connected  = connectors.filter((c) => c.enabled);
  const connectedBrands = new Set(connected.map((c) => TYPE_TO_BRAND[c.type] ?? ''));

  // Available = brands from ROWS not yet connected
  const available = ROWS.filter((r) => !connectedBrands.has(r.brand));

  const handleConnect = (brand: string) => {
    const WIZARD_ROUTES: Record<string, string> = {
      Linear: 'connectors/linear',
      Gmail:  'connectors/gmail',
    };
    const wizard = WIZARD_ROUTES[brand];
    if (wizard) { onNavigate(wizard); return; }
    onNavigate('connectors/add');
  };

  // Keep createConnector referenced to avoid unused variable warning
  void createConnector;

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div style={{ maxWidth: 648, margin: '0 auto', padding: '58px 32px 80px' }}>

          {/* Header */}
          <div style={{ marginBottom: 30 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <h1 style={{ fontSize: 26, fontWeight: 600, margin: 0, letterSpacing: '-0.02em', color: 'var(--text)', fontFamily: 'var(--font)' }}>
                  Contas conectadas
                </h1>
                <p style={{ fontSize: 13.5, color: 'var(--text-dim)', margin: '7px 0 0', lineHeight: 1.5, fontFamily: 'var(--font)' }}>
                  Conecte seus apps e deixe o assistente identificar e priorizar sinais automaticamente.
                </p>
              </div>
              <span
                className="tk-mini-ghost"
                style={{ flexShrink: 0, marginTop: 5 }}
                onClick={() => onNavigate('connectors/add')}
              >
                Explorar mais
              </span>
            </div>

            {/* Stats strip */}
            <div style={{
              display: 'flex', marginTop: 18,
              background: 'var(--surface)', borderRadius: 12,
              border: '1px solid var(--hairline)', overflow: 'hidden',
            }}>
              {[
                { val: `${connected.length} conectado${connected.length !== 1 ? 's' : ''}`, accent: true },
                { val: 'Última sync: agora' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '10px 16px', borderLeft: i > 0 ? '1px solid var(--hairline)' : 'none',
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 12.5, color: item.accent ? 'var(--accent)' : 'var(--text-dim)',
                }}>
                  {item.accent && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />}
                  <span style={{ fontWeight: item.accent ? 500 : 400 }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Claude Code — sempre no topo */}
          <div
            onClick={() => onNavigate('connectors/claude')}
            style={{
              display: 'flex', alignItems: 'center', gap: 15,
              padding: '14px 18px', marginBottom: 9,
              background: 'var(--surface)', borderRadius: 14,
              border: '1px solid rgba(217,119,87,0.25)',
              cursor: 'pointer', transition: 'border-color 0.15s',
            }}
          >
            {/* Ícone Claude Code */}
            <div style={{
              width: 42, height: 42, borderRadius: 12, flexShrink: 0,
              background: '#D97757',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(217,119,87,0.30), inset 0 1px 0 rgba(255,255,255,0.18)',
            }}>
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="white"
                strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 8l5 4-5 4" /><path d="M13 16h4" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 3 }}>Claude Code</div>
              <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>
                Agente de código no seu workspace — lê, escreve e executa via MCP
              </div>
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(217,119,87,0.12)', padding: '8px 13px', borderRadius: 10,
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#D97757' }}>Configurar</span>
              <Icon name="arrowR" size={14} style={{ color: '#D97757' }} />
            </div>
          </div>

          {/* Connected */}
          {connected.length > 0 && (
            <>
              <div style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 12, fontFamily: 'var(--font)',
              }}>Conectados</div>
              {connected.map((c) => {
                const brand = TYPE_TO_BRAND[c.type] ?? c.name;
                const row = ROWS.find((r) => r.brand === brand);
                return (
                  <div
                    key={c.id}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 15,
                      padding: '14px 18px',
                      background: 'var(--surface)', borderRadius: 14,
                      border: '1px solid var(--hairline)', marginBottom: 9,
                    }}
                  >
                    <BrandTile brand={brand} size={42} radius={12} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 3 }}>{c.name}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>
                        {row?.desc ?? 'Conector ativo via MCP'}
                      </div>
                    </div>
                    <ConnPill connected onClick={() => onNavigate(`connectors/${c.id}`)} />
                  </div>
                );
              })}
            </>
          )}

          {/* Available */}
          {available.length > 0 && (
            <>
              <div style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'var(--text-faint)',
                margin: `${connected.length > 0 ? '26px' : '0px'} 0 12px`, fontFamily: 'var(--font)',
              }}>Disponíveis</div>
              {available.map((r) => (
                <div
                  key={r.brand}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 15,
                    padding: '14px 18px',
                    background: 'var(--surface)', borderRadius: 14,
                    border: '1px solid var(--hairline)', marginBottom: 9,
                  }}
                >
                  <BrandTile brand={r.brand} size={42} radius={12} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                      <span style={{ fontSize: 15, fontWeight: 500 }}>{r.brand}</span>
                      {r.isNew && <span className="tkc-new">NEW</span>}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>{r.desc}</div>
                  </div>
                  <ConnPill connected={false} onClick={() => handleConnect(r.brand)} />
                </div>
              ))}
            </>
          )}

          {!isLoading && connected.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-faint)', fontSize: 14 }}>
              Nenhum conector ainda. <span style={{ color: 'var(--accent)', cursor: 'pointer' }} onClick={() => onNavigate('connectors/add')}>Adicionar →</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
