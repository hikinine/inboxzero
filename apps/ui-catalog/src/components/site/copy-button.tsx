'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<typeof Button>;

export function CopyButton({
  value,
  label = 'Copiar',
  copiedLabel = 'Copiado!',
  iconOnly = false,
  variant = 'outline',
  size = 'sm',
  className,
  ...rest
}: { value: string; label?: string; copiedLabel?: string; iconOnly?: boolean } & Omit<ButtonProps, 'onClick' | 'children'>) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard só em contexto seguro */
    }
  }
  return (
    <Button
      type="button"
      variant={variant}
      size={iconOnly ? (size === 'sm' ? 'icon-sm' : 'icon') : size}
      onClick={copy}
      title={copied ? copiedLabel : label}
      className={className}
      {...rest}
    >
      {copied ? <Check className="text-emerald-500" /> : <Copy />}
      {!iconOnly && (copied ? copiedLabel : label)}
    </Button>
  );
}
