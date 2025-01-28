import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../config/i18n'
import Toolbar from './Toolbar'
import Board from './Board'
import LanguageSelector from './LanguageSelector'

export default function MainContent() {
  const { user, logout } = useAuth()
  const { t } = useI18n()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">{t('welcome')}</h1>
        <div className="flex gap-4 items-center">
          <LanguageSelector />
          <span className="text-secondary">Olá, {user.name}</span>
          <button
            onClick={logout}
            className="px-4 py-2 text-red-500 hover:text-red-700"
          >
            {t('logout')}
          </button>
        </div>
      </div>
      
      <Toolbar />
      <Board />
    </div>
  )
}
