import { addNewTab } from '../lib/utils'
import articles from './articles/articles.json'

type Tag = 'sia-featured' | 'ecosystem-featured' | 'ecosystem-all' | 'technical'

type Article = {
  title: string
  tags: Tag[]
  date: string
  link: string
  newTab?: boolean
}

export function getArticles(tags: Tag[], limit?: number): Article[] {
  return articles
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
    .filter((a) =>
      !tags.length ? true : tags.find((tag) => a.tags?.includes(tag))
    )
    .slice(0, limit)
    .map(addNewTab) as Article[]
}
