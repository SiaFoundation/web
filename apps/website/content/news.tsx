import ReactDOMServer from 'react-dom/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { routes } from '../config/routes'
import { components } from '../config/mdx'
import { pick } from 'lodash'
import { getPath } from '../config/app'

export const newsDirectory = getPath('content/news')

export type NewsPost = {
  title: string
  date: string
  location: string
  subtitle: string
  link: string
  tags: string[]
  slug: string
}

export type NewsPostHtml = NewsPost & { html: string }
export type NewsPostSource = NewsPost & {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

type Options = {
  limit?: number
  includeSource?: boolean
  includeHtml?: boolean
}

const defaultOptions: Options = {
  limit: undefined,
  includeSource: false,
  includeHtml: false,
}

export async function getNewsPosts(options: Options = {}): Promise<NewsPost[]> {
  const { limit, includeHtml, includeSource } = {
    ...defaultOptions,
    ...options,
  }

  const promises = fs.readdirSync(newsDirectory).map(async (filename) => {
    const post = await buildPost(filename.replace('.mdx', ''))

    let html = null

    if (includeSource) {
      return post
    }

    if (includeHtml) {
      html = ReactDOMServer.renderToStaticMarkup(
        <MDXRemote {...post.source} components={components} />
      )
      return {
        ...post,
        source: null,
        html,
      }
    }

    return {
      ...post,
      source: null,
      html: null,
    }
  })

  const posts = await Promise.all(promises)
  posts.sort((a, b) => (a.date < b.date ? 1 : -1))

  return posts.slice(0, limit)
}

export async function getNewsPostsWithHtml(options: Options = {}) {
  return getNewsPosts({ ...options, includeHtml: true }) as Promise<
    NewsPostHtml[]
  >
}

export async function getNewsPostsWithSource(options: Options = {}) {
  return getNewsPosts({ ...options, includeSource: true }) as Promise<
    NewsPostSource[]
  >
}

async function buildPost(slug?: string): Promise<NewsPostSource> {
  if (!slug) {
    return undefined
  }

  const markdownWithMeta = fs.readFileSync(
    path.join(newsDirectory, slug + '.mdx'),
    'utf-8'
  )

  const { data, content } = matter(markdownWithMeta)

  const source = await serialize(content)

  return {
    title: data.title,
    subtitle: data.subtitle,
    location: data.location,
    date: data.date,
    link: routes.newsroom.newsPost.replace('[slug]', slug),
    slug,
    tags: [],
    source,
  }
}

type NavPost = {
  title: string
  subtitle: string
  date: string
  link: string
}

export type GetNewsPost = {
  post: NewsPostSource
  prev?: NavPost
  next?: NavPost
}

export async function getNewsPost(slug: string): Promise<GetNewsPost> {
  const posts = await getNewsPostsWithSource()

  const post = posts.find((post) => post.slug === slug)
  const next = posts.find((_, i) => posts[i + 1]?.slug === slug)
  const prev = posts.find((_, i) => posts[i - 1]?.slug === slug)

  // Must be nulls for JSON serialization
  return {
    post,
    prev: prev ? pick(prev, ['title', 'subtitle', 'link', 'date']) : null,
    next: next ? pick(next, ['title', 'subtitle', 'link', 'date']) : null,
  }
}
