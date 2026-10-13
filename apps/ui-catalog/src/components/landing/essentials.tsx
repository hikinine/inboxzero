'use client';

// Seção "Essenciais" da landing (no formato do "All Essentials in One Place" do shadcnstudio):
// grade com bordas tracejadas e uma ilustração SVG/motion por célula.
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BadgeCheck, FileCode2, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BrandMark } from '@/components/site/brand-mark';

export function Essentials() {
  return (
    <section className="border-t">
      <div className="mx-auto w-full max-w-screen-2xl px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="relative inline-block font-mono text-[12px] italic tracking-wide text-muted-foreground">
            Recursos essenciais
            <svg viewBox="0 0 120 6" className="absolute -bottom-1.5 left-0 h-1.5 w-full" aria-hidden>
              <path d="M1 4 C 30 1, 70 1, 119 3" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            Tudo o que você precisa{' '}
            <span className="relative inline-block">
              num só lugar
              <svg viewBox="0 0 200 12" className="absolute -bottom-2 left-0 h-3 w-full" aria-hidden>
                <path d="M3 8 C 50 2, 120 2, 197 6" fill="none" stroke="var(--brand)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Blocos, componentes, páginas e ilustrações prontos para usar, com suporte a Base UI e Radix. <strong className="font-semibold text-foreground">O código é 100% seu</strong> —
            copie e cole ou instale pelo CLI.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 border-l border-t border-dashed lg:grid-cols-12">
          <Cell className="lg:col-span-7" title="Integra com qualquer stack React" text="Next.js, Vite, Remix, Astro, TanStack… cada item é um arquivo TSX que usa só @/components/ui/* e Tailwind v4." split>
            <StackOrbit />
          </Cell>
          <Cell className="lg:col-span-5" title="O código é 100% seu" text="Sem dependência escondida nem lock-in. O arquivo entra no seu projeto pelo CLI ou copiando — e você edita à vontade.">
            <CodeStack />
          </Cell>
          <Cell className="lg:col-span-4" title="Animações com Motion" text="Ilustrações e microinterações com motion/react que entram na tela, animam em loop e herdam seus tokens.">
            <MotionWave />
          </Cell>
          <Cell className="lg:col-span-4" title="Primitivos em primeiro lugar" text="Escrito sobre Base UI (base-nova); em projetos Radix, o CLI instala os primitivos equivalentes.">
            <PrimitivesY />
          </Cell>
          <Cell className="lg:col-span-4" title="Instale do jeito que preferir" text="CLI do shadcn, prompt para o seu agente, v0 ou MCP — tudo chega no seu projeto em segundos.">
            <InstallFlow />
          </Cell>
        </div>
      </div>
    </section>
  );
}

function Cell({ className, title, text, split, children }: { className?: string; title: string; text: string; split?: boolean; children: React.ReactNode }) {
  return (
    <div className={cn('relative flex min-h-[340px] flex-col overflow-hidden border-b border-r border-dashed', split && 'lg:flex-row', className)}>
      <div className={cn('relative z-10 p-7 sm:p-8', split && 'lg:w-[44%]')}>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
      </div>
      <div className="relative min-h-[220px] flex-1">{children}</div>
    </div>
  );
}

// ── 1. Órbita de stacks ───────────────────────────────────────────────────────

type Logo = { name: string; node: React.ReactNode };

const LOGOS_INNER: Logo[] = [
  { name: 'React', node: <ReactGlyph /> },
  { name: 'Next.js', node: <span className="text-[15px] font-bold">N</span> },
  { name: 'Tailwind', node: <TailwindGlyph /> },
  { name: 'Vite', node: <ViteGlyph /> },
];
const LOGOS_OUTER: Logo[] = [
  { name: 'Astro', node: <AstroGlyph /> },
  { name: 'Remix', node: <span className="text-[15px] font-black">R</span> },
  { name: 'Laravel', node: <span className="text-[14px] font-black text-rose-500">L</span> },
  { name: 'TanStack', node: <span className="text-[11px] font-black text-amber-500">TS</span> },
  { name: 'Gatsby', node: <span className="text-[14px] font-black text-violet-500">G</span> },
  { name: 'Expo', node: <span className="text-[13px] font-black">Ex</span> },
];

function StackOrbit() {
  const reduced = useReducedMotion();
  return (
    <div className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 lg:left-[52%]">
      <svg viewBox="0 0 420 420" className="absolute inset-0 size-full" aria-hidden>
        <circle cx="210" cy="210" r="95" fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="5 7" />
        <circle cx="210" cy="210" r="175" fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="5 7" />
      </svg>
      <Ring logos={LOGOS_INNER} radius={95} duration={40} reduced={reduced} />
      <Ring logos={LOGOS_OUTER} radius={175} duration={70} reduced={reduced} reverse />
      <div className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-card shadow-xl ring-8 ring-background">
        <BrandMark size={30} />
      </div>
    </div>
  );
}

function Ring({ logos, radius, duration, reduced, reverse }: { logos: Logo[]; radius: number; duration: number; reduced: boolean | null; reverse?: boolean }) {
  const dir = reverse ? -1 : 1;
  return (
    <motion.div
      className="absolute inset-0"
      animate={reduced ? undefined : { rotate: 360 * dir }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {logos.map((l, i) => {
        const a = (i / logos.length) * Math.PI * 2 - Math.PI / 2;
        const x = 210 + Math.cos(a) * radius;
        const y = 210 + Math.sin(a) * radius;
        return (
          <motion.div
            key={l.name}
            title={l.name}
            className="absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-card text-foreground shadow-sm"
            style={{ left: x, top: y }}
            animate={reduced ? undefined : { rotate: -360 * dir }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
          >
            {l.node}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function ReactGlyph() {
  return (
    <svg viewBox="-12 -12 24 24" className="size-6 text-sky-400" aria-hidden>
      {[0, 60, 120].map((r) => (
        <ellipse key={r} rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.2" transform={`rotate(${r})`} />
      ))}
      <circle r="2" fill="currentColor" />
    </svg>
  );
}
function TailwindGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 text-sky-400" aria-hidden>
      <path fill="currentColor" d="M12 6c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3.9 1 2 2.2 4.6 2.2 2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3C15.7 7.2 14.6 6 12 6zm-5 6c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3.9 1 2 2.2 4.6 2.2 2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3C10.7 13.2 9.6 12 7 12z" />
    </svg>
  );
}
function ViteGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
      <path d="M2.5 4.5 12 21.5l9.5-17-9.5 2z" className="fill-violet-500" />
      <path d="M13.5 3 9 4l-.5 8.5 2.5-.6-.8 5.6 4.8-8.2-2.6.5z" className="fill-amber-400" />
    </svg>
  );
}
function AstroGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
      <path d="M9.2 3.5h5.6l4.7 13.6c-1.6-.9-3.4-1.4-5.4-1.6l-2-6.3-2 6.3c-2 .2-3.9.7-5.5 1.6z" className="fill-foreground" />
      <path d="M8.5 17.5c.6 1.9 2 3 3.5 3 1.6 0 2.9-1.1 3.5-3-1.1-.3-2.3-.4-3.5-.4s-2.4.1-3.5.4z" className="fill-orange-500" />
    </svg>
  );
}

// ── 2. Pilha de arquivos de código ────────────────────────────────────────────

const FILES = [
  { path: 'components/blocks/hero.tsx', lines: [['export', ' default function ', 'Hero', '() {'], ['  return ', '<section', ' className=', '"py-24"', '>'], ['    <h1>', 'Venda mais conversando menos.', '</h1>'], ['    <Button>', 'Começar grátis', '</Button>']] },
  { path: 'components/blocks/pricing.tsx', lines: [['const', ' PLANS ', '= [', ''], ['  { name: ', "'Pro'", ', price: ', '237 },'], ['export', ' default function ', 'Pricing', '() {'], ['  const [', 'yearly', ', set] = ', 'useState(true)']] },
  { path: 'components/ui/kanban.tsx', lines: [['import', ' { Card } ', 'from', " '@/components/ui/card'"], ['export', ' default function ', 'Kanban', '() {'], ['  const ', 'cols', ' = ', "['A fazer', 'Feito']"], ['  return ', '<div', ' className=', '"grid gap-3">']] },
] as const;

const TOKEN_CLASSES = ['text-violet-500 dark:text-violet-400', 'text-foreground/80', 'text-sky-600 dark:text-sky-400', 'text-emerald-600 dark:text-emerald-400'];

function CodeStack() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((n) => (n + 1) % FILES.length), 3200);
    return () => clearInterval(t);
  }, [reduced]);
  const file = FILES[i]!;
  return (
    <div className="absolute inset-x-6 bottom-0 top-2 sm:inset-x-10 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
      <div className="absolute inset-x-10 top-0 h-24 rounded-t-xl border border-b-0 bg-card/40" />
      <div className="absolute inset-x-5 top-4 h-24 rounded-t-xl border border-b-0 bg-card/70" />
      <div className="absolute inset-x-0 top-8 rounded-t-xl border bg-card shadow-2xl">
        <div className="flex items-center gap-2.5 border-b px-4 py-3">
          <div className="flex size-8 items-center justify-center rounded-full border bg-background">
            <BrandMark size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-sm font-semibold">
              Seu projeto <BadgeCheck className="size-4 text-sky-500" />
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={file.path} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="truncate font-mono text-[11px] text-muted-foreground">
                {file.path}
              </motion.div>
            </AnimatePresence>
          </div>
          <FolderOpen className="size-4 text-muted-foreground" />
        </div>
        <AnimatePresence mode="wait">
          <motion.pre
            key={file.path}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden px-4 py-3 font-mono text-[11.5px] leading-6"
          >
            {file.lines.map((line, li) => (
              <div key={li} className="whitespace-pre">
                <span className="mr-3 select-none text-muted-foreground/50">{li + 1}</span>
                {line.map((tok, ti) => (
                  <span key={ti} className={TOKEN_CLASSES[ti % TOKEN_CLASSES.length]}>
                    {tok}
                  </span>
                ))}
              </div>
            ))}
          </motion.pre>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── 3. Onda com a marca percorrendo ───────────────────────────────────────────

const WAVE = 'M0 70 C 55 70, 75 140, 120 140 S 185 40, 240 40 S 300 120, 345 105 S 420 75, 460 85';

function MotionWave() {
  const reduced = useReducedMotion();
  return (
    <div className="absolute inset-x-0 bottom-6 flex justify-center">
      <div className="relative h-[180px] w-[460px] shrink-0 origin-bottom max-sm:scale-[0.72]">
        <svg viewBox="0 0 460 180" className="absolute inset-0 size-full" aria-hidden>
          {[20, 90, 160].map((y) => (
            <line key={y} x1="0" x2="460" y1={y} y2={y} stroke="var(--border)" strokeWidth="1" />
          ))}
          <path d={WAVE} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/40" />
          {!reduced && (
            <motion.path
              d={WAVE}
              fill="none"
              stroke="var(--brand)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0.12, pathOffset: 0 }}
              animate={{ pathOffset: [0.04, 0.84, 0.04] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </svg>
        <motion.div
          className="absolute left-0 top-0 flex size-12 items-center justify-center rounded-full border bg-card shadow-lg ring-4 ring-background"
          style={{ offsetPath: `path('${WAVE}')`, offsetRotate: '0deg', offsetAnchor: 'center', offsetDistance: '50%' }}
          animate={reduced ? undefined : { offsetDistance: ['10%', '90%', '10%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <BrandMark size={24} />
        </motion.div>
      </div>
    </div>
  );
}

// ── 4. Base UI + Radix → ui/catalog ───────────────────────────────────────────

const Y_LEFT = 'M0 70 H 120 L 260 190';
const Y_RIGHT = 'M560 70 H 440 L 300 190';

function PrimitivesY() {
  const reduced = useReducedMotion();
  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-center">
      <div className="relative h-[260px] w-[560px] shrink-0 origin-bottom max-sm:scale-[0.64]">
        <svg viewBox="0 0 560 260" className="absolute inset-0 size-full" aria-hidden>
          {[Y_LEFT, Y_RIGHT].map((d) => (
            <g key={d}>
              <path d={d} fill="none" stroke="var(--border)" strokeWidth="6" strokeLinejoin="round" />
              <path d={d} fill="none" stroke="var(--background)" strokeWidth="3" strokeLinejoin="round" />
            </g>
          ))}
          <path d="M280 220 V 260" stroke="var(--border)" strokeWidth="6" />
          <path d="M280 220 V 260" stroke="var(--background)" strokeWidth="3" />
          {!reduced &&
            [Y_LEFT, Y_RIGHT].map((d, i) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="var(--brand)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0.18, pathOffset: 0, opacity: 0 }}
                animate={{ pathOffset: [0, 0.82], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeIn', delay: i * 1.2, repeatDelay: 0.6 }}
              />
            ))}
        </svg>
        <Node className="left-[150px] top-[70px]" label="Base UI">
          <span className="text-[26px] font-black leading-none">b</span>
        </Node>
        <Node className="left-[410px] top-[70px]" label="Radix UI">
          <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
            <rect x="5" y="3" width="6" height="18" rx="1" className="fill-foreground" />
            <rect x="13" y="3" width="6" height="6" rx="1" className="fill-foreground" />
            <circle cx="16" cy="15" r="3.5" className="fill-foreground" />
          </svg>
        </Node>
        <div className="absolute left-[280px] top-[205px] -translate-x-1/2 -translate-y-1/2">
          <div className="flex size-[78px] items-center justify-center rounded-full border-4 border-border bg-background">
            <div className="flex size-14 items-center justify-center rounded-full border bg-card">
              <BrandMark size={28} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Node({ className, label, children }: { className?: string; label: string; children: React.ReactNode }) {
  return (
    <div className={cn('absolute flex size-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-border bg-card shadow-lg', className)} title={label}>
      {children}
    </div>
  );
}

// ── 5. Blocos → CLI / v0 / Prompt / MCP → Seu projeto ─────────────────────────

const CHANNELS = [
  { label: 'CLI', x: 150, up: true },
  { label: 'v0', x: 262, up: true },
  { label: 'Copiar prompt', x: 205, up: false },
  { label: 'MCP', x: 310, up: false },
] as const;

function InstallFlow() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setActive((n) => (n + 1) % CHANNELS.length), 1400);
    return () => clearInterval(t);
  }, [reduced]);
  return (
    <div className="absolute inset-x-0 bottom-4 flex justify-center">
      <div className="relative h-[180px] w-[430px] shrink-0 origin-bottom max-sm:scale-[0.78]">
        <svg viewBox="0 0 430 180" className="absolute inset-0 size-full" aria-hidden>
          <line x1="96" y1="90" x2="370" y2="90" stroke="var(--border)" strokeWidth="1.5" />
          {CHANNELS.map((c) => (
            <line key={c.label} x1={c.x} x2={c.x} y1={c.up ? 34 : 90} y2={c.up ? 90 : 146} stroke="var(--border)" strokeWidth="1.5" />
          ))}
          {!reduced && (
            <motion.path
              d="M96 90 H 370"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0.2, pathOffset: 0 }}
              animate={{ pathOffset: [0, 0.8] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </svg>
        <div className="absolute left-0 top-[90px] flex -translate-y-1/2 items-center gap-2 rounded-lg border bg-card px-2.5 py-1.5 text-sm font-medium shadow-sm">
          <BrandMark size={18} /> Blocos
        </div>
        {CHANNELS.map((c, i) => (
          <div
            key={c.label}
            className={cn(
              'absolute -translate-x-1/2 whitespace-nowrap rounded-md border bg-card px-2 py-0.5 text-[11px] font-medium transition-colors duration-300',
              c.up ? 'top-[12px]' : 'top-[146px]',
              active === i ? 'border-[var(--brand)] text-foreground shadow-[0_0_0_3px_color-mix(in_oklch,var(--brand)_25%,transparent)]' : 'text-muted-foreground',
            )}
            style={{ left: c.x }}
          >
            {c.label}
          </div>
        ))}
        <div className="absolute right-0 top-[90px] flex -translate-y-1/2 flex-col items-center gap-1 text-[11px] text-muted-foreground">
          <div className="flex size-9 items-center justify-center rounded-lg border bg-card text-foreground shadow-sm">
            <FileCode2 className="size-4" />
          </div>
          Seu projeto
        </div>
      </div>
    </div>
  );
}
