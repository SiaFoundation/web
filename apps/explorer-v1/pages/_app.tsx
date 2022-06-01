import { ThemeProvider, Toaster } from '@siafoundation/design-system'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { SiteLayout } from '../components/SiteLayout'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider ssr>
      <Head>
        <title>Sia - Explorer</title>
      </Head>
      <SiteLayout>
        <Toaster />
        <Component {...pageProps} />
      </SiteLayout>
    </ThemeProvider>
  )
}

export default App
