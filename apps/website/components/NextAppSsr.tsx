import { TooltipProvider, Toaster } from '@siafoundation/design-system'
import { AppProps } from 'next/app'
import { AppSettingsProvider, CoreProvider } from '@siafoundation/react-core'
import { ThemeProvider } from 'next-themes'

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
        <ThemeProvider attribute="class">
          <TooltipProvider>
            <AppSettingsProvider>
              <div id="root">
                <Toaster />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </div>
            </AppSettingsProvider>
          </TooltipProvider>
        </ThemeProvider>
      </CoreProvider>
    )
  }
  return (
    <CoreProvider fallback={pageProps.fallback}>
      <ThemeProvider attribute="class">
        <TooltipProvider>
          <AppSettingsProvider>
            <div id="root">
              <Toaster />
              <Component {...pageProps} />
            </div>
          </AppSettingsProvider>
        </TooltipProvider>
      </ThemeProvider>
    </CoreProvider>
  )
}
