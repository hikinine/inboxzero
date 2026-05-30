import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, useNavigate, useParams } from 'react-router';
import { AppLayout } from './layouts/app-layout.tsx';

// Lazy screen imports
const DashboardScreen   = lazy(() => import('./screens/dashboard.tsx').then(m => ({ default: m.DashboardScreen })));
const InboxPage         = lazy(() => import('./pages/inbox-page.tsx').then(m => ({ default: m.InboxPage })));
const TasksPage         = lazy(() => import('./pages/tasks-page.tsx').then(m => ({ default: m.TasksPage })));
const AgendaScreen      = lazy(() => import('./screens/agenda.tsx').then(m => ({ default: m.AgendaScreen })));
const ConnectorsHub     = lazy(() => import('./screens/connectors-hub.tsx').then(m => ({ default: m.ConnectorsHubScreen })));
const ConnectorConfig   = lazy(() => import('./screens/connector-config.tsx').then(m => ({ default: m.ConnectorConfigScreen })));
const ConnectorsAdd     = lazy(() => import('./connectors/connectors-add.tsx').then(m => ({ default: m.ConnectorsAddScreen })));
const ConnectorAuth     = lazy(() => import('./connectors/connector-auth.tsx').then(m => ({ default: m.ConnectorAuthScreen })));
const GmailOAuth        = lazy(() => import('./connectors/gmail-oauth.tsx').then(m => ({ default: m.GmailOAuthScreen })));
const LinearSetup       = lazy(() => import('./connectors/linear-setup.tsx').then(m => ({ default: m.LinearSetupScreen })));
const EventsPage        = lazy(() => import('./pages/events-page.tsx').then(m => ({ default: m.EventsPage })));

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="tk-main" />}>{children}</Suspense>
);

// Wrapper that provides real useNavigate to screens needing onNavigate
function WithNav({ Component }: { Component: React.ComponentType<{ onNavigate: (path: string) => void }> }) {
  const navigate = useNavigate();
  const { workspaceSlug } = useParams();
  const onNavigate = (path: string) => navigate(`/${workspaceSlug}/${path}`);
  return <Component onNavigate={onNavigate} />;
}

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/pessoal/dashboard" replace /> },
  {
    path: '/:workspaceSlug/*',
    element: <AppLayout />,
    children: [
      { index: true,               element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard',         element: <S><WithNav Component={DashboardScreen} /></S> },
      { path: 'inbox',             element: <S><InboxPage /></S> },
      { path: 'tasks',             element: <S><TasksPage /></S> },
      { path: 'agenda',            element: <S><AgendaScreen /></S> },
      { path: 'events',            element: <S><EventsPage /></S> },
      { path: 'connectors',        element: <S><WithNav Component={ConnectorsHub} /></S> },
      { path: 'connectors/add',    element: <S><WithNav Component={ConnectorsAdd} /></S> },
      { path: 'connectors/auth',   element: <S><WithNav Component={ConnectorAuth} /></S> },
      { path: 'connectors/gmail',  element: <S><WithNav Component={GmailOAuth} /></S> },
      { path: 'connectors/linear', element: <S><WithNav Component={LinearSetup} /></S> },
      { path: 'connectors/:id',    element: <S><WithNav Component={ConnectorConfig} /></S> },
    ],
  },
]);
