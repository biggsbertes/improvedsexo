import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      
      login: async (username: string, password: string) => {
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          })
          if (res.ok) {
            set({ isAuthenticated: true })
            return true
          }
        } catch {}
        return false
      },
      
      logout: () => set({ isAuthenticated: false })
    }),
    {
      name: 'auth-storage'
    }
  )
)