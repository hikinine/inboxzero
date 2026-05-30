import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Rail } from '../components/rail.tsx';
import { useAppStore } from '../store/app-store.ts';
import { useWorkspacesList } from '@tasky/sdk';

export function AppLayout() {
  const { workspaceSlug = '', '*': splat = '' } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setWorkspaces, setActiveWorkspace, activeWorkspaceSlug } = useAppStore();

  const { data: workspaces = [] } = useWorkspacesList();

  // Sync API data into store
  useEffect(() => {
    if (workspaces.length > 0) {
      setWorkspaces(workspaces as any);
    }
  }, [workspaces]);

  // Sync URL → store
  useEffect(() => {
    if (workspaceSlug && workspaceSlug !== activeWorkspaceSlug) {
      setActiveWorkspace(workspaceSlug);
    }
  }, [workspaceSlug]);

  const handleNavigate = (path: string) => navigate(`/${workspaceSlug}/${path}`);

  const handleSwitchWorkspace = (slug: string) => {
    queryClient.resetQueries();
    navigate(`/${slug}/dashboard`);
  };

  // Derive active segment from current path
  const activeSegment = splat?.split('/')[0] || 'dashboard';

  return (
    <div className="tk">
      <Rail
        active={activeSegment}
        workspaces={workspaces as any}
        activeSlug={workspaceSlug}
        onNavigate={handleNavigate}
        onSwitchWorkspace={handleSwitchWorkspace}
      />
      <Outlet />
    </div>
  );
}
