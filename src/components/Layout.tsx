import Head from 'next/head'
import { appName } from '../config/app'
import { Box } from '../system/Box'
import { Flex } from '../system/Flex'
import { Footer } from './Footer'
import { Header } from './Header'

type Props = {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  return (
    <Box
      css={{
        backgroundColor: '$loContrast',
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <Head>
        <title>{appName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1ed660" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Flex
        as="main"
        column
        css={{
          gap: '$8',
          padding: '$5',
          margin: '0 auto',
        }}
      >
        <Header />
        <Flex
          column
          css={{
            gap: '$3',
          }}
        >
          {children}
        </Flex>
        <Footer />
      </Flex>
    </Box>
  )
}
