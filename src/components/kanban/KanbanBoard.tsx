import { useState } from 'react'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { Plus, MoreHorizontal } from 'lucide-react'
import { useProjects } from '../../hooks/useProjects'
import { useI18n } from '../../config/i18n'
import KanbanColumn from './KanbanColumn'
import { TaskDialog } from './TaskDialog'
import { ColumnHeader } from './ColumnHeader'
import { Task, TaskStatus } from '../../types'

const COLUMN_COLORS = {
  backlog: 'bg-gray-100',
  in_progress: 'bg-blue-50',
  review: 'bg-purple-50',
  client_review: 'bg-yellow-50',
  done: 'bg-green-50'
}

export default function KanbanBoard({ projectId }: { projectId: string }) {
  const { t } = useI18n()
  const { projects, updateTask } = useProjects()
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [selectedColumn, setSelectedColumn] = useState<TaskStatus | null>(null)

  const project = projects.find(p => p.id === projectId)
  if (!project) return null

  const columns: Record<TaskStatus, Task[]> = {
    backlog: [],
    in_progress: [],
    review: [],
    client_review: [],
    done: []
  }

  // Organizar tarefas nas colunas
  project.tasks.forEach(task => {
    columns[task.status].push(task)
  })

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const task = project.tasks.find(t => t.id === draggableId)
    if (!task) return

    updateTask(projectId, draggableId, {
      ...task,
      status: destination.droppableId as TaskStatus
    })
  }

  return (
    <div className="h-full min-h-screen bg-white">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 p-4 overflow-x-auto">
          {Object.entries(columns).map(([status, tasks]) => (
            <div key={status} className="flex-shrink-0 w-80">
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`rounded-lg ${COLUMN_COLORS[status as TaskStatus]} p-4`}
                  >
                    <ColumnHeader
                      title={t(`status.${status}`)}
                      count={tasks.length}
                      onAddTask={() => {
                        setSelectedColumn(status as TaskStatus)
                        setIsTaskDialogOpen(true)
                      }}
                    />
                    
                    <KanbanColumn
                      tasks={tasks}
                      projectId={projectId}
                    />
                    
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <TaskDialog
        isOpen={isTaskDialogOpen}
        onClose={() => setIsTaskDialogOpen(false)}
        projectId={projectId}
        initialStatus={selectedColumn}
      />
    </div>
  )
}
