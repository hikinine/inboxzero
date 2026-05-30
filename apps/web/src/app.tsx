import { TasksPage } from './pages/tasks/tasks-page.tsx';

export function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Tasky</h1>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-8">
        <TasksPage />
      </main>
    </div>
  );
}
