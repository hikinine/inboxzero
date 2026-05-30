import { useState } from 'react';
import { useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useConnectorsCreate, useConnectorsValidateKey } from '@tasky/sdk';
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
  return (
    <div className="tkc-step-node">
      <div className={`tkc-step-dot ${done ? 'done' : active ? 'active' : 'idle'}`}>
        {done ? <Icon name="check" size={13} stroke={2.4} /> : n}
      </div>
      <div className={`tkc-step-lbl${active ? ' active' : ''}`}>{label}</div>
    </div>
  );
}
function StepLine({ done }: { done?: boolean }) {
  return <div className={`tkc-step-line${done ? ' done' : ''}`} />;
}

const LINEAR_EVENTS = [
  { id: 'issueAssignedToYou', label: 'Issue atribuída a mim',    desc: 'Vira tarefa imediatamente no Tasky.',       defaultOn: true },
  { id: 'issueStatusChanged', label: 'Status de issue alterado', desc: 'Atualiza a tarefa correspondente.',         defaultOn: true },
  { id: 'commentMention',     label: 'Comentário com menção',    desc: 'Cria um lembrete de resposta.',             defaultOn: false },
  { id: 'issueCreated',       label: 'Nova issue no time',       desc: 'Vira tarefa para cada nova issue.',         defaultOn: false },
];

interface LinearSetupProps {
  onNavigate: (path: string) => void;
}

export function LinearSetupScreen({ onNavigate }: LinearSetupProps) {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const qc = useQueryClient();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [apiKey, setApiKey] = useState('');
  const [validatedUser, setValidatedUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [keyError, setKeyError] = useState<string | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(
    new Set(LINEAR_EVENTS.filter((e) => e.defaultOn).map((e) => e.id)),
  );

  const { mutate: validateKey, isPending: isValidating } = useConnectorsValidateKey({
    mutation: {
      onSuccess: (result) => {
        if (result.valid && result.user) {
          setValidatedUser(result.user);
          setKeyError(null);
          setStep(2);
        } else {
          setKeyError(result.error ?? 'API key inválida');
        }
      },
      onError: () => setKeyError('Erro ao validar. Tente novamente.'),
    },
  });

  const { mutate: createConnector, isPending: isSaving } = useConnectorsCreate({
    mutation: {
      onSuccess: (created) => {
        qc.invalidateQueries({ queryKey: [`/${workspaceSlug}/connectors`] });
        setStep(3);
        // navigate to connector config after a brief success moment
        setTimeout(() => onNavigate(`connectors/${created.id}`), 1500);
      },
    },
  });

  const toggleEvent = (id: string) => {
    setSelectedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleValidate = () => {
    if (!apiKey.trim()) return;
    setKeyError(null);
    validateKey({
      workspaceId: workspaceSlug!,
      data: { provider: 'LINEAR', apiKey: apiKey.trim() },
    });
  };

  const handleFinish = () => {
    createConnector({
      workspaceId: workspaceSlug!,
      data: {
        type: 'LINEAR',
        name: 'Linear',
        config: {
          apiKey: apiKey.trim(),
          validatedUser,
          events: Array.from(selectedEvents),
        },
      },
    });
  };

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
            <div style={{ color: 'var(--text-faint)', cursor: 'pointer' }} onClick={() => onNavigate('connectors/add')}>
              <Icon name="x" size={18} />
            </div>
          </div>

          {/* Steps */}
          <div className="tkc-steps">
            <StepNode n={1} label="API Key" done={step > 1} active={step === 1} />
            <StepLine done={step > 1} />
            <StepNode n={2} label="Eventos" done={step > 2} active={step === 2} />
            <StepLine done={step > 2} />
            <StepNode n={3} label="Pronto" active={step === 3} />
          </div>

          {/* ─── Step 1: API Key ─── */}
          {step === 1 && (
            <>
              <p className="tkc-perm-lbl" style={{ marginTop: 0 }}>Sua API key do Linear</p>

              <div style={{
                background: 'var(--surface-2)',
                borderRadius: 12,
                padding: '4px 8px 4px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                border: keyError ? '1px solid #F87171' : '1px solid var(--hairline-2)',
              }}>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => { setApiKey(e.target.value); setKeyError(null); }}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleValidate(); }}
                  placeholder="lin_api_••••••••••••••••"
                  autoFocus
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--text)',
                    fontFamily: 'var(--mono)',
                    fontSize: 13,
                    padding: '10px 0',
                  }}
                />
                {apiKey && (
                  <div
                    style={{ color: 'var(--text-faint)', cursor: 'pointer', padding: 6 }}
                    onClick={() => setApiKey('')}
                  >
                    <Icon name="x" size={15} />
                  </div>
                )}
              </div>

              {keyError && (
                <div style={{ fontSize: 12.5, color: '#F87171', marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="x" size={13} />
                  {keyError}
                </div>
              )}

              <div className="tkc-note" style={{ marginTop: 14 }}>
                <Icon name="plug" size={15} style={{ flexShrink: 0 }} />
                <span>
                  Acesse <b>linear.app → Settings → API → Personal API keys</b> e crie uma key nova.
                  Ela fica armazenada de forma segura e nunca sai dos nossos servidores.
                </span>
              </div>

              <div className="tkc-cm-foot">
                <span className="tk-textbtn" onClick={() => onNavigate('connectors/add')}>Cancelar</span>
                <span
                  className="tk-primary"
                  onClick={handleValidate}
                  style={{ opacity: !apiKey.trim() || isValidating ? 0.5 : 1, cursor: !apiKey.trim() || isValidating ? 'not-allowed' : 'pointer' }}
                >
                  {isValidating ? 'Validando…' : 'Validar chave'}
                </span>
              </div>
            </>
          )}

          {/* ─── Step 2: Events ─── */}
          {step === 2 && (
            <>
              {/* Validated key badge */}
              <div className="tkc-keyfield">
                <div className="kval">{apiKey.slice(0, 8)}••••••••••{apiKey.slice(-4)}</div>
                <div className="kstatus">
                  <Icon name="check" size={14} stroke={2.4} />
                  {validatedUser?.name ?? 'Validada'}
                </div>
              </div>

              <p className="tkc-perm-lbl" style={{ marginTop: 0 }}>Eventos a escutar</p>
              <div className="tk-cfg-card">
                {LINEAR_EVENTS.map((ev) => (
                  <div key={ev.id} className="tk-cfg-row">
                    <div className="lead">
                      <div className="k" style={{ fontWeight: 500, fontSize: 14 }}>{ev.label}</div>
                      <div className="d">{ev.desc}</div>
                    </div>
                    <div
                      className={`tk-toggle${selectedEvents.has(ev.id) ? ' on' : ''}`}
                      onClick={() => toggleEvent(ev.id)}
                    >
                      <div className="knob" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="tkc-cm-foot">
                <span
                  className="tk-textbtn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
                  onClick={() => setStep(1)}
                >
                  <Icon name="chevronL" size={15} />Voltar
                </span>
                <span
                  className="tk-primary"
                  onClick={handleFinish}
                  style={{ opacity: isSaving ? 0.6 : 1, cursor: isSaving ? 'not-allowed' : 'pointer' }}
                >
                  {isSaving ? 'Salvando…' : 'Finalizar conexão'}
                </span>
              </div>
            </>
          )}

          {/* ─── Step 3: Success ─── */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '24px 0 16px' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'var(--accent-soft)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                color: 'var(--accent)',
              }}>
                <Icon name="check" size={26} stroke={2} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Linear conectado!</div>
              <div style={{ fontSize: 14, color: 'var(--text-dim)' }}>
                {validatedUser?.name && `Conta de ${validatedUser.name} · `}
                {selectedEvents.size} evento{selectedEvents.size !== 1 ? 's' : ''} configurado{selectedEvents.size !== 1 ? 's' : ''}.
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 8 }}>
                Redirecionando…
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
