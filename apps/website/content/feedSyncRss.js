const Parser = require('rss-parser')
const { Notion } = require('./notion')
require('dotenv').config()

async function parseFeedFile(feedFile, data) {
  try {
    const parser = new Parser()
    const feed = await parser.parseString(data)
    return feed
  } catch (e) {
    console.log('error parsing', feedFile, e.message)
    return null
  }
}

async function downloadRssFile(url) {
  try {
    const response = await fetch(url)
    const data = await response.text()
    return data
  } catch (e) {
    console.log('error downloading', url)
    return null
  }
}

async function fetchRssFeedItems() {
  const feedItems = []
  try {
    const feedList = await fetchFeedList()
    for (const feed of feedList) {
      const fileData = await downloadRssFile(feed.link)
      // try to parse to check if it's valid rss xml
      const parsedData = await parseFeedFile(feed.name, fileData)
      if (fileData && parsedData) {
        feedItems.push(...parsedData.items)
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
  const response = await Notion.databases.query({
    database_id: rssFeedsDatabaseId,
  })
  return response.results.map((page) => ({
    name: page.properties.name.title[0].plain_text,
    link: page.properties.link?.url || null,
  }))
}

module.exports = {
  fetchRssFeedItems,
}
