import { useEffect, useState } from 'react'
import { SWRConfig } from 'swr'
import { ThemeProvider } from '../hooks/useTheme'
import { Toaster } from '../lib/toast'
import { AppProps } from 'next/app'
import { SettingsProvider } from '@siafoundation/react-core'

type Props = {
  children: React.ReactNode
}

export function ClientSide({ children }: Props) {
  const [csrReady, setCsrReady] = useState(false)

  useEffect(() => {
    setCsrReady(true)
  }, [])

  return <div>{csrReady ? children : null}</div>
}

export function NextAppCsr({
  Component,
  pageProps,
}: AppProps<{
  fallback?: Record<string, unknown>
}>) {
  return (
    <ClientSide>
      <SWRConfig value={{ fallback: pageProps?.fallback || {} }}>
        <ThemeProvider>
          <SettingsProvider>
            <Toaster />
            <Component {...pageProps} />
          </SettingsProvider>
        </ThemeProvider>
      </SWRConfig>
    </ClientSide>
  )
}
