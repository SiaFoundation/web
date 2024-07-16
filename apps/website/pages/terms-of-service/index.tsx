import { getNotionPage } from '@siafoundation/data-sources'
import { SiteHeading, Text } from '@siafoundation/design-system'
import { format } from 'date-fns'
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

const description = ''

export default function TermsOfService({ title, date, source }: Props) {
  return (
    <Layout
      title={title}
      description={description}
      path={routes.terms.index}
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
      <SectionSolid className="md:pt-20 pb-24 md:pb-40">
        <MDXRemote {...source} components={components} />
        <Text
          className="mt-24 md:mt-32 mb-24"
          color="verySubtle"
        >{`Document version date: ${format(new Date(date), 'PP')}`}</Text>
      </SectionSolid>
    </Layout>
  )
}

const databaseId = 'ef6862a3f8274243be41077fac52b77d'

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
    revalidate: getMinutesInSeconds(5),
  }
}
