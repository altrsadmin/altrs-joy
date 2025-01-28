import { MoreHorizontal, Plus } from 'lucide-react'
import { useI18n } from '../../config/i18n'

interface ColumnHeaderProps {
  title: string
  count: number
  onAddTask: () => void
}

export function ColumnHeader({ title, count, onAddTask }: ColumnHeaderProps) {
  const { t } = useI18n()

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500">({count})</span>
      </div>
      
      <div className="flex items-center gap-1">
        <button
          onClick={onAddTask}
          className="p-1 hover:bg-gray-100 rounded-md"
          title={t('addTask')}
        >
          <Plus size={16} />
        </button>
        
        <button
          className="p-1 hover:bg-gray-100 rounded-md"
          title={t('columnOptions')}
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  )
}
