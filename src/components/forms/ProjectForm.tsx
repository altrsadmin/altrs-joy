import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useI18n } from '../../config/i18n'
import { SERVICE_TYPES } from '../../config/plans'
import { ServiceType } from '../../types'

const projectSchema = z.object({
  title: z.string().min(3, 'Título muito curto'),
  description: z.string().min(10, 'Descrição muito curta'),
  serviceType: z.array(z.enum(['branding', 'social_media', 'web_design', 'print', 'ui_ux'])),
  startDate: z.string(),
  endDate: z.string().optional()
})

interface ProjectFormProps {
  onSubmit: (data: z.infer<typeof projectSchema>) => void
  initialData?: z.infer<typeof projectSchema>
  clientPlan?: string
}

export default function ProjectForm({ onSubmit, initialData, clientPlan }: ProjectFormProps) {
  const { t } = useI18n()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">
          {t('projectTitle')}
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
          {t('projectDescription')}
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
          {t('serviceTypes')}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(SERVICE_TYPES).map(([key, label]) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={key}
                {...register('serviceType')}
                className="rounded border-gray-300"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('startDate')}
          </label>
          <input
            type="date"
            {...register('startDate')}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t('endDate')}
          </label>
          <input
            type="date"
            {...register('endDate')}
            className="input-field"
          />
        </div>
      </div>

      <button type="submit" className="btn-primary w-full">
        {initialData ? t('updateProject') : t('createProject')}
      </button>
    </form>
  )
}
