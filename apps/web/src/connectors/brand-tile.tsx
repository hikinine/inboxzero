import { Icon } from '../components/icon.tsx';
import { BRANDS } from './brands.ts';

interface BrandTileProps {
  brand: string;
  size?: number;
  radius?: number;
  style?: React.CSSProperties;
}

export function BrandTile({ brand, size = 60, radius = 17, style }: BrandTileProps) {
  const b = BRANDS[brand];
  if (!b) return null;

  const padding = Math.round(size * 0.18);

  return (
    <div
      style={{
        width:           size,
        height:          size,
        borderRadius:    radius,
        background:      b.bg,
        border:          b.border ? '1px solid rgba(128,128,128,0.25)' : 'none',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        flexShrink:      0,
        overflow:        'hidden',
        position:        'relative',
        boxShadow:       '0 2px 8px rgba(0,0,0,0.25)',
        ...style,
      }}
    >
      {b.logo ? (
        <img
          src={b.logo}
          alt={brand}
          style={{
            width:      size - padding * 2,
            height:     size - padding * 2,
            objectFit:  'contain',
            display:    'block',
          }}
        />
      ) : (
        <Icon
          name={b.icon}
          size={Math.round(size * 0.46)}
          style={{ color: b.dark ? '#111' : '#fff' }}
        />
      )}
    </div>
  );
}
