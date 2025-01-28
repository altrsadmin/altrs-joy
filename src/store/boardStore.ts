import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { generateId } from '../utils/id'
import { Task, Column } from '../types'

export interface BoardState {
  columns: Column[]
  updateTaskStatus: (taskId: string, fromColumnId: string, toColumnId: string) => void
  addColumn: (titleKey: string) => void
  updateTask: (taskId: string, updates: Partial<Task>) => void
  createTask: (columnId: string, task: Omit<Task, 'id'>) => void
}

export const useBoardStore = create<BoardState>()(
  persist(
    immer((set) => ({
      columns: [
        {
          id: generateId(),
          titleKey: 'backlog',
          tasks: [
            {
              id: generateId(),
              title: 'Criar campanha de verão',
              labels: ['mídia', 'design']
            }
          ]
        },
        {
          id: generateId(),
          titleKey: 'inProgress',
          tasks: []
        },
        {
          id: generateId(),
          titleKey: 'review',
          tasks: []
        },
        {
          id: generateId(),
          titleKey: 'done',
          tasks: []
        }
      ],
      updateTaskStatus: (taskId, fromColumnId, toColumnId) => {
        set((state) => {
          const fromColumn = state.columns.find(c => c.id === fromColumnId)
          const toColumn = state.columns.find(c => c.id === toColumnId)
          const taskIndex = fromColumn?.tasks.findIndex(t => t.id === taskId) ?? -1
          
          if (taskIndex > -1 && fromColumn && toColumn) {
            const [task] = fromColumn.tasks.splice(taskIndex, 1)
            toColumn.tasks.push(task)
          }
        })
      },
      addColumn: (titleKey) => {
        set((state) => {
          state.columns.push({
            id: generateId(),
            titleKey,
            tasks: []
          })
        })
      },
      updateTask: (taskId, updates) => {
        set((state) => {
          for (const column of state.columns) {
            const task = column.tasks.find(t => t.id === taskId)
            if (task) {
              Object.assign(task, updates)
              break
            }
          }
        })
      },
      createTask: (columnId, task) => {
        set((state) => {
          const column = state.columns.find(c => c.id === columnId)
          if (column) {
            column.tasks.push({
              id: generateId(),
              ...task
            })
          }
        })
      }
    })),
    {
      name: 'board-storage',
      getStorage: () => localStorage
    }
  )
)

// Adicionar esta linha para garantir a exportação
export default useBoardStore
