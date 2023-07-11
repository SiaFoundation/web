import { NextRouter, useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useCallback } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { clearAllSwrKeys } from './utils'
import { useWorkflows } from './workflows'

export type CurrencyId =
  | 'usd'
  | 'cad'
  | 'eur'
  | 'gbp'
  | 'jpy'
  | 'aud'
  | 'cny'
  | 'rub'
  | 'btc'
  | 'eth'

export type CurrencyOption = {
  id: CurrencyId
  label: string
  prefix: string
  fixed: number
}

const currencyOptions: CurrencyOption[] = [
  {
    id: 'usd',
    label: 'USD',
    prefix: '$',
    fixed: 2,
  },
  {
    id: 'cad',
    label: 'CAD',
    prefix: '$',
    fixed: 2,
  },
  {
    id: 'eur',
    label: 'EUR',
    prefix: '€',
    fixed: 2,
  },
  {
    id: 'gbp',
    label: 'GBP',
    prefix: '£',
    fixed: 2,
  },
  {
    id: 'jpy',
    label: 'JPY',
    prefix: '¥',
    fixed: 2,
  },
  {
    id: 'aud',
    label: 'AUD',
    prefix: '$',
    fixed: 2,
  },
  {
    id: 'rub',
    label: 'RUB',
    prefix: '₽',
    fixed: 2,
  },
  {
    id: 'cny',
    label: 'CNY',
    prefix: '¥',
    fixed: 2,
  },
  {
    id: 'btc',
    label: 'BTC',
    prefix: '₿',
    fixed: 6,
  },
  {
    id: 'eth',
    label: 'ETH',
    prefix: 'Ξ',
    fixed: 6,
  },
]

export type AppSettings = {
  api: string
  allowCustomApi: boolean
  siaStats: boolean
  siaCentral: boolean
  password?: string
  currency: CurrencyOption
  recentApis: {
    [api: string]: {
      lastUsed: number
    }
  }
  autoLock?: boolean
  autoLockTimeout?: number
}

const defaultSettings: AppSettings = {
  api: '',
  allowCustomApi: false,
  siaStats: true,
  siaCentral: true,
  password: undefined,
  currency: currencyOptions[0],
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
  ssr?: boolean
  passwordProtectRequestHooks?: boolean
  lockRoutes?: {
    home: string
    login: string
  }
  defaultSettings?: Partial<AppSettings>
}

function useAppSettingsMain({
  ssr,
  passwordProtectRequestHooks,
  lockRoutes,
  defaultSettings: overrideDefaultSettings,
}: Props) {
  const customDefaultSettings = useMemo(
    () => getDefaultSettings(overrideDefaultSettings),
    [overrideDefaultSettings]
  )
  const [_settings, _setSettings] = useLocalStorageState('v0/settings', {
    ssr,
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
      router.push({
        pathname: lockRoutes.login,
        query: {
          prev: getRouteToSaveAsPrev(router, lockRoutes),
        },
      })
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
  }, [router, lockRoutes, setSettings, resetWorkflows, onLockCallbacks])

  const isUnlocked = useMemo(() => !!settings.password, [settings])

  return {
    settings,
    setSettings,
    setCurrency,
    currencyOptions,
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
  router: NextRouter,
  routes: { home: string; login: string }
) {
  if ([routes.login].includes(router.asPath)) {
    return routes.home
  }
  return router.asPath
}
