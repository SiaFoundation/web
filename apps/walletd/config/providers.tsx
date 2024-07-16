import type React from 'react'
import { RescanStatus } from '../components/RescanStatus'
import { AddressesProvider } from '../contexts/addresses'
import { AppProvider } from '../contexts/app'
import { DialogProvider, Dialogs } from '../contexts/dialog'
import { EventsProvider } from '../contexts/events'
import { LedgerProvider } from '../contexts/ledger'
import { WalletsProvider } from '../contexts/wallets'

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <AppProvider>
      <DialogProvider>
        <LedgerProvider>
          <WalletsProvider>
            <AddressesProvider>
              <EventsProvider>
                {/* this is here so that dialogs can use all the other providers,
                  and the other providers can trigger dialogs */}
                <Dialogs />
                <RescanStatus />
                {children}
              </EventsProvider>
            </AddressesProvider>
          </WalletsProvider>
        </LedgerProvider>
      </DialogProvider>
    </AppProvider>
  )
}
