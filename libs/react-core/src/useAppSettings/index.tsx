'use client'

import { useRouter, usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useCallback } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { useGpuFeatures } from './useGpuFeatures'
import { clearAllSwrKeys } from '../utils'
import { useWorkflows } from '../workflows'
import { CurrencyId, CurrencyOption, currencyOptions } from './currency'

export type CurrencyDisplay = 'sc' | 'fiat' | 'bothPreferSc' | 'bothPreferFiat'

export type AppSettings = {
  api: string
  allowCustomApi: boolean
  siaCentral: boolean
  password?: string
  currency: CurrencyOption
  recentApis: {
    [api: string]: {
      lastUsed: number
    }
  }
  currencyDisplay: CurrencyDisplay
  autoLock?: boolean
  autoLockTimeout?: number
}

const defaultSettings: AppSettings = {
  api: '',
  allowCustomApi: false,
  siaCentral: true,
  password: undefined,
  currency: currencyOptions[0],
  currencyDisplay: 'bothPreferSc',
  recentApis: {},
  autoLock: false,
  autoLockTimeout: 1000 * 60 * 10, // 10 minutes
}

function getDefaultSettings(customDefaults?: Partial<AppSettings>) {
  return {
    ...defaultSettings,
    ...customDefaults,
  }
}

type Props = {
  children?: React.ReactNode
  passwordProtectRequestHooks?: boolean
  lockRoutes?: {
    home: string
    login: string
  }
  defaultSettings?: Partial<AppSettings>
}

function useAppSettingsMain({
  passwordProtectRequestHooks,
  lockRoutes,
  defaultSettings: overrideDefaultSettings,
}: Props) {
  const customDefaultSettings = useMemo(
    () => getDefaultSettings(overrideDefaultSettings),
    [overrideDefaultSettings]
  )
  const [_settings, _setSettings] = useLocalStorageState('v0/settings', {
    defaultValue: customDefaultSettings,
  })
  // Merge in defaults incase new settings have been introduced
  useEffect(() => {
    _setSettings((settings) => ({
      ...customDefaultSettings,
      ...settings,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const settings = useMemo(
    () => ({
      ...customDefaultSettings,
      ..._settings,
    }),
    [_settings, customDefaultSettings]
  )

  const { resetWorkflows } = useWorkflows()

  const setSettings = useCallback(
    (values: Partial<AppSettings>) => {
      _setSettings((s) => ({
        ...s,
        ...values,
      }))
    },
    [_setSettings]
  )

  const setCurrency = useCallback(
    (id: CurrencyId) => {
      const currency = currencyOptions.find((i) => i.id === id)
      if (currency) {
        setSettings({
          currency,
        })
      }
    },
    [setSettings]
  )

  const router = useRouter()
  const pathname = usePathname()
  // Arbirary callbacks can be registered at a unique key.
  const [onLockCallbacks, setOnLockCallbacks] = useState<
    Record<string, (() => void) | undefined>
  >({})
  const setOnLockCallback = useCallback(
    (key: string, callback: (() => void) | undefined) => {
      setOnLockCallbacks((cbs) => ({
        ...cbs,
        [key]: callback,
      }))
    },
    [setOnLockCallbacks]
  )
  const lock = useCallback(() => {
    if (lockRoutes) {
      router.push(
        `${lockRoutes.login}?prev=${getRouteToSaveAsPrev(pathname, lockRoutes)}`
      )
    }
    setSettings({ password: '' })
    resetWorkflows()
    clearAllSwrKeys()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, callback] of Object.entries(onLockCallbacks)) {
      if (callback) {
        callback()
      }
    }
  }, [
    router,
    lockRoutes,
    setSettings,
    resetWorkflows,
    onLockCallbacks,
    pathname,
  ])

  const isUnlocked = useMemo(() => !!settings.password, [settings])

  const gpu = useGpuFeatures()

  return {
    settings,
    setSettings,
    setCurrency,
    currencyOptions,
    gpu,
    lock,
    isUnlocked,
    passwordProtectRequestHooks,
    setOnLockCallback,
  }
}

type State = ReturnType<typeof useAppSettingsMain>

const SettingsContext = createContext({} as State)
export const useAppSettings = () => useContext(SettingsContext)

export function AppSettingsProvider({ children, ...props }: Props) {
  const state = useAppSettingsMain(props)
  return (
    <SettingsContext.Provider value={state}>
      {children}
    </SettingsContext.Provider>
  )
}

export function getRouteToSaveAsPrev(
  pathname: string,
  routes: { home: string; login: string }
) {
  if ([routes.login].includes(pathname)) {
    return routes.home
  }
  return pathname
}
