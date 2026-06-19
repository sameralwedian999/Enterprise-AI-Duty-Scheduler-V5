import React, { useEffect, useState } from 'react'
import LoginScreen from './components/Auth/LoginScreen'
import MainApp from './components/MainApp'
import { useAuthStore } from './stores/authStore'
import { useThemeStore } from './stores/themeStore'

function App() {
  const { isAuthenticated, initializeAuth } = useAuthStore()
  const { isDark } = useThemeStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeAuth()
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400 mx-auto mb-4"></div>
          <p className="text-white text-lg font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={isDark ? 'dark' : ''}>
      {isAuthenticated ? <MainApp /> : <LoginScreen />}
    </div>
  )
}

export default App
