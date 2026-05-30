import { useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useConnectorsList, useConnectorsUpdate } from '@tasky/sdk';
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

interface ConnectorsHubProps {
  onNavigate: (path: string) => void;
}

export function ConnectorsHubScreen({ onNavigate }: ConnectorsHubProps) {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const qc = useQueryClient();

  const { data: connectors = [], isLoading } = useConnectorsList(workspaceSlug!);

  const { mutate: updateConnector } = useConnectorsUpdate({
    mutation: {
      onSuccess: () => qc.invalidateQueries({ queryKey: [`/${workspaceSlug}/connectors`] }),
    },
  });

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content">
          <div className="tk-head">
            <div>
              <h1 className="tk-greet">Conexões</h1>
              <div className="tk-date">
                {isLoading
                  ? 'Carregando…'
                  : connectors.length === 0
                    ? 'Nenhum conector configurado'
                    : `${connectors.filter((c) => c.enabled).length} serviço${connectors.filter((c) => c.enabled).length !== 1 ? 's' : ''} ativo${connectors.filter((c) => c.enabled).length !== 1 ? 's' : ''} via MCP`}
              </div>
            </div>
          </div>

          <div className="tk-conngrid">
            {connectors.map((c) => (
              <div
                key={c.id}
                className={`tk-conn${!c.enabled ? ' off' : ''}`}
                onClick={() => onNavigate(`connectors/${c.id}`)}
              >
                <div className="tk-conn-ico">
                  <Icon name={TYPE_ICON[c.type] ?? 'plug'} size={22} />
                </div>
                <div className="mid">
                  <div className="nm">{c.name}</div>
                  <div className="st">
                    {c.enabled ? 'Ativo' : 'Desativado'}
                    {c.enabled && <span className="tk-mcp">MCP</span>}
                  </div>
                </div>
                <div
                  className={`tk-toggle${c.enabled ? ' on' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateConnector({
                      workspaceId: workspaceSlug!,
                      connectorId: c.id,
                      data: { enabled: !c.enabled },
                    });
                  }}
                >
                  <div className="knob" />
                </div>
              </div>
            ))}

            {!isLoading && connectors.length === 0 && (
              <div
                className="tk-conn"
                style={{
                  gridColumn: '1/-1',
                  justifyContent: 'center',
                  color: 'var(--text-faint)',
                  fontSize: 14,
                  border: '1px dashed var(--hairline-2)',
                  background: 'transparent',
                }}
              >
                Nenhum conector ainda.
              </div>
            )}

            <div
              className="tk-conn tk-conn-add"
              onClick={() => onNavigate('connectors/add')}
            >
              <Icon name="plus" size={18} />
              Adicionar conector
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
