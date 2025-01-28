import { nanoid } from 'uuid'
import { Task, Column } from '../types'

const API_DELAY = 500

const mockDB = {
  columns: JSON.parse(localStorage.getItem('board-storage') || '{}')?.state?.columns || []
}

export const fetchColumns = () => 
  new Promise<Column[]>(resolve => 
    setTimeout(() => resolve(mockDB.columns), API_DELAY)
  )

export const createTask = (columnId: string, task: Omit<Task, 'id'>) => 
  new Promise<Task>(resolve => {
    const newTask = { ...task, id: nanoid() }
    setTimeout(() => {
      const column = mockDB.columns.find(c => c.id === columnId)
      if (column) column.tasks.push(newTask)
      resolve(newTask)
    }, API_DELAY)
  })
