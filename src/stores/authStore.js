import { create } from 'zustand'

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  hasSetupAuth: false,

  initializeAuth: () => {
    const stored = localStorage.getItem('auth_credentials')
    if (stored) {
      set({ hasSetupAuth: true })
    }
  },

  setupInitialAuth: (username, password, securityHint) => {
    const credentials = {
      username: btoa(username),
      password: btoa(password),
      securityHint: btoa(securityHint),
    }
    localStorage.setItem('auth_credentials', JSON.stringify(credentials))
    set({ hasSetupAuth: true, user: { username }, isAuthenticated: true })
  },

  login: (username, password) => {
    const stored = localStorage.getItem('auth_credentials')
    if (stored) {
      const credentials = JSON.parse(stored)
      if (
        atob(credentials.username) === username &&
        atob(credentials.password) === password
      ) {
        set({ isAuthenticated: true, user: { username } })
        return true
      }
    }
    return false
  },

  logout: () => {
    set({ isAuthenticated: false, user: null })
  },

  verifySecurityHint: (hint) => {
    const stored = localStorage.getItem('auth_credentials')
    if (stored) {
      const credentials = JSON.parse(stored)
      return atob(credentials.securityHint) === hint
    }
    return false
  },

  updateCredentials: (newUsername, newPassword) => {
    const stored = localStorage.getItem('auth_credentials')
    if (stored) {
      const credentials = JSON.parse(stored)
      credentials.username = btoa(newUsername)
      credentials.password = btoa(newPassword)
      localStorage.setItem('auth_credentials', JSON.stringify(credentials))
      set({ user: { username: newUsername } })
      return true
    }
    return false
  },

  updateSecurityHint: (newHint) => {
    const stored = localStorage.getItem('auth_credentials')
    if (stored) {
      const credentials = JSON.parse(stored)
      credentials.securityHint = btoa(newHint)
      localStorage.setItem('auth_credentials', JSON.stringify(credentials))
      return true
    }
    return false
  },
}))

export { useAuthStore }
