import { useState } from 'react';
import { Rail } from './components/rail.tsx';
import { DashboardScreen }     from './screens/dashboard.tsx';
import { InboxScreen }         from './screens/inbox.tsx';
import { TasksScreen }         from './screens/tasks.tsx';
import { AgendaScreen }        from './screens/agenda.tsx';
import { ConnectorsHubScreen }   from './screens/connectors-hub.tsx';
import { ConnectorConfigScreen } from './screens/connector-config.tsx';
import {
  ConnectorsAddScreen,
  ConnectorAuthScreen,
  GmailOAuthScreen,
  LinearSetupScreen,
} from './connectors/index.tsx';

export type Screen =
  | 'dashboard'
  | 'inbox'
  | 'tasks'
  | 'agenda'
  | 'connectors'
  | 'connector-config'
  | 'onboarding-add'
  | 'onboarding-auth'
  | 'onboarding-gmail'
  | 'onboarding-linear';

const FULLSCREEN: Screen[] = [
  'onboarding-add',
  'onboarding-auth',
  'onboarding-gmail',
  'onboarding-linear',
];

export function App() {
  const [screen, setScreen] = useState<Screen>('dashboard');
  const navigate = (s: Screen) => setScreen(s);

  if (FULLSCREEN.includes(screen)) {
    return (
      <div className="tk" style={{ position: 'fixed' }}>
        {screen === 'onboarding-add'    && <ConnectorsAddScreen  onNavigate={navigate} />}
        {screen === 'onboarding-auth'   && <ConnectorAuthScreen  onNavigate={navigate} />}
        {screen === 'onboarding-gmail'  && <GmailOAuthScreen     onNavigate={navigate} />}
        {screen === 'onboarding-linear' && <LinearSetupScreen    onNavigate={navigate} />}
      </div>
    );
  }

  return (
    <div className="tk">
      <Rail active={screen} onNavigate={navigate} />
      {screen === 'dashboard'        && <DashboardScreen      onNavigate={navigate} />}
      {screen === 'inbox'            && <InboxScreen />}
      {screen === 'tasks'            && <TasksScreen />}
      {screen === 'agenda'           && <AgendaScreen />}
      {screen === 'connectors'       && <ConnectorsHubScreen  onNavigate={navigate} />}
      {screen === 'connector-config' && <ConnectorConfigScreen onNavigate={navigate} />}
    </div>
  );
}
