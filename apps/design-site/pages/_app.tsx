import { SiteLayout, ThemeProvider } from '@siafoundation/design-system'
import { AppProps } from 'next/app'
import Head from 'next/head'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Design system</title>
      </Head>
      <ThemeProvider ssr>
        <SiteLayout title="@siafoundation/design-system" header>
          <Component {...pageProps} />
        </SiteLayout>
      </ThemeProvider>
    </>
  )
}

export default CustomApp
