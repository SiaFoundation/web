import {
  ContentGallery,
  Callout,
  ContentProject,
  Image,
  SiteHeading,
  getImageProps,
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
        <SectionSimple className="pt-24 md:pt-40 pb-6 md:pb-20">
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
      <SectionWaves>
        <SiteHeading
          size="32"
          className="pt-16 md:pt-20 pb-12 md:pb-20"
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
        <ContentGallery
          className="pb-20 md:pb-32"
          columnClassName="grid-cols-1"
          items={blogs}
        />
      </SectionWaves>
      <SectionGradient>
        <div className="flex gap-10 items-start pt-8 md:pt-24">
          <div className="hidden md:block">
            <Image
              src={'/built-with-sia.png'}
              alt="Built with Sia"
              loading="lazy"
              height={130}
              width={140}
              style={{
                filter: 'grayscale(1)',
              }}
            />
          </div>
          <SiteHeading
            size="32"
            id="software"
            className="flex-1 pb-10 md:pb-20"
            title="A vibrant & active ecosystem"
            description={
              <>
                Sia is a thriving ecosystem of open source software, layer 2
                networks, and commercial data storage platforms.
              </>
            }
          />
        </div>
        <ContentGallery
          eyebrow="Filter projects"
          filterable="software"
          gapClassName="gap-y-8 md:gap-y-10"
          component={ContentProject}
          items={software}
        />
        <Callout
          className="mt-20 md:mt-40 mb-24 md:mb-40"
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
