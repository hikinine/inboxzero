import { Icon } from '../components/icon.tsx';
import { BRANDS } from './brands.ts';
function Tile({ brand, size = 60, radius = 17, style }: { brand: string; size?: number; radius?: number; style?: React.CSSProperties }) {
  const b = BRANDS[brand];
  if (!b) return null;
  return (
    <div className="tkc-tile" style={{ background: b.bg, color: b.dark ? '#16161A' : '#fff', width: size, height: size, borderRadius: radius, ...style }}>
      <Icon name={b.icon} size={Math.round(size * 0.46)} />
    </div>
  );
}

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

function ConnEventRow({ name, desc, on }: { name: string; desc: string; on?: boolean }) {
  return (
    <div className="tk-cfg-row">
      <div className="lead">
        <div className="k" style={{ fontWeight: 500, fontSize: 14 }}>{name}</div>
        <div className="d">{desc}</div>
      </div>
      <div className={`tk-toggle${on ? ' on' : ''}`}><div className="knob" /></div>
    </div>
  );
}

interface LinearSetupProps {
  onNavigate: (path: string) => void;
}

export function LinearSetupScreen({ onNavigate }: LinearSetupProps) {
  return (
    <div className="tkc-stage">
      <div className="tk-overlay">
        <div className="tkc-connmodal" style={{ width: 500 }}>
          {/* Header */}
          <div className="tkc-cm-head">
            <Tile brand="Linear" size={48} radius={14} style={{ position: 'static' }} />
            <div style={{ flex: 1 }}>
              <div className="tkc-cm-title">Conectar Linear</div>
              <div className="tkc-cm-sub">
                <Icon name="plug" size={13} />API Key · Webhooks
              </div>
            </div>
            <div style={{ color: 'var(--text-faint)', cursor: 'pointer' }} onClick={() => onNavigate('onboarding-add')}>
              <Icon name="x" size={18} />
            </div>
          </div>

          {/* Steps */}
          <div className="tkc-steps">
            <StepNode n={1} label="API Key" done />
            <StepLine done />
            <StepNode n={2} label="Eventos" active />
            <StepLine />
            <StepNode n={3} label="Pronto" />
          </div>

          {/* Validated key */}
          <div className="tkc-keyfield">
            <div className="kval">lin_api_••••••••••••••••9c3f</div>
            <div className="kstatus">
              <Icon name="check" size={14} stroke={2.4} />Validada
            </div>
          </div>

          {/* Events */}
          <p className="tkc-perm-lbl" style={{ marginTop: 0 }}>Eventos a escutar</p>
          <div className="tk-cfg-card">
            <ConnEventRow name="Issue atribuída a mim"    desc="Vira tarefa imediatamente no Tasky." on />
            <ConnEventRow name="Status de issue alterado" desc="Atualiza a tarefa correspondente." on />
            <ConnEventRow name="Comentário com menção"    desc="Cria um lembrete de resposta." />
            <ConnEventRow name="Nova issue no time"       desc="Desativado por padrão." />
          </div>

          {/* Footer */}
          <div className="tkc-cm-foot">
            <span
              className="tk-textbtn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
              onClick={() => onNavigate('onboarding-add')}
            >
              <Icon name="chevronL" size={15} />Voltar
            </span>
            <span className="tk-primary" onClick={() => onNavigate('connectors')}>
              Finalizar conexão
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
