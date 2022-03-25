import { Box, Flex, ImageProps, SiteLayout } from '@siafoundation/design-system'
import { Stats } from '../content/stats'
import { Footer } from './Footer'
import { AppHead } from './Head'
import { Navbar } from './Navbar'
import { sitemap } from '../config/site'

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
        menuLinks={[
          {
            link: sitemap.home.index,
            title: 'Home',
          },
          {
            link: sitemap.developers.index,
            title: 'Developers',
          },
          {
            link: sitemap.learn.index,
            title: 'Learn',
          },
          {
            link: sitemap.community.index,
            title: 'Community & Ecosystem',
          },
          {
            link: sitemap.foundation.index,
            title: 'The Sia Foundation',
          },
          {
            link: sitemap.newsroom.index,
            title: 'Newsroom',
          },
        ]}
        footer={<Footer stats={stats} />}
        backgroundImage={backgroundImage}
        navbar={<Navbar />}
      >
        <Flex direction="column" css={{ padding: '$6 0' }}>
          {children}
        </Flex>
      </SiteLayout>
    </Box>
  )
}
