import '../config/style.css'
import { ClientSide, ThemeProvider } from '@siafoundation/design-system'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { AppSettingsProvider } from '@siafoundation/react-core'
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
    <ClientSide>
      <SWRConfig value={{ fallback: pageProps?.fallback || {} }}>
        <ThemeProvider>
          <AppSettingsProvider passwordProtectRequestHooks>
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
          </AppSettingsProvider>
        </ThemeProvider>
      </SWRConfig>
    </ClientSide>
  )
}
