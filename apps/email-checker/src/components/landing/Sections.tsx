'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

// ---------- util: reveal on scroll -------------------------------------------

function useInView<T extends HTMLElement>(threshold = 0.25): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className={`ec-reveal ${inView ? 'ec-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ---------- 3. Ticker de veredictos ------------------------------------------

const TICKS: Array<[string, string, string]> = [
  ['temp@mailinator.com', 'disposable', 'text-amber-400'],
  ['ana.souza@gmail.com', 'valid', 'text-brand'],
  ['ceo@nao-existe-9x.com', 'no_mx', 'text-coral'],
  ['joao@gmial.com', 'disposable', 'text-amber-400'],
  ['sem-arroba', 'invalid_format', 'text-coral'],
  ['x@10minutemail.com', 'disposable', 'text-amber-400'],
  ['rh@empresa.com.br', 'valid', 'text-brand'],
  ['ghost@gmail.com', 'mailbox_not_found', 'text-coral'],
  ['vendas@catchall.io', 'catch_all', 'text-amber-400'],
  ['dev@google.com', 'valid', 'text-brand'],
];

export function VerdictTicker() {
  const row = TICKS.map(([email, status, tone], i) => (
    <span key={i} className="mono inline-flex items-center gap-2 px-6 text-[12px] text-ash">
      <span className="text-fog">{email}</span>
      <span className="text-smoke">→</span>
      <span className={tone}>{status}</span>
    </span>
  ));
  return (
    <div className="hairline-t overflow-hidden border-b border-graphite bg-carbon/40 py-3" aria-hidden>
      <div className="ec-marquee flex w-max whitespace-nowrap">
        {row}
        {row}
      </div>
    </div>
  );
}

// ---------- 4. Pipeline de 4 estágios ----------------------------------------

const STAGES = [
  {
    n: '01',
    title: 'Formato',
    desc: 'Sintaxe RFC estrita. Pega o que nem é endereço.',
    sample: 'sem-arroba → invalid_format',
  },
  {
    n: '02',
    title: 'Descartáveis',
    desc: '119.617 domínios temporários, atualizáveis, checados offline.',
    sample: 'temp@mailinator.com → disposable',
  },
  {
    n: '03',
    title: 'Domínio (MX)',
    desc: 'DNS real: o domínio existe e recebe e-mail?',
    sample: '@nao-existe.com → no_mx',
  },
  {
    n: '04',
    title: 'Caixa (SMTP)',
    desc: 'Handshake no servidor de destino. A caixa específica existe?',
    sample: '550 NoSuchUser → mailbox_not_found',
  },
];

export function Pipeline() {
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setLit(4);
      return;
    }
    let i = 0;
    const t = setInterval(() => {
      i++;
      setLit(i);
      if (i >= 4) clearInterval(t);
    }, 420);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <div ref={ref} className="grid gap-3 md:grid-cols-4">
      {STAGES.map((s, i) => (
        <div key={s.n} className={`ec-stage card p-5 ${lit > i ? 'ec-lit' : ''}`}>
          <div className="flex items-center gap-2.5">
            <span className="ec-stage-dot h-1.5 w-1.5 rounded-full bg-smoke transition-all" />
            <span className="mono text-[11px] text-ash">{s.n}</span>
          </div>
          <h3 className="mt-3 text-[15px] text-paper" style={{ fontWeight: 510, letterSpacing: '-0.011em', color: '#fff' }}>
            {s.title}
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-fog">{s.desc}</p>
          <p className="mono mt-4 border-t border-graphite pt-3 text-[11px] text-ash">{s.sample}</p>
        </div>
      ))}
    </div>
  );
}

// ---------- 6. API showcase ---------------------------------------------------

const SINGLE_REQ = [
  `curl -X POST https://email-checker.codehall.io/api/v1/verify \\`,
  `  -H "Authorization: Bearer ek_sua_chave" \\`,
  `  -d '{ "email": "ghost@gmail.com", "smtp": true }'`,
];
const SINGLE_RES = [
  `{`,
  `  "status": "mailbox_not_found",`,
  `  "isValid": false,`,
  `  "mailbox": "not_found",`,
  `  "reason": "caixa_inexistente",`,
  `  "creditsRemaining": 499`,
  `}`,
];
const BATCH_REQ = [
  `curl -X POST https://email-checker.codehall.io/api/v1/verify \\`,
  `  -H "Authorization: Bearer ek_sua_chave" \\`,
  `  -d '{ "emails": ["a@gmail.com", "b@temp.com", …] }'`,
];
const BATCH_RES = [
  `{`,
  `  "results": [ …1000 itens ],`,
  `  "summary": {`,
  `    "total": 1000, "valid": 872,`,
  `    "disposable": 96, "invalid": 32,`,
  `    "creditsCharged": 1000`,
  `  }`,
  `}`,
];

export function ApiShowcase() {
  const [tab, setTab] = useState<'single' | 'batch'>('single');
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const [shown, setShown] = useState(0);
  const [copied, setCopied] = useState(false);

  const req = tab === 'single' ? SINGLE_REQ : BATCH_REQ;
  const res = tab === 'single' ? SINGLE_RES : BATCH_RES;
  const total = req.length + res.length;

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setShown(total);
      return;
    }
    setShown(0);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setShown(i);
      if (i >= total) clearInterval(t);
    }, 120);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, tab]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(req.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  }

  return (
    <div ref={ref} className="card overflow-hidden" style={{ boxShadow: 'var(--shadow-xl)' }}>
      <div className="flex items-center gap-1 border-b border-graphite px-3 py-2">
        {(['single', 'batch'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-md px-3 py-1 text-[12px] transition ${tab === t ? 'bg-white/5 text-mist' : 'text-ash hover:text-fog'}`}
            style={{ fontWeight: tab === t ? 510 : 400 }}
          >
            {t === 'single' ? 'Um e-mail' : 'Batch (até 1.000)'}
          </button>
        ))}
        <button onClick={copy} className="ml-auto flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-ash hover:text-fog">
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'copiado' : 'copiar'}
        </button>
      </div>
      <div className="mono bg-void p-5 text-[12.5px] leading-[1.7]">
        {req.map((l, i) => (
          <div key={`q${i}`} className={`ec-line ${shown > i ? 'ec-in' : ''} whitespace-pre text-mist`}>
            {l}
          </div>
        ))}
        <div className={`ec-line ${shown > req.length ? 'ec-in' : ''} mt-3 text-[11px] text-ash`}># resposta</div>
        {res.map((l, i) => (
          <div key={`r${i}`} className={`ec-line ${shown > req.length + i ? 'ec-in' : ''} whitespace-pre text-fog`}>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- 7. Ledger auditável ----------------------------------------------

const LEDGER = [
  { delta: '+500', desc: 'signup_bonus', bal: '500', tone: 'text-brand' },
  { delta: '−1', desc: 'check · ghost@gmail.com', bal: '499', tone: 'text-fog' },
  { delta: '−240', desc: 'batch · lista-outbound.csv', bal: '259', tone: 'text-fog' },
  { delta: '+1000', desc: 'admin_grant', bal: '1259', tone: 'text-brand' },
];

export function AuditLedger() {
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  return (
    <div ref={ref} className="card p-2">
      <div className="mono flex items-center justify-between border-b border-graphite px-3 py-2 text-[11px] text-ash">
        <span>credit_ledger</span>
        <span>saldo</span>
      </div>
      {LEDGER.map((r, i) => (
        <div
          key={i}
          className={`ec-line ${inView ? 'ec-in' : ''} mono flex items-center justify-between px-3 py-2.5 text-[12.5px]`}
          style={{ transitionDelay: `${i * 140}ms` }}
        >
          <span className="flex items-center gap-3">
            <span className={`w-12 text-right ${r.tone}`}>{r.delta}</span>
            <span className="text-fog">{r.desc}</span>
          </span>
          <span className="text-mist">{r.bal}</span>
        </div>
      ))}
    </div>
  );
}

// ---------- 8. Counters -------------------------------------------------------

function CountUp({ to, suffix = '', duration = 1200 }: { to: number; suffix?: string; duration?: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.6);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setVal(to);
      return;
    }
    const t0 = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {val.toLocaleString('pt-BR')}
      {suffix}
    </span>
  );
}

export function Stats() {
  const items = [
    { v: 119617, s: '', label: 'domínios descartáveis conhecidos' },
    { v: 7, s: '', label: 'status distintos — nunca um "sim" vago' },
    { v: 600, s: ' ms', label: 'p/ validar um batch com MX' },
    { v: 500, s: '', label: 'créditos grátis ao criar conta' },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((it, i) => (
        <Reveal key={i} delay={i * 90}>
          <div className="card p-5">
            <div className="text-[28px] text-paper" style={{ fontWeight: 510, letterSpacing: '-0.022em', color: '#fff' }}>
              <CountUp to={it.v} suffix={it.s} />
            </div>
            <div className="mt-1 text-[12.5px] leading-snug text-fog">{it.label}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
