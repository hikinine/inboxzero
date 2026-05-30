import { Icon } from '../components/icon.tsx';
function CodeField({ value }: { value: string }) {
  return (
    <div className="tk-code">
      <span className="val">{value}</span>
      <span className="cp"><Icon name="copy" size={16} /></span>
    </div>
  );
}

function EventRow({ name, desc, on }: { name: string; desc: string; on?: boolean }) {
  return (
    <div className="tk-cfg-row">
      <div className="lead">
        <div className="k"><span className="tk-event-name">{name}</span></div>
        <div className="d">{desc}</div>
      </div>
      <div className={`tk-toggle${on ? ' on' : ''}`}><div className="knob" /></div>
    </div>
  );
}

interface ConnectorConfigProps {
  onNavigate: (path: string) => void;
}

export function ConnectorConfigScreen({ onNavigate }: ConnectorConfigProps) {
  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content tk-wide">
          <span className="tk-back" onClick={() => onNavigate('connectors')}>
            <Icon name="chevronL" size={16} />Conexões
          </span>

          {/* Header */}
          <div className="tk-cfg-head">
            <div className="tk-conn-ico"><Icon name="card" size={26} /></div>
            <div style={{ flex: 1 }}>
              <div className="nm">Nubank</div>
              <div className="sub">
                <span className="tk-status">
                  <span className="tk-statusdot" />Conectado · 42 ms
                </span>
                <span className="tk-mcp">MCP</span>
              </div>
            </div>
            <div className="tk-toggle on"><div className="knob" /></div>
          </div>

          {/* Servidor MCP */}
          <div className="tk-sec">
            <div className="tk-sec-h">
              <h3>Servidor MCP</h3>
              <span className="hint">Conexão com o provedor</span>
            </div>
            <div className="tk-cfg-card">
              <div className="tk-cfg-row">
                <div className="lead">
                  <div className="k">Endpoint</div>
                  <div className="d">URL do servidor MCP do provedor</div>
                </div>
                <CodeField value="https://mcp.nubank.com.br/v1/sse" />
              </div>
              <div className="tk-cfg-row">
                <div className="lead">
                  <div className="k">Transporte</div>
                  <div className="d">Protocolo de comunicação</div>
                </div>
                <div className="tk-code" style={{ maxWidth: 220 }}>
                  <span className="val">HTTP streaming · SSE</span>
                </div>
              </div>
              <div className="tk-cfg-row">
                <div className="lead">
                  <div className="k">Autenticação</div>
                  <div className="d">Token OAuth gerenciado pela Tasky</div>
                </div>
                <div className="tk-code">
                  <span className="val">nu_sk_••••••••••••4f2a</span>
                  <span className="cp"><Icon name="eye" size={16} /></span>
                  <span className="cp"><Icon name="copy" size={16} /></span>
                </div>
              </div>
            </div>
          </div>

          {/* Webhooks */}
          <div className="tk-sec">
            <div className="tk-sec-h">
              <h3>Webhooks</h3>
              <span className="hint">Eventos que o provedor envia para a Tasky</span>
            </div>
            <div className="tk-cfg-card">
              <div className="tk-cfg-row">
                <div className="lead">
                  <div className="k">URL de recebimento</div>
                  <div className="d">Endpoint da Tasky para este conector</div>
                </div>
                <CodeField value="https://hooks.tasky.app/nubank/9f3c1" />
              </div>
              <EventRow name="transaction.created" desc="Compra ou transferência aprovada" on />
              <EventRow name="invoice.closing"     desc="Fatura do cartão prestes a fechar" on />
              <EventRow name="pix.received"        desc="Pix recebido na conta" on />
              <EventRow name="statement.ready"     desc="Extrato mensal disponível" />
              <div className="tk-addbtn"><Icon name="plus" size={16} />Assinar outro evento</div>
            </div>
          </div>

          {/* Gatilhos */}
          <div className="tk-sec">
            <div className="tk-sec-h">
              <h3>Gatilhos</h3>
              <span className="hint">Como a Tasky transforma eventos em tarefas</span>
            </div>
            <div className="tk-cfg-card">
              <div className="tk-rule">
                <span className="cond">transaction.created</span>
                <span className="arrow"><Icon name="arrowR" size={18} /></span>
                <span className="act">
                  Criar tarefa <b>"Categorizar despesa"</b> · lista Financeiro
                </span>
              </div>
              <div className="tk-rule">
                <span className="cond">invoice.closing</span>
                <span className="arrow"><Icon name="arrowR" size={18} /></span>
                <span className="act">
                  Criar lembrete <b>"Pagar fatura"</b> · 3 dias antes
                </span>
              </div>
            </div>
          </div>

          {/* Atividade recente */}
          <div className="tk-sec">
            <div className="tk-sec-h"><h3>Atividade recente</h3></div>
            <div className="tk-cfg-card">
              <div className="tk-log">
                <span className="t">13:02</span>
                <span className="ev">transaction.created</span>
                <span className="ok"><Icon name="spark" size={13} />tarefa criada</span>
              </div>
              <div className="tk-log">
                <span className="t">09:41</span>
                <span className="ev">pix.received</span>
                <span className="ok"><Icon name="spark" size={13} />tarefa criada</span>
              </div>
              <div className="tk-log">
                <span className="t">ontem</span>
                <span className="ev">invoice.closing</span>
                <span className="ok"><Icon name="spark" size={13} />lembrete criado</span>
              </div>
            </div>
          </div>

          <div style={{ height: 60 }} />
        </div>
      </div>
    </div>
  );
}
