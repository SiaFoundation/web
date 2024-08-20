'use client'

import { useAppRouter, usePathname } from '@siafoundation/next'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useCallback } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { clearAllSwrKeys } from '../../utils'
import { useWorkflows } from '../../workflows'
import { useIsAuthenticatedRoute } from './useIsAuthenticatedRoute'
import { RequestSettings, getDefaultRequestSettings } from './types'

export type RequestSettingsProviderProps = {
  children?: React.ReactNode
  passwordProtectRequestHooks?: boolean
  lockRoutes?: {
    home: string
    login: string
  }
  defaultSettings?: Partial<RequestSettings>
}

function useRequestSettingsMain({
  passwordProtectRequestHooks,
  lockRoutes,
  defaultSettings: overrideDefaultSettings,
}: RequestSettingsProviderProps) {
  const customDefaultSettings = useMemo(
    () => getDefaultRequestSettings(overrideDefaultSettings),
    [overrideDefaultSettings]
  )
  const [_settings, _setSettings] = useLocalStorageState('v1/requestConfig', {
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
  const requestSettings = useMemo(
    () => ({
      ...customDefaultSettings,
      ..._settings,
    }),
    [_settings, customDefaultSettings]
  )

  const { resetWorkflows } = useWorkflows()

  const setRequestSettings = useCallback(
    (values: Partial<RequestSettings>) => {
      _setSettings((s) => ({
        ...s,
        ...values,
      }))
    },
    [_setSettings]
  )

  const router = useAppRouter()
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
    setRequestSettings({ password: '' })
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
    setRequestSettings,
    resetWorkflows,
    onLockCallbacks,
    pathname,
  ])

  const isAuthenticatedRoute = useIsAuthenticatedRoute({
    login: lockRoutes?.login || '/login',
  })
  const isUnlocked = useMemo(
    () => !!requestSettings.password,
    [requestSettings]
  )
  const isUnlockedAndAuthedRoute = isUnlocked && isAuthenticatedRoute

  return {
    requestSettings,
    setRequestSettings,
    lock,
    isUnlockedAndAuthedRoute,
    passwordProtectRequestHooks,
    setOnLockCallback,
  }
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

type State = ReturnType<typeof useRequestSettingsMain>

const RequestSettingsContext = createContext({} as State)
/**
 * The app settings context allows you to configure all app settings and
 * preferences such as the api address, password, currency, etc.
 */
export const useRequestSettings = () => useContext(RequestSettingsContext)

export function RequestSettingsProvider({
  children,
  ...props
}: RequestSettingsProviderProps) {
  const state = useRequestSettingsMain(props)
  return (
    <RequestSettingsContext.Provider value={state}>
      {children}
    </RequestSettingsContext.Provider>
  )
}
