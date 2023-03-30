const Parser = require('rss-parser')
const fs = require('fs')
const path = require('path')
const { format } = require('date-fns')
const { sortBy } = require('lodash')
require('dotenv').config()

const feedFilesDirectory = path.join(process.env.CONTENT, 'feeds')
const feedsList = path.join(process.env.CONTENT, 'feeds.json')
const articlesFilePath = path.join(process.env.CONTENT, 'articles.json')

async function parseFeed(feedFile, data) {
  try {
    const parser = new Parser()
    const feed = await parser.parseString(data)
    return feed
  } catch (e) {
    console.log('error parsing', feedFile, e)
    return null
  }
}

async function parseFeedFile(feedFile) {
  try {
    const feedData = fs.readFileSync(feedFile, 'utf-8')
    return parseFeed(feedFile, feedData)
  } catch (e) {
    console.log('error reading feed file', feedFile)
    return null
  }
}

async function downloadXmlFile(url) {
  try {
    const response = await fetch(url)
    const data = await response.text()
    return data
  } catch (e) {
    console.log('error downloading', url)
    return null
  }
}

// 1. Save fresh feeds to feeds/ directory.
// (There were CF issues fetching filebase rss feed)
// 2. Run `node syncFeeds.js` in the web content directory so paths are relative for feeds/ and articles.json.
// 3. Manually categorize articles with tags.
export async function syncRssFeeds() {
  // for each feed in feeds.json curl and save to feeds/
  console.log('syncing feeds listed in feeds.json')
  try {
    const feedList = JSON.parse(fs.readFileSync(feedsList, 'utf-8'))
    for (const feed of feedList) {
      const feedFile = path.join(feedFilesDirectory, feed.name)
      const fileData = await downloadXmlFile(feed.link)
      // try to parse to check if it's valid rss xml
      const parsedData = await parseFeed(feedFile, fileData)
      if (fileData && parsedData) {
        fs.writeFileSync(feedFile, fileData)
      }
    }
  } catch (e) {
    throw Error('feeds.json not found')
  }

  // parse existing articles.json so that new data can be merged in
  const articleData = fs.readFileSync(articlesFilePath, 'utf-8')
  let articles = []
  try {
    const json = JSON.parse(articleData)
    articles = json
  } catch (e) {
    throw Error('error parsing articles.json')
  }

  console.log('merging posts from feeds in feeds/ directory into articles.json')
  // for each feed file parse and add to articles.json
  const feedFilePaths = fs.readdirSync(feedFilesDirectory)
  // eslint-disable-next-line no-undef
  await Promise.all(
    feedFilePaths.map(async (feedFile) => {
      const feedPath = path.join(feedFilesDirectory, feedFile)
      const feed = await parseFeedFile(feedPath)

      if (!feed) {
        console.log('Failure', feedFile)
        return
      }

      feed.items.forEach((post) => {
        const url = new URL(post.link)
        // clean the link, at least medium appends query params
        const link = url.origin + url.pathname
        // use the clean link to check if the article is new
        if (!articles.find((a) => a.link === link)) {
          console.log('new article', link)
          const tags = ['ecosystem-all']
          if (url.origin === 'https://blog.sia.tech') {
            tags.push('sia-all')
          }
          articles.push({
            title: post.title,
            date: format(new Date(post.pubDate), 'P'),
            tags,
            link,
          })
        }
      })
      console.log('Success', feedFile)
    })
  )

  articles = sortBy(
    articles,
    (a) => new Date(a.date).getTime() + a.title
  ).reverse()

  const updatedArticleData = JSON.stringify(articles, null, 2)
  fs.writeFileSync(articlesFilePath, updatedArticleData + '\n')
}
