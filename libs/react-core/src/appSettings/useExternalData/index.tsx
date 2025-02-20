'use client'

import { createContext, useContext, useEffect, useMemo } from 'react'
import { useCallback } from 'react'
import { CurrencyId, currencyOptions } from './currency'
import { useDaemonExplorerMetadata } from './useDaemonExplorerMetadata'
import {
  swrKeyForDefaultCurrencyId,
  ExternalDataSettings,
  getDefaultExternalDataSettings,
} from './types'
import useLocalStorageState from 'use-local-storage-state'
import useSWR from 'swr'

export type ExternalDataProviderProps = {
  children?: React.ReactNode
  daemonExplorerInfoRoute?: string
  defaultSettings?: Partial<ExternalDataSettings>
}

function useExternalDataMain({
  daemonExplorerInfoRoute,
  defaultSettings: overrideDefaultSettings,
}: ExternalDataProviderProps) {
  // In SSR apps the server may pass fallback data for the default currency id.
  // This allows the local storage settings to server-render with the correct value.
  const serverCurrencyId = useSWR(swrKeyForDefaultCurrencyId)
  const customDefaultSettings = useMemo(() => {
    const serverCurrency = serverCurrencyId.data
      ? currencyOptions.find((i) => i.id === serverCurrencyId.data)
      : null
    const custom = serverCurrency
      ? {
          currency: serverCurrency,
          ...overrideDefaultSettings,
        }
      : overrideDefaultSettings
    return getDefaultExternalDataSettings(custom)
  }, [overrideDefaultSettings, serverCurrencyId.data])
  const [_settings, _setSettings] = useLocalStorageState('v1/externalData', {
    defaultValue: customDefaultSettings,
  })
  // Merge in defaults incase new settings have been introduced.
  useEffect(() => {
    _setSettings((settings) => ({
      ...customDefaultSettings,
      ...settings,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const externalDataSettings = useMemo(
    () => ({
      ...customDefaultSettings,
      ..._settings,
    }),
    [_settings, customDefaultSettings]
  )

  const setExternalDataSettings = useCallback(
    (values: Partial<ExternalDataSettings>) => {
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
        window.document.cookie = `currency=${id}; path=/`
        setExternalDataSettings({
          currency,
        })
      }
    },
    [setExternalDataSettings]
  )

  const daemonExplorer = useDaemonExplorerMetadata({
    route: daemonExplorerInfoRoute,
  })

  return {
    externalDataSettings,
    setExternalDataSettings,
    setCurrency,
    currencyOptions,
    daemonExplorer,
  }
}

type State = ReturnType<typeof useExternalDataMain>

const ExternalDataContext = createContext({} as State)
/**
 * The app settings context allows you to configure all app settings and
 * preferences such as the api address, password, currency, etc.
 */
export const useExternalData = () => useContext(ExternalDataContext)

export function ExternalDataProvider({
  children,
  ...props
}: ExternalDataProviderProps) {
  const state = useExternalDataMain(props)
  return (
    <ExternalDataContext.Provider value={state}>
      {children}
    </ExternalDataContext.Provider>
  )
}
