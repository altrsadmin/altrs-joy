import { useMemo } from 'react'
import { format, differenceInDays } from 'date-fns'
import { Task } from '../../../types'

interface TaskTimelineProps {
  tasks: Task[]
}

export default function TaskTimeline({ tasks }: TaskTimelineProps) {
  const timelineData = useMemo(() => {
    return tasks
      .filter(task => task.dueDate)
      .map(task => ({
        ...task,
        timeInColumn: differenceInDays(
          new Date(),
          new Date(task.createdAt)
        )
      }))
      .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
  }, [tasks])

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        {timelineData.map(task => (
          <div
            key={task.id}
            className="flex items-center py-2 border-b"
          >
            <div className="w-1/4">
              <h4 className="font-medium">{task.title}</h4>
              <span className="text-sm text-gray-500">
                {format(new Date(task.dueDate!), 'dd/MM/yyyy')}
              </span>
            </div>
            
            <div className="w-3/4 relative h-6">
              <div
                className="absolute h-4 rounded-full bg-primary"
                style={{
                  left: `${(task.timeInColumn / 30) * 100}%`,
                  width: '8px'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
