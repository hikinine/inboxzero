import { Icon } from './icon.tsx';
import { WorkspaceSwitcher } from './workspace-switcher.tsx';
import type { WorkspaceInfo } from '../store/app-store.ts';

interface RailProps {
  active:            string;
  workspaces:        WorkspaceInfo[];
  activeSlug:        string;
  onNavigate:        (path: string) => void;
  onSwitchWorkspace: (slug: string) => void;
}

const NAV_ITEMS: { id: string; icon: Parameters<typeof Icon>[0]['name']; label: string }[] = [
  { id: 'dashboard', icon: 'home',      label: 'Início'   },
  { id: 'inbox',     icon: 'inbox',     label: 'Inbox'    },
  { id: 'tasks',     icon: 'checklist', label: 'Tarefas'  },
  { id: 'agenda',    icon: 'calendar',  label: 'Agenda'   },
  { id: 'events',    icon: 'spark',     label: 'Eventos'  },
];

function NavItem({
  icon,
  label,
  active,
  onClick,
  faint,
}: {
  icon: Parameters<typeof Icon>[0]['name'];
  label: string;
  active?: boolean;
  onClick: () => void;
  faint?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: '6px 12px',
        borderRadius: 7,
        cursor: 'pointer',
        fontSize: 13.5,
        fontWeight: active ? 500 : 400,
        color: active
          ? 'var(--text)'
          : faint
            ? 'var(--text-faint)'
            : 'var(--text-dim)',
        background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
        transition: 'background 0.12s, color 0.12s',
        userSelect: 'none',
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = 'transparent';
      }}
    >
      <Icon
        name={icon}
        size={16}
        stroke={active ? 1.8 : 1.5}
        style={{ flexShrink: 0, opacity: faint ? 0.5 : 1 }}
      />
      {label}
    </div>
  );
}

export function Rail({ active, workspaces, activeSlug, onNavigate, onSwitchWorkspace }: RailProps) {
  const isConnectors = active === 'connectors';

  return (
    <div className="tk-rail">
      {/* Workspace switcher */}
      <div style={{ padding: '0 10px', marginBottom: 16 }}>
        <WorkspaceSwitcher
          workspaces={workspaces}
          activeSlug={activeSlug}
          onSwitch={onSwitchWorkspace}
        />
      </div>

      {/* Main nav */}
      <div style={{ flex: 1, width: '100%', padding: '0 8px', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={active === item.id}
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </div>

      {/* Footer */}
      <div style={{ width: '100%', padding: '0 8px', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '8px 4px 8px' }} />
        <NavItem
          icon="plug"
          label="Conexões"
          active={isConnectors}
          faint={!isConnectors}
          onClick={() => onNavigate('connectors')}
        />
        <NavItem
          icon="settings"
          label="Config."
          active={false}
          faint
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
