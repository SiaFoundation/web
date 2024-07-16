import '../config/style.css'
import { Toaster, TooltipProvider } from '@siafoundation/design-system'
import { rootFontClasses } from '@siafoundation/fonts'
import { AppSettingsProvider, CoreProvider } from '@siafoundation/react-core'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

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
