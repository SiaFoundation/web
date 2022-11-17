import { SWRConfig } from 'swr'
import { ThemeProvider } from '../hooks/useTheme'
import { Toaster } from '../lib/toast'
import { AppProps } from 'next/app'
import { SettingsProvider } from '@siafoundation/react-core'

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
          <SettingsProvider>
            <Toaster />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SettingsProvider>
        </ThemeProvider>
      </SWRConfig>
    )
  }
  return (
    <SWRConfig value={{ fallback: pageProps?.fallback || {} }}>
      <ThemeProvider ssr>
        <SettingsProvider>
          <Toaster />
          <Component {...pageProps} />
        </SettingsProvider>
      </ThemeProvider>
    </SWRConfig>
  )
}
