import React, { createContext, useContext, useState, ReactNode } from 'react'
import { generateId } from '../utils/id'

type User = {
  id: string
  name: string
  email: string
  role: 'team' | 'client'
}

interface AuthContextType {
  user: User | null
  login: (userData: Omit<User, 'id'>) => void
  logout: () => void
  hasPermission: (role: User['role']) => boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = (userData: Omit<User, 'id'>) => {
    const newUser = { ...userData, id: generateId() }
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const hasPermission = (role: User['role']) => user?.role === role

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
