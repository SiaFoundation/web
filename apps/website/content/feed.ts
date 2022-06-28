import { ContentItemProps } from '@siafoundation/design-system'
import { getNewsPosts } from './news'
import { getArticles } from './articles'

const limit = 50

type Filter = 'press' | 'ecosystem'

export async function getFeed(filter?: Filter) {
  let posts = []

  if ([undefined, 'press'].includes(filter)) {
    const news = await getNewsPosts({ limit })
    posts.push(...news)
  }
  if ([undefined, 'ecosystem'].includes(filter)) {
    const articles = getArticles([], limit)
    posts.push(...articles)
  }

  posts.sort((a, b) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1
  ) as ContentItemProps[]

  posts = posts.slice(0, limit)

  return posts
}
