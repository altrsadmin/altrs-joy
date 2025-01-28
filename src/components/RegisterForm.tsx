import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../config/i18n'

const schema = z.object({
  name: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  role: z.enum(['team', 'client'])
})

export default function RegisterForm() {
  const { t } = useI18n()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })
  const { register: registerUser } = useAuth()

  const onSubmit = (data) => {
    registerUser({
      id: crypto.randomUUID(),
      ...data
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>{t('name')}</label>
        <input
          {...register('name')}
          className="input-field"
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      </div>

      <div>
        <label>E-mail</label>
        <input
          type="email"
          {...register('email')}
          className="input-field"
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>

      <div>
        <label>Senha</label>
        <input
          type="password"
          {...register('password')}
          className="input-field"
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </div>

      <div>
        <label>Perfil</label>
        <select {...register('role')} className="input-field">
          <option value="team">Equipe</option>
          <option value="client">Cliente</option>
        </select>
      </div>

      <button type="submit" className="btn-primary">
        Cadastrar
      </button>
    </form>
  )
}
