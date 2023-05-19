import { SiteHeading } from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getCacheStats } from '../../content/stats'
import { AsyncReturnType } from '../../lib/types'
import { getMinutesInSeconds } from '../../lib/time'
import { SectionSolid } from '../../components/SectionSolid'
import { getCachePrs } from '../../content/prs'
import { GitHubActivity } from '../../components/GitHubActivity'
import { backgrounds } from '../../content/imageBackgrounds'
import { previews } from '../../content/imagePreviews'
import { SectionTransparent } from '../../components/SectionTransparent'

type Props = AsyncReturnType<typeof getStaticProps>['props']
const title = 'Activity'
const description =
  'A feed of development activity from across Sia Foundation GitHub repositories.'

export default function Activity({ prs }: Props) {
  return (
    <Layout
      title={title}
      description={description}
      path={routes.community.index}
      heading={
        <SectionTransparent className="pt-24 md:pt-40 pb-6">
          <SiteHeading
            anchorLink={false}
            title={title}
            description={description}
            size="64"
          />
        </SectionTransparent>
      }
      backgroundImage={backgrounds.nateTrickle}
      previewImage={previews.nateTrickle}
    >
      <SectionSolid className="pt-12 md:pt-20 pb-24 md:pb-40">
        <GitHubActivity prs={prs} />
      </SectionSolid>
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getCacheStats()
  const prs = await getCachePrs()

  return {
    props: {
      prs,
      fallback: {
        '/api/stats': stats,
      },
    },
    revalidate: getMinutesInSeconds(5),
  }
}
