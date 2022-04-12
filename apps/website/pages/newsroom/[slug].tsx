import {
  Grid,
  Text,
  ContentItem,
  Section,
  getImageProps,
  SiteHeading,
  Box,
} from '@siafoundation/design-system'
import fs from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote'
import { format } from 'date-fns'
import { Layout } from '../../components/Layout'
import { baseContentPath } from '../../config/app'
import { GetNewsPost, getNewsPost } from '../../content/news'
import { getStats, Stats } from '../../content/stats'
import { sitemap } from '../../config/site'
import { textContent } from '../../lib/utils'
import backgroundImage from '../../assets/backgrounds/nate-waterfall.png'
import previewImage from '../../assets/previews/nate-waterfall.png'

const backgroundImageProps = getImageProps(backgroundImage)
const previewImageProps = getImageProps(previewImage)

type Props = GetNewsPost & { stats: Stats }

function NewsroomPost({
  post: { title, subtitle, location, date, source, slug },
  prev,
  next,
  stats,
}: Props) {
  return (
    <Layout
      title={title}
      description={textContent(subtitle)}
      date={new Date(date).toISOString()}
      path={sitemap.newsroom.newsPost.replace('[slug]', slug)}
      heading={
        <Section size="4">
          <SiteHeading size="64" title={title} description={subtitle} />
        </Section>
      }
      stats={stats}
      backgroundImage={backgroundImageProps}
      previewImage={previewImageProps}
    >
      <Section>
        <Box>
          <Text weight="bold" size="16">
            {location} - {format(new Date(date), 'PP')}
          </Text>
          <MDXRemote {...source} />
        </Box>
        <Grid
          gap="3"
          css={{ marginTop: '$8' }}
          columns={{
            '@initial': '1',
            '@bp1': '2',
          }}
        >
          {prev && <ContentItem {...prev} />}
          {next && <ContentItem {...next} />}
        </Grid>
      </Section>
    </Layout>
  )
}

async function getStaticPaths() {
  const files = fs.readdirSync(path.join(baseContentPath, 'news'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

async function getStaticProps({ params: { slug } }) {
  const stats = await getStats()
  const props = await getNewsPost(slug)

  return {
    props: {
      ...props,
      stats,
    },
  }
}

export { getStaticProps, getStaticPaths }
export default NewsroomPost
