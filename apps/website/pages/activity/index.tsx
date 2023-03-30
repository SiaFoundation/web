import { SiteHeading, getImageProps } from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getCacheStats } from '../../content/stats'
import backgroundImage from '../../assets/backgrounds/nate-trickle.png'
import previewImage from '../../assets/previews/nate-trickle.png'
import { AsyncReturnType } from '../../lib/types'
import { getMinutesInSeconds } from '../../lib/time'
import { SectionSimple } from '../../components/SectionSimple'
import { getCachePrs } from '../../content/prs'
import { GitHubActivity } from '../../components/GitHubActivity'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

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
        <SectionSimple className="pt-24 md:pt-40 pb-6">
          <SiteHeading title={title} description={description} size="64" />
        </SectionSimple>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <SectionSimple className="md:pt-20 pb-24 md:pb-40">
        <GitHubActivity prs={prs} />
      </SectionSimple>
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
