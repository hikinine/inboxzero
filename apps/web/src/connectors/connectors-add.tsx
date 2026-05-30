import { Icon }              from '../components/icon.tsx';
import { BRANDS, SCATTER, ROWS } from './brands.ts';
// ---- Brand tile (colored square icon) ----
function Tile({
  brand,
  size = 60,
  radius = 17,
  style,
}: {
  brand: string;
  size?: number;
  radius?: number;
  style?: React.CSSProperties;
}) {
  const b = BRANDS[brand];
  if (!b) return null;
  return (
    <div
      className="tkc-tile"
      style={{
        background: b.bg,
        color: b.dark ? '#16161A' : '#fff',
        width: size,
        height: size,
        borderRadius: radius,
        border: b.border ? '1px solid rgba(255,255,255,0.09)' : 'none',
        ...style,
      }}
    >
      <Icon name={b.icon} size={Math.round(size * 0.46)} />
    </div>
  );
}

// ---- Left decorative panel ----
function LeftPanel() {
  return (
    <div className="tkc-left">
      <div className="tkc-gridlines" />
      <div className="tkc-glow" />
      {SCATTER.map((t, i) => (
        <Tile key={i} brand={t.brand} style={{ left: t.left, top: t.top }} />
      ))}
      <div className="tkc-leftfade" />
      <div className="tkc-leftcap">
        <div className="h">Tudo o que importa, num lugar só.</div>
        <div className="p">
          Mensagens, e-mails, compras e eventos viram tarefas sozinhos —
          conectados de forma segura via MCP.
        </div>
      </div>
    </div>
  );
}

const TABS = ['Tudo', 'Comunicação', 'Financeiro', 'Produtividade', 'Trabalho', 'Notificações'];

// ---- Connector row ----
function Row({
  brand,
  desc,
  on,
  isNew,
  onConnect,
}: {
  brand: string;
  desc: string;
  on?: boolean;
  isNew?: boolean;
  onConnect: () => void;
}) {
  return (
    <div className={`tkc-row${on ? ' on' : ''}`} onClick={onConnect}>
      <Tile brand={brand} size={38} radius={11} style={{ position: 'static', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14)' }} />
      <div className="tkc-rmid">
        <div className="tkc-rname">
          {brand}
          {isNew && <span className="tkc-new">NEW</span>}
        </div>
        <div className="tkc-rdesc">{desc}</div>
      </div>
      <div className="tkc-rowtail">
        <div className={`tk-toggle${on ? ' on' : ''}`}><div className="knob" /></div>
        <span className="tkc-chev"><Icon name="chevronR" size={17} /></span>
      </div>
    </div>
  );
}

interface ConnectorsAddProps {
  onNavigate: (path: string) => void;
}

export function ConnectorsAddScreen({ onNavigate }: ConnectorsAddProps) {
  return (
    <div className="tkc-stage">
      <div className="tkc-card">
        <LeftPanel />
        <div className="tkc-right">
          <div className="tkc-rtop">
            <div>
              <h2 className="tkc-title">Adicionar conectores</h2>
              <div className="tkc-sub">
                Conecte seus apps e deixe a Tasky transformar tudo em tarefas — sozinha.
              </div>
            </div>
            <div className="tkc-btns">
              <span className="tkc-ghost" onClick={() => onNavigate('connectors')}>Faço depois</span>
              <span className="tkc-cont" onClick={() => onNavigate('onboarding-auth')}>
                Continuar <Icon name="arrowR" size={15} />
              </span>
            </div>
          </div>

          <div className="tkc-tabs">
            {TABS.map((t, i) => (
              <span key={t} className={`tkc-tab${i === 0 ? ' active' : ''}`}>{t}</span>
            ))}
            <span className="tkc-sort"><Icon name="sliders" size={15} />Recentes</span>
          </div>

          <div className="tkc-listwrap">
            <div className="tkc-list">
              {ROWS.map((r) => (
                <Row
                  key={r.brand}
                  {...r}
                  onConnect={() => {
                    if (r.brand === 'Gmail')  { onNavigate('onboarding-gmail');  return; }
                    if (r.brand === 'Linear') { onNavigate('onboarding-linear'); return; }
                    onNavigate('onboarding-auth');
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
