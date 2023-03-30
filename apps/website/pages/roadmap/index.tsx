import fs from 'fs'
import path from 'path'
import {
  SiteHeading,
  getImageProps,
  Heading,
  Link,
  Separator,
} from '@siafoundation/design-system'
import { Layout } from '../../components/Layout'
import { routes } from '../../config/routes'
import { getCacheStats } from '../../content/stats'
import backgroundImage from '../../assets/backgrounds/nate-trickle.png'
import previewImage from '../../assets/previews/nate-trickle.png'
import { AsyncReturnType } from '../../lib/types'
import { getMinutesInSeconds } from '../../lib/time'
import { SectionSimple } from '../../components/SectionSimple'
import { getContentDirectory } from '@siafoundation/env'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { components } from '../../config/mdx'
import { TableOfContents } from '../../components/TableOfContents'
import { getCachePrs } from '../../content/prs'
import { GitHubActivity } from '../../components/GitHubActivity'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function Roadmap({ title, description, source, prs }: Props) {
  return (
    <Layout
      title={title}
      description={description}
      path={routes.community.index}
      heading={
        <SectionSimple className="pt-24 md:pt-40 pb-6">
          <SiteHeading
            // eyebrow={`Document version date: ${format(new Date(date), 'PP')}`}
            title={title}
            description={description}
            size="64"
          >
            <TableOfContents
              className="mt-10"
              items={[
                {
                  href: '#current',
                  title: 'Current',
                },
                {
                  href: '#future',
                  title: 'Future',
                },
                {
                  href: '#activity',
                  title: 'Activity',
                },
              ]}
            />
          </SiteHeading>
        </SectionSimple>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <SectionSimple className="pb-24 md:pb-40">
        <MDXRemote {...source} components={components} />
      </SectionSimple>
      <SectionSimple className="md:pt-20 pb-24 md:pb-40">
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
      </SectionSimple>
    </Layout>
  )
}

export async function getStaticProps() {
  const stats = await getCacheStats()

  const { data, content } = matter(
    fs.readFileSync(
      path.join(getContentDirectory(), 'pages/roadmap.mdx'),
      'utf-8'
    )
  )

  const prs = await getCachePrs()
  const source = await serialize(content)

  return {
    props: {
      title: data.title as string,
      date: data.date as string,
      description: data.description as string,
      source,
      prs: prs.slice(0, 10),
      fallback: {
        '/api/stats': stats,
      },
    },
    revalidate: getMinutesInSeconds(5),
  }
}
