import { Plus } from 'lucide-react';
import { useState } from 'react';

interface CreateTaskFormProps {
  onSubmit: (data: { title: string; priority: 'LOW' | 'MEDIUM' | 'HIGH' }) => void;
  isLoading?: boolean;
}

export function CreateTaskForm({ onSubmit, isLoading }: CreateTaskFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), priority });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nova task..."
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH')}
        className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="LOW">Baixa</option>
        <option value="MEDIUM">Média</option>
        <option value="HIGH">Alta</option>
      </select>
      <button
        type="submit"
        disabled={isLoading || !title.trim()}
        className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Plus className="w-4 h-4" />
        Adicionar
      </button>
    </form>
  );
}
