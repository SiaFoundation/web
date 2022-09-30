import {
  Box,
  Flex,
  ImageProps,
  SiteLayout,
  webLinks,
} from '@siafoundation/design-system'
import { Footer } from './Footer'
import { PageHead } from './PageHead'
import { Navbar } from './Navbar'
import { routes } from '../config/routes'
import { menuSections } from '../config/siteMap'

type Props = {
  heading: React.ReactNode
  children: React.ReactNode
  title: string
  description: string
  date?: string
  path: string
  backgroundImage: ImageProps
  previewImage: ImageProps
  focus?: React.ReactNode
  transitions?: boolean
  transitionWidthDuration?: number
  transitionFadeDelay?: number
}

export function Layout({
  heading,
  children,
  title,
  description,
  date,
  path,
  backgroundImage,
  previewImage,
  focus,
  transitions,
  transitionWidthDuration,
  transitionFadeDelay,
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
        image={previewImage.src}
        date={date}
        path={path}
      />
      <SiteLayout
        appName="Sia"
        homeHref={routes.home.index}
        focus={focus}
        transitions={transitions}
        transitionWidthDuration={transitionWidthDuration}
        transitionFadeDelay={transitionFadeDelay}
        heading={heading}
        externalLinks={[
          {
            link: webLinks.github,
            title: 'GitHub',
          },
          {
            link: webLinks.discord,
            title: 'Discord',
          },
        ]}
        menuSections={menuSections}
        footer={<Footer />}
        backgroundImage={backgroundImage}
        navbar={<Navbar />}
      >
        <Flex
          direction="column"
          css={{
            padding: '$6 0',
          }}
        >
          {children}
        </Flex>
      </SiteLayout>
    </Box>
  )
}
