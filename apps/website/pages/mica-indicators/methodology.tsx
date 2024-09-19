import { Layout } from '../../components/Layout'
import { getStats } from '../../content/stats'
import { AsyncReturnType } from '../../lib/types'
import { getNotionPage } from '@siafoundation/data-sources'
import { minutesInSeconds } from '@siafoundation/units'
import { SectionTransparent } from '../../components/SectionTransparent'
import { SiteHeading, Text, Link } from '@siafoundation/design-system'
import { SectionSolid } from '../../components/SectionSolid'
import { MDXRemote } from 'next-mdx-remote'
import { components } from '../../config/mdx'
import { backgrounds, previews } from '../../content/assets'
import { routes } from '../../config/routes'

type Props = AsyncReturnType<typeof getStaticProps>['props']

const description = ''

export default function MicaMethodology({ title, source }: Props) {
  return (
    <Layout
      title={title}
      description={description}
      path={routes.micaIndicators.methodology}
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
      <SectionSolid className="pb-24 md:pb-40">
        <MDXRemote {...source} components={components} />
        <Text size="18" className="pt-24">
          See the MiCA Indicators for the Sia Network{' '}
          <Link href="/mica-indicators">here</Link>.
        </Text>
      </SectionSolid>
    </Layout>
  )
}

const databaseId = '123632e3aeaf80759d9bf096a45665c3'

export async function getStaticProps() {
  const stats = await getStats()

  const { title, date, source } = await getNotionPage(databaseId)

  return {
    props: {
      title,
      date,
      source,
      fallback: {
        '/api/stats': stats,
      },
    },
    revalidate: minutesInSeconds(5),
  }
}
