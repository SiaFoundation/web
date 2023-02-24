import '../config/style.css'
import { NextAppCsr } from '@siafoundation/design-system'
import { AppProps } from 'next/app'
import { DialogProvider, Dialogs } from '../contexts/dialog'
import { UploadsProvider } from '../contexts/uploads'
import { FilesProvider } from '../contexts/files'
import { ContractsProvider } from '../contexts/contracts'
import { HostsProvider } from '../contexts/hosts'

export default function App({
  Component,
  pageProps,
}: AppProps<{
  fallback?: Record<string, unknown>
}>) {
  return (
    <NextAppCsr fallback={pageProps.fallback} passwordProtectRequestHooks>
      <DialogProvider>
        <UploadsProvider>
          <FilesProvider>
            <ContractsProvider>
              <HostsProvider>
                <Dialogs />
                <Component {...pageProps} />
              </HostsProvider>
            </ContractsProvider>
          </FilesProvider>
        </UploadsProvider>
      </DialogProvider>
    </NextAppCsr>
  )
}
