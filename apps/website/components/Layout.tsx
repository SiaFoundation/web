import { Box, Flex, ImageProps, SiteLayout } from '@siafoundation/design-system'
import { Stats } from '../content/stats'
import { Footer } from './Footer'
import { AppHead } from './Head'
import { Menu } from './Menu'
import { Navbar } from './Navbar'

type Props = {
  heading: React.ReactNode
  children: React.ReactNode
  backgroundImage: ImageProps
  stats: Stats
}

export function Layout({ heading, children, stats, backgroundImage }: Props) {
  return (
    <Box
      css={{
        backgroundColor: '$loContrast',
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <AppHead />
      <SiteLayout
        heading={heading}
        menu={<Menu />}
        footer={<Footer stats={stats} />}
        backgroundImage={backgroundImage}
        navbar={<Navbar />}
      >
        <Flex direction="column" css={{ padding: '$9 0' }}>
          {children}
        </Flex>
      </SiteLayout>
    </Box>
  )
}
