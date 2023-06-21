import { DialogProvider, Dialogs } from '../contexts/dialog'
import React from 'react'
import { WalletsProvider } from '../contexts/wallets'
import { AddressesProvider } from '../contexts/addresses'
import { EventsProvider } from '../contexts/events'

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <DialogProvider>
      <WalletsProvider>
        <AddressesProvider>
          <EventsProvider>
            {/* this is here so that dialogs can use all the other providers,
                  and the other providers can trigger dialogs */}
            <Dialogs />
            {children}
          </EventsProvider>
        </AddressesProvider>
      </WalletsProvider>
    </DialogProvider>
  )
}
