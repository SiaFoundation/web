'use client'

import { TooltipProvider } from '../hooks/tooltip'
import { Toaster } from '../lib/toast'
import {
  AppSettingsProvider,
  CoreProvider,
  CurrencyId,
} from '@siafoundation/react-core'
import { ThemeProvider } from 'next-themes'

export function NextAppSsrAppRouter({
  children,
  fallback,
  serverCurrencyId,
}: {
  children: React.ReactNode
  fallback?: Record<string, unknown>
  serverCurrencyId?: CurrencyId
}) {
  return (
    <CoreProvider fallback={fallback}>
      <ThemeProvider attribute="class">
        <TooltipProvider>
          <AppSettingsProvider serverCurrencyId={serverCurrencyId}>
            <div id="root">
              <Toaster />
              {children}
            </div>
          </AppSettingsProvider>
        </TooltipProvider>
      </ThemeProvider>
    </CoreProvider>
  )
}
