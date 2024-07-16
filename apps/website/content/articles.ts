import { fetchArticlesByTag } from '@siafoundation/data-sources'
import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'
import { addNewTab } from '../lib/utils'

type Article = {
  title: string
  icon: string
  link: string
}

const maxAge = getMinutesInSeconds(5)

export async function getTutorialArticles(limit?: number) {
  const articles = await getCacheValue<Article[]>(
    'articles/tutorial',
    () => {
      return fetchArticlesByTag('tutorial')
    },
    maxAge,
  )
  return articles.slice(0, limit).map(addNewTab) as Article[]
}

export async function getRentingArticles(limit?: number) {
  const articles = await getCacheValue<Article[]>(
    'articles/renting',
    () => {
      return fetchArticlesByTag('renting')
    },
    maxAge,
  )
  return articles.slice(0, limit).map(addNewTab) as Article[]
}

export async function getHostingArticles(limit?: number) {
  const articles = await getCacheValue<Article[]>(
    'articles/hosting',
    () => {
      return fetchArticlesByTag('hosting')
    },
    maxAge,
  )
  return articles.slice(0, limit).map(addNewTab) as Article[]
}

export async function getWalletArticles(limit?: number) {
  const articles = await getCacheValue<Article[]>(
    'articles/wallet',
    () => {
      return fetchArticlesByTag('wallet')
    },
    maxAge,
  )
  return articles.slice(0, limit).map(addNewTab) as Article[]
}
