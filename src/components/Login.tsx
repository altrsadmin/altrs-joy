import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../config/i18n'

const mockUsers = [
  { 
    email: 'equipe@agencia.com', 
    password: '123456', 
    role: 'team' as const, 
    name: 'Membro da Equipe' 
  },
  { 
    email: 'cliente@empresa.com', 
    password: '123456', 
    role: 'client' as const, 
    name: 'Cliente Exemplo' 
  }
]

export default function Login() {
  const { t } = useI18n()
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (user) {
    return <Navigate to="/" replace />
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const foundUser = mockUsers.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      const { password: _, ...userData } = foundUser
      login(userData)
      navigate('/')
    } else {
      setError(t('loginError'))
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-card max-w-md w-full">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          {t('welcome')}
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t('password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            {t('login')}
          </button>
        </form>
      </div>
    </div>
  )
}
