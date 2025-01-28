import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import Column from './Column'
import { useBoardStore } from '../store/boardStore'
import { useI18n } from '../config/i18n'

export default function Board() {
  const { t } = useI18n()
  const { columns, updateTaskStatus } = useBoardStore()

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    updateTaskStatus(draggableId, source.droppableId, destination.droppableId)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="min-w-72 bg-white rounded-lg p-4 shadow-card"
              >
                <h2 className="text-lg font-semibold mb-4 text-secondary">
                  {t(column.titleKey)}
                </h2>
                <Column tasks={column.tasks} columnId={column.id} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}
