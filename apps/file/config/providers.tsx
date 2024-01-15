import { DialogProvider, Dialogs } from '../contexts/dialog'
import React from 'react'
import { FilesProvider } from '../contexts/files'
import { HeliaProvider } from '../contexts/helia'
import { AppSettingsProvider } from '@siafoundation/react-core'
import { Toaster, TooltipProvider } from '@siafoundation/design-system'
import { PeersProvider } from '../contexts/peers'

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <DialogProvider>
      <TooltipProvider>
        <AppSettingsProvider>
          <HeliaProvider>
            <PeersProvider>
              <FilesProvider>
                {/* this is here so that dialogs can use all the other providers,
                  and the other providers can trigger dialogs */}
                <Dialogs />
                <Toaster />
                {children}
              </FilesProvider>
            </PeersProvider>
          </HeliaProvider>
        </AppSettingsProvider>
      </TooltipProvider>
    </DialogProvider>
  )
}
