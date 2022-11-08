import { useEffect, useState } from 'react'
import { SWRConfig } from 'swr'
import { ThemeProvider } from '../hooks/useTheme'
import { Toaster } from '../lib/toast'
import { AppProps } from 'next/app'

type Props = {
  children: React.ReactNode
}

function ClientSide({ children }: Props) {
  const [csrReady, setCsrReady] = useState(false)

  useEffect(() => {
    setCsrReady(true)
  }, [])

  return csrReady ? children : null
}

export function NextApp({
  Component,
  pageProps,
}: AppProps<{ fallback?: Record<string, unknown> }>) {
  return (
    <ClientSide>
      <SWRConfig value={{ fallback: pageProps?.fallback || {} }}>
        <ThemeProvider>
          <Toaster />
          <Component {...pageProps} />
        </ThemeProvider>
      </SWRConfig>
    </ClientSide>
  )
}
