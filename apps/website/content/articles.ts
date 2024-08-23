import { addNewTab } from '../lib/utils'
import { getCacheValue } from '../lib/cache'
import { fetchArticlesByTag } from '@siafoundation/data-sources'
import { minutesInSeconds } from '@siafoundation/units'

type Article = {
  title: string
  icon: string
  link: string
}

const maxAge = minutesInSeconds(5)

export async function getTutorialArticles(limit?: number) {
  const articles = await getCacheValue<Article[]>(
    'articles/tutorial',
    () => {
      return fetchArticlesByTag('tutorial')
    },
    maxAge
  )
  return articles.slice(0, limit).map(addNewTab) as Article[]
}

export async function getRentingArticles(limit?: number) {
  const articles = await getCacheValue<Article[]>(
    'articles/renting',
    () => {
      return fetchArticlesByTag('renting')
    },
    maxAge
  )
  return articles.slice(0, limit).map(addNewTab) as Article[]
}

export async function getHostingArticles(limit?: number) {
  const articles = await getCacheValue<Article[]>(
    'articles/hosting',
    () => {
      return fetchArticlesByTag('hosting')
    },
    maxAge
  )
  return articles.slice(0, limit).map(addNewTab) as Article[]
}

export async function getWalletArticles(limit?: number) {
  const articles = await getCacheValue<Article[]>(
    'articles/wallet',
    () => {
      return fetchArticlesByTag('wallet')
    },
    maxAge
  )
  return articles.slice(0, limit).map(addNewTab) as Article[]
}
