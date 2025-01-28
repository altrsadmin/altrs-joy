import { useMemo } from 'react'
import { differenceInDays } from 'date-fns'
import { Task, TaskStatus } from '../../../types'
import { useI18n } from '../../../config/i18n'

interface ColumnMetricsProps {
  tasks: Task[]
  status: TaskStatus
}

export default function ColumnMetrics({ tasks, status }: ColumnMetricsProps) {
  const { t } = useI18n()

  const metrics = useMemo(() => {
    const columnTasks = tasks.filter(t => t.status === status)
    const totalTasks = columnTasks.length
    
    if (totalTasks === 0) return null

    const avgTimeInColumn = columnTasks.reduce((acc, task) => {
      return acc + differenceInDays(
        new Date(),
        new Date(task.updatedAt)
      )
    }, 0) / totalTasks

    return {
      totalTasks,
      avgTimeInColumn: Math.round(avgTimeInColumn),
      oldestTask: Math.max(...columnTasks.map(t => 
        differenceInDays(new Date(), new Date(t.updatedAt))
      ))
    }
  }, [tasks, status])

  if (!metrics) return null

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-medium mb-2">{t(`status.${status}`)}</h3>
      <div className="space-y-2 text-sm">
        <p>
          {t('totalTasks')}: <span className="font-medium">{metrics.totalTasks}</span>
        </p>
        <p>
          {t('avgTimeInColumn')}: <span className="font-medium">{metrics.avgTimeInColumn} {t('days')}</span>
        </p>
        <p>
          {t('oldestTask')}: <span className="font-medium">{metrics.oldestTask} {t('days')}</span>
        </p>
      </div>
    </div>
  )
}
