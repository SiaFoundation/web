import { DialogProvider, Dialogs } from '../contexts/dialog'
import { FilesProvider } from '../contexts/files'
import { ContractsProvider } from '../contexts/contracts'
import { HostsProvider } from '../contexts/hosts'
import React from 'react'
import { AppProvider } from '../contexts/app'
import { ConfigProvider } from '../contexts/config'
import { OnboardingBar } from '../components/OnboardingBar'
import { TransfersBar } from '../components/TransfersBar'
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
            <ContractsProvider>
              <HostsProvider>
                <FilesProvider>
                  {/* this is here so that dialogs can use all the other providers,
                  and the other providers can trigger dialogs */}
                  <OnboardingBar />
                  <TransfersBar />
                  <Dialogs />
                  {children}
                </FilesProvider>
              </HostsProvider>
            </ContractsProvider>
          </TransactionsProvider>
        </DialogProvider>
      </ConfigProvider>
    </AppProvider>
  )
}
