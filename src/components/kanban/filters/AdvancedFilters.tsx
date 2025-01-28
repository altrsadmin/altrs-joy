import { useState } from 'react'
import Select from 'react-select'
import { useI18n } from '../../../config/i18n'
import { Task, ServiceType } from '../../../types'
import { SERVICE_TYPES } from '../../../config/plans'

interface FilterState {
  priority: string[]
  labels: string[]
  assignee: string[]
  serviceType: ServiceType[]
  dateRange: {
    start: string
    end: string
  }
}

interface AdvancedFiltersProps {
  tasks: Task[]
  onFilterChange: (filters: FilterState) => void
}

export default function AdvancedFilters({ tasks, onFilterChange }: AdvancedFiltersProps) {
  const { t } = useI18n()
  const [filters, setFilters] = useState<FilterState>({
    priority: [],
    labels: [],
    assignee: [],
    serviceType: [],
    dateRange: {
      start: '',
      end: ''
    }
  })

  // Extrair opções únicas das tarefas
  const uniqueLabels = Array.from(new Set(tasks.flatMap(t => t.labels || [])))
  const uniqueAssignees = Array.from(new Set(tasks.map(t => t.assignee).filter(Boolean)))

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t('priority')}</label>
          <Select
            isMulti
            options={['low', 'medium', 'high', 'urgent'].map(p => ({ value: p, label: t(`priority${p}`) }))}
            onChange={(selected) => handleFilterChange({ 
              priority: selected.map(s => s.value) 
            })}
            className="text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('labels')}</label>
          <Select
            isMulti
            options={uniqueLabels.map(l => ({ value: l, label: l }))}
            onChange={(selected) => handleFilterChange({ 
              labels: selected.map(s => s.value) 
            })}
            className="text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('assignee')}</label>
          <Select
            isMulti
            options={uniqueAssignees.map(a => ({ value: a, label: a }))}
            onChange={(selected) => handleFilterChange({ 
              assignee: selected.map(s => s.value) 
            })}
            className="text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('serviceType')}</label>
          <Select
            isMulti
            options={Object.entries(SERVICE_TYPES).map(([key, label]) => ({
              value: key,
              label
            }))}
            onChange={(selected) => handleFilterChange({ 
              serviceType: selected.map(s => s.value) as ServiceType[]
            })}
            className="text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('startDate')}</label>
          <input
            type="date"
            className="input-field"
            value={filters.dateRange.start}
            onChange={(e) => handleFilterChange({
              dateRange: { ...filters.dateRange, start: e.target.value }
            })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('endDate')}</label>
          <input
            type="date"
            className="input-field"
            value={filters.dateRange.end}
            onChange={(e) => handleFilterChange({
              dateRange: { ...filters.dateRange, end: e.target.value }
            })}
          />
        </div>
      </div>
    </div>
  )
}
