import {
  ContentGallery,
  Callout,
  Section,
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
import { getArticles } from '../../content/articles'
import { AsyncReturnType } from '../../lib/types'
import { getSoftware } from '../../content/software'
import { getStats } from '../../content/stats'
import { textContent } from '../../lib/utils'
import backgroundImage from '../../assets/backgrounds/jungle.png'
import previewImage from '../../assets/previews/jungle.png'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

const software = getSoftware('')

const title = 'Community & Ecosystem'
const description = (
  <>
    Sia is a thriving ecosystem of open source software, layer 2 networks, and
    commercial data storage platforms - made possible by a vibrant community of
    contributors.
  </>
)

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function CommunityEcosystem({ blogs }: Props) {
  return (
    <Layout
      title={title}
      description={textContent(description)}
      path={routes.community.index}
      heading={
        <Section py="4">
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
        </Section>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <Section py="2">
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
      </Section>
      <Section py="4">
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
      </Section>
      <Section pt="2" pb="4">
        <Callout
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
          actionNewTab
        />
      </Section>
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getStats()
  const blogs = getArticles(['ecosystem-featured'], 4)

  return {
    props: {
      blogs,
      fallback: {
        '/api/stats': stats,
      },
    },
  }
}
