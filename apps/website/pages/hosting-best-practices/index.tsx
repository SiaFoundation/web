import fs from 'fs'
import path from 'path'
import { SiteHeading, webLinks, Text } from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getCacheStats } from '../../content/stats'
import { AsyncReturnType } from '../../lib/types'
import { getMinutesInSeconds } from '../../lib/time'
import { SectionSolid } from '../../components/SectionSolid'
import { getContentDirectory } from '@siafoundation/env'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { format } from 'date-fns'
import { MDXRemote } from 'next-mdx-remote'
import { components } from '../../config/mdx'
import { backgrounds } from '../../content/imageBackgrounds'
import { previews } from '../../content/imagePreviews'
import { SectionTransparent } from '../../components/SectionTransparent'

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function HostBestPractices({
  title,
  date,
  description,
  source,
}: Props) {
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

export async function getStaticProps() {
  const stats = await getCacheStats()

  const { data, content } = matter(
    fs.readFileSync(
      path.join(getContentDirectory(), 'pages/hosting-best-practices.mdx'),
      'utf-8'
    )
  )

  const source = await serialize(content)

  return {
    props: {
      title: data.title as string,
      date: data.date as string,
      description: data.description as string,
      source,
      fallback: {
        '/api/stats': stats,
      },
    },
    revalidate: getMinutesInSeconds(5),
  }
}
