'use client'

import { TooltipProvider } from '../hooks/tooltip'
import { Toaster } from '../lib/toast'
import { AppSettingsProvider, CoreProvider } from '@siafoundation/react-core'
import { ThemeProvider } from 'next-themes'

export function NextAppSsrAppRouter({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CoreProvider>
      <ThemeProvider attribute="class">
        <TooltipProvider>
          <AppSettingsProvider>
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
