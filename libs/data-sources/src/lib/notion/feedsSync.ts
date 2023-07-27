import { fetchRssFeedItems } from '../feedRssSync'
import { deletePage, FeedItem, fetchAllFeedItems, savePost } from './feed'

// sync articles from rss feeds
export async function syncFeedsToNotion() {
  const allArticles = await fetchAllFeedItems([])

  // console.log('syncing archive')
  // await syncJsonArchive(allArticles)

  console.log('syncing posts from feeds')
  const items = await fetchRssFeedItems()

  console.log('saving posts')
  // eslint-disable-next-line no-undef
  await Promise.all(
    items.map(async (post) => {
      await savePost(allArticles, post)
    })
  )

  // double check no duplicates
  console.log('checking for duplicates')
  await dedupeFeedItems(allArticles)
  console.log('Done')
}

async function dedupeFeedItems(allFeedItems: FeedItem[]) {
  const links: string[] = []
  allFeedItems.forEach(async (item) => {
    const link = item.link
    if (links.includes(link)) {
      await deleteFeedItem(item.id)
      console.log('deleted duplicate', link)
    } else {
      links.push(link)
    }
  })
}

async function deleteFeedItem(pageId: string) {
  try {
    await deletePage(pageId)
  } catch (e) {
    console.log(e)
  }
}
