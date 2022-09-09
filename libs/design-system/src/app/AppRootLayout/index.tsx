import React from 'react'
import { Box } from '../../core'
import { Toaster } from '../../lib/toast'
import { useMonitorConnAndLock } from '../../hooks'

type Routes = {
  unlock: string
}

type Props = {
  children: React.ReactNode
  routes: Routes
}

export function AppRootLayout({ children, routes }: Props) {
  useMonitorConnAndLock(routes)

  return (
    <Box>
      <Toaster />
      {children}
    </Box>
  )
}
