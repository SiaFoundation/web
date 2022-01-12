import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'
import { PlaceholderBlock } from '../../components/PlaceholderBlock'
import { Layout } from '../../components/Layout'
import { Heading } from '../../system/Heading'
import { Text } from '../../system/Text'
import { sitemap } from '../../config/site'
import { Link } from '../../system/Link'
import { Flex } from '../../system/Flex'

function Newsroom({ posts }) {
  return (
    <Layout>
      <Heading>Newsroom</Heading>
      {posts.map((post) => (
        <PlaceholderBlock key={post.slug}>
          <Flex direction="column" gap="3">
            <Link href={sitemap.newsroom.newsPost.replace('[slug]', post.slug)}>
              <Heading>{post.title}</Heading>
            </Link>
            <Text>{post.description}</Text>
            <Text>
              {post.location} - {format(post.date, 'PPPP')}
            </Text>
          </Flex>
        </PlaceholderBlock>
      ))}
    </Layout>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'))

  const posts = files
    .map((filename) => {
      const markdownWithMeta = fs.readFileSync(
        path.join('posts', filename),
        'utf-8'
      )
      const { data } = matter(markdownWithMeta)

      return {
        ...data,
        date: new Date(data.date).getTime(),
        slug: filename.split('.')[0],
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return {
    props: {
      posts,
    },
  }
}

export default Newsroom
