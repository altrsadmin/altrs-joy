import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useI18n } from '../../config/i18n'
import { TaskPriority, ServiceType } from '../../types'
import { SERVICE_TYPES } from '../../config/plans'

const taskSchema = z.object({
  title: z.string().min(3, 'Título muito curto'),
  description: z.string().min(10, 'Descrição muito curta'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  serviceType: z.enum(['branding', 'social_media', 'web_design', 'print', 'ui_ux']),
  dueDate: z.string().optional(),
  labels: z.array(z.string())
})

interface TaskFormProps {
  onSubmit: (data: z.infer<typeof taskSchema>) => void
  initialData?: z.infer<typeof taskSchema>
  projectServices: ServiceType[]
}

export default function TaskForm({ onSubmit, initialData, projectServices }: TaskFormProps) {
  const { t } = useI18n()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: initialData
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">
          {t('taskTitle')}
        </label>
        <input
          {...register('title')}
          className="input-field"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {t('taskDescription')}
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="input-field"
        />
        {errors.description && (
          <span className="text-red-500 text-sm">{errors.description.message}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {t('priority')}
        </label>
        <select {...register('priority')} className="input-field">
          <option value="low">{t('priorityLow')}</option>
          <option value="medium">{t('priorityMedium')}</option>
          <option value="high">{t('priorityHigh')}</option>
          <option value="urgent">{t('priorityUrgent')}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {t('serviceType')}
        </label>
        <select {...register('serviceType')} className="input-field">
          {projectServices.map((service) => (
            <option key={service} value={service}>
              {SERVICE_TYPES[service]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {t('dueDate')}
        </label>
        <input
          type="date"
          {...register('dueDate')}
          className="input-field"
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        {initialData ? t('updateTask') : t('createTask')}
      </button>
    </form>
  )
}
