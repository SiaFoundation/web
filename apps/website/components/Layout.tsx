import { Box, Flex, ImageProps, SiteLayout } from '@siafoundation/design-system'
import { Stats } from '../content/stats'
import { Footer } from './Footer'
import { PageHead } from './PageHead'
import { Navbar } from './Navbar'
import { sitemap } from '../config/site'

type Props = {
  heading: React.ReactNode
  children: React.ReactNode
  title: string
  description: string
  path: string
  backgroundImage: ImageProps
  stats: Stats
  focus?: boolean
}

export function Layout({
  heading,
  children,
  title,
  description,
  path,
  stats,
  backgroundImage,
  focus,
}: Props) {
  return (
    <Box
      css={{
        backgroundColor: '$loContrast',
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <PageHead
        title={title}
        description={description}
        image={backgroundImage.src}
        path={path}
      />
      <SiteLayout
        focus={focus}
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
