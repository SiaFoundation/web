import { getNotionPage } from '@siafoundation/data-sources'
import { SiteHeading, Text, webLinks } from '@siafoundation/design-system'
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

const title = 'Sia Network Hosting Best Practices'
const description = 'High-level guidance for Hosts on the Sia network.'

export default function HostBestPractices({ date, source }: Props) {
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
            links={[
              {
                title: 'Hosting Docs',
                link: webLinks.docs.hosting,
                newTab: true,
              },
              {
                title: 'Join our Discord',
                link: webLinks.discord,
                newTab: true,
              },
            ]}
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

const databaseId = 'a328ef7df2d84306b09dc64c65b25147'

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
