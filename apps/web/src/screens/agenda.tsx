import { Icon } from '../components/icon.tsx';

const START = 8, END = 20, ROW = 58;
function top(h: number, m = 0) { return (h - START) * ROW + (m / 60) * ROW; }

const MOCK_EVENTS = [
  { h: 9,  m: 30, dur: 0.5,  title: 'Daily standup',       sub: 'Time de produto' },
  { h: 11, m: 0,  dur: 0.75, title: '1:1 com o Rafael',    sub: 'Online' },
  { h: 12, m: 30, dur: 1,    title: 'Almoço com a Marina', sub: 'Café Lumi' },
  { h: 14, m: 0,  dur: 1,    title: 'Reunião de design',   sub: 'Sala Aurora', accent: true },
  { h: 16, m: 30, dur: 0.75, title: 'Call com a Vértice',  sub: 'Apresentação da proposta' },
  { h: 19, m: 0,  dur: 1,    title: 'Jantar com a Marina', sub: 'Restaurante Oro' },
];

function buildWeek(today: Date) {
  const DOW = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return {
      dow:    DOW[i]!,
      num:    d.getDate(),
      active: d.toDateString() === today.toDateString(),
    };
  });
}

export function AgendaScreen() {
  const now   = new Date();
  const week  = buildWeek(now);
  const hours: number[] = [];
  for (let h = START; h <= END; h++) hours.push(h);

  const nowTop = top(now.getHours(), now.getMinutes());
  const nowLabel = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const showNowLine = now.getHours() >= START && now.getHours() < END;

  const monthLabel = now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const dateLabel  = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content tk-wide">
          <div className="tk-head">
            <div>
              <h1 className="tk-greet" style={{ textTransform: 'capitalize' }}>{monthLabel}</h1>
              <div className="tk-date" style={{ textTransform: 'capitalize' }}>{dateLabel}</div>
            </div>
            <div className="tk-headtools">
              <div className="tk-iconbtn"><Icon name="chevronL" size={19} /></div>
              <div className="tk-iconbtn"><Icon name="chevronR" size={19} /></div>
            </div>
          </div>

          <div className="tk-weekstrip">
            {week.map((d) => (
              <div key={d.num} className={`tk-day${d.active ? ' active' : ''}`}>
                <div className="dow">{d.dow}</div>
                <div className="num">{d.num}</div>
                {d.active && <div className="pip" />}
              </div>
            ))}
          </div>

          <div className="tk-timeline" style={{ height: (END - START) * ROW + 12 }}>
            {hours.map((h) => (
              <div
                key={h}
                className="tk-trow"
                style={{ position: 'absolute', left: 0, right: 0, top: (h - START) * ROW }}
              >
                <div className="hr">{String(h).padStart(2, '0')}:00</div>
                <div className="ln" />
              </div>
            ))}

            <div className="tk-track">
              {MOCK_EVENTS.map((e, i) => (
                <div
                  key={i}
                  className={`tk-ev${e.accent ? ' is-accent' : ''}`}
                  style={{ top: top(e.h, e.m), height: e.dur * ROW - 8 }}
                >
                  <div className="accentbar" />
                  <div className="et">{e.title}</div>
                  {e.dur >= 1 && (
                    <div className="em">
                      {String(e.h).padStart(2, '0')}:{String(e.m).padStart(2, '0')} · {e.sub}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {showNowLine && (
              <div className="tk-now" style={{ top: nowTop }}>
                <span className="lbl">{nowLabel}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="tk-fab"><Icon name="plus" size={24} stroke={2} /></div>
    </div>
  );
}
