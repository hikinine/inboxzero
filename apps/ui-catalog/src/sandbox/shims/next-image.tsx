// Shim de next/image para o preview: <img> simples. `fill` vira posicionamento absoluto.
import * as React from 'react';

type Props = Omit<React.ComponentProps<'img'>, 'src'> & {
  src: string | { src: string };
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  unoptimized?: boolean;
  sizes?: string;
};

export default function Image({ src, fill, priority: _p, quality: _q, unoptimized: _u, style, className, alt = '', ...rest }: Props) {
  const s = typeof src === 'string' ? src : src.src;
  const fillStyle: React.CSSProperties | undefined = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
    : undefined;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={s} alt={alt} className={className} style={{ ...fillStyle, ...style }} {...rest} />;
}
