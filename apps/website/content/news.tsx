import ReactDOMServer from 'react-dom/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Feed } from 'feed'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { ContentItemProps, webLinks } from '@siafoundation/design-system'
import { sitemap } from '../config/site'
import { components } from '../config/mdx'
import { baseContentPath, newsFeedName } from '../config/app'

export type NewsPost = ContentItemProps & {
  slug: string
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  html?: string
}

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
    .map(async (filename) => {
      const post = await buildPost(filename.replace('.mdx', ''))

      let html = null

      if (includeHtml) {
        html = ReactDOMServer.renderToStaticMarkup(
          <MDXRemote {...post.source} components={components} />
        )
      }

      return {
        ...post,
        html,
      } as NewsPost
    })

  const posts = await Promise.all(promises)
  posts.sort((a, b) => (a.date < b.date ? 1 : -1))

  return posts.slice(0, limit)
}

async function buildPost(slug?: string): Promise<NewsPost> {
  if (!slug) {
    return undefined
  }

  const markdownWithMeta = fs.readFileSync(
    path.join(baseContentPath, 'news', slug + '.mdx'),
    'utf-8'
  )

  const { data, content } = matter(markdownWithMeta)

  const source = await serialize(content)

  return {
    title: data.title,
    subtitle: data.subtitle,
    location: data.location,
    date: new Date(data.date).getTime(),
    link: sitemap.newsroom.newsPost.replace('[slug]', slug),
    slug,
    tags: [],
    source,
  }
}

export type GetNewsPost = {
  post: NewsPost
  prev?: NewsPost
  next?: NewsPost
}

export async function getNewsPost(slug: string): Promise<GetNewsPost> {
  const posts = await getNewsPosts()

  const post = posts.find((post) => post.slug === slug)
  const next = posts.find((_, i) => posts[i + 1]?.slug === slug)
  const prev = posts.find((_, i) => posts[i - 1]?.slug === slug)

  // Must be nulls for JSON serialization
  return {
    post,
    prev: prev || null,
    next: next || null,
  }
}

export function generateRssNewsFeed(posts: NewsPost[]) {
  const siteUrl = webLinks.website
  const date = new Date()
  const author = {
    name: 'Sia Foundation',
    email: webLinks.email,
    link: webLinks.twitter,
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
    const content = post.html.replace(/\sclass="[a-zA-Z0-9:;.\s()\-,]*"/g, '')
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.subtitle as string,
      content,
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
