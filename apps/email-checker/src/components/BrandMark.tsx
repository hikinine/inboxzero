import Image from 'next/image';

// Marca do MX Check (envelope + servidor + check), em public/brand/logo.png.
export function BrandMark({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/brand/logo.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      unoptimized
      className={['shrink-0 rounded-[22%]', className].filter(Boolean).join(' ')}
    />
  );
}
