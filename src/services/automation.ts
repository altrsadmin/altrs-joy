import { Task, TaskStatus } from '../types'

type AutomationRule = {
  id: string
  condition: (task: Task) => boolean
  action: (task: Task) => Partial<Task>
}

export class AutomationService {
  private rules: AutomationRule[] = [
    {
      id: 'urgent-priority',
      condition: (task) => task.priority === 'urgent',
      action: (task) => ({
        labels: [...(task.labels || []), 'urgent']
      })
    },
    {
      id: 'client-review-notification',
      condition: (task) => task.status === 'client_review',
      action: (task) => {
        // Simular envio de notificação
        console.log(`Notificação: Tarefa "${task.title}" aguardando aprovação do cliente`)
        return task
      }
    },
    {
      id: 'overdue-task',
      condition: (task) => {
        if (!task.dueDate) return false
        return new Date(task.dueDate) < new Date()
      },
      action: (task) => ({
        labels: [...(task.labels || []), 'atrasado'],
        priority: 'urgent'
      })
    }
  ]

  processTask(task: Task): Task {
    let updatedTask = { ...task }

    this.rules.forEach(rule => {
      if (rule.condition(updatedTask)) {
        updatedTask = {
          ...updatedTask,
          ...rule.action(updatedTask)
        }
      }
    })

    return updatedTask
  }

  addRule(rule: AutomationRule) {
    this.rules.push(rule)
  }
}

export const automationService = new AutomationService()
