import { createContext, useContext, useEffect, useMemo } from 'react'
import { useCallback } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { clearAllSwrKeys } from './utils'
import { useWorkflows } from './workflows'

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

type Props = {
  children?: React.ReactNode
  ssr?: boolean
  passwordProtectRequestHooks?: boolean
}

function useAppSettingsMain({ ssr, passwordProtectRequestHooks }: Props) {
  const [settings, _setSettings] = useLocalStorageState('v0/settings', {
    ssr,
    defaultValue: defaultSettings,
  })
  const { resetWorkflows } = useWorkflows()

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
    resetWorkflows()
    clearAllSwrKeys()
  }, [setSettings, resetWorkflows])

  const isUnlocked = useMemo(() => !!settings.password, [settings])

  return {
    settings,
    setSettings,
    setCurrency,
    currencyOptions,
    lock,
    isUnlocked,
    passwordProtectRequestHooks,
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
