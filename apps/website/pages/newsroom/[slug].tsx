import { Text, ContentItem, SiteHeading } from '@siafoundation/design-system'
import fs from 'fs'
import { MDXRemote } from 'next-mdx-remote'
import { format } from 'date-fns'
import { Layout } from '../../components/Layout'
import { GetNewsPost, getNewsPost, newsDirectory } from '../../content/news'
import { getCacheStats } from '../../content/stats'
import { routes } from '../../config/routes'
import { textContent } from '../../lib/utils'
import { components } from '../../config/mdx'
import { getMinutesInSeconds } from '../../lib/time'
import { SectionSolid } from '../../components/SectionSolid'
import { backgrounds } from '../../content/imageBackgrounds'
import { previews } from '../../content/imagePreviews'
import { SectionTransparent } from '../../components/SectionTransparent'

type Props = GetNewsPost

function NewsroomPost({
  post: { title, subtitle, location, date, source, slug },
  prev,
  next,
}: Props) {
  return (
    <Layout
      title={title}
      description={textContent(subtitle)}
      date={new Date(date).toISOString()}
      path={routes.newsroom.newsPost.replace('[slug]', slug)}
      heading={
        <SectionTransparent className="pt-24 md:pt-40 pb-6 md:pb-20">
          <SiteHeading
            size="64"
            title={title}
            description={subtitle}
            anchorLink={false}
          />
        </SectionTransparent>
      }
      backgroundImage={backgrounds.nateWaterfall}
      previewImage={previews.nateWaterfall}
    >
      <SectionSolid className="pt-12 xl:pt-20 pb-24 md:pb-40">
        <div>
          <Text weight="bold" size="16" className="mb-5">
            {location} - {format(new Date(date), 'PP')}
          </Text>
          <MDXRemote {...source} components={components} />
        </div>
        {(prev || next) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-24 md:mt-48">
            {prev && <ContentItem {...prev} />}
            {next && <ContentItem {...next} />}
          </div>
        )}
      </SectionSolid>
    </Layout>
  )
}

async function getStaticPaths() {
  const files = fs.readdirSync(newsDirectory)

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

async function getStaticProps({ params: { slug } }) {
  const stats = await getCacheStats()
  const props = await getNewsPost(slug)

  return {
    props: {
      ...props,
      fallback: {
        '/api/stats': stats,
      },
    },
    revalidate: getMinutesInSeconds(5),
  }
}

export { getStaticProps, getStaticPaths }
export default NewsroomPost
