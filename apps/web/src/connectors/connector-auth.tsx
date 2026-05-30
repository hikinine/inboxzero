import { Icon }              from '../components/icon.tsx';
import { SCATTER } from './brands.ts';
import { BrandTile } from './brand-tile.tsx';

function LeftPanel() {
  return (
    <div className="tkc-left">
      <div className="tkc-gridlines" />
      <div className="tkc-glow" />
      {SCATTER.map((t, i) => <BrandTile key={i} brand={t.brand} style={{ left: t.left, top: t.top }} />)}
      <div className="tkc-leftfade" />
      <div className="tkc-leftcap">
        <div className="h">Tudo o que importa, num lugar só.</div>
        <div className="p">Mensagens, e-mails, compras e eventos viram tarefas sozinhos — conectados de forma segura via MCP.</div>
      </div>
    </div>
  );
}

interface ConnectorAuthProps {
  onNavigate: (path: string) => void;
}

export function ConnectorAuthScreen({ onNavigate }: ConnectorAuthProps) {
  return (
    <div className="tkc-stage">
      {/* dimmed background card */}
      <div className="tkc-card" style={{ filter: 'brightness(0.4) saturate(0.8)' }}>
        <LeftPanel />
        <div className="tkc-right">
          <div className="tkc-rtop">
            <div>
              <h2 className="tkc-title">Adicionar conectores</h2>
              <div className="tkc-sub">Conecte seus apps e deixe a Tasky transformar tudo em tarefas — sozinha.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Authorization modal */}
      <div className="tk-overlay">
        <div className="tkc-connmodal">
          <div className="tkc-cm-head">
            <BrandTile brand="Notion" size={48} radius={14} style={{ position: 'static' }} />
            <div style={{ flex: 1 }}>
              <div className="tkc-cm-title">Conectar Notion</div>
              <div className="tkc-cm-sub">
                <Icon name="plug" size={13} />Autorização segura
                <span className="tk-mcp">MCP</span>
              </div>
            </div>
            <div style={{ color: 'var(--text-faint)', cursor: 'pointer' }} onClick={() => onNavigate('onboarding-add')}>
              <Icon name="x" size={18} />
            </div>
          </div>

          <p className="tkc-perm-lbl">Ao conectar, a Tasky poderá</p>
          <div>
            <div className="tkc-perm">
              <div className="ck"><Icon name="check" size={14} stroke={2.4} /></div>
              <div className="tx">
                Ler as páginas que você escolher
                <div className="d">Somente os bancos de dados que você marcar como tarefas.</div>
              </div>
            </div>
            <div className="tkc-perm">
              <div className="ck"><Icon name="check" size={14} stroke={2.4} /></div>
              <div className="tx">
                Criar e atualizar tarefas
                <div className="d">Itens do Notion entram direto na sua lista do Tasky.</div>
              </div>
            </div>
            <div className="tkc-perm">
              <div className="ck"><Icon name="check" size={14} stroke={2.4} /></div>
              <div className="tx">
                Escutar mudanças em tempo real
                <div className="d">Via webhooks — sem precisar abrir o aplicativo.</div>
              </div>
            </div>
          </div>

          <div className="tkc-cm-foot">
            <span className="tk-textbtn" onClick={() => onNavigate('onboarding-add')}>Cancelar</span>
            <span className="tk-primary" onClick={() => onNavigate('connectors')}>
              <Icon name="plug" size={16} />Conectar com Notion
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
