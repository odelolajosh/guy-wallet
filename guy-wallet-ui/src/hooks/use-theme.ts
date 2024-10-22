import { create } from 'zustand'

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

interface ThemeState {
  theme: Theme,
  setTheme: (theme: Theme) => void,
}

export const useTheme = create<ThemeState>()((set) => ({
  theme: Theme.LIGHT,
  setTheme: (theme: Theme) => set({ theme }),
}));
