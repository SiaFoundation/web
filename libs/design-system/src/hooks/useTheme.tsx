import React, { createContext, useContext } from 'react'
import { useCallback, useEffect } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { useGlobalStyles } from '../config/css'
import { darkTheme } from '../config/theme'

const lightTheme = 'theme-default'

type Theme = 'dark' | 'light'
type Mode = 'user' | 'system'

type State = {
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  setMode: (mode: Mode) => void
  activeTheme: Theme
  activeMode: Mode
}

const ThemeContext = createContext({} as State)
export const useTheme = () => useContext(ThemeContext)

type Props = {
  children: React.ReactNode
}

type ThemeConfig = {
  theme: Theme
  mode: Mode
}

const defaultConfig: ThemeConfig = {
  theme: 'light',
  mode: 'user',
}

export function ThemeProvider({ children }: Props) {
  useGlobalStyles()

  const [themeConfig, setThemeConfig] = useLocalStorageState<ThemeConfig>(
    'v0/themeConfig',
    defaultConfig
  )

  const setTheme = useCallback(
    (theme: Theme) => {
      setThemeConfig((state) => ({
        ...state,
        theme,
      }))
    },
    [setThemeConfig]
  )

  const setMode = useCallback(
    (mode: Mode) => {
      setThemeConfig((state) => ({
        ...state,
        mode,
      }))

      if (mode === 'system') {
        const media = window.matchMedia('(prefers-color-scheme: dark)')
        if (media.matches) {
          setTheme('dark')
        } else {
          setTheme('light')
        }
      }
    },
    [setThemeConfig, setTheme]
  )

  const toggleTheme = useCallback(() => {
    setThemeConfig((state) => ({
      ...state,
      theme: state.theme === 'light' ? 'dark' : 'light',
    }))
  }, [setThemeConfig])

  useEffect(() => {
    document.body.className = ''
    document.body.classList.add(
      themeConfig.theme === 'light' ? lightTheme : darkTheme
    )
  }, [themeConfig])

  useEffect(() => {
    if (themeConfig.mode !== 'system') {
      return
    }

    const changeTheme = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setTheme('dark')
      } else {
        setTheme('light')
      }
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', changeTheme)

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', changeTheme)
    }
  }, [themeConfig, setTheme])

  const value = {
    toggleTheme,
    setTheme,
    setMode,
    activeTheme: themeConfig.theme,
    activeMode: themeConfig.mode,
  } as State

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
