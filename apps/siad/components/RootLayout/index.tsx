import React from 'react'
import { Box, Toaster } from '@siafoundation/design-system'
import { useMonitorConnAndLock } from '../../hooks/useMonitorConnAndLock'

type Props = {
  children: React.ReactNode
}

export function RootLayout({ children }: Props) {
  useMonitorConnAndLock()

  return (
    <Box>
      <Toaster />
      {children}
    </Box>
  )
}
