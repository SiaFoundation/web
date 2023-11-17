'use client'

import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { TooltipProvider } from '../hooks/tooltip'
import { AppSettingsProvider, CoreProvider } from '@siafoundation/react-core'
import { Toaster } from '../lib/toast'
import { rootFontClasses } from '@siafoundation/fonts'

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
        <ThemeProvider attribute="class">
          <TooltipProvider>
            <AppSettingsProvider
              lockRoutes={lockRoutes}
              passwordProtectRequestHooks={passwordProtectRequestHooks}
            >
              <div id="root" className={rootFontClasses}>
                <Toaster />
                {children}
              </div>
            </AppSettingsProvider>
          </TooltipProvider>
        </ThemeProvider>
      </CoreProvider>
    </ClientSide>
  )
}
