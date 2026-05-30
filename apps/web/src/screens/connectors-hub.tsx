import { Icon } from '../components/icon.tsx';
import type { Screen } from '../app.tsx';
import type { IconName } from '../components/icon.tsx';

interface ConnectorProps {
  icon: IconName;
  name: string;
  status: string;
  on?: boolean;
  off?: boolean;
  onClick?: () => void;
}

function Connector({ icon, name, status, on, off, onClick }: ConnectorProps) {
  return (
    <div className={`tk-conn${off ? ' off' : ''}`} onClick={onClick}>
      <div className="tk-conn-ico"><Icon name={icon} size={22} /></div>
      <div className="mid">
        <div className="nm">{name}</div>
        <div className="st">
          {status}
          {!off && <span className="tk-mcp">MCP</span>}
        </div>
      </div>
      <div className={`tk-toggle${on ? ' on' : ''}`}><div className="knob" /></div>
    </div>
  );
}

interface ConnectorsHubProps {
  onNavigate: (s: Screen) => void;
}

export function ConnectorsHubScreen({ onNavigate }: ConnectorsHubProps) {
  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content">
          <div className="tk-head">
            <div>
              <h1 className="tk-greet">Conexões</h1>
              <div className="tk-date">
                7 serviços conectados via MCP · a Tasky escuta e cria tarefas sozinha
              </div>
            </div>
          </div>

          <div className="tk-conngrid">
            <Connector icon="chat"     name="WhatsApp"         status="38 tarefas este mês"      on onClick={() => onNavigate('connector-config')} />
            <Connector icon="send"     name="Slack"            status="21 tarefas este mês"      on onClick={() => onNavigate('connector-config')} />
            <Connector icon="card"     name="Nubank"           status="Financeiro · 12 este mês" on onClick={() => onNavigate('connector-config')} />
            <Connector icon="bell"     name="Notificações iOS" status="Push · 9 este mês"        on onClick={() => onNavigate('connector-config')} />
            <Connector icon="mail"     name="Gmail"            status="6 tarefas este mês"       on onClick={() => onNavigate('connector-config')} />
            <Connector icon="calendar" name="Google Agenda"    status="Sincronizado"             on onClick={() => onNavigate('connector-config')} />
            <Connector icon="send"     name="Telegram"         status="4 tarefas este mês"       on onClick={() => onNavigate('connector-config')} />
            <Connector icon="doc"      name="Notion"           status="Conectar"                 off onClick={() => onNavigate('onboarding-add')} />
            <div className="tk-conn tk-conn-add" onClick={() => onNavigate('onboarding-add')}>
              <Icon name="plus" size={18} />
              Adicionar conector
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
