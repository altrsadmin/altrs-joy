import useBoardStore from '../store/boardStore'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../config/i18n'

export default function Toolbar() {
  const { t } = useI18n()
  const { addColumn } = useBoardStore()
  const { hasPermission } = useAuth()
  
  return (
    <div className="mb-4 flex gap-4 items-center">
      {hasPermission('team') && (
        <button
          onClick={() => addColumn('newColumn')}
          className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/90"
        >
          + {t('newColumn')}
        </button>
      )}
    </div>
  )
}
