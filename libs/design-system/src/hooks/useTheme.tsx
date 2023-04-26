import React, { createContext, useContext, useState } from 'react'
import { useCallback, useEffect } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip'

const darkThemeClass = 'dark'

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
  ssr?: boolean
}

type ThemeConfig = {
  theme: Theme
  mode: Mode
}

const defaultConfig: ThemeConfig = {
  theme: 'dark',
  mode: 'system',
}

export function ThemeProvider({ children, ssr }: Props) {
  const [themeConfig, setThemeConfig] = useLocalStorageState('v0/themeConfig', {
    ssr,
    defaultValue: defaultConfig,
  })

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
    if (themeConfig.theme === 'dark') {
      document.body.classList.add(darkThemeClass)
    }
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

  const [activeTheme, setActiveTheme] = useState<Theme>(themeConfig.theme)
  const [activeMode, setActiveMode] = useState<Mode>(themeConfig.mode)

  useEffect(() => {
    setActiveTheme(themeConfig.theme)
    setActiveMode(themeConfig.mode)
  }, [themeConfig])

  const value = {
    toggleTheme,
    setTheme,
    setMode,
    activeTheme,
    activeMode,
  } as State

  return (
    <ThemeContext.Provider value={value}>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeContext.Provider>
  )
}
