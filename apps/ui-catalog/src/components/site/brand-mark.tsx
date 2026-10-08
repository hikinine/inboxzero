// Marca do UI Catalog: grade 2×2 com uma célula acesa (lime). SVG inline, sem dependência de asset.
export function BrandMark({ size = 22, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden className={`shrink-0 ${className}`}>
      <rect width="64" height="64" rx="14" className="fill-foreground" />
      <rect x="12" y="12" width="18" height="18" rx="4" className="fill-brand" />
      <rect x="34" y="12" width="18" height="18" rx="4" className="fill-background" opacity="0.5" />
      <rect x="12" y="34" width="18" height="18" rx="4" className="fill-background" opacity="0.5" />
      <rect x="34" y="34" width="18" height="18" rx="4" className="fill-background" opacity="0.5" />
    </svg>
  );
}
