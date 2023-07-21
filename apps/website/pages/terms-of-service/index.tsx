import { SiteHeading, Text } from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getStats } from '../../content/stats'
import { AsyncReturnType } from '../../lib/types'
import { getMinutesInSeconds } from '../../lib/time'
import { SectionSolid } from '../../components/SectionSolid'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { format } from 'date-fns'
import { MDXRemote } from 'next-mdx-remote'
import { components } from '../../config/mdx'
import { backgrounds } from '../../content/imageBackgrounds'
import { previews } from '../../content/imagePreviews'
import { SectionTransparent } from '../../components/SectionTransparent'
import { Notion } from '../../content/notion'
import { isFullPage } from '@notionhq/client'
import { notionToMarkdown } from '../../lib/notion'

type Props = AsyncReturnType<typeof getStaticProps>['props']

const title = 'Terms of Service'
const description = ''

export default function TermsOfService({ date, source }: Props) {
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

  const p = await Notion.pages.retrieve({ page_id: databaseId })
  const date = isFullPage(p) ? p.last_edited_time : null
  const markdown = await notionToMarkdown(databaseId)
  const source = await serialize(matter(markdown).content)

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
