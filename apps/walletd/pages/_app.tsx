import '../config/style.css'
import { NextAppCsr } from '@siafoundation/design-system'
import { rootFontClasses } from '@siafoundation/fonts'
import type { AppProps } from 'next/app'
import { Providers } from '../config/providers'
import { routes } from '../config/routes'

export default function App({
  Component,
  pageProps,
}: AppProps<{
  fallback?: Record<string, unknown>
}>) {
  return (
    <NextAppCsr
      className={rootFontClasses}
      fallback={pageProps.fallback}
      passwordProtectRequestHooks
      lockRoutes={routes}
    >
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </NextAppCsr>
  )
}
