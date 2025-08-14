import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, LoginCredentials, RegisterCredentials } from '../types'
import { validateEmail } from '../utils'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  register: (credentials: RegisterCredentials) => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      if (!validateEmail(credentials.email)) {
        throw new Error('Invalid email format')
      }
      
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        firstName: 'John',
        lastName: 'Doe',
        roles: ['CUSTOMER']
      }
      
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const register = async (credentials: RegisterCredentials) => {
    try {
      if (!validateEmail(credentials.email)) {
        throw new Error('Invalid email format')
      }
      
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        roles: ['CUSTOMER']
      }
      
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (user) {
        const updatedUser = { ...user, ...data }
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }
    } catch (error) {
      console.error('Profile update error:', error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
