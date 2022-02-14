import { ThemeProvider } from '@siafoundation/design-system'
import { AppProps } from 'next/app'
import { Layout } from '../components/Layout'
import Head from 'next/head'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Design system</title>
      </Head>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default CustomApp
