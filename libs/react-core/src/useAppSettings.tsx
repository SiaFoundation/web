import React, { createContext, useContext, useEffect, useMemo } from 'react'
import { useCallback } from 'react'
import useLocalStorageState from 'use-local-storage-state'

export type CurrencyId = 'usd' | 'eur' | 'gbp' | 'jpy' | 'btc' | 'eth'

type CurrencyOption = {
  id: CurrencyId
  label: string
  prefix: string
}

const currencyOptions: CurrencyOption[] = [
  {
    id: 'usd',
    label: 'USD',
    prefix: '$',
  },
  {
    id: 'eur',
    label: 'EUR',
    prefix: '€',
  },
  {
    id: 'gbp',
    label: 'GBP',
    prefix: '£',
  },
  {
    id: 'jpy',
    label: 'JPY',
    prefix: '¥',
  },
  {
    id: 'btc',
    label: 'BTC',
    prefix: '₿',
  },
  {
    id: 'eth',
    label: 'ETH',
    prefix: 'Ξ',
  },
]

export type AppSettings = {
  siaStats: boolean
  siaCentral: boolean
  api: string
  password?: string
  currency: CurrencyOption
  recentApis: {
    [api: string]: {
      lastUsed: number
    }
  }
}

const defaultSettings: AppSettings = {
  api: '',
  siaStats: true,
  siaCentral: true,
  password: undefined,
  currency: currencyOptions[0],
  recentApis: {},
}

type State = {
  settings: AppSettings
  currencyOptions: CurrencyOption[]
  setCurrency: (id: CurrencyId) => void
  setSettings: (settings: Partial<AppSettings>) => void
  lock: () => void
  isUnlocked: boolean
}

const SettingsContext = createContext({} as State)
export const useAppSettings = () => useContext(SettingsContext)

type Props = {
  children: React.ReactNode
  ssr?: boolean
}

export function AppSettingsProvider({ children, ssr }: Props) {
  const [settings, _setSettings] = useLocalStorageState('v0/settings', {
    ssr,
    defaultValue: defaultSettings,
  })

  // Merge in defaults incase new settings have been introduced
  useEffect(() => {
    _setSettings((settings) => ({
      ...defaultSettings,
      ...settings,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const lock = useCallback(() => {
    setSettings({ password: '' })
  }, [setSettings])

  const isUnlocked = useMemo(() => !!settings.password, [settings])

  const value = {
    settings,
    setSettings,
    setCurrency,
    currencyOptions,
    lock,
    isUnlocked,
  } as State

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}
