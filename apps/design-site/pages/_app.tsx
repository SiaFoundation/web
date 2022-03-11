import {
  getImageProps,
  Section,
  SiteHeading,
  SiteLayout,
  Text,
  ThemeProvider,
} from '@siafoundation/design-system'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Menu } from '../components/Menu'
import background from '../assets/jungle-dither.png'
import { Heading } from '../components/Heading'

const backgroundImage = getImageProps(background)

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider ssr>
      <Head>
        <title>Design system</title>
      </Head>
      <SiteLayout
        menu={<Menu />}
        heading={<Heading />}
        backgroundImage={backgroundImage}
      >
        <Component {...pageProps} />
      </SiteLayout>
    </ThemeProvider>
  )
}

export default App
