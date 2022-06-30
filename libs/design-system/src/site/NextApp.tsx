import { ThemeProvider } from '../hooks/useTheme'
import { Toaster } from '../lib/toast'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

export function NextApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fallback: pageProps.fallback || {} }}>
      <ThemeProvider ssr>
        <Toaster />
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  )
}
