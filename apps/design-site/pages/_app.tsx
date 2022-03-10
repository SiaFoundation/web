import { SiteLayout, ThemeProvider } from '@siafoundation/design-system'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Header } from '../components/Header'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider ssr>
      <Head>
        <title>Design system</title>
      </Head>
      <SiteLayout headerLeft={<Header />}>
        <Component {...pageProps} />
      </SiteLayout>
    </ThemeProvider>
  )
}

export default App
