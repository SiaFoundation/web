import ReactDOMServer from 'react-dom/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import omit from 'lodash/omit'
import { format } from 'date-fns'
import { Feed } from 'feed'
import { serialize } from 'next-mdx-remote/serialize'
import { PlaceholderBlock } from '../../components/PlaceholderBlock'
import { Layout } from '../../components/Layout'
import { Heading } from '../../system/Heading'
import { Text } from '../../system/Text'
import { external, sitemap } from '../../config/site'
import { Link } from '../../system/Link'
import { Flex } from '../../system/Flex'
import { components } from '../../config/mdx'
import { MDXRemote } from 'next-mdx-remote'

type Post = {
  title: string
  location: string
  date: number
  description: string
  slug: string
}

type ServerPost = Post & {
  html: string
}

type Props = {
  posts: Post[]
}

function Newsroom({ posts }: Props) {
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

async function getPosts(): Promise<ServerPost[]> {
  const promises = fs.readdirSync(path.join('posts')).map(async (filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )
    const { data, content } = matter(markdownWithMeta)

    const mdxSource = await serialize(content)

    const html = ReactDOMServer.renderToStaticMarkup(
      <MDXRemote {...mdxSource} components={components} />
    )

    return {
      ...data,
      html,
      date: new Date(data.date).getTime(),
      slug: filename.split('.')[0],
    } as ServerPost
  })

  const posts = await Promise.all(promises)

  posts.sort((a, b) => (a.date < b.date ? 1 : -1))

  return posts
}

export async function getStaticProps() {
  console.log('Compiling posts')
  const posts = await getPosts()

  // Generate RSS feed
  console.log('Generating RSS feed')
  generateRssFeed(posts)

  // Remove html before rendering page
  return {
    props: {
      posts: posts.map((post) => omit(post, 'html')) as Post[],
    },
  }
}

function generateRssFeed(posts: ServerPost[]) {
  const siteUrl = process.env.APP_DOMAIN
  const date = new Date()
  const author = {
    name: 'Sia Foundation',
    email: external.email,
    link: external.twitter,
  }

  const feed = new Feed({
    title: 'Sia Foundation Newsroom',
    description: '',
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/android-chrome-192x192.png`,
    favicon: `${siteUrl}/favicon-32x32.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Sia Foundation`,
    updated: date,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteUrl}/rss/feed.xml`,
      json: `${siteUrl}/rss/feed.json`,
      atom: `${siteUrl}/rss/atom.xml`,
    },
    author,
  })

  posts.forEach((post) => {
    const url = `${siteUrl}${sitemap.newsroom.newsPost.replace(
      '[slug]',
      post.slug
    )}`
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: post.html,
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    })
  })

  fs.mkdirSync('public/rss', { recursive: true })
  fs.writeFileSync('public/rss/feed.xml', feed.rss2())
  fs.writeFileSync('public/rss/atom.xml', feed.atom1())
  fs.writeFileSync('public/rss/feed.json', feed.json1())
}

export default Newsroom
