'use client';

import { useEffect, useRef, useState } from 'react';

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setV(to);
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 1100);
          setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v.toLocaleString('pt-BR')}</span>;
}

export function Stats({ items }: { items: Array<{ value: number; label: string }> }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="rounded-xl border bg-card p-5">
          <div className="text-3xl font-semibold tracking-tight">
            <CountUp to={it.value} />
          </div>
          <div className="mt-1 text-sm text-muted-foreground">{it.label}</div>
        </div>
      ))}
    </div>
  );
}
