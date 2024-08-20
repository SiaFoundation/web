'use client'

import { createContext, useContext, useMemo } from 'react'
import { useGpuFeatures } from './useGpuFeatures'
import {
  RequestSettingsProvider,
  RequestSettingsProviderProps,
  useRequestSettings,
} from './useRequestSettings'
import {
  ExternalDataProvider,
  ExternalDataProviderProps,
  useExternalData,
} from './useExternalData'
import { ExternalDataSettings } from './useExternalData/types'
import { RequestSettings } from './useRequestSettings/types'

export type AppSettings = RequestSettings & ExternalDataSettings

function useAppSettingsMain() {
  const {
    requestSettings,
    setRequestSettings,
    lock,
    isUnlockedAndAuthedRoute,
    setOnLockCallback,
  } = useRequestSettings()

  const {
    externalDataSettings,
    setExternalDataSettings,
    setCurrency,
    currencyOptions,
    daemonExplorer,
  } = useExternalData()

  const gpu = useGpuFeatures()

  const settings = useMemo(
    () => ({
      ...requestSettings,
      ...externalDataSettings,
    }),
    [requestSettings, externalDataSettings]
  )

  return {
    settings,
    requestSettings,
    externalDataSettings,
    setRequestSettings,
    setExternalDataSettings,
    siascan: externalDataSettings.siascan,
    siaCentral: externalDataSettings.siaCentral,
    gpu,
    lock,
    isUnlockedAndAuthedRoute,
    setOnLockCallback,
    setCurrency,
    currencyOptions,
    daemonExplorer,
  }
}

type State = ReturnType<typeof useAppSettingsMain>

const AppSettingsContext = createContext({} as State)
export const useAppSettings = () => useContext(AppSettingsContext)

function AppSettingsInteralProvider({
  children,
}: {
  children?: React.ReactNode
}) {
  const state = useAppSettingsMain()
  return (
    <AppSettingsContext.Provider value={state}>
      {children}
    </AppSettingsContext.Provider>
  )
}

export function AppSettingsProvider({
  children,
  ...props
}: RequestSettingsProviderProps & ExternalDataProviderProps) {
  return (
    <RequestSettingsProvider {...props}>
      <ExternalDataProvider {...props}>
        <AppSettingsInteralProvider {...props}>
          {children}
        </AppSettingsInteralProvider>
      </ExternalDataProvider>
    </RequestSettingsProvider>
  )
}
