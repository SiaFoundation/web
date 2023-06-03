import { DialogProvider, Dialogs } from '../contexts/dialog'
import React from 'react'
import { WalletsProvider } from '../contexts/wallets'

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <DialogProvider>
      <WalletsProvider>
        {/* this is here so that dialogs can use all the other providers,
                  and the other providers can trigger dialogs */}
        <Dialogs />
        {children}
      </WalletsProvider>
    </DialogProvider>
  )
}
