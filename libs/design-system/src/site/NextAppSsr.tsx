import { ThemeProvider } from '../hooks/useTheme'
import { Toaster } from '../lib/toast'
import { AppProps } from 'next/app'
import { AppSettingsProvider, CoreProvider } from '@siafoundation/react-core'
import { rootClasses } from '../config/css'

export function NextAppSsr({
  Component,
  pageProps,
  Layout,
}: AppProps<{
  fallback?: Record<string, unknown>
}> & { Layout?: React.FC<{ children: React.ReactNode }> }) {
  if (Layout) {
    return (
      <CoreProvider fallback={pageProps.fallback}>
        <ThemeProvider>
          <AppSettingsProvider>
            <div id="root" className={rootClasses}>
              <Toaster />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </div>
          </AppSettingsProvider>
        </ThemeProvider>
      </CoreProvider>
    )
  }
  return (
    <CoreProvider fallback={pageProps.fallback}>
      <ThemeProvider>
        <AppSettingsProvider>
          <div id="root" className={rootClasses}>
            <Toaster />
            <Component {...pageProps} />
          </div>
        </AppSettingsProvider>
      </ThemeProvider>
    </CoreProvider>
  )
}
