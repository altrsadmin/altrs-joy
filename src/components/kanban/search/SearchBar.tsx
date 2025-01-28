import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useI18n } from '../../../config/i18n'
import { Task } from '../../../types'

interface SearchBarProps {
  tasks: Task[]
  onSearchResults: (results: Task[]) => void
}

export default function SearchBar({ tasks, onSearchResults }: SearchBarProps) {
  const { t } = useI18n()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const results = tasks.filter(task => {
      const searchFields = [
        task.title,
        task.description,
        task.assignee,
        ...(task.labels || []),
        task.serviceType
      ].map(field => field?.toLowerCase())

      return searchFields.some(field => 
        field?.includes(searchTerm.toLowerCase())
      )
    })

    onSearchResults(results)
  }, [searchTerm, tasks])

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="text"
        placeholder={t('searchTasks')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
      />
    </div>
  )
}
