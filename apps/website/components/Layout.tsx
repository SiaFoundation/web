import {
  Box,
  Flex,
  ImageProps,
  SiteLayout,
  CSS,
} from '@siafoundation/design-system'
import { Footer } from './Footer'
import { PageHead } from './PageHead'
import { Navbar } from './Navbar'
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
  contentCss?: CSS
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
  contentCss,
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
        focus={focus}
        transitions={transitions}
        transitionWidthDuration={transitionWidthDuration}
        transitionFadeDelay={transitionFadeDelay}
        heading={heading}
        menuSections={menuSections}
        footer={<Footer />}
        backgroundImage={backgroundImage}
        navbar={<Navbar />}
      >
        <Flex
          direction="column"
          css={{
            padding: '$6 0',
            ...contentCss,
          }}
        >
          {children}
        </Flex>
      </SiteLayout>
    </Box>
  )
}
