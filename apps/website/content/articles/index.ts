import { addNewTab } from '../../lib/utils'
import articles from './articles.json'

type Tag = 'sia-featured' | 'ecosystem-featured' | 'ecosystem-all' | 'technical'

type Article = {
  title: string
  tags: Tag[]
  date: string
  link: string
}

export function getArticles(tags: Tag[], limit?: number) {
  return (articles as Article[])
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
    .filter((a) => tags.find((section) => a.tags?.includes(section)))
    .slice(0, limit)
    .map(addNewTab)
}
