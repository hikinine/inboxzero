import { Icon } from '../components/icon.tsx';

const START = 8, END = 20, ROW = 58;

const WEEK = [
  { dow: 'dom', num: 25 },
  { dow: 'seg', num: 26 },
  { dow: 'ter', num: 27 },
  { dow: 'qua', num: 28 },
  { dow: 'qui', num: 29, active: true },
  { dow: 'sex', num: 30 },
  { dow: 'sáb', num: 31 },
];

const EVENTS = [
  { h: 9,  m: 30, dur: 0.5,  t: 'Daily standup',           m2: 'Time de produto' },
  { h: 11, m: 0,  dur: 0.75, t: '1:1 com o Rafael',        m2: 'Online' },
  { h: 12, m: 30, dur: 1,    t: 'Almoço com a Marina',     m2: 'Café Lumi' },
  { h: 14, m: 0,  dur: 1,    t: 'Reunião de design',       m2: 'Sala Aurora', accent: true },
  { h: 16, m: 30, dur: 0.75, t: 'Call com a Vértice',      m2: 'Apresentação da proposta' },
  { h: 19, m: 0,  dur: 1,    t: 'Jantar com a Marina',     m2: 'Restaurante Oro' },
];

function top(h: number, m = 0) { return (h - START) * ROW + (m / 60) * ROW; }

export function AgendaScreen() {
  const hours: number[] = [];
  for (let h = START; h <= END; h++) hours.push(h);

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content tk-wide">
          <div className="tk-head">
            <div>
              <h1 className="tk-greet">Maio 2026</h1>
              <div className="tk-date">Quinta-feira, 29 de maio</div>
            </div>
            <div className="tk-headtools">
              <div className="tk-iconbtn"><Icon name="chevronL" size={19} /></div>
              <div className="tk-iconbtn"><Icon name="chevronR" size={19} /></div>
            </div>
          </div>

          {/* Week strip */}
          <div className="tk-weekstrip">
            {WEEK.map((d) => (
              <div key={d.num} className={`tk-day${d.active ? ' active' : ''}`}>
                <div className="dow">{d.dow}</div>
                <div className="num">{d.num}</div>
                {(d.active || d.num === 27 || d.num === 30) && <div className="pip" />}
              </div>
            ))}
          </div>

          {/* Timeline */}
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
              {EVENTS.map((e, i) => (
                <div
                  key={i}
                  className={`tk-ev${e.accent ? ' is-accent' : ''}`}
                  style={{ top: top(e.h, e.m), height: e.dur * ROW - 8 }}
                >
                  <div className="accentbar" />
                  <div className="et">{e.t}</div>
                  {e.dur >= 1 && (
                    <div className="em">
                      {String(e.h).padStart(2, '0')}:{String(e.m).padStart(2, '0')} · {e.m2}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* "Agora" line at 13:20 */}
            <div className="tk-now" style={{ top: top(13, 20) }}>
              <span className="lbl">13:20</span>
            </div>
          </div>
        </div>
      </div>
      <div className="tk-fab"><Icon name="plus" size={24} stroke={2} /></div>
    </div>
  );
}
