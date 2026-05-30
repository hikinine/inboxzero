import { useState } from 'react';
import { Icon } from './icon.tsx';
import type { WorkspaceInfo } from '../store/app-store.ts';

interface Props {
  workspaces:  WorkspaceInfo[];
  activeSlug:  string;
  onSwitch:    (slug: string) => void;
}

export function WorkspaceSwitcher({ workspaces, activeSlug, onSwitch }: Props) {
  const [open, setOpen] = useState(false);
  const active = workspaces.find((w) => w.slug === activeSlug);

  return (
    <div style={{ position: 'relative' }}>
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 9,
          padding: '6px 12px', borderRadius: 8, cursor: 'pointer',
          transition: 'background 0.12s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <div style={{
          width: 22, height: 22, borderRadius: 6, flexShrink: 0,
          background: active?.avatarColor ?? 'var(--accent)',
          color: '#06281a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 11,
        }}>
          {active?.name?.[0]?.toUpperCase() ?? 't'}
        </div>
        <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {active?.name ?? 'Workspace'}
        </span>
        <Icon name="chevronR" size={13} style={{ color: 'var(--text-faint)', transform: 'rotate(90deg)', flexShrink: 0 }} />
      </div>

      {open && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 49 }}
            onClick={() => setOpen(false)}
          />
          <div style={{
            position: 'absolute', left: 50, top: 0, zIndex: 50,
            background: 'var(--surface)',
            border: '1px solid var(--hairline-2)',
            borderRadius: 14, padding: '8px 0',
            minWidth: 210,
            boxShadow: '0 16px 48px rgba(0,0,0,0.45)',
          }}>
            <div style={{ padding: '6px 14px 10px', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
              Workspaces
            </div>

            {workspaces.map((ws) => (
              <div
                key={ws.slug}
                onClick={() => { onSwitch(ws.slug); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 14px', cursor: 'pointer',
                  background: ws.slug === activeSlug ? 'var(--surface-2)' : 'transparent',
                  transition: 'background 0.15s',
                }}
              >
                <div style={{
                  width: 26, height: 26, borderRadius: 8,
                  background: ws.avatarColor, color: '#06281a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 12, flexShrink: 0,
                }}>
                  {ws.name[0]?.toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ws.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-faint)' }}>{ws.slug}</div>
                </div>
                {ws.slug === activeSlug && (
                  <div style={{ color: 'var(--accent)', flexShrink: 0 }}>
                    <Icon name="check" size={15} stroke={2.4} />
                  </div>
                )}
              </div>
            ))}

            <div style={{ borderTop: '1px solid var(--hairline)', margin: '8px 0 0' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', cursor: 'pointer', color: 'var(--text-dim)', fontSize: 13.5 }}>
              <Icon name="plus" size={16} /> Novo workspace
            </div>
          </div>
        </>
      )}
    </div>
  );
}
