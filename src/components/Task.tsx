import { useState } from 'react'
import { Task as TaskType } from '../types'
import TaskModal from './TaskModal'

interface TaskProps {
  task: TaskType
  columnId: string
}

export default function Task({ task, columnId }: TaskProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-white p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors cursor-pointer"
      >
        <h3 className="font-medium mb-2">{task.title}</h3>
        {task.labels && task.labels.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {task.labels.map((label) => (
              <span
                key={label}
                className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          task={task}
          columnId={columnId}
        />
      )}
    </>
  )
}
