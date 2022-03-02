import { SiteLayout, ThemeProvider } from '@siafoundation/design-system'
import { AppProps } from 'next/app'
import Head from 'next/head'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider ssr>
      <Head>
        <title>Design system</title>
      </Head>
      <SiteLayout title="@siafoundation/design-system" header>
        <Component {...pageProps} />
      </SiteLayout>
    </ThemeProvider>
  )
}

export default App
