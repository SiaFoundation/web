import {
  Box,
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
        menuSections={[
          {
            title: 'Sections',
            links: [
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
            ],
          },
        ]}
        navbar={<Box />}
        heading={<Heading />}
        backgroundImage={backgroundImage}
      >
        <Box css={{ backgroundColor: '$loContrast', pb: '$max' }}>
          <Component {...pageProps} />
        </Box>
      </SiteLayout>
    </ThemeProvider>
  )
}

export default App
