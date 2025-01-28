import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import useBoardStore from '../store/boardStore'
import { useI18n } from '../config/i18n'

const taskSchema = z.object({
  title: z.string().min(3, 'Título muito curto'),
  description: z.string().optional(),
  labels: z.array(z.string()).optional(),
  dueDate: z.date().optional()
})

export default function TaskModal({ isOpen, onClose, task }) {
  const { t } = useI18n()
  const { updateTask } = useBoardStore()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: task
  })

  const onSubmit = (data) => {
    updateTask(task.id, data)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{t('editTask')}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t('title')}</label>
            <input
              {...register('title')}
              className="input-field"
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
          </div>
          
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-500 hover:text-gray-700"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
