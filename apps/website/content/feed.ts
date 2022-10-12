import { ContentItemProps } from '@siafoundation/design-system'
import { getCacheNewsPostsList } from './news'
import { getCacheArticles } from './articles'

const limit = 50

type Filter = 'press' | 'ecosystem'

export async function getCacheFeed(filter?: Filter) {
  let posts = []

  if ([undefined, 'press'].includes(filter)) {
    const news = await getCacheNewsPostsList(limit)
    posts.push(...news)
  }
  if ([undefined, 'ecosystem'].includes(filter)) {
    const articles = await getCacheArticles([], limit)
    posts.push(...articles)
  }

  posts.sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1
  ) as ContentItemProps[]

  posts = posts.slice(0, limit)

  return posts
}
