import '../config/style.css'
import { AppProps } from 'next/app'
import { Providers } from '../config/providers'
import { NextAppCsr } from '@siafoundation/design-system'

export default function App({
  Component,
  pageProps,
}: AppProps<{
  fallback?: Record<string, unknown>
}>) {
  return (
    <NextAppCsr fallback={pageProps.fallback} passwordProtectRequestHooks>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </NextAppCsr>
  )
}
