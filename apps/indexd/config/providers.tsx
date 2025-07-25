'use client'

import React from 'react'
import { DialogProvider, Dialogs } from '../contexts/dialog'
import { AppProvider } from '../contexts/app'
import { ConfigProvider } from '../contexts/config'
import { TransactionsProvider } from '../contexts/transactions'

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <AppProvider>
      <ConfigProvider>
        <DialogProvider>
          <TransactionsProvider>
            {/* this is here so that dialogs can use all the other providers,
                  and the other providers can trigger dialogs */}
            <Dialogs />
            {children}
          </TransactionsProvider>
        </DialogProvider>
      </ConfigProvider>
    </AppProvider>
  )
}
