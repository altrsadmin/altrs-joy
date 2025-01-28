import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Project, Task, ServicePlan } from '../types'
import { SERVICE_PLANS } from '../config/plans'

interface ProjectStore {
  projects: Project[]
  addProject: (project: Omit<Project, 'id'>) => string
  updateProject: (id: string, updates: Partial<Project>) => void
  addTask: (projectId: string, task: Omit<Task, 'id'>) => string
  updateTask: (projectId: string, taskId: string, updates: Partial<Task>) => void
  canAddTask: (clientId: string) => boolean
  getClientWIPCount: (clientId: string) => number
}

export const useProjects = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],
      
      addProject: (project) => {
        const id = crypto.randomUUID()
        set((state) => ({
          projects: [...state.projects, { ...project, id }]
        }))
        return id
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          )
        }))
      },

      addTask: (projectId, task) => {
        const id = crypto.randomUUID()
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? { ...p, tasks: [...p.tasks, { ...task, id }] }
              : p
          )
        }))
        return id
      },

      updateTask: (projectId, taskId, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  tasks: p.tasks.map((t) =>
                    t.id === taskId ? { ...t, ...updates } : t
                  )
                }
              : p
          )
        }))
      },

      canAddTask: (clientId) => {
        const state = get()
        const wipCount = state.getClientWIPCount(clientId)
        const client = JSON.parse(localStorage.getItem('clients') || '[]')
          .find((c: any) => c.id === clientId)
        
        if (!client) return false
        
        const plan = SERVICE_PLANS[client.plan.name.toLowerCase()]
        return wipCount < plan.maxWIP
      },

      getClientWIPCount: (clientId) => {
        const state = get()
        return state.projects
          .filter((p) => p.clientId === clientId)
          .reduce((count, project) => {
            return count + project.tasks.filter((t) => 
              t.status === 'in_progress' || t.status === 'review'
            ).length
          }, 0)
      }
    }),
    {
      name: 'projects-storage'
    }
  )
)
