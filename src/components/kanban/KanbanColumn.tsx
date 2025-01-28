import { Draggable } from '@hello-pangea/dnd'
import { Task } from '../../types'
import KanbanCard from './KanbanCard'

interface KanbanColumnProps {
  tasks: Task[]
  projectId: string
}

export default function KanbanColumn({ tasks, projectId }: KanbanColumnProps) {
  return (
    <div className="space-y-2 mt-2">
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`${snapshot.isDragging ? 'rotate-3' : ''}`}
            >
              <KanbanCard task={task} projectId={projectId} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  )
}
