import React from 'react'
import { DialogProvider, Dialogs } from '../contexts/dialog'
import { ContractsProvider } from '../contexts/contracts'
import { HostsProvider } from '../contexts/hosts'
import { AppProvider } from '../contexts/app'
import { ConfigProvider } from '../contexts/config'
import { OnboardingBar } from '../components/OnboardingBar'
import { TransfersBar } from '../components/TransfersBar'
import { TransactionsProvider } from '../contexts/transactions'
import { KeysProvider } from '../contexts/keys'
import { FilesFlatProvider } from '../contexts/filesFlat'
import { FilesManagerProvider } from '../contexts/filesManager'
import { FilesDirectoryProvider } from '../contexts/filesDirectory'

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
                <FilesManagerProvider>
                  <FilesDirectoryProvider>
                    <FilesFlatProvider>
                      <KeysProvider>
                        {/* this is here so that dialogs can use all the other providers,
                  and the other providers can trigger dialogs */}
                        <OnboardingBar />
                        <TransfersBar />
                        <Dialogs />
                        {children}
                      </KeysProvider>
                    </FilesFlatProvider>
                  </FilesDirectoryProvider>
                </FilesManagerProvider>
              </HostsProvider>
            </ContractsProvider>
          </TransactionsProvider>
        </DialogProvider>
      </ConfigProvider>
    </AppProvider>
  )
}
