import {
  ContentGallery,
  Callout,
  ContentProject,
  Flex,
  Image,
  SiteHeading,
  getImageProps,
  Box,
  webLinks,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getCacheArticles } from '../../content/articles'
import { getCacheSoftware } from '../../content/software'
import { getCacheStats } from '../../content/stats'
import { AsyncReturnType } from '../../lib/types'
import { textContent } from '../../lib/utils'
import backgroundImage from '../../assets/backgrounds/jungle.png'
import previewImage from '../../assets/previews/jungle.png'
import { getMinutesInSeconds } from '../../lib/time'
import { SectionSimple } from '../../components/SectionSimple'
import { SectionWaves } from '../../components/SectionWaves'
import { SectionGradient } from '../../components/SectionGradient'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

const title = 'Community & Ecosystem'
const description = (
  <>
    Sia is a thriving ecosystem of open source software, layer 2 networks, and
    commercial data storage platforms - made possible by a vibrant community of
    contributors.
  </>
)

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function CommunityEcosystem({ blogs, software }: Props) {
  return (
    <Layout
      title={title}
      description={textContent(description)}
      path={routes.community.index}
      heading={
        <SectionSimple css={{ py: '$max' }}>
          <SiteHeading
            title={title}
            description={description}
            size="64"
            links={[
              {
                title: 'Join our Discord',
                link: webLinks.discord,
                newTab: true,
              },
              {
                title: 'Browse Reddit',
                link: webLinks.reddit,
                newTab: true,
              },
            ]}
          />
        </SectionSimple>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <SectionWaves css={{ pt: '$12', pb: '$12' }}>
        <SiteHeading
          size="32"
          title="Featured updates from the Sia community"
          description={
            <>
              Read about the latest updates and technical advancements in the
              Sia ecosystem.
            </>
          }
          links={[
            {
              title: 'Browse the blog',
              link: webLinks.blog,
              newTab: true,
            },
          ]}
        />
        <ContentGallery columns="1" items={blogs} />
      </SectionWaves>
      <SectionGradient css={{ pt: '$max', pb: '$12' }}>
        <Flex gap="3" align="start">
          <Box
            css={{
              display: 'none',
              '@bp2': {
                display: 'block',
              },
            }}
          >
            <Image
              src={'/built-with-sia.png'}
              alt="Built with Sia"
              loading="lazy"
              height="130px"
              width="140px"
              style={{
                filter: 'grayscale(1)',
              }}
            />
          </Box>
          <SiteHeading
            size="32"
            id="software"
            title="A vibrant & active ecosystem"
            description={
              <>
                Sia is a thriving ecosystem of open source software, layer 2
                networks, and commercial data storage platforms.
              </>
            }
            css={{ flex: 1 }}
          />
        </Flex>
        <ContentGallery
          eyebrow="Filter projects"
          filterable="software"
          component={ContentProject}
          columns={{
            '@initial': 1,
            '@bp2': 2,
            '@bp4': 3,
          }}
          items={software}
        />
        <Callout
          css={{ mt: '$12', mb: '$6' }}
          title="Sia grants"
          size="2"
          description={
            <>
              The Sia Foundation welcomes and supports contributors from all
              over the world to come and build on Sia by offering grants.
            </>
          }
          actionTitle="Learn about grants"
          actionLink={routes.grants.index}
        />
      </SectionGradient>
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getCacheStats()
  const blogs = await getCacheArticles(['ecosystem-featured'], 4)
  const software = await getCacheSoftware('')

  return {
    props: {
      blogs,
      software,
      fallback: {
        '/api/stats': stats,
      },
    },
    revalidate: getMinutesInSeconds(5),
  }
}
