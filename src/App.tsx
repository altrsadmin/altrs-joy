import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { I18nProvider } from './config/i18n'
import Login from './components/Login'
import MainContent from './components/MainContent'

export default function App() {
  return (
    <I18nProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainContent />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </I18nProvider>
  )
}
