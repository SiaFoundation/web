import {
  Text,
  ContentItem,
  getImageProps,
  SiteHeading,
} from '@siafoundation/design-system'
import fs from 'fs'
import { MDXRemote } from 'next-mdx-remote'
import { format } from 'date-fns'
import { Layout } from '../../components/Layout'
import { GetNewsPost, getNewsPost, newsDirectory } from '../../content/news'
import { getCacheStats } from '../../content/stats'
import { routes } from '../../config/routes'
import { textContent } from '../../lib/utils'
import backgroundImage from '../../assets/backgrounds/nate-waterfall.png'
import previewImage from '../../assets/previews/nate-waterfall.png'
import { components } from '../../config/mdx'
import { getMinutesInSeconds } from '../../lib/time'
import { SectionSimple } from '../../components/SectionSimple'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

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
        <SectionSimple className="pt-24 md:py-40">
          <SiteHeading size="64" title={title} description={subtitle} />
        </SectionSimple>
      }
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <SectionSimple className="pt-20 pb-40">
        <div>
          <Text weight="bold" size="16" className="mb-5">
            {location} - {format(new Date(date), 'PP')}
          </Text>
          <MDXRemote {...source} components={components} />
        </div>
        {(prev || next) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-32">
            {prev && <ContentItem {...prev} />}
            {next && <ContentItem {...next} />}
          </div>
        )}
      </SectionSimple>
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
