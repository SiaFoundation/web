import '../config/style.css'
import { ClientSide, ThemeProvider } from '@siafoundation/design-system'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { AppSettingsProvider } from '@siafoundation/react-core'
import { DialogProvider } from '../contexts/dialog'

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
              <Component {...pageProps} />
            </DialogProvider>
          </AppSettingsProvider>
        </ThemeProvider>
      </SWRConfig>
    </ClientSide>
  )
}
