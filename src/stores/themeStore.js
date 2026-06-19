import { create } from 'zustand'

const useThemeStore = create((set) => ({
  isDark: false,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
  setTheme: (isDark) => set({ isDark }),
}))

export { useThemeStore }
