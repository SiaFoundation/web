import ReactDOMServer from 'react-dom/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Feed } from 'feed'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { external, sitemap } from '../config/site'
import { components } from '../config/mdx'
import { getHosts } from '@siafoundation/env'
import { omit } from 'lodash'
import { baseContentPath, newsFeedName } from '../config/app'
import { AsyncReturnType } from '../lib/types'

export type NewsPost = {
  title: string
  location: string
  date: number
  description: string
  slug: string
  html?: string
}

type Metadata = {
  title: string
  description: string
  slug: string
  link: string
  date: number
  location: string
}

const hosts = getHosts()

type Options = {
  limit?: number
  includeHtml?: boolean
}

const defaultOptions: Options = {
  limit: undefined,
  includeHtml: false,
}

export async function getNewsPosts(options: Options = {}): Promise<NewsPost[]> {
  const { limit, includeHtml } = {
    ...defaultOptions,
    ...options,
  }

  const promises = fs
    .readdirSync(path.join(baseContentPath, 'news'))
    .slice(0, limit)
    .map(async (filename) => {
      const markdownWithMeta = fs.readFileSync(
        path.join(baseContentPath, 'news', filename),
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
      } as NewsPost
    })

  const posts = await Promise.all(promises)
  posts.sort((a, b) => (a.date < b.date ? 1 : -1))

  if (!includeHtml) {
    return posts.map((post) => omit(post, 'html'))
  }

  return posts
}

function getContent(slug?: string) {
  if (!slug) {
    return undefined
  }

  const markdownWithMeta = fs.readFileSync(
    path.join(baseContentPath, 'news', slug + '.mdx'),
    'utf-8'
  )

  const { data, content } = matter(markdownWithMeta)
  return {
    data: {
      ...data,
      date: new Date(data.date).getTime(),
      link: sitemap.newsroom.newsPost.replace('[slug]', slug),
      slug,
    } as Metadata,
    content,
  }
}

export async function getNewsPost(slug: string) {
  // TODO add sorting
  const files = fs.readdirSync(path.join(baseContentPath, 'news'))

  const next = files.find((_, i) => files[i - 1] === `${slug}.mdx`)
  const prev = files.find((_, i) => files[i + 1] === `${slug}.mdx`)

  const { data, content } = getContent(slug)
  const prevContent = getContent(prev.replace('.mdx', ''))
  const nextContent = getContent(next.replace('.mdx', ''))

  const mdxSource = await serialize(content)

  return {
    ...data,
    content: mdxSource,
    prev: prevContent?.data || null,
    next: nextContent?.data || null,
  }
}

export type GetNewsPost = AsyncReturnType<typeof getNewsPost>

export function generateRssNewsFeed(posts: NewsPost[]) {
  const siteUrl = hosts.app
  const date = new Date()
  const author = {
    name: 'Sia Foundation',
    email: external.email,
    link: external.twitter,
  }

  const feed = new Feed({
    title: newsFeedName,
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

  fs.mkdirSync('apps/website/public/rss', { recursive: true })
  fs.writeFileSync('apps/website/public/rss/feed.xml', feed.rss2())
  fs.writeFileSync('apps/website/public/rss/atom.xml', feed.atom1())
  fs.writeFileSync('apps/website/public/rss/feed.json', feed.json1())
}
