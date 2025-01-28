import { Draggable } from 'react-beautiful-dnd'
import Task from './Task'
import { Task as TaskType } from '../types'

interface ColumnProps {
  tasks: TaskType[]
  columnId: string
}

export default function Column({ tasks, columnId }: ColumnProps) {
  return (
    <div className="space-y-2">
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Task task={task} columnId={columnId} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  )
}
