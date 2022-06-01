import {
  getImageProps,
  SiteLayout,
  ThemeProvider,
} from '@siafoundation/design-system'
import { AppProps } from 'next/app'
import Head from 'next/head'
import background from '../assets/jungle.png'
import { Heading } from '../components/Heading'

const backgroundImage = getImageProps(background)

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider ssr>
      <Head>
        <title>Sia - Design system</title>
      </Head>
      <SiteLayout
        menuLinks={[
          {
            link: '/',
            title: 'Core',
          },
          {
            link: '/sites',
            title: 'Sites',
          },
          {
            link: '/apps',
            title: 'Apps',
          },
        ]}
        heading={<Heading />}
        backgroundImage={backgroundImage}
      >
        <Component {...pageProps} />
      </SiteLayout>
    </ThemeProvider>
  )
}

export default App
