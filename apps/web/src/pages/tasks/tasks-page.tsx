import {
  useTasksCreate,
  useTasksList,
  useTasksRemove,
  useTasksUpdate,
} from '@tasky/sdk';
import { useQueryClient } from '@tanstack/react-query';
import { CreateTaskForm } from './components/create-task-form.tsx';
import { TaskCard } from './components/task-card.tsx';
import type { TaskResponseDto } from '@tasky/sdk';

export function TasksPage() {
  const queryClient = useQueryClient();
  const { data: tasks = [], isLoading } = useTasksList();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ['/tasks/'] });

  const { mutate: createTask, isPending: isCreating } = useTasksCreate({
    mutation: { onSuccess: invalidate },
  });

  const { mutate: updateTask } = useTasksUpdate({
    mutation: { onSuccess: invalidate },
  });

  const { mutate: deleteTask } = useTasksRemove({
    mutation: { onSuccess: invalidate },
  });

  if (isLoading) {
    return (
      <div className="text-center py-12 text-gray-500">Carregando...</div>
    );
  }

  return (
    <div className="space-y-6">
      <CreateTaskForm
        onSubmit={(data) => createTask({ data })}
        isLoading={isCreating}
      />

      {tasks.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          Nenhuma task ainda. Crie a primeira!
        </div>
      ) : (
        <div className="space-y-3">
          {(tasks as TaskResponseDto[]).map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={(id) => deleteTask({ id })}
              onStatusChange={(id, status) =>
                updateTask({ id, data: { status } })
              }
            />
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400 text-right">
        {tasks.length} task{tasks.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
}
