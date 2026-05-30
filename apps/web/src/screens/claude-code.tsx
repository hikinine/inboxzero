import { useState } from 'react';
import { Icon } from '../components/icon.tsx';

const CC_COLOR = '#D97757';
const CC_SOFT  = 'rgba(217,119,87,0.12)';

const TERM_LINES = [
  { t: 'dim',   s: '$ claude --workspace .' },
  { t: 'ok',    s: '✓  Workspace loaded · 847 files' },
  { t: 'gap' },
  { t: 'tool',  s: '⬡  Read   src/features/tasks/TaskList.tsx' },
  { t: 'tool',  s: '⬡  Read   src/hooks/useTasks.ts' },
  { t: 'ok',    s: '✓  2 files · 342 tokens' },
  { t: 'gap' },
  { t: 'user',  s: '> Crie um hook de ordenação de tarefas' },
  { t: 'gap' },
  { t: 'tool',  s: '⬡  Write  src/hooks/useTaskSort.ts' },
  { t: 'ok',    s: '✓  Created · 89 lines' },
  { t: 'gap' },
  { t: 'tool',  s: '⬡  Bash   npm test -- --run' },
  { t: 'ok',    s: '✓  12 tests passed · 0 failed' },
  { t: 'gap' },
  { t: 'agent', s: '◆  Task created in Tasky' },
];

const TERM_COLORS: Record<string, string> = {
  dim:   '#5A5A62',
  ok:    '#4ADE80',
  tool:  CC_COLOR,
  user:  '#EDEDED',
  agent: '#4ADE80',
};

function Terminal() {
  return (
    <div style={{
      flex: '0 0 420px', background: '#0A0A0D',
      position: 'relative', overflow: 'hidden',
      borderRight: '1px solid var(--hairline)',
    }}>
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--hairline) 1px,transparent 1px),linear-gradient(90deg,var(--hairline) 1px,transparent 1px)',
        backgroundSize: '96px 96px',
      }} />
      {/* Glow */}
      <div style={{
        position: 'absolute', width: 380, height: 280, top: -80, left: -60,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(217,119,87,0.09), transparent 70%)',
      }} />

      {/* Terminal window */}
      <div style={{
        position: 'absolute', top: 28, left: 22, right: 22,
        background: '#141417', borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.55)',
        overflow: 'hidden',
      }}>
        {/* Title bar */}
        <div style={{
          height: 36, background: '#1C1C21',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', padding: '0 14px', gap: 7,
        }}>
          {['#FF5F57','#FEBC2E','#28C840'].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
          <span style={{ marginLeft: 12, fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 11, color: '#5A5A62' }}>
            claude — tasky
          </span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5, color: CC_COLOR, fontSize: 10, fontWeight: 700, letterSpacing: '0.07em' }}>
            <div style={{ width: 13, height: 13, borderRadius: 4, background: CC_COLOR, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width={8} height={8} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 8l5 4-5 4" />
              </svg>
            </div>
            CLAUDE CODE
          </div>
        </div>
        {/* Content */}
        <div style={{ padding: '12px 16px 14px', display: 'flex', flexDirection: 'column' }}>
          {TERM_LINES.map((l, i) =>
            l.t === 'gap'
              ? <div key={i} style={{ height: 7 }} />
              : <div key={i} style={{
                  fontFamily: 'ui-monospace,"SF Mono",Menlo,monospace',
                  fontSize: 12, lineHeight: '19px',
                  color: TERM_COLORS[l.t] ?? '#8A8A8F',
                  fontWeight: l.t === 'user' ? 600 : 400,
                }}>{l.s}</div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 6 }}>
            <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 12, color: '#5A5A62' }}>$ </span>
            <div style={{ width: 6, height: 13, background: CC_COLOR, marginLeft: 4, opacity: 0.8, animation: 'tkb 1.1s steps(1) infinite' }} />
          </div>
        </div>
      </div>

      {/* Bottom fade + caption */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 230, background: 'linear-gradient(transparent, #0A0A0D 62%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', left: 32, right: 30, bottom: 30, zIndex: 2 }}>
        <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.3 }}>Claude Code no seu workspace.</div>
        <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 9, lineHeight: 1.55 }}>
          Contexto completo, ações reais — lê, escreve e executa comandos direto no seu projeto.
        </div>
      </div>
    </div>
  );
}

function StepNode({ n, label, done, active }: { n: number; label: string; done?: boolean; active?: boolean }) {
  const cls = done ? 'done' : active ? 'active' : 'idle';
  return (
    <div className="tkc-step-node">
      <div className={`tkc-step-dot ${cls}`} style={done ? { background: CC_COLOR } : active ? { background: CC_SOFT, borderColor: CC_COLOR, color: CC_COLOR } : {}}>
        {done ? <Icon name="check" size={13} stroke={2.4} /> : n}
      </div>
      <div className={`tkc-step-lbl${active ? ' active' : ''}`}>{label}</div>
    </div>
  );
}

function StepLine({ done }: { done?: boolean }) {
  return <div className={`tkc-step-line${done ? ' done' : ''}`} style={done ? { background: 'rgba(217,119,87,0.30)' } : {}} />;
}

const CC_PERMS = [
  { label: 'Sistema de arquivos', sub: 'Leitura e escrita dentro do workspace',  on: true,  badge: 'Leitura + Escrita', icon: 'doc' as const },
  { label: 'Terminal / Shell',    sub: 'Executar comandos dentro do workspace',  on: true,  badge: 'Lista segura',      icon: 'send' as const },
  { label: 'Busca web',           sub: 'Pesquisar documentação e referências',   on: true,  badge: 'Somente leitura',  icon: 'globe' as const },
  { label: 'MCP Servers externos',sub: 'Outros conectores configurados no Tasky',on: false, badge: null,               icon: 'plug' as const },
];

interface ClaudeCodeProps {
  onNavigate: (path: string) => void;
}

export function ClaudeCodeScreen({ onNavigate }: ClaudeCodeProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  return (
    <div className="tkc-stage">
      <div style={{
        width: 1060, height: 680, display: 'flex',
        background: 'var(--surface)',
        border: '1px solid var(--hairline-2)',
        borderRadius: 24, overflow: 'hidden',
        boxShadow: '0 40px 120px rgba(0,0,0,0.5)',
      }}>
        <Terminal />

        {/* Right panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '26px 30px 0', overflow: 'hidden' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <div style={{
              width: 50, height: 50, borderRadius: 15, background: CC_COLOR, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
              boxShadow: `0 8px 24px rgba(217,119,87,0.28)`,
            }}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 8l5 4-5 4" /><path d="M13 16h4" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 19, fontWeight: 600 }}>
                {step === 1 ? 'Conectar Claude Code' : step === 2 ? 'Permissões da sessão' : 'Sessão iniciada'}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 5, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="plug" size={13} />
                {step === 1 ? 'Workspace · Sessão' : step === 2 ? 'O que Claude Code pode fazer' : 'Conectado ao Tasky'}
                <span className="tk-mcp">MCP</span>
              </div>
            </div>
            <span className="tkc-ghost" style={{ fontSize: 12.5 }} onClick={() => onNavigate('connectors')}>Cancelar</span>
          </div>

          {/* Steps */}
          <div className="tkc-steps" style={{ margin: '20px 0 22px' }}>
            {[{n:1,l:'Auth'},{n:2,l:'Workspace'},{n:3,l:'Permissões'},{n:4,l:'Pronto'}].map((s, i) => (
              <span key={s.n} style={{ display: 'contents' }}>
                {i > 0 && <StepLine done={s.n <= step} />}
                <StepNode n={s.n} label={s.l} done={s.n < step + 1} active={s.n === step + 1} />
              </span>
            ))}
          </div>

          {/* Body — scrollable */}
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: 2 }}>

            {step === 1 && (
              <>
                <p className="tkc-perm-lbl" style={{ marginTop: 0, marginBottom: 8 }}>Pasta do projeto</p>
                <div className="tkc-keyfield" style={{ marginBottom: 0 }}>
                  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-faint)', flexShrink: 0 }}>
                    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
                  </svg>
                  <div className="kval">~/dev/tasky</div>
                  <span style={{ color: 'var(--text-dim)', fontSize: 12.5, fontWeight: 500, flexShrink: 0 }}>Alterar</span>
                </div>

                <p className="tkc-perm-lbl" style={{ marginTop: 16, marginBottom: 8 }}>Nome da sessão</p>
                <div className="tkc-keyfield" style={{ marginBottom: 0 }}>
                  <div className="kval" style={{ fontFamily: 'var(--font)', fontSize: 14 }}>Tasky · Dev</div>
                  <span style={{ color: 'var(--text-dim)', fontSize: 12.5, fontWeight: 500, flexShrink: 0 }}>Editar</span>
                </div>

                <p className="tkc-perm-lbl" style={{ marginTop: 16, marginBottom: 8 }}>Modelo</p>
                <div className="tk-cfg-card">
                  {[
                    { id: 'opus',   label: 'claude-opus-4-8',   sub: 'Máxima capacidade · tarefas complexas', on: true },
                    { id: 'sonnet', label: 'claude-sonnet-4-6', sub: 'Equilibrado · uso geral · mais rápido' },
                  ].map(({ id, label, sub, on }) => (
                    <div key={id} className="tk-cfg-row">
                      <div style={{
                        width: 17, height: 17, borderRadius: '50%', flexShrink: 0,
                        border: `2px solid ${on ? CC_COLOR : 'var(--text-faint)'}`,
                        background: on ? CC_COLOR : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {on && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} />}
                      </div>
                      <div className="lead">
                        <div className="k" style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 13 }}>{label}</div>
                        <div className="d">{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                  {[{ label: 'Context window', val: '200K tokens' }, { label: 'Max output', val: '32K tokens' }].map(({ label, val }) => (
                    <div key={label} style={{ flex: 1, background: 'var(--surface-2)', borderRadius: 10, padding: '11px 14px' }}>
                      <div style={{ fontSize: 11, color: 'var(--text-faint)', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{label}</div>
                      <div style={{ fontSize: 16, fontWeight: 600, marginTop: 5, letterSpacing: '-0.01em' }}>{val}</div>
                    </div>
                  ))}
                </div>

                <div className="tkc-note" style={{ marginTop: 12 }}>
                  <Icon name="plug" size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span>A sessão é isolada ao workspace. Claude Code acessa apenas arquivos dentro da pasta configurada.</span>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface-2)', borderRadius: 10, padding: '10px 14px', marginBottom: 18 }}>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-faint)', flexShrink: 0 }}>
                    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
                  </svg>
                  <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 12.5, color: 'var(--text-dim)', flex: 1 }}>~/dev/tasky</span>
                  <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 11.5, color: CC_COLOR, fontWeight: 600 }}>claude-opus-4-8</span>
                </div>

                <p className="tkc-perm-lbl" style={{ marginTop: 0, marginBottom: 10 }}>Capacidades</p>
                <div className="tk-cfg-card">
                  {CC_PERMS.map((p) => (
                    <div key={p.label} className="tk-cfg-row">
                      <div style={{
                        width: 36, height: 36, borderRadius: 11, flexShrink: 0,
                        background: p.on ? CC_SOFT : 'var(--surface-2)',
                        color: p.on ? CC_COLOR : 'var(--text-faint)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon name={p.icon} size={17} />
                      </div>
                      <div className="lead">
                        <div className="k">{p.label}</div>
                        <div className="d">{p.sub}</div>
                      </div>
                      {p.badge && (
                        <span style={{ fontSize: 11.5, fontWeight: 600, color: CC_COLOR, background: CC_SOFT, padding: '4px 9px', borderRadius: 7, flexShrink: 0, whiteSpace: 'nowrap' }}>
                          {p.badge}
                        </span>
                      )}
                      <div className={`tk-toggle${p.on ? ' on' : ''}`} style={p.on ? { background: CC_COLOR } : {}}>
                        <div className="knob" style={p.on ? { left: 20, background: '#fff' } : {}} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="tkc-note" style={{ marginTop: 14 }}>
                  <Icon name="eye" size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span>Cada ação do Claude Code é registrada no Tasky. Você pode revogar permissões a qualquer momento.</span>
                </div>
              </>
            )}

            {step === 3 && (
              <div style={{ textAlign: 'center', padding: '32px 0 16px' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: CC_SOFT, border: `1.5px solid rgba(217,119,87,0.30)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px', color: CC_COLOR,
                }}>
                  <Icon name="check" size={26} stroke={2} />
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Sessão iniciada</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13, color: CC_COLOR, fontWeight: 500 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: CC_COLOR, animation: 'twpulse 2s infinite' }} />
                  Conectado · aguardando instruções
                </div>
                <div style={{ marginTop: 24, textAlign: 'left' }}>
                  <div className="tk-cfg-card">
                    {[
                      { k: 'Session ID',  v: 'cc_tasky_' + Math.random().toString(36).slice(2, 10) },
                      { k: 'Workspace',   v: '~/dev/tasky' },
                      { k: 'Modelo',      v: 'claude-opus-4-8' },
                      { k: 'Permissões',  v: 'Filesystem · Shell · Web' },
                    ].map(({ k, v }) => (
                      <div key={k} className="tk-cfg-row">
                        <div className="lead"><div className="k">{k}</div></div>
                        <div className="tk-code" style={{ maxWidth: 240 }}>
                          <span className="val" style={{ fontFamily: 'ui-monospace,Menlo,monospace' }}>{v}</span>
                          <span className="cp"><Icon name="copy" size={14} /></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 16,
            padding: '15px 0 22px', borderTop: '1px solid var(--hairline)', marginTop: 10, flexShrink: 0,
          }}>
            {step > 1 && (
              <span className="tk-textbtn" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}>
                <Icon name="chevronL" size={15} />Voltar
              </span>
            )}
            {step < 3 ? (
              <span
                style={{ background: CC_COLOR, color: '#fff', fontWeight: 600, fontSize: 14.5, padding: '11px 22px', borderRadius: 12, display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
              >
                {step === 1 ? 'Continuar' : 'Iniciar sessão'} <Icon name="arrowR" size={15} />
              </span>
            ) : (
              <span
                style={{ background: CC_COLOR, color: '#fff', fontWeight: 600, fontSize: 14.5, padding: '11px 22px', borderRadius: 12, display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                onClick={() => onNavigate('connectors')}
              >
                Ir para Conexões <Icon name="arrowR" size={15} />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
