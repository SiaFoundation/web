import { getNotionPage } from '@siafoundation/data-sources'
import { SiteHeading } from '@siafoundation/design-system'
import { MDXRemote } from 'next-mdx-remote'
import { Layout } from '../../components/Layout'
import { SectionSolid } from '../../components/SectionSolid'
import { SectionTransparent } from '../../components/SectionTransparent'
import { components } from '../../config/mdx'
import { routes } from '../../config/routes'
import { backgrounds, previews } from '../../content/assets'
import { getStats } from '../../content/stats'
import { getMinutesInSeconds } from '../../lib/time'
import type { AsyncReturnType } from '../../lib/types'

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
    revalidate: getMinutesInSeconds(5),
  }
}
