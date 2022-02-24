import { Flex, Separator, Text } from '@siafoundation/design-system'
import fs from 'fs'
import path from 'path'
import { format } from 'date-fns'
import { MDXRemote } from 'next-mdx-remote'
import { Layout } from '../../components/Layout'
import { baseContentPath } from '../../config/app'
import { GetNewsPost, getNewsPost } from '../../content/news'
import { SimpleBlock } from '../../components/SimpleBlock'
import { ContentCard } from '../../components/ContentCard'

function NewsroomPost({
  title,
  description,
  location,
  date,
  content,
  prev,
  next,
}: GetNewsPost) {
  return (
    <Layout>
      <SimpleBlock title={title} subtitle={description} align="start" />
      <Text>
        {location} - {format(date, 'PPPP')}
      </Text>
      <MDXRemote {...content} />
      <Separator size="3" />
      <Flex gap="3">
        <ContentCard {...prev} css={{ flex: 1 }} />
        <ContentCard {...next} css={{ flex: 1 }} />
      </Flex>
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
  const props = await getNewsPost(slug)

  return {
    props,
  }
}

export { getStaticProps, getStaticPaths }
export default NewsroomPost
