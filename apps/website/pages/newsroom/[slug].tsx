import { Grid, Separator, Text } from '@siafoundation/design-system'
import fs from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote'
import { Layout } from '../../components/Layout'
import { baseContentPath } from '../../config/app'
import { GetNewsPost, getNewsPost } from '../../content/news'
import { SimpleBlock } from '../../components/SimpleBlock'
import { ContentCard } from '../../components/ContentCard'
import { getStats, Stats } from '../../content/stats'

type Props = GetNewsPost & { stats: Stats }

function NewsroomPost({
  post: { title, subtitle, description, source },
  prev,
  next,
  stats,
}: Props) {
  return (
    <Layout stats={stats}>
      <SimpleBlock title={title} subtitle={description} align="start" />
      <Text>{subtitle}</Text>
      <MDXRemote {...source} />
      <Separator size="3" />
      <Grid
        gap="3"
        columns={{
          '@initial': '1',
          '@bp1': '2',
        }}
      >
        {prev && <ContentCard {...prev} />}
        {next && <ContentCard {...next} />}
      </Grid>
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
