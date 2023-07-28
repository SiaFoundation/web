import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '../hooks/useTheme'
import { AppSettingsProvider, CoreProvider } from '@siafoundation/react-core'
import { rootClasses } from '../config/css'
import { Toaster } from '../lib/toast'

export function ClientSide({ children }: { children: React.ReactNode }) {
  const [csrReady, setCsrReady] = useState(false)

  useEffect(() => {
    setCsrReady(true)
  }, [])

  return <div>{csrReady ? children : null}</div>
}

type Props = {
  passwordProtectRequestHooks?: boolean
  fallback?: Record<string, unknown>
  children: React.ReactNode
  lockRoutes: { home: string; login: string }
}

export function NextAppCsr({
  passwordProtectRequestHooks,
  fallback,
  children,
  lockRoutes,
}: Props) {
  return (
    <ClientSide>
      <CoreProvider fallback={fallback}>
        <ThemeProvider>
          <AppSettingsProvider
            lockRoutes={lockRoutes}
            passwordProtectRequestHooks={passwordProtectRequestHooks}
          >
            <div id="root" className={rootClasses}>
              <Toaster />
              {children}
            </div>
          </AppSettingsProvider>
        </ThemeProvider>
      </CoreProvider>
    </ClientSide>
  )
}
