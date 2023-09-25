import { fetchAllPages, Notion } from './notion'
import { retry } from './retry'

const feedDatabaseId = '9be1ecfc6f3142e7b8e284f2f6bd9338'

type RssPost = {
  title: string
  link: string
  pubDate: string
}

export type FeedItem = {
  id: string
  title: string
  tags: string[]
  date: string
  link: string
}

export async function savePost(allItems: FeedItem[], post: RssPost) {
  const url = new URL(post.link)
  // clean the link, at least medium appends query params
  const link = url.origin + url.pathname
  // use the clean link to check if the article is new
  const doesArticleExist = allItems.find((a) => a.link === link)
  if (!doesArticleExist) {
    console.log('new item', link)
    const tags = ['ecosystem-all']
    if (url.origin === 'https://blog.sia.tech') {
      tags.push('sia-all')
    }
    const item = {
      title: post.title,
      date: new Date(post.pubDate).toISOString(),
      tags,
      link,
    }
    saveItem(item)
  } else {
    console.log('item already exists', link)
  }
}

export async function saveItem(item: Omit<FeedItem, 'id'>) {
  try {
    await retry(() => Notion.pages.create({
      parent: {
        type: 'database_id',
        database_id: feedDatabaseId,
      },

      properties: {
        title: {
          title: [
            {
              text: {
                content: item.title,
              },
            },
          ],
        },
        link: {
          url: item.link,
        },
        tags: {
          multi_select: item.tags.map((tag) => {
            return {
              name: tag,
            }
          }),
        },
        date: {
          date: {
            start: new Date(item.date).toISOString(),
          },
        },
      },
    }))
  } catch (e) {
    console.log(e)
  }
}

export async function deletePage(pageId: string) {
  return retry(() => Notion.pages.update({
    page_id: pageId,
    archived: true,
  }))
}

type Tag =
  | 'sia-all'
  | 'featured'
  | 'ecosystem-featured'
  | 'ecosystem-all'
  | 'technical'

export async function fetchAllFeedItems(tags: Tag[], limit?: number) {
  const allPages = await fetchAllPages('title', {
    database_id: feedDatabaseId,
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = allPages.map((page: any) => ({
    id: page.id,
    title: page.properties.title.title?.[0]?.plain_text,
    link: page.properties.link.url,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tags: page.properties.tags.multi_select.map((tag: any) => tag.name),
    date: page.properties.date.date.start,
  }))
  return items
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
    .filter((a) =>
      !tags.length ? true : tags.find((tag) => a.tags?.includes(tag))
    )
    .slice(0, limit)
}
