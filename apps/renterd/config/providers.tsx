import type React from 'react'
import { OnboardingBar } from '../components/OnboardingBar'
import { TransfersBar } from '../components/TransfersBar'
import { AlertsProvider } from '../contexts/alerts'
import { AppProvider } from '../contexts/app'
import { ConfigProvider } from '../contexts/config'
import { ContractsProvider } from '../contexts/contracts'
import { DialogProvider, Dialogs } from '../contexts/dialog'
import { FilesDirectoryProvider } from '../contexts/filesDirectory'
import { FilesFlatProvider } from '../contexts/filesFlat'
import { FilesManagerProvider } from '../contexts/filesManager'
import { HostsProvider } from '../contexts/hosts'
import { KeysProvider } from '../contexts/keys'
import { TransactionsProvider } from '../contexts/transactions'
import { UploadsProvider } from '../contexts/uploads'

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
                  <UploadsProvider>
                    <FilesDirectoryProvider>
                      <FilesFlatProvider>
                        <KeysProvider>
                          <AlertsProvider>
                            {/* this is here so that dialogs can use all the other providers,
                  and the other providers can trigger dialogs */}
                            <OnboardingBar />
                            <TransfersBar />
                            <Dialogs />
                            {children}
                          </AlertsProvider>
                        </KeysProvider>
                      </FilesFlatProvider>
                    </FilesDirectoryProvider>
                  </UploadsProvider>
                </FilesManagerProvider>
              </HostsProvider>
            </ContractsProvider>
          </TransactionsProvider>
        </DialogProvider>
      </ConfigProvider>
    </AppProvider>
  )
}
