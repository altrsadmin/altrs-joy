import { ServicePlan, ServiceType } from '../types'

export const SERVICE_PLANS: Record<string, ServicePlan> = {
  basic: {
    name: 'Básico',
    maxWIP: 2,
    maxProjects: 3,
    services: ['social_media', 'print']
  },
  professional: {
    name: 'Profissional',
    maxWIP: 5,
    maxProjects: 8,
    services: ['social_media', 'print', 'web_design', 'branding']
  },
  enterprise: {
    name: 'Empresarial',
    maxWIP: 10,
    maxProjects: 15,
    services: ['social_media', 'print', 'web_design', 'branding', 'ui_ux']
  }
}

export const SERVICE_TYPES: Record<ServiceType, string> = {
  branding: 'Identidade Visual',
  social_media: 'Mídias Sociais',
  web_design: 'Design Web',
  print: 'Material Impresso',
  ui_ux: 'UI/UX Design'
}
