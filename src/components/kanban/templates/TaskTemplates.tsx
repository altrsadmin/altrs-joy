import { useState } from 'react'
import { useI18n } from '../../../config/i18n'
import { Task, ServiceType } from '../../../types'

interface TaskTemplate {
  id: string
  name: string
  template: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
}

const DEFAULT_TEMPLATES: TaskTemplate[] = [
  {
    id: '1',
    name: 'Post para Redes Sociais',
    template: {
      title: 'Post - [Rede Social]',
      description: '- Briefing\n- Referências\n- Design\n- Copy\n- Revisão',
      priority: 'medium',
      status: 'backlog',
      serviceType: 'social_media',
      labels: ['social', 'design'],
      attachments: [],
      comments: []
    }
  },
  {
    id: '2',
    name: 'Design de Logo',
    template: {
      title: 'Logo - [Nome do Cliente]',
      description: '- Briefing\n- Pesquisa\n- Rascunhos\n- Vetorização\n- Apresentação',
      priority: 'high',
      status: 'backlog',
      serviceType: 'branding',
      labels: ['branding', 'logo'],
      attachments: [],
      comments: []
    }
  }
]

interface TaskTemplatesProps {
  onSelectTemplate: (template: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void
}

export default function TaskTemplates({ onSelectTemplate }: TaskTemplatesProps) {
  const { t } = useI18n()
  const [templates, setTemplates] = useState<TaskTemplate[]>(DEFAULT_TEMPLATES)

  return (
    <div className="space-y-4">
      <h3 className="font-medium">{t('taskTemplates')}</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {templates.map(template => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.template)}
            className="p-4 border rounded-lg hover:border-primary text-left"
          >
            <h4 className="font-medium">{template.name}</h4>
            <p className="text-sm text-gray-500 mt-1">
              {template.template.description.split('\n')[0]}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
