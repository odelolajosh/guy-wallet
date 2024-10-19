/* eslint-disable react-refresh/only-export-components */
import { Theme, useTheme } from '@/hooks/use-theme'
import { useState, useEffect } from 'react'

export type ColorScheme = Theme.LIGHT | Theme.DARK

export default function usePreferredColorScheme(defaultScheme: ColorScheme = Theme.LIGHT): ColorScheme {
  const [scheme, setScheme] = useState(defaultScheme)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => setScheme(mediaQuery.matches ? Theme.DARK : Theme.LIGHT)
    listener()
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  return scheme
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme()
  const preferredColorScheme = usePreferredColorScheme(Theme.LIGHT)

  useEffect(() => {
    const colorScheme = theme === Theme.SYSTEM ? preferredColorScheme : theme
    if (colorScheme === Theme.DARK) {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
    }
  }, [theme, preferredColorScheme])

  return <>{children}</>
}