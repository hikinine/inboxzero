'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

type Tone = 'lime' | 'amber' | 'red' | 'gray';
type Verdict = { label: string; tone: Tone };

// Roteiro do modo demonstração (sem tocar na API — resultados conhecidos).
const SCRIPT: Array<{ email: string; verdict: Verdict; detail: string }> = [
  { email: 'temp@mailinator.com', verdict: { label: 'descartável', tone: 'amber' }, detail: 'domínio na lista de 119.617 descartáveis' },
  { email: 'ceo@empresa-que-nao-existe.com', verdict: { label: 'domínio sem e-mail', tone: 'red' }, detail: 'nenhum registro MX encontrado' },
  { email: 'ana.souza@gmail.com', verdict: { label: 'válido', tone: 'lime' }, detail: 'formato ok · MX ok · não descartável' },
  { email: 'sem-arroba', verdict: { label: 'inválido', tone: 'red' }, detail: 'não é um endereço bem-formado' },
];

const TONE: Record<Tone, string> = {
  lime: 'bg-brand/10 text-brand',
  amber: 'bg-amber-500/10 text-amber-400',
  red: 'bg-coral/10 text-coral',
  gray: 'bg-white/5 text-fog',
};

type ApiResult = {
  email: string;
  status: string;
  isValid: boolean;
  isDisposable: boolean;
  domain: string | null;
  confidence: number;
  reason: string | null;
  mxChecked: boolean;
  hasMx: boolean | null;
  smtpChecked: boolean;
  mailbox: string | null;
  durationMs: number;
};

const STATUS_VERDICT: Record<string, Verdict> = {
  valid: { label: 'válido', tone: 'lime' },
  disposable: { label: 'descartável', tone: 'amber' },
  no_mx: { label: 'domínio sem e-mail', tone: 'red' },
  invalid_format: { label: 'inválido', tone: 'red' },
  mailbox_not_found: { label: 'caixa não existe', tone: 'red' },
  catch_all: { label: 'catch-all', tone: 'amber' },
  unknown: { label: 'indeterminado', tone: 'gray' },
};

const MAILBOX_LABEL: Record<string, string> = {
  exists: 'existe',
  not_found: 'não existe',
  catch_all: 'aceita tudo',
  unknown: 'indeterminado',
};

export function HeroDemo() {
  const [text, setText] = useState('');
  const [demo, setDemo] = useState<{ email: string; verdict: Verdict; detail: string } | null>(null);
  const [data, setData] = useState<ApiResult | null>(null);
  const [live, setLive] = useState(false); // usuário assumiu o controle
  const [mx, setMx] = useState(true);
  const [smtp, setSmtp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const liveRef = useRef(false);

  // Máquina de escrever: digita cada exemplo, mostra o veredito, apaga, repete.
  useEffect(() => {
    let alive = true;
    let i = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    (async () => {
      while (alive && !liveRef.current) {
        const step = SCRIPT[i % SCRIPT.length];
        i++;
        if (reduced) {
          setText(step.email);
          setDemo(step);
          await sleep(2600);
          continue;
        }
        setDemo(null);
        for (let c = 1; c <= step.email.length; c++) {
          if (!alive || liveRef.current) return;
          setText(step.email.slice(0, c));
          await sleep(38 + Math.random() * 40);
        }
        await sleep(350);
        if (!alive || liveRef.current) return;
        setDemo(step);
        await sleep(2400);
        for (let c = step.email.length; c >= 0; c--) {
          if (!alive || liveRef.current) return;
          setText(step.email.slice(0, c));
          await sleep(12);
        }
        setDemo(null);
        await sleep(300);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  function takeControl() {
    if (!liveRef.current) {
      liveRef.current = true;
      setLive(true);
      setText('');
      setDemo(null);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    takeControl();
    const email = text.trim();
    if (!email) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch('/api/public/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mx, smtp }),
      });
      const d = await res.json();
      if (!res.ok) {
        setError(d?.error?.message ?? 'Erro ao validar.');
        return;
      }
      setData(d);
    } catch {
      setError('Falha de rede.');
    } finally {
      setLoading(false);
    }
  }

  const verdict = data ? (STATUS_VERDICT[data.status] ?? { label: data.status, tone: 'gray' as Tone }) : null;

  const meta = data
    ? [
        { k: 'domínio', v: data.domain ?? '—' },
        { k: 'mx', v: data.mxChecked ? (data.hasMx === true ? 'sim' : data.hasMx === false ? 'não' : '—') : 'não checado' },
        { k: 'caixa (smtp)', v: data.smtpChecked ? (MAILBOX_LABEL[data.mailbox ?? ''] ?? '—') : 'não checada' },
        { k: 'confiança', v: `${data.confidence}/100` },
        { k: 'motivo', v: data.reason ?? '—' },
        { k: 'tempo', v: `${data.durationMs} ms` },
      ]
    : [];

  return (
    <div className="card mx-auto w-full max-w-2xl p-2 text-left" style={{ boxShadow: 'var(--shadow-xl)' }}>
      {/* Barra de terminal */}
      <div className="flex items-center gap-2 px-3 pb-2 pt-1.5">
        <span className="h-2 w-2 rounded-full bg-smoke" />
        <span className="h-2 w-2 rounded-full bg-smoke" />
        <span className="h-2 w-2 rounded-full bg-smoke" />
        <span className="mono ml-2 text-[11px] text-ash">verify — grátis, sem conta</span>
      </div>

      <form onSubmit={submit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            className="input mono !py-3.5 pr-4 text-[15px]"
            value={text}
            onFocus={takeControl}
            onChange={(e) => {
              takeControl();
              setText(e.target.value);
            }}
            placeholder={live ? 'digite um e-mail…' : ''}
            aria-label="E-mail para validar"
            spellCheck={false}
            autoComplete="off"
          />
          {!live && text.length > 0 && (
            <span className="pointer-events-none absolute top-1/2 -translate-y-1/2" style={{ left: `calc(14px + ${text.length}ch)` }}>
              <span className="ec-caret" />
            </span>
          )}
        </div>
        <button className="btn-primary shrink-0 px-5" disabled={loading} type="submit">
          {loading ? <Loader2 className="animate-spin" size={15} /> : null}
          Validar
        </button>
      </form>

      {/* Toggles MX / SMTP */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 px-3 pt-2.5">
        <label className="flex cursor-pointer items-center gap-2 text-[12.5px] text-fog">
          <input type="checkbox" checked={mx} onChange={(e) => setMx(e.target.checked)} />
          Domínio (MX)
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-[12.5px] text-fog">
          <input type="checkbox" checked={smtp} onChange={(e) => setSmtp(e.target.checked)} />
          Caixa (SMTP) — mais lento, mais preciso
        </label>
      </div>

      {/* Resultado */}
      <div className="px-3 pb-1.5 pt-2">
        {error && <p className="pb-2 text-[13px] text-coral">{error}</p>}

        {/* modo demo: uma linha */}
        {!live && demo && !error && (
          <div className="flex min-h-[30px] flex-wrap items-center gap-x-3 gap-y-1">
            <span className={`badge ${TONE[demo.verdict.tone]}`}>{demo.verdict.label}</span>
            <span className="mono text-[12px] text-fog">{demo.detail}</span>
          </div>
        )}

        {/* modo real: veredito + metadados */}
        {data && verdict && !error && (
          <div className="hairline-t pt-2.5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pb-2.5">
              <span className={`badge ${TONE[verdict.tone]}`}>{verdict.label}</span>
              <span className="mono text-[12px] text-ash">{data.email}</span>
              <span className={`mono ml-auto text-[11px] ${data.isValid ? 'text-brand' : 'text-coral'}`}>
                {data.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-graphite bg-graphite sm:grid-cols-3">
              {meta.map((m) => (
                <div key={m.k} className="bg-void px-3 py-2">
                  <div className="mono text-[10px] uppercase tracking-wider text-ash">{m.k}</div>
                  <div className="mono mt-0.5 truncate text-[12.5px] text-mist">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!data && !demo && !error && !loading && (
          <div className="min-h-[30px] text-[12px] text-ash">{live ? 'aperte Enter para validar' : ' '}</div>
        )}
        {loading && (
          <div className="mono min-h-[30px] text-[12px] text-ash">
            {smtp ? 'consultando MX e fazendo handshake SMTP…' : 'consultando…'}
          </div>
        )}
      </div>
    </div>
  );
}
