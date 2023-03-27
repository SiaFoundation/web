import React, { useEffect, useState } from 'react'
import { SWRConfig } from 'swr'
import { ThemeProvider } from '../hooks/useTheme'
import { AppSettingsProvider } from '@siafoundation/react-core'
import { rootClasses } from '../config/css'

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
}

export function NextAppCsr({
  passwordProtectRequestHooks,
  fallback,
  children,
}: Props) {
  return (
    <ClientSide>
      <SWRConfig
        value={{
          fallback: fallback || {},
        }}
      >
        <ThemeProvider>
          <AppSettingsProvider
            passwordProtectRequestHooks={passwordProtectRequestHooks}
            ssr={false}
          >
            <div id="root" className={rootClasses}>
              {children}
            </div>
          </AppSettingsProvider>
        </ThemeProvider>
      </SWRConfig>
    </ClientSide>
  )
}
