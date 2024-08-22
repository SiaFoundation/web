import { SiteHeading } from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getStats } from '../../content/stats'
import { AsyncReturnType } from '../../lib/types'
import { minutesInSeconds } from '@siafoundation/units'
import { SectionSolid } from '../../components/SectionSolid'
import { MDXRemote } from 'next-mdx-remote'
import { components } from '../../config/mdx'
import { backgrounds, previews } from '../../content/assets'
import { SectionTransparent } from '../../components/SectionTransparent'
import { getNotionPage } from '@siafoundation/data-sources'

type Props = AsyncReturnType<typeof getStaticProps>['props']

const title = 'A message from Sia'
const description = 'The future is making a comeback'

export default function Letter({ source }: Props) {
  return (
    <Layout
      title={title}
      description={description}
      path={routes.community.index}
      heading={
        <SectionTransparent className="pt-24 md:pt-40 pb-6 md:pb-20">
          <SiteHeading
            title={title}
            description={description}
            size="64"
            anchorLink={false}
          />
        </SectionTransparent>
      }
      backgroundImage={backgrounds.nateBridge}
      previewImage={previews.nateBridge}
    >
      <SectionSolid className="md:pt-10 pb-24 md:pb-40">
        <MDXRemote {...source} components={components} />
      </SectionSolid>
    </Layout>
  )
}

const databaseId = 'd8209400f615466fbb58ce84a77e3f05'

export async function getStaticProps() {
  const stats = await getStats()

  const { date, source } = await getNotionPage(databaseId)

  return {
    props: {
      date,
      source,
      fallback: {
        '/api/stats': stats,
      },
    },
    revalidate: minutesInSeconds(5),
  }
}
