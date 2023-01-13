import { SWRConfig } from 'swr'
import { ThemeProvider } from '../hooks/useTheme'
import { Toaster } from '../lib/toast'
import { AppProps } from 'next/app'
import { AppSettingsProvider } from '@siafoundation/react-core'

export function NextAppSsr({
  Component,
  pageProps,
  Layout,
}: AppProps<{
  fallback?: Record<string, unknown>
}> & { Layout?: React.FC<{ children: React.ReactNode }> }) {
  if (Layout) {
    return (
      <SWRConfig value={{ fallback: pageProps?.fallback || {} }}>
        <ThemeProvider ssr>
          <AppSettingsProvider ssr>
            <Toaster />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AppSettingsProvider>
        </ThemeProvider>
      </SWRConfig>
    )
  }
  return (
    <SWRConfig value={{ fallback: pageProps?.fallback || {} }}>
      <ThemeProvider ssr>
        <AppSettingsProvider>
          <Toaster />
          <Component {...pageProps} />
        </AppSettingsProvider>
      </ThemeProvider>
    </SWRConfig>
  )
}
