import { ContentItemProps } from '@siafoundation/design-system'
import { getNewsPostsList } from './news'
import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'
import { addNewTab } from '../lib/utils'
import { fetchAllFeedItems, syncFeeds } from './feedSync'

type Tag =
  | 'sia-all'
  | 'featured'
  | 'ecosystem-featured'
  | 'ecosystem-all'
  | 'technical'

type Article = {
  title: string
  tags: Tag[]
  date: string
  link: string
  newTab?: boolean
}

const maxAge = getMinutesInSeconds(5)

export async function getFeedContent(
  tags: Tag[],
  limit?: number
): Promise<Article[]> {
  const articles = await readCacheActicles()
  return articles
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
    .filter((a) =>
      !tags.length ? true : tags.find((tag) => a.tags?.includes(tag))
    )
    .slice(0, limit)
    .map(addNewTab) as Article[]
}

async function readCacheActicles() {
  return getCacheValue(
    'feedArticles',
    async () => {
      return fetchAllFeedItems()
    },
    maxAge
  )
}

export async function syncArticlesEvery5min() {
  return getCacheValue(
    'syncFeedsEvery5min',
    async () => {
      await syncFeeds()
      return {
        syncedAt: new Date(),
      }
    },
    maxAge
  )
}

const limit = 50

type Filter = 'press' | 'ecosystem'

export async function getFeedAndNews(filter?: Filter) {
  let posts = []

  if ([undefined, 'press'].includes(filter)) {
    const news = await getNewsPostsList(limit)
    posts.push(...news)
  }
  if ([undefined, 'ecosystem'].includes(filter)) {
    const articles = await getFeedContent([], limit)
    posts.push(...articles)
  }

  posts.sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1
  ) as ContentItemProps[]

  posts = posts.slice(0, limit)

  return posts
}
