import { readContentDirJsonFile } from '@siafoundation/env'
import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'
import { addNewTab } from '../lib/utils'
import { syncRssFeeds } from './rssSyncFeeds'

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

export async function getCacheArticles(
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
    'articles.json',
    async () => {
      await syncRssFeeds()
      return readContentDirJsonFile('articles.json', [])
    },
    maxAge
  )
}
