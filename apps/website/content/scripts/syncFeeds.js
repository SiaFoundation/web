const Parser = require('rss-parser')
const fs = require('fs')
const path = require('path')
const { format } = require('date-fns')
const { sortBy } = require('lodash')

const feedFilesDirectory = 'feeds'
const articlesFilePath = 'apps/website/content/articles/articles.json'

async function getFeed(feedFile) {
  const feedData = fs.readFileSync(feedFile, 'utf-8')
  const parser = new Parser()
  const feed = await parser.parseString(feedData)
  return feed
}

// 1. Save fresh feeds to feeds/ directory.
// (There were CF issues fetching filebase rss feed)
// 2. Run the `npm run feeds` command to automatically update articles.json
// with new posts.
// 3. Manually categorize articles with tags.
async function sync() {
  const articleData = fs.readFileSync(articlesFilePath, 'utf-8')
  let articles = JSON.parse(articleData)

  const feeds = fs.readdirSync(feedFilesDirectory)

  // eslint-disable-next-line no-undef
  await Promise.all(
    feeds.map(async (feedFile) => {
      try {
        const feedPath = path.join(feedFilesDirectory, feedFile)
        const feed = await getFeed(feedPath)

        feed.items.forEach((post) => {
          const url = new URL(post.link)
          // clean the link, at least medium appends query params
          const link = url.origin + url.pathname
          // use the clean link to check if the article is new
          if (!articles.find((a) => a.link === link)) {
            articles.push({
              title: post.title,
              date: format(new Date(post.pubDate), 'P'),
              tags: ['ecosystem-all'],
              link,
            })
          }
        })
        console.log('Success', feedFile)
      } catch (e) {
        console.log('Failure', feedFile)
        console.log(e)
      }
    })
  )

  articles = sortBy(
    articles,
    (a) => new Date(a.date).getTime() + a.title
  ).reverse()

  const updatedArticleData = JSON.stringify(articles, null, 2)
  fs.writeFileSync(articlesFilePath, updatedArticleData + '\n')
}

sync()
