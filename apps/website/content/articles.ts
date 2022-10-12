import { getMinutesInSeconds } from '../lib/time'
import { addNewTab } from '../lib/utils'
import { readCacheJsonFile } from '../lib/readJson'

type Tag = 'sia-featured' | 'ecosystem-featured' | 'ecosystem-all' | 'technical'

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
  const articles = await readCacheJsonFile('articles.json', [], maxAge)
  return articles
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
    .filter((a) =>
      !tags.length ? true : tags.find((tag) => a.tags?.includes(tag))
    )
    .slice(0, limit)
    .map(addNewTab) as Article[]
}
