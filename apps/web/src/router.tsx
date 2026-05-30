import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { AppLayout } from './layouts/app-layout.tsx';

const DashboardScreen   = lazy(() => import('./screens/dashboard.tsx').then(m => ({ default: m.DashboardScreen })));
const InboxScreen       = lazy(() => import('./screens/inbox.tsx').then(m => ({ default: m.InboxScreen })));
const TasksScreen       = lazy(() => import('./screens/tasks.tsx').then(m => ({ default: m.TasksScreen })));
const AgendaScreen      = lazy(() => import('./screens/agenda.tsx').then(m => ({ default: m.AgendaScreen })));
const ConnectorsHub     = lazy(() => import('./screens/connectors-hub.tsx').then(m => ({ default: m.ConnectorsHubScreen })));
const ConnectorConfig   = lazy(() => import('./screens/connector-config.tsx').then(m => ({ default: m.ConnectorConfigScreen })));
const ConnectorsAdd     = lazy(() => import('./connectors/connectors-add.tsx').then(m => ({ default: m.ConnectorsAddScreen })));
const ConnectorAuth     = lazy(() => import('./connectors/connector-auth.tsx').then(m => ({ default: m.ConnectorAuthScreen })));
const GmailOAuth        = lazy(() => import('./connectors/gmail-oauth.tsx').then(m => ({ default: m.GmailOAuthScreen })));
const LinearSetup       = lazy(() => import('./connectors/linear-setup.tsx').then(m => ({ default: m.LinearSetupScreen })));

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="tk-main" />}>{children}</Suspense>
);

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/pessoal/dashboard" replace /> },
  {
    path: '/:workspaceSlug/*',
    element: <AppLayout />,
    children: [
      { index: true,              element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard',        element: <S><DashboardScreen onNavigate={() => {}} /></S> },
      { path: 'inbox',            element: <S><InboxScreen /></S> },
      { path: 'tasks',            element: <S><TasksScreen /></S> },
      { path: 'agenda',           element: <S><AgendaScreen /></S> },
      { path: 'connectors',       element: <S><ConnectorsHub onNavigate={() => {}} /></S> },
      { path: 'connectors/:id',   element: <S><ConnectorConfig onNavigate={() => {}} /></S> },
      { path: 'connectors/add',   element: <S><ConnectorsAdd onNavigate={() => {}} /></S> },
      { path: 'connectors/auth',  element: <S><ConnectorAuth onNavigate={() => {}} /></S> },
      { path: 'connectors/gmail', element: <S><GmailOAuth onNavigate={() => {}} /></S> },
      { path: 'connectors/linear',element: <S><LinearSetup onNavigate={() => {}} /></S> },
    ],
  },
]);
