// Shim de next/link para o preview: vira um <a> simples (sem roteamento).
import * as React from 'react';

type Props = Omit<React.ComponentProps<'a'>, 'href'> & { href: string | { pathname?: string }; prefetch?: boolean; scroll?: boolean; replace?: boolean };

export default function Link({ href, prefetch: _p, scroll: _s, replace: _r, children, ...rest }: Props) {
  const h = typeof href === 'string' ? href : (href?.pathname ?? '#');
  return (
    <a href={h} onClick={(e) => e.preventDefault()} {...rest}>
      {children}
    </a>
  );
}
