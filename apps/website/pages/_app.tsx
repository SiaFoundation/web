import '../config/style.css'
import { TooltipProvider, Toaster } from '@siafoundation/design-system'
import { AppProps } from 'next/app'
import { AppSettingsProvider, CoreProvider } from '@siafoundation/react-core'
import { ThemeProvider } from 'next-themes'
import { rootFontClasses } from '@siafoundation/fonts'

export default function NextAppSsr({
  Component,
  pageProps,
}: AppProps<{
  fallback?: Record<string, unknown>
}>) {
  return (
    <CoreProvider fallback={pageProps.fallback}>
      <ThemeProvider attribute="class">
        <TooltipProvider>
          <AppSettingsProvider>
            <div id="root" className={rootFontClasses}>
              <Toaster />
              <Component {...pageProps} />
            </div>
          </AppSettingsProvider>
        </TooltipProvider>
      </ThemeProvider>
    </CoreProvider>
  )
}
