'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyButton({
  value,
  title = 'Copiar ID',
  className = '',
  showLabel = false,
}: {
  value: string;
  title?: string;
  className?: string;
  showLabel?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard indisponível (http/permite só em contexto seguro) */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={copied ? 'Copiado!' : title}
      className={`inline-flex items-center gap-1.5 ${className}`}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      {showLabel && <span>{copied ? 'Copiado!' : 'Copiar ID'}</span>}
    </button>
  );
}
