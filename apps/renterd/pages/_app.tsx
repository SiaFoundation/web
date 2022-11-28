import '../config/style.css'
import { ClientSide, ThemeProvider } from '@siafoundation/design-system'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { SettingsProvider } from '@siafoundation/react-core'
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
          <SettingsProvider api="api/store">
            <DialogProvider>
              <Component {...pageProps} />
            </DialogProvider>
          </SettingsProvider>
        </ThemeProvider>
      </SWRConfig>
    </ClientSide>
  )
}
