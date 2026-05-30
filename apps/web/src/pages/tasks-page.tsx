import { useState } from 'react';
import { useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useItemsList, useItemsCreate, useItemsUpdate, getItemsListQueryKey } from '@tasky/sdk';
import { Icon } from '../components/icon.tsx';

interface AddItemModalProps {
  onClose: () => void;
  onAdd: (title: string, priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT') => void;
  isLoading: boolean;
}

function AddItemModal({ onClose, onAdd, isLoading }: AddItemModalProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'>('MEDIUM');

  const handleSubmit = () => { if (title.trim()) onAdd(title.trim(), priority); };

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
            className={`tk-chip${priority === 'HIGH' || priority === 'URGENT' ? ' on' : ''}`}
            onClick={() => setPriority(p => (p === 'HIGH' ? 'MEDIUM' : 'HIGH'))}
          >
            <Icon name="flag" size={15} />
            {priority === 'URGENT' ? 'Urgente' : priority === 'HIGH' ? 'Alta' : 'Prioridade'}
          </div>
          <div className="tk-chip"><Icon name="tag" size={15} />Trabalho</div>
        </div>
        <div className="tk-modal-foot">
          <span className="tk-textbtn" onClick={onClose}>Cancelar</span>
          <button className="tk-primary" onClick={handleSubmit} disabled={isLoading || !title.trim()}>
            Adicionar tarefa
          </button>
        </div>
      </div>
    </div>
  );
}

const PRIORITY_LABEL: Record<string, string> = { HIGH: 'Alta', URGENT: 'Urgente', LOW: 'Baixa' };

const TASK_PARAMS = { type: 'TASK' };

export function TasksPage() {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const [showModal, setShowModal] = useState(false);
  const qc = useQueryClient();

  const { data: items = [], isLoading } = useItemsList(workspaceSlug!, TASK_PARAMS);

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: getItemsListQueryKey(workspaceSlug!, TASK_PARAMS) });

  const { mutate: createItem, isPending: isCreating } = useItemsCreate({
    mutation: {
      onSuccess: () => {
        invalidate();
        setShowModal(false);
      },
    },
  });
  const { mutate: updateItem } = useItemsUpdate({ mutation: { onSuccess: invalidate } });

  const open = items.filter((i) => i.status !== 'DONE' && i.status !== 'DISMISSED');
  const done = items.filter((i) => i.status === 'DONE');

  return (
    <div className="tk-main">
      <div className="tk-scroll">
        <div className="tk-content">
          <div className="tk-head">
            <div>
              <h1 className="tk-greet">Tarefas</h1>
              <div className="tk-date">
                {isLoading ? 'Carregando…' : `${open.length} abertas · ${done.length} concluídas`}
              </div>
            </div>
            <div className="tk-headtools">
              <div className="tk-iconbtn"><Icon name="search" size={19} /></div>
            </div>
          </div>

          <div style={{ marginTop: 44 }}>
            {open.length > 0 && (
              <div className="tk-group">
                <div className="tk-grouphead">
                  <h3>Hoje</h3>
                  <span className="when">
                    {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
                {open.map((item) => (
                  <div
                    key={item.id}
                    className="tk-task"
                    onClick={() =>
                      updateItem({
                        workspaceId: workspaceSlug!,
                        itemId: item.id,
                        data: { status: 'DONE' },
                      })
                    }
                  >
                    <div className="tk-check" />
                    <div className="label">{item.title}</div>
                    {item.priority !== 'MEDIUM' && PRIORITY_LABEL[item.priority] && (
                      <div className="tail">
                        <span className={`tk-chip-mini${item.priority === 'HIGH' || item.priority === 'URGENT' ? ' accent' : ''}`}>
                          <Icon name="flag" size={14} />{PRIORITY_LABEL[item.priority]}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {done.length > 0 && (
              <div className="tk-group">
                <div className="tk-grouphead">
                  <h3>Concluídas</h3>
                  <span className="when">hoje</span>
                </div>
                {done.map((item) => (
                  <div
                    key={item.id}
                    className="tk-task done"
                    onClick={() =>
                      updateItem({
                        workspaceId: workspaceSlug!,
                        itemId: item.id,
                        data: { status: 'OPEN' },
                      })
                    }
                  >
                    <div className="tk-check done">
                      <Icon name="check" size={14} stroke={2.4} />
                    </div>
                    <div className="label">{item.title}</div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && items.length === 0 && (
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
        <AddItemModal
          onClose={() => setShowModal(false)}
          onAdd={(title, priority) =>
            createItem({
              workspaceId: workspaceSlug!,
              data: { type: 'TASK', title, priority },
            })
          }
          isLoading={isCreating}
        />
      )}
    </div>
  );
}
