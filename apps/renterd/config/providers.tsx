import { DialogProvider, Dialogs } from '../contexts/dialog'
import { FilesProvider } from '../contexts/files'
import { ContractsProvider } from '../contexts/contracts'
import { HostsProvider } from '../contexts/hosts'
import React from 'react'
import { RenterdProvider } from '../contexts/renterd'

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <RenterdProvider>
      <DialogProvider>
        <ContractsProvider>
          <HostsProvider>
            <FilesProvider>
              {/* this is here so that dialogs can use all the other providers,
                  and the other providers can trigger dialogs */}
              <Dialogs />
              {children}
            </FilesProvider>
          </HostsProvider>
        </ContractsProvider>
      </DialogProvider>
    </RenterdProvider>
  )
}
