'use client'

import React from 'react'
import { DialogProvider, Dialogs } from '../contexts/dialog'
import { AppProvider } from '../contexts/app'

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <AppProvider>
      <DialogProvider>
        {/* this is here so that dialogs can use all the other providers,
                  and the other providers can trigger dialogs */}
        <Dialogs />
        {children}
      </DialogProvider>
    </AppProvider>
  )
}
