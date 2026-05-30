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
  { id: 'dashboard', icon: 'home',      label: 'Início'  },
  { id: 'inbox',     icon: 'inbox',     label: 'Inbox'   },
  { id: 'tasks',     icon: 'checklist', label: 'Tarefas' },
  { id: 'agenda',    icon: 'calendar',  label: 'Agenda'  },
];

export function Rail({ active, workspaces, activeSlug, onNavigate, onSwitchWorkspace }: RailProps) {
  const isConnectors = active === 'connectors' || active === 'events';

  return (
    <div className="tk-rail">
      <WorkspaceSwitcher
        workspaces={workspaces}
        activeSlug={activeSlug}
        onSwitch={onSwitchWorkspace}
      />

      <div className="tk-nav">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`tk-navbtn${active === item.id ? ' active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <Icon name={item.icon} size={23} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="tk-rail-foot">
        <div
          className={`tk-navbtn${isConnectors ? ' active' : ' dim'}`}
          onClick={() => onNavigate('connectors')}
        >
          <Icon name="plug" size={23} />
          <span style={{ fontSize: 10.5 }}>Conexões</span>
        </div>
        <div className="tk-avatar">HD</div>
      </div>
    </div>
  );
}
