import { Icon } from './icon.tsx';
import type { Screen } from '../app.tsx';

interface RailProps {
  active: Screen;
  onNavigate: (screen: Screen) => void;
}

const NAV_ITEMS: { id: Screen; icon: Parameters<typeof Icon>[0]['name']; label: string }[] = [
  { id: 'dashboard', icon: 'home',      label: 'Início'   },
  { id: 'inbox',     icon: 'inbox',     label: 'Inbox'    },
  { id: 'tasks',     icon: 'checklist', label: 'Tarefas'  },
  { id: 'agenda',    icon: 'calendar',  label: 'Agenda'   },
];

export function Rail({ active, onNavigate }: RailProps) {
  const isConnectors =
    active === 'connectors' ||
    active === 'connector-config' ||
    active === 'onboarding-add' ||
    active === 'onboarding-auth' ||
    active === 'onboarding-gmail' ||
    active === 'onboarding-linear';

  return (
    <div className="tk-rail">
      <div className="tk-mark" onClick={() => onNavigate('dashboard')}>t</div>

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
