import {
  ContentGallery,
  Callout,
  SiteHeading,
  webLinks,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getFeedContent } from '../../content/feed'
import { getProjects } from '../../content/projects'
import { getStats } from '../../content/stats'
import { AsyncReturnType } from '../../lib/types'
import { textContent } from '../../lib/utils'
import { getMinutesInSeconds } from '../../lib/time'
import { SectionTransparent } from '../../components/SectionTransparent'
import { SectionGradient } from '../../components/SectionGradient'
import { backgrounds } from '../../content/imageBackgrounds'
import { previews } from '../../content/imagePreviews'
import { CalloutProject } from '../../components/CalloutProject'

const title = 'Community & Ecosystem'
const description = (
  <>
    Sia is a thriving ecosystem of data storage enthusiasts, open source
    software, and commercial data storage platforms - made possible by a vibrant
    community of contributors.
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
        <SectionTransparent className="pt-24 md:pt-40 pb-6 md:pb-20">
          <SiteHeading
            title={title}
            description={description}
            size="64"
            anchorLink={false}
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
        </SectionTransparent>
      }
      backgroundImage={backgrounds.jungle}
      previewImage={previews.jungle}
    >
      <SectionGradient className="pt-10">
        <ContentGallery
          eyebrow="Filter projects"
          filterable="software"
          columnClassName="grid-cols-1 md:grid-cols-2"
          gapClassName="gap-4 sm:gap-5"
          component={CalloutProject}
          items={software}
        />
      </SectionGradient>
      <SectionGradient>
        <SiteHeading
          size="32"
          className="pt-16 md:pt-52 pb-12 md:pb-20"
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
      </SectionGradient>
      <SectionGradient className="pt-20 md:pt-40 pb-24 md:pb-44">
        <Callout
          title="Sia grants"
          size="2"
          background={backgrounds.nateSnow}
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
  const stats = await getStats()
  const blogs = await getFeedContent(['ecosystem-featured'], 4)
  const software = await getProjects('')

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
