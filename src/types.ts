export type UserRole = 'admin' | 'team' | 'client'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TaskStatus = 'backlog' | 'in_progress' | 'review' | 'client_review' | 'done'
export type ServiceType = 'branding' | 'social_media' | 'web_design' | 'print' | 'ui_ux'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export interface Client extends User {
  role: 'client'
  company: string
  plan: ServicePlan
  activeProjects: number
}

export interface ServicePlan {
  name: string
  maxWIP: number // Máximo de trabalhos em andamento
  maxProjects: number
  services: ServiceType[]
}

export interface Task {
  id: string
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  assignee?: string
  clientId: string
  projectId: string
  dueDate?: string
  attachments: Attachment[]
  comments: Comment[]
  labels: string[]
  serviceType: ServiceType
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  title: string
  clientId: string
  description: string
  status: 'active' | 'completed' | 'archived'
  startDate: string
  endDate?: string
  tasks: Task[]
  serviceType: ServiceType[]
}

export interface Comment {
  id: string
  userId: string
  content: string
  createdAt: string
  attachments?: Attachment[]
}

export interface Attachment {
  id: string
  name: string
  url: string
  type: string
  size: number
}

export interface Webhook {
  id: string
  url: string
  events: string[]
  active: boolean
}
