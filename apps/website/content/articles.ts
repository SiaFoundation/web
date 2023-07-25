import { addNewTab } from '../lib/utils'
import { getMinutesInSeconds } from '../lib/time'
import { getCacheValue } from '../lib/cache'
import { Notion } from './notion'

type Article = {
  title: string
  icon: string
  link: string
}

const featuredArticlesDatabaseId = '4cc7f2c2d6e94da2aacf44627efbd6be'

const maxAge = getMinutesInSeconds(5)

export async function getTutorialArticles(limit?: number) {
  const articles = await getCacheValue<Article[]>(
    'articles/tutorial',
    async () => {
      const response = await fetchByTag('tutorial')
      return transformResults(response)
    },
    maxAge
  )
  return articles.slice(0, limit).map(addNewTab) as Article[]
}

export async function getRentingArticles(limit?: number) {
  const articles = await getCacheValue<Article[]>(
    'articles/renting',
    async () => {
      const response = await fetchByTag('renting')
      return transformResults(response)
    },
    maxAge
  )
  return articles.slice(0, limit).map(addNewTab) as Article[]
}

export async function getHostingArticles(limit?: number) {
  const articles = await getCacheValue<Article[]>(
    'articles/hosting',
    async () => {
      const response = await fetchByTag('hosting')
      return transformResults(response)
    },
    maxAge
  )
  return articles.slice(0, limit).map(addNewTab) as Article[]
}

export async function getWalletArticles(limit?: number) {
  const articles = await getCacheValue<Article[]>(
    'articles/wallet',
    async () => {
      const response = await fetchByTag('wallet')
      return transformResults(response)
    },
    maxAge
  )
  return articles.slice(0, limit).map(addNewTab) as Article[]
}

function fetchByTag(tag: string) {
  return Notion.databases.query({
    database_id: featuredArticlesDatabaseId,
    sorts: [
      {
        property: 'order',
        direction: 'ascending',
      },
    ],
    filter: {
      property: 'tags',
      multi_select: {
        contains: tag,
      },
    },
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformResults(response: any): Article[] {
  return response.results.map((page) => {
    return {
      title: page.properties.title.title[0].plain_text,
      icon: page.properties.icon?.rich_text[0]?.plain_text || null,
      image: page.properties.image?.rich_text[0]?.plain_text || null,
      link: page.properties.link?.url || null,
      idea: page.properties.idea.checkbox,
    }
  })
}
