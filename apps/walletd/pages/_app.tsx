import '../config/style.css'
import { NextAppCsr } from '@siafoundation/design-system'
import { AppProps } from 'next/app'
import { Providers } from '../config/providers'
import { useWasm } from '../hooks/useWasm'

export default function App({
  Component,
  pageProps,
}: AppProps<{
  fallback?: Record<string, unknown>
}>) {
  useWasm()
  return (
    <NextAppCsr fallback={pageProps.fallback} passwordProtectRequestHooks>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </NextAppCsr>
  )
}
