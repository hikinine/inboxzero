import { CheckCircle, Circle, Clock, Trash2 } from 'lucide-react';
import type { TaskResponseDto } from '@tasky/sdk';

interface TaskCardProps {
  task: TaskResponseDto;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskResponseDto['status']) => void;
}

const statusIcon: Record<TaskResponseDto['status'], React.ReactNode> = {
  TODO: <Circle className="w-5 h-5 text-gray-400" />,
  IN_PROGRESS: <Clock className="w-5 h-5 text-blue-500" />,
  DONE: <CheckCircle className="w-5 h-5 text-green-500" />,
};

const priorityColor: Record<TaskResponseDto['priority'], string> = {
  LOW: 'bg-gray-100 text-gray-600',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  HIGH: 'bg-red-100 text-red-700',
};

const nextStatus: Record<TaskResponseDto['status'], TaskResponseDto['status']> = {
  TODO: 'IN_PROGRESS',
  IN_PROGRESS: 'DONE',
  DONE: 'TODO',
};

export function TaskCard({ task, onDelete, onStatusChange }: TaskCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
      <button
        type="button"
        onClick={() => onStatusChange(task.id, nextStatus[task.status])}
        className="mt-0.5 flex-shrink-0"
      >
        {statusIcon[task.status]}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`font-medium ${task.status === 'DONE' ? 'line-through text-gray-400' : 'text-gray-900'}`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-sm text-gray-500 mt-1 truncate">{task.description}</p>
        )}
        <span
          className={`inline-block text-xs px-2 py-0.5 rounded-full mt-2 font-medium ${priorityColor[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
