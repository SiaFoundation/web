import Parser from 'rss-parser'
import { Notion } from './notion/notion'
import { retry } from './notion/retry'

type RssPost = {
  title: string
  link: string
  pubDate: string
}

async function parseFeedFile(feedFile: string, data: string | null) {
  if (!data) return null
  try {
    const parser = new Parser()
    const feed = await parser.parseString(data)
    return feed
  } catch (e) {
    console.log('error parsing', feedFile, (e as Error).message)
    return null
  }
}

async function downloadRssFile(url: string) {
  try {
    const response = await fetch(url)
    const data = await response.text()
    return data
  } catch (e) {
    console.log('error downloading', url, e)
    return null
  }
}

export async function fetchRssFeedItems() {
  const feedItems: RssPost[] = []
  try {
    const feedList = await fetchFeedList()
    for (const feed of feedList) {
      const fileData = await downloadRssFile(feed.link)
      // try to parse to check if it's valid rss xml
      const parsedData = await parseFeedFile(feed.name, fileData)
      if (fileData && parsedData) {
        feedItems.push(...(parsedData.items as RssPost[]))
      }
    }
  } catch (e) {
    console.log(e)
    throw Error('feeds.json not found')
  }
  return feedItems
}

const rssFeedsDatabaseId = '422b97b4f7d94eaaa5e5fa85c83e2e4e'

async function fetchFeedList() {
  const response = await retry(() =>
    Notion.databases.query({
      database_id: rssFeedsDatabaseId,
    }),
  )
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return response.results.map((page: any) => ({
    name: page.properties.name.title?.[0]?.plain_text,
    link: page.properties.link?.url || null,
  }))
}
