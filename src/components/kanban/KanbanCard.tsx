import { useState } from 'react'
import { Clock, MessageSquare, Paperclip, User } from 'lucide-react'
import { Task } from '../../types'
import { TaskDialog } from './TaskDialog'
import { formatDate } from '../../utils/date'
import { getPriorityColor } from '../../utils/priority'

interface KanbanCardProps {
  task: Task
  projectId: string
}

export default function KanbanCard({ task, projectId }: KanbanCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const priorityColor = getPriorityColor(task.priority)

  return (
    <>
      <div
        onClick={() => setIsDialogOpen(true)}
        className="bg-white rounded-lg shadow-sm p-3 cursor-pointer hover:shadow-md transition-shadow"
      >
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-gray-900">{task.title}</h3>
          <span
            className={`px-2 py-1 rounded-full text-xs ${priorityColor}`}
          >
            {task.priority}
          </span>
        </div>

        {task.description && (
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-4 mt-3 text-gray-400">
          {task.assignee && (
            <div className="flex items-center gap-1">
              <User size={14} />
              <span className="text-xs">{task.assignee}</span>
            </div>
          )}
          
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span className="text-xs">{formatDate(task.dueDate)}</span>
            </div>
          )}

          {task.comments?.length > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare size={14} />
              <span className="text-xs">{task.comments.length}</span>
            </div>
          )}

          {task.attachments?.length > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip size={14} />
              <span className="text-xs">{task.attachments.length}</span>
            </div>
          )}
        </div>

        {task.labels?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {task.labels.map(label => (
              <span
                key={label}
                className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      <TaskDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        projectId={projectId}
        taskId={task.id}
      />
    </>
  )
}
