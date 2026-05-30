import { useState } from 'react';
import {
  useTasksList,
  useTasksCreate,
  useTasksUpdate,
  useTasksRemove,
} from '@tasky/sdk';
import { useQueryClient } from '@tanstack/react-query';
import { Icon } from '../components/icon.tsx';

// ---------- Add task modal ----------
interface AddTaskModalProps {
  onClose: () => void;
  onAdd: (title: string, priority: 'LOW' | 'MEDIUM' | 'HIGH') => void;
  isLoading: boolean;
}

function AddTaskModal({ onClose, onAdd, isLoading }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd(title.trim(), priority);
  };

  return (
    <div className="tk-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="tk-modal">
        <div className="tk-modal-top">
          <span className="t">Nova tarefa</span>
          <div style={{ color: 'var(--text-faint)', cursor: 'pointer' }} onClick={onClose}>
            <Icon name="x" size={18} />
          </div>
        </div>

        <div className="tk-input-wrap">
          <input
            className="tk-input"
            placeholder="Nome da tarefa…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); if (e.key === 'Escape') onClose(); }}
            autoFocus
          />
        </div>

        <div className="tk-note">Adicionar uma nota…</div>

        <div className="tk-chiprow">
          <div className="tk-chip on"><Icon name="calendar" size={15} />Hoje</div>
          <div className="tk-chip"><Icon name="clock" size={15} />Definir horário</div>
          <div
            className={`tk-chip${priority === 'HIGH' ? ' on' : ''}`}
            onClick={() => setPriority(p => p === 'HIGH' ? 'MEDIUM' : 'HIGH')}
          >
            <Icon name="flag" size={15} />
            {priority === 'LOW' ? 'Baixa' : priority === 'HIGH' ? 'Alta' : 'Prioridade'}
          </div>
          <div className="tk-chip"><Icon name="tag" size={15} />Trabalho</div>
          <div className="tk-chip"><Icon name="repeat" size={15} />Repetir</div>
        </div>

        <div className="tk-modal-foot">
          <span className="tk-textbtn" onClick={onClose}>Cancelar</span>
          <button
            className="tk-primary"
            onClick={handleSubmit}
            disabled={isLoading || !title.trim()}
          >
            Adicionar tarefa
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Task row ----------
interface TaskRowProps {
  label: string;
  done?: boolean;
  tail?: React.ReactNode;
  onToggle?: () => void;
}

function TaskRow({ label, done, tail, onToggle }: TaskRowProps) {
  return (
    <div className={`tk-task${done ? ' done' : ''}`}>
      <div className={`tk-check${done ? ' done' : ''}`} onClick={onToggle}>
        {done && <Icon name="check" size={14} stroke={2.4} />}
      </div>
      <div className="label">{label}</div>
      {tail && <div className="tail">{tail}</div>}
    </div>
  );
}

// ---------- Tasks screen (real API) ----------
export function TasksScreen() {
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();
  const { data: tasks = [], isLoading } = useTasksList();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['/tasks/'] });

  const { mutate: createTask, isPending: isCreating } = useTasksCreate({
    mutation: { onSuccess: () => { invalidate(); setShowModal(false); } },
  });

  const { mutate: updateTask } = useTasksUpdate({ mutation: { onSuccess: invalidate } });
  const { mutate: removeTask } = useTasksRemove({ mutation: { onSuccess: invalidate } });

  const today = tasks.filter((t) => t.status !== 'DONE');
  const done  = tasks.filter((t) => t.status === 'DONE');

  const priorityLabel = (p: string) =>
    p === 'HIGH' ? 'Alta' : p === 'LOW' ? 'Baixa' : undefined;

  const priorityChip = (p: string) => {
    const label = priorityLabel(p);
    if (!label) return null;
    return (
      <span className={`tk-chip-mini${p === 'HIGH' ? ' accent' : ''}`}>
        <Icon name="flag" size={14} />{label}
      </span>
    );
  };

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content">
          <div className="tk-head">
            <div>
              <h1 className="tk-greet">Tarefas</h1>
              <div className="tk-date">
                {isLoading
                  ? 'Carregando…'
                  : `${today.length} abertas · ${done.length} concluídas`}
              </div>
            </div>
            <div className="tk-headtools">
              <div className="tk-iconbtn"><Icon name="search" size={19} /></div>
            </div>
          </div>

          <div style={{ marginTop: 44 }}>
            {/* Tarefas abertas */}
            {today.length > 0 && (
              <div className="tk-group">
                <div className="tk-grouphead">
                  <h3>Hoje</h3>
                  <span className="when">
                    {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
                {today.map((task) => (
                  <TaskRow
                    key={task.id}
                    label={task.title}
                    done={false}
                    tail={priorityChip(task.priority)}
                    onToggle={() =>
                      updateTask({ id: task.id, data: { status: 'DONE' } })
                    }
                  />
                ))}
              </div>
            )}

            {/* Concluídas */}
            {done.length > 0 && (
              <div className="tk-group">
                <div className="tk-grouphead">
                  <h3>Concluídas</h3>
                  <span className="when">hoje</span>
                </div>
                {done.map((task) => (
                  <TaskRow
                    key={task.id}
                    label={task.title}
                    done
                    onToggle={() =>
                      updateTask({ id: task.id, data: { status: 'TODO' } })
                    }
                  />
                ))}
              </div>
            )}

            {!isLoading && tasks.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--text-faint)', paddingTop: 80, fontSize: 15 }}>
                Nenhuma tarefa ainda — crie a primeira.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="tk-fab" onClick={() => setShowModal(true)}>
        <Icon name="plus" size={24} stroke={2} />
      </div>

      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          onAdd={(title, priority) => createTask({ data: { title, priority } })}
          isLoading={isCreating}
        />
      )}
    </div>
  );
}
