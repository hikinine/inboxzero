import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WorkspaceInfo {
  id:          string;
  name:        string;
  slug:        string;
  avatarColor: string;
}

interface AppStore {
  workspaces:          WorkspaceInfo[];
  activeWorkspaceSlug: string | null;
  setWorkspaces:       (ws: WorkspaceInfo[]) => void;
  setActiveWorkspace:  (slug: string) => void;
  getActiveWorkspace:  () => WorkspaceInfo | null;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      workspaces:          [],
      activeWorkspaceSlug: null,

      setWorkspaces: (ws) =>
        set((state) => ({
          workspaces:          ws,
          activeWorkspaceSlug: state.activeWorkspaceSlug ?? ws[0]?.slug ?? null,
        })),

      setActiveWorkspace: (slug) => set({ activeWorkspaceSlug: slug }),

      getActiveWorkspace: () => {
        const { workspaces, activeWorkspaceSlug } = get();
        return workspaces.find((w) => w.slug === activeWorkspaceSlug) ?? null;
      },
    }),
    { name: 'tasky-app' },
  ),
);
