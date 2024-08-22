import {
  SiteHeading,
  Heading,
  Link,
  Separator,
  Text,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getStats } from '../../content/stats'
import { AsyncReturnType } from '../../lib/types'
import { minutesInSeconds } from '@siafoundation/units'
import { SectionSolid } from '../../components/SectionSolid'
import { MDXRemote } from 'next-mdx-remote'
import { components } from '../../config/mdx'
import { getPrs } from '../../content/prs'
import { GitHubActivity } from '../../components/GitHubActivity'
import { backgrounds, previews } from '../../content/assets'
import { SectionTransparent } from '../../components/SectionTransparent'
import { getNotionPage } from '@siafoundation/data-sources'
import { format } from 'date-fns'

type Props = AsyncReturnType<typeof getStaticProps>['props']

const title = 'The Sia Foundation Roadmap'
const description =
  'This Sia roadmap provides mid to high level insight into core Sia development. It will be updated once a quarter at minimum, and will show an outline of what we’re currently working on, why we’re working on it, and what we have in mind after that’s done.'

export default function Roadmap({ date, source, prs }: Props) {
  return (
    <Layout
      title={title}
      description={description}
      path={routes.roadmap.index}
      heading={
        <SectionTransparent className="pt-24 md:pt-40 pb-20 md:pb-40">
          <SiteHeading
            title={title}
            description={description}
            size="64"
            anchorLink={false}
          />
        </SectionTransparent>
      }
      backgroundImage={backgrounds.nateTrickle}
      previewImage={previews.nateTrickle}
    >
      <SectionSolid className="pb-24 md:pb-40">
        <MDXRemote {...source} components={components} />
        <Text
          className="mt-24 md:mt-32"
          color="verySubtle"
        >{`Document version date: ${format(new Date(date), 'PP')}`}</Text>
        <Separator className="mb-32 md:mb-40 mt-24" />
        <Heading size="40" className="mb-12" anchorLink>
          Activity
        </Heading>
        <GitHubActivity prs={prs} />
        <Separator color="verySubtle" className="my-8" />
        <Link
          href={routes.activity.index}
          underline="hover"
          color="subtle"
          className="my-10"
        >
          View full activity feed →
        </Link>
      </SectionSolid>
    </Layout>
  )
}

const roadmapId = 'd74a8e95cb1e40f4bd0b12fdf4ad67a9'

export async function getStaticProps() {
  const stats = await getStats()

  const { date, source } = await getNotionPage(roadmapId)

  const prs = await getPrs()

  return {
    props: {
      date,
      source,
      prs: prs.slice(0, 10),
      fallback: {
        '/api/stats': stats,
      },
    },
    revalidate: minutesInSeconds(5),
  }
}
