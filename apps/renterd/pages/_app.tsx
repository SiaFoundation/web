import '../config/style.css'
import { ClientSide, ThemeProvider } from '@siafoundation/design-system'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { AppSettingsProvider } from '@siafoundation/react-core'
import { DialogProvider } from '../contexts/dialog'
import { UploadsProvider } from '../contexts/uploads'

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
          <AppSettingsProvider api="api">
            <DialogProvider>
              <UploadsProvider>
                <Component {...pageProps} />
              </UploadsProvider>
            </DialogProvider>
          </AppSettingsProvider>
        </ThemeProvider>
      </SWRConfig>
    </ClientSide>
  )
}
