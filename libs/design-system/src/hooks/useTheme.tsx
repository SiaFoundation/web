import React, { createContext, useContext } from 'react'
import { useCallback, useEffect } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { darkTheme } from '../config/theme'

type ThemeMode = 'dark' | 'light'

type State = {
  toggleTheme: () => void
  theme: ThemeMode
}

const ThemeContext = createContext({} as State)
export const useTheme = () => useContext(ThemeContext)

type Props = {
  children: React.ReactNode
}

export function ThemeProvider({ children }: Props) {
  const [themeConfig, setThemeConfig] = useLocalStorageState('v0/themeConfig', {
    theme: 'dark-theme',
  })

  useEffect(() => {
    document.body.className = ''
    document.body.classList.add(
      themeConfig.theme === 'theme-default' ? 'theme-default' : darkTheme
    )
  }, [themeConfig])

  const toggleTheme = useCallback(() => {
    setThemeConfig({
      theme:
        themeConfig.theme === 'theme-default' ? 'dark-theme' : 'theme-default',
    })
  }, [themeConfig, setThemeConfig])

  const value = {
    toggleTheme,
    theme: themeConfig.theme === 'dark-theme' ? 'dark' : 'light',
  } as State

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
