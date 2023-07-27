import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'
import { addNewTab } from '../lib/utils'
import { fetchAllFeedItems } from '@siafoundation/data-sources'

type Tag =
  | 'sia-all'
  | 'featured'
  | 'ecosystem-featured'
  | 'ecosystem-all'
  | 'technical'

type FeedItem = {
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
): Promise<FeedItem[]> {
  const items = await getFeedItems()
  return items
    .filter((a) =>
      !tags.length ? true : tags.find((tag) => a.tags?.includes(tag))
    )
    .slice(0, limit)
    .map(addNewTab) as FeedItem[]
}

async function getFeedItems() {
  return getCacheValue(
    'feed/items',
    async () => {
      return fetchAllFeedItems([])
    },
    maxAge
  )
}

const limit = 20

type Filter = 'foundation' | 'ecosystem'

export async function getNewsFeed(filter?: Filter) {
  const items = await getFeedContent([])

  if (filter === 'foundation') {
    return items
      .filter((i) => i.link.startsWith('https://blog.sia.tech'))
      .slice(0, limit)
  }
  if (filter === 'ecosystem') {
    return items
      .filter((i) => !i.link.startsWith('https://blog.sia.tech'))
      .slice(0, limit)
  }
  return items.slice(0, limit)
}
