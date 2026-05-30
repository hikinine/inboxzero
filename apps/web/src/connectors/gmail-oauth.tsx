import { Icon } from '../components/icon.tsx';
import { BrandTile } from './brand-tile.tsx';

function StepNode({ n, label, done, active }: { n: number; label: string; done?: boolean; active?: boolean }) {
  const cls = done ? 'done' : active ? 'active' : 'idle';
  return (
    <div className="tkc-step-node">
      <div className={`tkc-step-dot ${cls}`}>
        {done ? <Icon name="check" size={13} stroke={2.4} /> : n}
      </div>
      <div className={`tkc-step-lbl${active ? ' active' : ''}`}>{label}</div>
    </div>
  );
}

function StepLine({ done }: { done?: boolean }) {
  return <div className={`tkc-step-line${done ? ' done' : ''}`} />;
}

function PermScope({ title, d }: { title: string; d: string }) {
  return (
    <div className="tkc-scope">
      <div className="sck"><Icon name="check" size={13} stroke={2.4} /></div>
      <div className="stx">{title}<div className="sd">{d}</div></div>
    </div>
  );
}

interface GmailOAuthProps {
  onNavigate: (path: string) => void;
}

export function GmailOAuthScreen({ onNavigate }: GmailOAuthProps) {
  return (
    <div className="tkc-stage">
      <div className="tk-overlay">
        <div className="tkc-connmodal" style={{ width: 472 }}>
          {/* Header */}
          <div className="tkc-cm-head">
            <BrandTile brand="Gmail" size={48} radius={14} style={{ position: 'static' }} />
            <div style={{ flex: 1 }}>
              <div className="tkc-cm-title">Conectar Gmail</div>
              <div className="tkc-cm-sub">
                <Icon name="globe" size={13} />OAuth 2.0 · Google
              </div>
            </div>
            <div style={{ color: 'var(--text-faint)', cursor: 'pointer' }} onClick={() => onNavigate('onboarding-add')}>
              <Icon name="x" size={18} />
            </div>
          </div>

          {/* Steps */}
          <div className="tkc-steps">
            <StepNode n={1} label="Autorizar" active />
            <StepLine />
            <StepNode n={2} label="Filtros" />
          </div>

          {/* Scopes */}
          <p className="tkc-perm-lbl" style={{ marginTop: 0 }}>A Tasky vai solicitar ao Google</p>
          <div>
            <PermScope
              title="Ler e-mails (somente leitura)"
              d="Para identificar pedidos, prazos e lembretes nos seus e-mails."
            />
            <PermScope
              title="Acessar metadados de mensagens"
              d="Remetente, assunto e data — sem ler o corpo completo."
            />
          </div>

          {/* Security note */}
          <div className="tkc-note">
            <Icon name="plug" size={15} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>
              Seus dados não passam pelos servidores da Tasky. A conexão é gerenciada
              diretamente entre você e o Google via OAuth 2.0.
            </span>
          </div>

          {/* Footer */}
          <div className="tkc-cm-foot">
            <span className="tk-textbtn" onClick={() => onNavigate('onboarding-add')}>Cancelar</span>
            <span className="tkc-gauth" onClick={() => onNavigate('connectors')}>
              <Icon name="globe" size={16} />Continuar com Google
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
