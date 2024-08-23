import { SiteHeading, Text } from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getStats } from '../../content/stats'
import { AsyncReturnType } from '../../lib/types'
import { minutesInSeconds } from '@siafoundation/units'
import { SectionSolid } from '../../components/SectionSolid'
import { format } from 'date-fns'
import { MDXRemote } from 'next-mdx-remote'
import { components } from '../../config/mdx'
import { backgrounds, previews } from '../../content/assets'
import { SectionTransparent } from '../../components/SectionTransparent'
import { getNotionPage } from '@siafoundation/data-sources'

type Props = AsyncReturnType<typeof getStaticProps>['props']

const description = ''

export default function PrivacyPolicy({ title, date, source }: Props) {
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

const databaseId = 'fad41ea72c9a41eb85564bbfa1c34c70'

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
