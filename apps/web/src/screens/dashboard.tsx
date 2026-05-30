import { Icon } from '../components/icon.tsx';

interface DashboardProps {
  onNavigate: (path: string) => void;
}

export function DashboardScreen({ onNavigate }: DashboardProps) {
  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content">
          <div className="tk-head">
            <div>
              <h1 className="tk-greet">Boa tarde, Helena</h1>
              <div className="tk-date">Quinta-feira, 29 de maio · 3 compromissos, 5 tarefas</div>
            </div>
            <div className="tk-headtools">
              <div className="tk-iconbtn"><Icon name="search" size={19} /></div>
              <div className="tk-iconbtn"><Icon name="bell" size={19} /></div>
            </div>
          </div>

          {/* Próximos compromissos */}
          <div style={{ marginTop: 48 }}>
            <div className="tk-eyebrow" style={{ marginBottom: 14 }}>
              <span>Próximos compromissos</span>
            </div>
            <div className="tk-card">
              <div className="tk-event">
                <div className="tk-bar accent" />
                <div className="tk-time">14:00</div>
                <div style={{ flex: 1 }}>
                  <div className="title">Reunião de design</div>
                  <div className="meta">Sala Aurora · com o time de produto</div>
                </div>
              </div>
              <div className="tk-event">
                <div className="tk-bar" />
                <div className="tk-time">16:30</div>
                <div style={{ flex: 1 }}>
                  <div className="title">Call com a Vértice</div>
                  <div className="meta">Apresentação da proposta</div>
                </div>
              </div>
              <div className="tk-event">
                <div className="tk-bar" />
                <div className="tk-time">19:00</div>
                <div style={{ flex: 1 }}>
                  <div className="title">Jantar com a Marina</div>
                  <div className="meta">Restaurante Oro</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tarefas de hoje */}
          <div style={{ marginTop: 40 }}>
            <div className="tk-eyebrow" style={{ marginBottom: 14 }}>
              <span>Tarefas de hoje</span>
              <span className="count">3 restantes</span>
            </div>
            <div className="tk-card">
              <div className="tk-task" onClick={() => onNavigate('tasks')}>
                <div className="tk-check" />
                <div className="label">Revisar proposta da Vértice</div>
                <div className="tail">
                  <span className="tk-chip-mini accent">
                    <Icon name="clock" size={14} />Até 13h
                  </span>
                </div>
              </div>
              <div className="tk-task" onClick={() => onNavigate('tasks')}>
                <div className="tk-check" />
                <div className="label">Enviar relatório de maio</div>
                <div className="tail">
                  <span className="tk-prov"><Icon name="mail" size={14} />Gmail</span>
                </div>
              </div>
              <div className="tk-task" onClick={() => onNavigate('tasks')}>
                <div className="tk-check" />
                <div className="label">Confirmar reserva do jantar</div>
                <div className="tail">
                  <span className="tk-prov"><Icon name="chat" size={14} />WhatsApp</span>
                </div>
              </div>
              <div className="tk-task done">
                <div className="tk-check done"><Icon name="check" size={14} stroke={2.4} /></div>
                <div className="label">Responder e-mail do Rafael</div>
              </div>
              <div className="tk-task done">
                <div className="tk-check done"><Icon name="check" size={14} stroke={2.4} /></div>
                <div className="label">Agendar dentista</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tk-fab" onClick={() => onNavigate('tasks')}>
        <Icon name="plus" size={24} stroke={2} />
      </div>
    </div>
  );
}
