import { useParams } from 'react-router';
import { useConnectorsGetById } from '@tasky/sdk';
import { Icon } from '../components/icon.tsx';
import type { IconName } from '../components/icon.tsx';

const TYPE_ICON: Record<string, IconName> = {
  GMAIL:           'mail',
  SLACK:           'send',
  WHATSAPP:        'chat',
  NUBANK:          'card',
  GITHUB:          'doc',
  LINEAR:          'checklist',
  NOTION:          'doc',
  GOOGLE_CALENDAR: 'calendar',
  TELEGRAM:        'send',
  CUSTOM:          'plug',
};

interface ConnectorConfigProps {
  onNavigate: (path: string) => void;
}

export function ConnectorConfigScreen({ onNavigate }: ConnectorConfigProps) {
  const { workspaceSlug, id: connectorId } = useParams<{
    workspaceSlug: string;
    id: string;
  }>();

  const { data: connector, isLoading } = useConnectorsGetById(
    workspaceSlug!,
    connectorId!,
    { query: { enabled: !!connectorId } },
  );

  if (isLoading) {
    return (
      <div className="tk-main">
        <div className="tk-scroll">
          <div className="tk-content tk-wide" style={{ paddingTop: 80, color: 'var(--text-faint)', textAlign: 'center', fontSize: 14 }}>
            Carregando…
          </div>
        </div>
      </div>
    );
  }

  if (!connector) {
    return (
      <div className="tk-main">
        <div className="tk-scroll">
          <div className="tk-content tk-wide" style={{ paddingTop: 80, color: 'var(--text-faint)', textAlign: 'center', fontSize: 14 }}>
            Conector não encontrado.{' '}
            <span style={{ color: 'var(--accent)', cursor: 'pointer' }} onClick={() => onNavigate('connectors')}>
              Voltar
            </span>
          </div>
        </div>
      </div>
    );
  }

  const cfg = connector.config as Record<string, unknown>;
  const endpoint      = (cfg['endpoint']      as string) ?? null;
  const transport     = (cfg['transport']      as string) ?? 'HTTP streaming · SSE';
  const token         = cfg['token']      ? `••••••••••${(cfg['token'] as string).slice(-4)}`  : null;
  const webhookUrl    = (cfg['webhookUrl']     as string) ?? null;
  const apiKey        = cfg['apiKey']     ? `••••••••••${(cfg['apiKey'] as string).slice(-4)}` : null;
  const validatedUser = cfg['validatedUser'] as { name?: string; email?: string } | null ?? null;
  const events        = Array.isArray(cfg['events']) ? (cfg['events'] as string[]) : null;

  const knownKeys = new Set(['endpoint', 'transport', 'token', 'webhookUrl', 'apiKey', 'validatedUser', 'events']);
  const extraEntries = Object.entries(cfg).filter(([k]) => !knownKeys.has(k));

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content tk-wide">
          <span className="tk-back" onClick={() => onNavigate('connectors')}>
            <Icon name="chevronL" size={16} />Conexões
          </span>

          {/* Header */}
          <div className="tk-cfg-head">
            <div className="tk-conn-ico">
              <Icon name={TYPE_ICON[connector.type] ?? 'plug'} size={26} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="nm">{connector.name}</div>
              <div className="sub">
                <span className="tk-status">
                  <span className="tk-statusdot" style={{ background: connector.enabled ? 'var(--accent)' : 'var(--text-faint)' }} />
                  {connector.enabled ? 'Ativo' : 'Desativado'}
                </span>
                <span className="tk-mcp">MCP</span>
                <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>{connector.type}</span>
              </div>
            </div>
            <div className={`tk-toggle${connector.enabled ? ' on' : ''}`}>
              <div className="knob" />
            </div>
          </div>

          {/* Servidor MCP */}
          {(endpoint || token) && (
            <div className="tk-sec">
              <div className="tk-sec-h">
                <h3>Servidor MCP</h3>
                <span className="hint">Conexão com o provedor</span>
              </div>
              <div className="tk-cfg-card">
                {endpoint && (
                  <div className="tk-cfg-row">
                    <div className="lead">
                      <div className="k">Endpoint</div>
                      <div className="d">URL do servidor MCP</div>
                    </div>
                    <div className="tk-code">
                      <span className="val">{endpoint}</span>
                      <span className="cp"><Icon name="copy" size={16} /></span>
                    </div>
                  </div>
                )}
                <div className="tk-cfg-row">
                  <div className="lead">
                    <div className="k">Transporte</div>
                    <div className="d">Protocolo de comunicação</div>
                  </div>
                  <div className="tk-code" style={{ maxWidth: 220 }}>
                    <span className="val">{transport}</span>
                  </div>
                </div>
                {token && (
                  <div className="tk-cfg-row">
                    <div className="lead">
                      <div className="k">Token OAuth</div>
                      <div className="d">Gerenciado pela Tasky</div>
                    </div>
                    <div className="tk-code">
                      <span className="val">{token}</span>
                      <span className="cp"><Icon name="eye" size={16} /></span>
                      <span className="cp"><Icon name="copy" size={16} /></span>
                    </div>
                  </div>
                )}
                {apiKey && (
                  <div className="tk-cfg-row">
                    <div className="lead">
                      <div className="k">API Key</div>
                      <div className="d">Chave de acesso à API</div>
                    </div>
                    <div className="tk-code">
                      <span className="val">{apiKey}</span>
                      <span className="cp"><Icon name="eye" size={16} /></span>
                      <span className="cp"><Icon name="copy" size={16} /></span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Webhook */}
          {webhookUrl && (
            <div className="tk-sec">
              <div className="tk-sec-h">
                <h3>Webhook</h3>
                <span className="hint">Endpoint de recebimento de eventos</span>
              </div>
              <div className="tk-cfg-card">
                <div className="tk-cfg-row">
                  <div className="lead">
                    <div className="k">URL de recebimento</div>
                    <div className="d">Endpoint da Tasky para este conector</div>
                  </div>
                  <div className="tk-code">
                    <span className="val">{webhookUrl}</span>
                    <span className="cp"><Icon name="copy" size={16} /></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conta validada (Linear, etc.) */}
          {validatedUser?.name && (
            <div className="tk-sec">
              <div className="tk-sec-h"><h3>Conta</h3><span className="hint">Autenticação validada</span></div>
              <div className="tk-cfg-card">
                <div className="tk-cfg-row">
                  <div className="lead">
                    <div className="k">{validatedUser.name}</div>
                    {validatedUser.email && <div className="d">{validatedUser.email}</div>}
                  </div>
                  <span className="tk-status" style={{ fontSize: 12 }}>
                    <span className="tk-statusdot" />Autenticado
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Eventos configurados */}
          {events && events.length > 0 && (
            <div className="tk-sec">
              <div className="tk-sec-h"><h3>Eventos</h3><span className="hint">Sinais que geram itens</span></div>
              <div className="tk-cfg-card">
                {events.map((ev) => (
                  <div key={ev} className="tk-cfg-row">
                    <div className="lead">
                      <div className="k" style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>{ev}</div>
                    </div>
                    <div style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600 }}>
                      <Icon name="check" size={13} stroke={2.4} />Ativo
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Campos extras desconhecidos */}
          {extraEntries.length > 0 && (
            <div className="tk-sec">
              <div className="tk-sec-h"><h3>Configuração adicional</h3></div>
              <div className="tk-cfg-card">
                {extraEntries.map(([k, v]) => (
                  <div key={k} className="tk-cfg-row">
                    <div className="lead">
                      <div className="k" style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>{k}</div>
                    </div>
                    <div className="tk-code">
                      <span className="val">
                        {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Config vazia */}
          {!endpoint && !token && !webhookUrl && !apiKey && !validatedUser && !events && extraEntries.length === 0 && (
            <div className="tk-sec">
              <div className="tk-cfg-card" style={{ padding: '20px 22px', color: 'var(--text-faint)', fontSize: 14 }}>
                Nenhuma configuração salva. Edite o conector para adicionar endpoint, token ou webhookUrl.
              </div>
            </div>
          )}

          <div style={{ height: 60 }} />
        </div>
      </div>
    </div>
  );
}
